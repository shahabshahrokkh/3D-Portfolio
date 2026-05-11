# Memo Navigation - userData Order Fix

## The REAL Problem! 🎯

### Root Cause
ترتیب set کردن `userData` اشتباه بود!

**قبل از Fix:**
```javascript
// 1. Create plane and add to group
group.add(plane);

// 2. Create fasteners (pin/tape/magnet)
// 3. Copy group.userData to fasteners
magMesh.userData = { ...group.userData, parentGroup: group };  // ❌ group.userData هنوز خالیه!
tape.userData = { ...group.userData, parentGroup: group };     // ❌ group.userData هنوز خالیه!

// 4. THEN set group.userData
group.userData = {
  action: 'openLink',
  url: config.url,
  ...
};

// 5. Copy group.userData to plane
plane.userData = { ...group.userData, parentGroup: group };  // ✅ حالا group.userData پر شده!
```

### Why This Caused the Bug

**Memo Fasteners:**
- Index 0 (My Skills) → `magnet` → userData خالی بود → `action: undefined`
- Index 1 (GitHub) → `tape` → userData خالی بود → `action: undefined`
- Index 2 (Workspace) → `tape` → userData خالی بود → `action: undefined`
- Index 3 (Contact Me) → `pin` → userData خالی بود → `action: undefined`
- Index 4 (My Brain) → `pin` → userData خالی بود → `action: undefined`

**But Wait!** چرا بعضی کار می‌کردن؟

جواب: وقتی روی **plane** (کاغذ ممو) کلیک می‌کردید، کار می‌کرد چون plane بعد از set شدن `group.userData` کپی می‌شد!

ولی وقتی روی **fastener** (pin/tape/magnet) کلیک می‌کردید، کار نمی‌کرد چون userData خالی بود!

### Which Memos Were Affected?

**GitHub (tape):**
- اگر روی کاغذ کلیک می‌کردید → ✅ کار می‌کرد
- اگر روی tape کلیک می‌کردید → ❌ کار نمی‌کرد
- Navigation button → روی tape کلیک می‌شد → ❌ zoom back

**My Brain (pin):**
- اگر روی کاغذ کلیک می‌کردید → ✅ کار می‌کرد
- اگر روی pin کلیک می‌کردید → ❌ کار نمی‌کرد
- Navigation button → روی pin کلیک می‌شد → ❌ zoom back

### Why Camera Zoomed Back

در `cameraTransitions.js`:
```javascript
if (object.userData?.action === 'openLink') {
  // Memo offset
  offset = new THREE.Vector3(0, maxDim * 0.3, maxDim * 2.0);
} else {
  // Default offset (zoom back)
  offset = new THREE.Vector3(0, maxDim * 0.8, maxDim * 2.0);
}
```

وقتی `action: undefined` بود، از default offset استفاده می‌شد که باعث zoom back می‌شد!

## The Fix

### Move group.userData to BEFORE Fasteners

**بعد از Fix:**
```javascript
// 1. Create plane and add to group
group.add(plane);

// 2. ✅ SET group.userData FIRST
group.userData = {
  action: 'openLink',
  url: config.url,
  isPlaceholder: false,
  isInteractableGroup: true
};

// 3. Create fasteners and copy userData
if (fastenerType === 'pin') {
  // ...
  pinSphere.userData = { ...group.userData, parentGroup: group };  // ✅ حالا پر شده!
  pinCone.userData = { ...group.userData, parentGroup: group };    // ✅ حالا پر شده!
}
else if (fastenerType === 'tape') {
  // ...
  tape.userData = { ...group.userData, parentGroup: group };  // ✅ حالا پر شده!
}
else if (fastenerType === 'magnet') {
  // ...
  magMesh.userData = { ...group.userData, parentGroup: group };  // ✅ حالا پر شده!
}

// 4. Set position/rotation
group.position.set(...config.pos);

// 5. Copy userData to plane
plane.userData = { ...group.userData, parentGroup: group };  // ✅ همچنان پر شده!
```

## How It Works Now

### All Children Have Complete userData

**Before Fix:**
```javascript
// Magnet userData (copied when group.userData was empty)
{
  parentGroup: Group  // ✅ داشت
  // ❌ action: missing!
  // ❌ url: missing!
  // ❌ isPlaceholder: missing!
  // ❌ isInteractableGroup: missing!
}
```

**After Fix:**
```javascript
// Magnet userData (copied after group.userData was set)
{
  action: 'openLink',           // ✅
  url: 'https://reactjs.org',   // ✅
  isPlaceholder: false,         // ✅
  isInteractableGroup: true,    // ✅
  parentGroup: Group            // ✅
}
```

### Navigation Now Works

1. **Click Next** → `navigateMemos(1)`
2. **Get memo** → `memo = memoObjects[1]` (GitHub group)
3. **Focus camera** → `focusOnObject(memo)`
4. **Check action** → `memo.userData.action === 'openLink'` ✅
5. **Use memo offset** → Camera zooms to memo correctly! ✅

## Files Modified

### `src/objects/memos.js`
- Moved `group.userData = {...}` to BEFORE creating fasteners
- Now all children (plane, pin, tape, magnet) get complete userData

## Testing Results

### Before Fix ❌
```
Navigation sequence:
1. My Skills (magnet) → ✅ Works (if clicked on plane)
2. GitHub (tape) → ❌ Zoom back (clicked on tape, no action)
3. Workspace (tape) → ✅ Works (if clicked on plane)
4. Contact Me (pin) → ✅ Works (if clicked on plane)
5. My Brain (pin) → ❌ Zoom back (clicked on pin, no action)
```

### After Fix ✅
```
Navigation sequence:
1. My Skills (magnet) → ✅ Works (action set correctly)
2. GitHub (tape) → ✅ Works (action set correctly)
3. Workspace (tape) → ✅ Works (action set correctly)
4. Contact Me (pin) → ✅ Works (action set correctly)
5. My Brain (pin) → ✅ Works (action set correctly)
```

## Key Insight

**Order matters when using spread operator!**

```javascript
// ❌ WRONG: Copying empty object
const child.userData = { ...parent.userData };  // parent.userData is {}
parent.userData = { action: 'openLink' };       // Set AFTER copying

// ✅ CORRECT: Copying filled object
parent.userData = { action: 'openLink' };       // Set FIRST
const child.userData = { ...parent.userData };  // Copy AFTER setting
```

## Debug Logs

The console logs will now show:
```
[focusOnObject] Called with: {
  action: "openLink",  ✅ Not undefined anymore!
  url: "https://github.com"
}
[focusOnObject] Using memo offset  ✅ Correct offset!
```

## Testing Checklist

- [x] All 5 memos have `action: 'openLink'` in userData
- [x] All fasteners (pin/tape/magnet) have complete userData
- [x] Navigation works for all memos
- [x] No zoom back issues
- [x] Camera focuses correctly on each memo

This was a subtle timing bug - the spread operator copied an empty object before it was filled! 🐛
