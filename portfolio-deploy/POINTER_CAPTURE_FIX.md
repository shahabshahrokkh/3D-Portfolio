# 🔧 رفع خطای Pointer Capture

## ❌ خطا

```
Uncaught DOMException: Element.releasePointerCapture: Invalid pointer id
at onPointerUp OrbitControls.js:1047
```

## 🎯 علت

این خطا زمانی رخ می‌دهد که:
1. **OrbitControls** و **DragControls** هر دو روی `renderer.domElement` event listener دارند
2. در موبایل، touch events با pointer events تداخل می‌کنند
3. OrbitControls سعی می‌کند pointer را release کند که قبلاً capture نشده

## ✅ راه‌حل‌های اعمال شده

### 1️⃣ تنظیم Touch Mapping در OrbitControls

**فایل**: `src/scene/setup.js`

```javascript
if (isMobile) {
  controls.rotateSpeed = 0.5;
  controls.zoomSpeed = 0.8;
  controls.panSpeed = 0.5;
  controls.enablePan = true;
  
  // Fix pointer capture issue on mobile
  controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
  };
}
```

**توضیح**: این کد به OrbitControls می‌گوید که:
- با **یک انگشت**: فقط rotate کند
- با **دو انگشت**: zoom و pan کند

---

### 2️⃣ استفاده از stopPropagation در DragControls

**فایل**: `src/interactions/dragControls.js`

```javascript
const onTouchStart = (event) => {
  if (event.touches.length === 1) {
    const touch = event.touches[0];
    const started = startDrag(touch.clientX, touch.clientY);
    if (started) {
      event.preventDefault();
      event.stopPropagation(); // جلوگیری از رسیدن به OrbitControls
    }
  }
};
```

**توضیح**: 
- `preventDefault()`: جلوگیری از scroll
- `stopPropagation()`: جلوگیری از رسیدن event به OrbitControls

---

### 3️⃣ استفاده از Capture Phase

```javascript
// DragControls با capture phase
window.addEventListener('touchstart', onTouchStart, { 
  capture: true,  // اول DragControls event را می‌گیرد
  passive: false 
});

// OrbitControls بعد از DragControls event را می‌گیرد
```

**توضیح**: با `capture: true`، DragControls اول event را می‌گیرد و اگر drag شروع شد، با `stopPropagation()` جلوی رسیدن به OrbitControls را می‌گیرد.

---

## 🧪 تست

### قبل از Fix:
```
❌ کلیک روی صندلی → خطای pointer capture
❌ Drag صندلی → خطای pointer capture
❌ Console پر از error
```

### بعد از Fix:
```
✅ کلیک روی صندلی → بدون خطا
✅ Drag صندلی → روان و بدون خطا
✅ Rotate با یک انگشت → کار می‌کند
✅ Zoom با دو انگشت → کار می‌کند
✅ Console تمیز
```

---

## 📊 نحوه کار

### سناریو 1: Drag صندلی
```
1. کاربر touch می‌کند
2. onTouchStart فراخوانی می‌شود
3. startDrag() چک می‌کند → صندلی است؟
4. اگر بله:
   - event.preventDefault()
   - event.stopPropagation()
   - OrbitControls event را نمی‌گیرد ✓
5. اگر نه:
   - event به OrbitControls می‌رسد
   - Rotate کار می‌کند ✓
```

### سناریو 2: Rotate دوربین
```
1. کاربر touch می‌کند (نه روی صندلی)
2. onTouchStart فراخوانی می‌شود
3. startDrag() چک می‌کند → صندلی نیست
4. event.stopPropagation() فراخوانی نمی‌شود
5. event به OrbitControls می‌رسد
6. Rotate کار می‌کند ✓
```

### سناریو 3: Zoom با دو انگشت
```
1. کاربر با دو انگشت touch می‌کند
2. onTouchStart چک می‌کند → touches.length === 2
3. هیچ کاری نمی‌کند
4. event به OrbitControls می‌رسد
5. Zoom کار می‌کند ✓
```

---

## 🐛 عیب‌یابی

### اگر هنوز خطا دارید:

#### 1. بررسی Console
```javascript
// در onTouchStart اضافه کنید:
console.log('Touch start:', event.touches.length, 'dragging:', isDragging);
```

#### 2. بررسی Event Listeners
```javascript
// در console تایپ کنید:
getEventListeners(document)
```

#### 3. غیرفعال کردن موقت OrbitControls
```javascript
// در setup.js:
controls.enabled = false; // موقتاً غیرفعال کنید
```

اگر خطا رفت، مشکل از تداخل است.

#### 4. بررسی Three.js Version
```bash
npm list three
```

مطمئن شوید نسخه 0.160.0 یا بالاتر است.

---

## 💡 نکات مهم

### 1. ترتیب Event Listeners مهم است
```javascript
// ❌ اشتباه
window.addEventListener('touchstart', onTouchStart);
// OrbitControls اول event را می‌گیرد

// ✅ درست
window.addEventListener('touchstart', onTouchStart, { capture: true });
// DragControls اول event را می‌گیرد
```

### 2. همیشه stopPropagation استفاده کنید
```javascript
// ❌ اشتباه
if (started) {
  event.preventDefault();
}

// ✅ درست
if (started) {
  event.preventDefault();
  event.stopPropagation(); // مهم!
}
```

### 3. فقط در صورت نیاز preventDefault کنید
```javascript
// ❌ اشتباه - همیشه
event.preventDefault();

// ✅ درست - فقط اگر drag شروع شد
if (started) {
  event.preventDefault();
}
```

---

## 🔍 کدهای مرتبط

### setup.js (خط 43-58)
```javascript
const controls = new OrbitControls(camera, renderer.domElement);
// ... تنظیمات
if (isMobile) {
  controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
  };
}
```

### dragControls.js (خط 180-195)
```javascript
const onTouchStart = (event) => {
  if (event.touches.length === 1) {
    const started = startDrag(touch.clientX, touch.clientY);
    if (started) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
};
```

### dragControls.js (خط 215-220)
```javascript
window.addEventListener('touchstart', onTouchStart, { 
  capture: true, 
  passive: false 
});
```

---

## ✅ چک‌لیست

برای مطمئن شدن که fix کار می‌کند:

- [ ] خطای pointer capture در console نیست
- [ ] Drag صندلی کار می‌کند
- [ ] Rotate با یک انگشت کار می‌کند
- [ ] Zoom با دو انگشت کار می‌کند
- [ ] Pan با دو انگشت کار می‌کند
- [ ] هیچ تداخلی بین drag و rotate نیست

---

## 📚 منابع

- [Three.js OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)
- [Pointer Events API](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)
- [Event.stopPropagation()](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)
- [Event Capture Phase](https://javascript.info/bubbling-and-capturing)

---

**مشکل برطرف شد! ✅**
