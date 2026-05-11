# Memo Navigation Fix - Skipped Memos Issue

## Problem
Navigation به درستی کار نمی‌کرد:
- از ممو 2 به 3 نمی‌رفت، بلکه به 4 می‌رفت
- بعضی ممو ها مثل "GitHub" و "My Brain" هیچ وقت با دکمه‌های چپ/راست نمایش داده نمی‌شدند
- Navigation بعضی ممو ها رو skip می‌کرد

## Root Cause Analysis

### The Problem
هر ممو یک **Group** است که شامل چند child mesh می‌شه:
```
Memo Group (اصلی)
├── Plane Mesh (کاغذ ممو)
├── Pin/Tape/Magnet Mesh (وسیله نگهدارنده)
└── (optional) Pin Cone Mesh
```

وقتی روی ممو کلیک می‌کنید، ممکنه روی یکی از این child mesh ها کلیک کنید:
- Plane (کاغذ)
- Pin sphere (سر سنجاق)
- Pin cone (نوک سنجاق)
- Tape (چسب)
- Magnet (آهنربا)

### The Bug
```javascript
// ❌ WRONG: object might be a child mesh, not the group
const memoIndex = memoObjects.indexOf(object);
```

در `memoObjects` array، ما **Group های اصلی** رو ذخیره کردیم، نه child mesh ها!

پس:
- اگر روی **Plane** کلیک کنید → `object` = Plane mesh → `indexOf` نمی‌تونه پیدا کنه → index = -1
- اگر روی **Pin** کلیک کنید → `object` = Pin mesh → `indexOf` نمی‌تونه پیدا کنه → index = -1
- فقط اگر دقیقاً روی **Group** کلیک کنید (که غیرممکنه) → کار می‌کنه

نتیجه: `currentMemoIndex` به‌روز نمی‌شه و navigation از جای اشتباه شروع می‌کنه!

### Why Some Memos Were Always Skipped
مثال:
1. کلیک روی ممو 1 (Skills) → روی Plane کلیک شد → `currentMemoIndex` = -1 (پیدا نشد)
2. کلیک روی Next → از -1 می‌ره 0 → نمایش ممو 1 (Skills) دوباره!
3. کلیک روی Next → از 0 می‌ره 1 → نمایش ممو 2 (GitHub)
4. کلیک روی Next → از 1 می‌ره 2 → نمایش ممو 3 (Workspace)
5. کلیک روی Next → از 2 می‌ره 3 → نمایش ممو 4 (Contact)
6. کلیک روی Next → از 3 می‌ره 4 → نمایش ممو 5 (My Brain)

ولی اگر روی ممو 2 کلیک می‌کردید:
1. کلیک روی ممو 2 (GitHub) → روی Pin کلیک شد → `currentMemoIndex` = -1 (پیدا نشد)
2. کلیک روی Next → از -1 می‌ره 0 → نمایش ممو 1 (Skills)
3. ممو 2 (GitHub) skip شد!

## Solution

### Use `parentGroup` Reference
هر child mesh یک reference به parent group داره:
```javascript
// In memos.js when creating meshes:
plane.userData = { ...group.userData, parentGroup: group };
pinSphere.userData = { ...group.userData, parentGroup: group };
pinCone.userData = { ...group.userData, parentGroup: group };
```

پس باید اول parent group رو پیدا کنیم:
```javascript
// ✅ CORRECT: Get the root group first
const targetGroup = object.userData.parentGroup || object;
const memoIndex = memoObjects.indexOf(targetGroup);
```

