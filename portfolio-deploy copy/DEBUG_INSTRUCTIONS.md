# Debug Instructions for Memo Navigation

## How to Debug

1. **Open the project in browser**
2. **Open Developer Console** (F12 or Right-click → Inspect → Console tab)
3. **Click on a memo** - You should see logs like:
   ```
   [openLink] Finding memo index: {...}
   [openLink] Updated currentMemoIndex to: X
   ```
4. **Click Next/Prev buttons** - You should see logs like:
   ```
   [navigateMemos] Before: {currentMemoIndex: X, direction: 1, totalMemos: 5}
   [navigateMemos] After: {currentMemoIndex: Y}
   [navigateMemos] Memo object: {...}
   ```

## What to Look For

### When Page Loads
```
[registerMemos] Registered memos: 5
  [0]: https://reactjs.org
  [1]: https://github.com
  [2]: https://linkedin.com
  [3]: mailto:Shahabshahrokhh@gmail.com
  [4]: #
```

### When Clicking a Memo
Look for:
- ✅ `memoIndex` should be 0-4 (not -1)
- ✅ `currentMemoIndex` should update
- ❌ If `memoIndex = -1`, the memo is not in the array!

### When Clicking Navigation Buttons
Look for:
- ✅ `currentMemoIndex` should increment/decrement correctly
- ✅ Should wrap around (4 → 0, 0 → 4)
- ✅ Memo object should have correct URL

## Common Issues

### Issue 1: memoIndex = -1
**Symptom**: Console shows `[openLink] Memo not found in memoObjects array!`

**Cause**: The clicked object is not the same reference as in memoObjects

**Solution**: Check if `targetGroup` is correctly getting the parent group

### Issue 2: Navigation skips memos
**Symptom**: Goes from index 1 to 3, skipping 2

**Cause**: `currentMemoIndex` is not being updated correctly on click

**Solution**: Verify the indexOf is finding the correct memo

### Issue 3: Some memos never appear
**Symptom**: Certain memos (like GitHub or My Brain) never show up

**Cause**: Those memos might not be in the memoObjects array

**Solution**: Check the registerMemos log to see all 5 memos

## Send Me the Console Output

Please copy and paste the console output showing:
1. The initial `[registerMemos]` log
2. Logs when you click on a memo
3. Logs when you click Next/Prev buttons

This will help me identify the exact issue!

## Expected Behavior

### Correct Flow
```
1. Click on "Skills" memo:
   [openLink] Finding memo index: {memoIndex: 0, url: "https://reactjs.org"}
   [openLink] Updated currentMemoIndex to: 0

2. Click Next button:
   [navigateMemos] Before: {currentMemoIndex: 0, direction: 1}
   [navigateMemos] After: {currentMemoIndex: 1}
   [navigateMemos] Memo object: {...} URL: https://github.com

3. Click Next button:
   [navigateMemos] Before: {currentMemoIndex: 1, direction: 1}
   [navigateMemos] After: {currentMemoIndex: 2}
   [navigateMemos] Memo object: {...} URL: https://linkedin.com
```

### Incorrect Flow (Bug)
```
1. Click on "Skills" memo:
   [openLink] Finding memo index: {memoIndex: -1, url: "https://reactjs.org"}
   [openLink] Memo not found in memoObjects array!

2. Click Next button:
   [navigateMemos] Before: {currentMemoIndex: -1, direction: 1}
   [navigateMemos] After: {currentMemoIndex: 0}
   (Shows wrong memo)
```

## Temporary Debug Build

The current code has debug logs enabled. After we fix the issue, I'll remove them for production.
