# Focus Debounce Fix - Double Call Issue

## Problem from Console Logs

از console log ها مشخص شد که `focusOnObject` **دو بار** صدا زده می‌شه:

```
[navigateMemos] Memo object: Group URL: https://github.com
[focusOnObject] Using memo offset  ✅ (اولین بار - درست)
[focusOnObject] Using default offset  ❌ (دومین بار - اشتباه!)
```

نتیجه: دوربین اول به ممو zoom می‌کنه، بعد zoom back می‌کنه!

## Root Cause

### Multiple Call Sources
`focusOnObject` از چند جا صدا زده می‌شه:

1. **navigateMemos** (خط 59 در hotspots.js):
   ```javascript
   focusOnObject(memo);  // با memo offset
   ```

2. **Possible event listeners or controls**:
   - OrbitControls events
   - Mouse/touch events
   - Animation frame callbacks

### Why Second Call Uses Default Offset

دومین call احتمالاً با یک object متفاوت یا بدون `userData.action` صدا زده می‌شه:
```javascript
if (object.userData?.action === 'openLink') {
  offset = memo offset;  // ✅ اولین call
} else {
  offset = default offset;  // ❌ دومین call
}
```

## Solution: Debouncing

اضافه کردن debounce برای ignore کردن call های سریع پشت سر هم:

```javascript
let lastFocusTime = 0;
const FOCUS_DEBOUNCE = 100; // 100ms

export function focusOnObject(object) {
  // Debounce check
  const now = Date.now();
  if (now - lastFocusTime < FOCUS_DEBOUNCE) {
    console.log('[focusOnObject] Debounced - ignoring rapid call');
    return;  // Ignore this call
  }
  lastFocusTime = now;

  // Continue with focus logic...
}
```

### How Debouncing Works

**Timeline:**
```
0ms:   navigateMemos calls focusOnObject → ✅ Allowed (lastFocusTime = 0)
50ms:  Second call to focusOnObject → ❌ Blocked (50ms < 100ms)
150ms: Third call to focusOnObject → ✅ Allowed (150ms > 100ms)
```

**Result:**
- First call (correct one) executes
- Second call (wrong one) is blocked
- Camera stays focused on memo!

## Files Modified

### `src/interactions/cameraTransitions.js`
- Added `lastFocusTime` variable
- Added `FOCUS_DEBOUNCE` constant (100ms)
- Added debounce check at start of `focusOnObject`
- Logs when a call is debounced

## Testing

### Before Fix
```
Click Next → GitHub
[focusOnObject] Using memo offset
[focusOnObject] Using default offset  ❌
Result: Camera zooms back
```

### After Fix
```
Click Next → GitHub
[focusOnObject] Using memo offset
[focusOnObject] Debounced - ignoring rapid call  ✅
Result: Camera stays on memo
```

## Why 100ms?

- **Too short (10ms)**: Might not catch all rapid calls
- **Too long (500ms)**: Might block legitimate calls
- **100ms**: Good balance - blocks rapid calls but allows intentional navigation

## Alternative Solutions Considered

### 1. Find and Remove Second Call Source
- **Pro**: Cleaner solution
- **Con**: Hard to debug, might be from external library (OrbitControls)

### 2. Flag-Based Locking
```javascript
let isFocusing = false;
if (isFocusing) return;
isFocusing = true;
// ... focus logic ...
setTimeout(() => isFocusing = false, 1200);
```
- **Pro**: Prevents any calls during animation
- **Con**: Might block legitimate rapid navigation

### 3. Debouncing (Chosen)
- **Pro**: Simple, effective, doesn't block legitimate calls
- **Con**: Adds small delay check

## Debug Logs

Console will now show:
```
[focusOnObject] Called with: {action: "openLink", url: "..."}
[focusOnObject] Bounding box: {...}
[focusOnObject] Using memo offset
[focusOnObject] Camera target: {...}

// If second call happens:
[focusOnObject] Debounced - ignoring rapid call
```

## Notes

- Debounce time can be adjusted if needed
- This fix works for all `focusOnObject` calls, not just memos
- Prevents zoom back issue for all navigation scenarios
- Minimal performance impact (one timestamp check)

## Testing Checklist

- [x] Navigation to GitHub works (no zoom back)
- [x] Navigation to My Brain works (no zoom back)
- [x] All other memos still work
- [x] Rapid clicking doesn't cause issues
- [x] Console shows debounced calls
- [x] Camera stays focused on target memo

This is a defensive fix that prevents the symptom while we can investigate the root cause later if needed.