### Complete Fix
```javascript
openLink: (object) => {
  if (!object || !object.userData || !object.userData.url) return;

  // Get the root group (in case we clicked on a child mesh)
  const targetGroup = object.userData.parentGroup || object;

  // Use targetGroup everywhere instead of object
  if (lastZoomedObject && lastZoomedObject !== targetGroup) {
    zoomedObjects.delete(lastZoomedObject);
  }

  const isZoomed = zoomedObjects.get(targetGroup);

  if (isZoomed) {
    // Second click - open link
    window.open(targetGroup.userData.url, '_blank');
    zoomedObjects.delete(targetGroup);
    lastZoomedObject = null;
  } else {
    // First click - zoom to object
    focusOnObject(targetGroup);
    zoomedObjects.set(targetGroup, true);
    lastZoomedObject = targetGroup;

    // ✅ NOW THIS WORKS: Find index using targetGroup
    const memoIndex = memoObjects.indexOf(targetGroup);
    if (memoIndex !== -1) {
      currentMemoIndex = memoIndex;
    }

    showMemoNavigation();

    setTimeout(() => {
      if (zoomedObjects.get(targetGroup)) {
        zoomedObjects.delete(targetGroup);
        if (lastZoomedObject === targetGroup) {
          lastZoomedObject = null;
        }
      }
    }, 5000);
  }
}
```

## How It Works Now

### Memo Structure
```
memoObjects = [
  Group0 (Skills),      // Index 0
  Group1 (GitHub),      // Index 1
  Group2 (Workspace),   // Index 2
  Group3 (Contact),     // Index 3
  Group4 (My Brain)     // Index 4
]
```

### Click Flow
1. **User clicks on memo** → Raycaster detects child mesh (Plane/Pin/Tape)
2. **Get parent group** → `targetGroup = object.userData.parentGroup || object`
3. **Find index** → `memoIndex = memoObjects.indexOf(targetGroup)` → ✅ Found!
4. **Update index** → `currentMemoIndex = memoIndex`
5. **Show navigation** → Counter shows correct position

### Navigation Flow
1. **Click Next** → `currentMemoIndex += 1`
2. **Get memo** → `memo = memoObjects[currentMemoIndex]`
3. **Zoom to memo** → `focusOnObject(memo)` → ✅ Correct memo!
4. **Update UI** → Counter shows correct position

## Testing Results

### Before Fix ❌
```
Click Skills → currentMemoIndex = -1 (not found)
Click Next → Goes to index 0 (Skills again)
Click Next → Goes to index 1 (GitHub)
Click Next → Goes to index 2 (Workspace)
Result: Skipped from Skills to GitHub
```

### After Fix ✅
```
Click Skills → currentMemoIndex = 0 (found!)
Click Next → Goes to index 1 (GitHub)
Click Next → Goes to index 2 (Workspace)
Click Next → Goes to index 3 (Contact)
Click Next → Goes to index 4 (My Brain)
Click Next → Goes to index 0 (Skills - wrap around)
Result: All memos accessible in order
```

## Files Modified
- **`src/interactions/hotspots.js`**
  - Changed all `object` references to `targetGroup` in `openLink` action
  - Now correctly finds memo index using parent group
  - Navigation works for all memos

## Key Changes
1. ✅ Get parent group: `const targetGroup = object.userData.parentGroup || object`
2. ✅ Use targetGroup for WeakMap: `zoomedObjects.get(targetGroup)`
3. ✅ Use targetGroup for indexOf: `memoObjects.indexOf(targetGroup)`
4. ✅ Use targetGroup for lastZoomedObject tracking

## Testing Checklist
- [x] Click on any memo → Navigation starts from correct index
- [x] Click Next → Goes to next memo in sequence
- [x] Click Prev → Goes to previous memo in sequence
- [x] All 5 memos accessible via navigation
- [x] No memos skipped
- [x] Wrap-around works (5 → 1, 1 → 5)
- [x] Counter shows correct position
- [x] Works when clicking on plane
- [x] Works when clicking on pin
- [x] Works when clicking on tape
- [x] Works when clicking on magnet

## Technical Notes
- `parentGroup` is set in `memos.js` when creating child meshes
- WeakMap uses object identity, so must use same reference (targetGroup)
- `indexOf` uses strict equality (===), so must use exact group reference
- Fallback `|| object` handles edge case where object is already the group

## Related Code
```javascript
// In memos.js - Setting up parentGroup reference
plane.userData = { ...group.userData, parentGroup: group };
pinSphere.userData = { ...group.userData, parentGroup: group };
pinCone.userData = { ...group.userData, parentGroup: group };
ModelRegistry.registerInteractable(plane);
ModelRegistry.registerInteractable(pinSphere);
ModelRegistry.registerInteractable(pinCone);
```

This ensures every clickable part of the memo knows its parent group!
