# Debug Camera Zoom Issue

## Problem
وقتی روی دکمه‌های navigation کلیک می‌کنید:
- Index 0 (My Skills) → ✅ کار می‌کنه
- Index 1 (GitHub) → ❌ دوربین zoom back می‌کنه
- Index 2 (Workspace) → ✅ کار می‌کنه
- Index 3 (Contact Me) → ✅ کار می‌کنه
- Index 4 (My Brain) → ❌ دوربین zoom back می‌کنه

## Debug Steps

### 1. Open Browser Console (F12)

### 2. Click on First Memo
باید ببینید:
```
[registerMemos] Registered memos: 5
  [0]: https://reactjs.org
  [1]: https://github.com
  [2]: https://linkedin.com
  [3]: mailto:Shahabshahrokhh@gmail.com
  [4]: #
```

### 3. Click Next Button Multiple Times
برای هر کلیک باید ببینید:

```
[navigateMemos] Before: {currentMemoIndex: X, direction: 1, totalMemos: 5}
[navigateMemos] After: {currentMemoIndex: Y}
[navigateMemos] Memo object: Group {...}
[navigateMemos] URL: https://...

[focusOnObject] Called with: {
  object: Group,
  name: undefined or "",
  action: "openLink" or undefined,
  url: "https://..." or undefined,
  hasParentGroup: true or false
}

[focusOnObject] Bounding box: {
  center: [x, y, z],
  size: [width, height, depth],
  maxDim: number
}

[focusOnObject] Using memo offset (or default offset)

[focusOnObject] Camera target: {
  controlTarget: [x, y, z],
  cameraPosition: [x, y, z]
}
```

## What to Look For

### For Working Memos (0, 2, 3)
```
[focusOnObject] Called with: {
  action: "openLink",  ✅
  url: "https://..."
}
[focusOnObject] Using memo offset  ✅
```

### For Broken Memos (1, 4)
Probably one of these:
```
[focusOnObject] Called with: {
  action: undefined,  ❌
  url: undefined
}
[focusOnObject] Using default offset  ❌
```

OR

```
[focusOnObject] Bounding box: {
  center: [0, 0, 0],  ❌ Wrong center!
  size: [0, 0, 0],    ❌ No size!
  maxDim: 0
}
```

## Possible Causes

### Cause 1: userData Not Set
If `action: undefined`, it means the memo group's `userData` is not set correctly.

**Check in memos.js:**
```javascript
group.userData = {
  action: 'openLink',
  url: config.url,
  isPlaceholder: false,
  isInteractableGroup: true
};
```

### Cause 2: Empty Group
If `size: [0, 0, 0]`, it means the group has no children or children are not added yet.

**Check in memos.js:**
```javascript
group.add(plane);  // Must be added BEFORE returning
group.add(pinSphere);
// etc.
```

### Cause 3: Wrong Object Reference
If the memo object in `memoObjects` array is not the actual group.

**Check in initMemos:**
```javascript
const memo = await createMemo(m);
scene.add(memo);
memoObjects.push(memo);  // Must push the returned group
```

## Send Me Console Output

Please copy the console output for:
1. When you click Next to go to GitHub (index 1)
2. When you click Next to go to My Brain (index 4)

Focus on the `[focusOnObject]` logs - they will show what's wrong!

## Expected vs Actual

### Expected (Working)
```
[navigateMemos] After: {currentMemoIndex: 1}
[navigateMemos] URL: https://github.com

[focusOnObject] Called with: {
  action: "openLink",
  url: "https://github.com"
}
[focusOnObject] Bounding box: {
  center: [0.4, 2.6, -7.185],
  size: [0.3, 0.3, 0.01],
  maxDim: 0.3
}
[focusOnObject] Using memo offset
[focusOnObject] Camera target: {
  cameraPosition: [0.4, 2.69, -6.585]
}
```

### Actual (Broken)
```
[navigateMemos] After: {currentMemoIndex: 1}
[navigateMemos] URL: https://github.com

[focusOnObject] Called with: {
  action: undefined,  ❌
  url: undefined
}
[focusOnObject] Using default offset  ❌
```

The console will tell us exactly what's wrong!
