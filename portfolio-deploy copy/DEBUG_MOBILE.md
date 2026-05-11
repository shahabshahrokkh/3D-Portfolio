# Debug Mobile Issue

## How to Debug on Mobile

### Option 1: Chrome Remote Debugging (Android)
1. Connect Android device via USB
2. Enable USB debugging on phone
3. Open Chrome on desktop → `chrome://inspect`
4. Select your device and click "Inspect"
5. Console will show mobile logs

### Option 2: Safari Web Inspector (iOS)
1. Connect iPhone/iPad via USB
2. Enable Web Inspector: Settings → Safari → Advanced → Web Inspector
3. Open Safari on Mac → Develop → [Your Device] → [Your Page]
4. Console will show mobile logs

### Option 3: On-Screen Console (Easiest)
Add this to see logs on mobile screen:
```javascript
// Add to main.js temporarily
const consoleDiv = document.createElement('div');
consoleDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;max-height:200px;overflow:auto;background:rgba(0,0,0,0.9);color:#0f0;font-size:10px;z-index:9999;padding:5px;';
document.body.appendChild(consoleDiv);

const oldLog = console.log;
console.log = function(...args) {
  oldLog.apply(console, args);
  consoleDiv.innerHTML += args.join(' ') + '<br>';
  consoleDiv.scrollTop = consoleDiv.scrollHeight;
};
```

## What to Look For

### Test 1: First Tap on Memo
Expected logs:
```
[handleClick] Processing click: {isTouchEvent: true, now: ...}
[handleClick] Action: openLink URL: https://...
[openLink] Called with: https://...
[openLink] isZoomed: false
[openLink] First click - zooming
```

If you see:
```
[openLink] isZoomed: true  ❌ (should be false on first tap!)
[openLink] Second click - opening link  ❌
```
Then the WeakMap state is wrong!

### Test 2: Second Tap on Same Memo
Expected logs:
```
[handleClick] Processing click: {isTouchEvent: true, now: ...}
[handleClick] Action: openLink URL: https://...
[openLink] Called with: https://...
[openLink] isZoomed: true  ✅
[openLink] Second click - opening link  ✅
```

### Test 3: Rapid Taps (< 300ms apart)
Expected logs:
```
[handleClick] Processing click: {isTouchEvent: true, now: 1000}
[handleClick] Debounced - too soon after last click  ✅
```

## Common Issues

### Issue 1: Link Opens on First Tap
**Symptom**: `isZoomed: true` on first tap

**Possible Causes**:
1. WeakMap not working correctly
2. Object reference changing
3. Debounce time too long (state resets before second tap)

**Solution**: Check if `targetGroup` is same object reference

### Issue 2: Debounce Blocking Second Tap
**Symptom**: Second tap shows "Debounced" message

**Possible Causes**:
1. CLICK_DEBOUNCE (300ms) too long
2. User tapping too fast

**Solution**: Reduce debounce to 200ms for mobile

### Issue 3: Navigation Buttons Not Working
**Symptom**: Buttons don't respond to taps

**Possible Causes**:
1. z-index too low
2. pointer-events: none
3. Button too small for touch

**Solution**: Check button size (should be 36px+ on mobile)

## Send Me These Logs

Please test on mobile and send me:

1. **First tap on memo** - all console logs
2. **Second tap on same memo** - all console logs
3. **Tap navigation button** - all console logs

This will help me identify the exact issue!

## Temporary Fix to Try

If link opens on first tap, try increasing debounce:

In `raycaster.js`:
```javascript
const CLICK_DEBOUNCE = 500; // Increase from 300 to 500
```

In `hotspots.js` openLink timeout:
```javascript
setTimeout(() => {
  // ...
}, 10000); // Increase from 5000 to 10000 (10 seconds)
```

This gives more time between taps.
