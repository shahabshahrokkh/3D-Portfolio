# 🗑️ حذف Glow Ring از آرکید

## ❌ قبل
دایره صورتی/بنفش زیر دستگاه آرکید با انیمیشن pulse (چشمک زدن) نمایش داده می‌شد.

## ✅ بعد
Glow ring کاملاً حذف شد.

---

## 🎯 کاربرد قبلی

### Glow Ring چه بود؟
```javascript
// یک دایره رنگی زیر آرکید
const glowGeo = new THREE.RingGeometry(0.4, 0.6, 32);
const glowMat = new THREE.MeshBasicMaterial({
  color: 0xff00ff,      // صورتی/بنفش
  transparent: true,
  opacity: 0.4,
  side: THREE.DoubleSide,
  depthWrite: false,
});
```

### انیمیشن
```javascript
// Pulse animation (چشمک زدن)
ring.material.opacity = 0.2 + Math.abs(Math.sin(time * 2)) * 0.4;
const ps = 1 + Math.sin(time * 2.5) * 0.08;
ring.scale.set(ps, ps, 1);
```

### هدف
- **جلب توجه**: نشان می‌داد که آرکید قابل تعامل است
- **Visual feedback**: راهنمای بصری برای کاربر
- **Decoration**: زیبایی بصری

---

## 🔧 تغییرات

### 1️⃣ حذف ایجاد Glow Ring
```javascript
// قبل ❌
const glowGeo = new THREE.RingGeometry(0.4, 0.6, 32);
const glowMat = new THREE.MeshBasicMaterial({
  color: 0xff00ff,
  transparent: true,
  opacity: 0.4,
  side: THREE.DoubleSide,
  depthWrite: false,
});
const glowRing = new THREE.Mesh(glowGeo, glowMat);
glowRing.rotation.x = -Math.PI / 2;
glowRing.position.y = 0.01;
wrapper.add(glowRing);
wrapper.userData.glowRing = glowRing;

// بعد ✅
// Glow ring removed - no longer needed
```

### 2️⃣ حذف از userData
```javascript
// قبل ❌
wrapper.userData = {
  action: config.action,
  isPlaceholder: false,
  isInteractableGroup: true,
  glowRing,  // ← ذخیره reference
};

// بعد ✅
wrapper.userData = {
  action: config.action,
  isPlaceholder: false,
  isInteractableGroup: true,
  // glowRing حذف شد
};
```

### 3️⃣ حذف انیمیشن
```javascript
// قبل ❌
export function updateArcade(time) {
  updatePreviewCanvas(time);

  if (arcadeGroup?.userData?.glowRing) {
    const ring = arcadeGroup.userData.glowRing;
    ring.material.opacity = 0.2 + Math.abs(Math.sin(time * 2)) * 0.4;
    const ps = 1 + Math.sin(time * 2.5) * 0.08;
    ring.scale.set(ps, ps, 1);
  }
}

// بعد ✅
export function updateArcade(time) {
  updatePreviewCanvas(time);
  
  // Glow ring animation removed
}
```

---

## 📊 مقایسه

### قبل ❌
```
     ┌─────────┐
     │ ARCADE  │
     │ MACHINE │
     └─────────┘
         │
    ╱─────────╲
   │  ◉ Glow  │  ← دایره صورتی با pulse
    ╲─────────╱
```

### بعد ✅
```
     ┌─────────┐
     │ ARCADE  │
     │ MACHINE │
     └─────────┘
         │
    (تمیز - بدون glow)
```

---

## 💡 چرا حذف شد؟

### دلایل احتمالی:
1. **اضافی بودن**: کاربر می‌داند آرکید قابل کلیک است
2. **حواس‌پرتی**: دایره چشمک‌زن ممکن است حواس را پرت کند
3. **طراحی تمیزتر**: بدون glow ساده‌تر و تمیزتر است
4. **Performance**: یک انیمیشن کمتر = عملکرد بهتر

---

## ⚡ مزایا

### ✅ Performance
- یک mesh کمتر در صحنه
- یک انیمیشن کمتر در هر frame
- حافظه کمتر (geometry + material)

### ✅ طراحی
- ظاهر تمیزتر
- کمتر حواس‌پرتی
- تمرکز بیشتر روی آرکید

### ✅ کد
- کد ساده‌تر
- کمتر پیچیدگی
- نگهداری راحت‌تر

---

## 🧪 تست

### چک‌لیست
- [x] Glow ring دیگر نمایش داده نمی‌شود
- [x] آرکید هنوز قابل کلیک است
- [x] انیمیشن صفحه آرکید کار می‌کند
- [x] هیچ خطایی وجود ندارد

### دستورات تست
```bash
npm run dev
```

سپس:
1. نگاه کردن به آرکید
2. بررسی عدم وجود دایره صورتی
3. کلیک روی آرکید
4. بررسی عملکرد صحیح

---

## 🔄 بازگرداندن (اگر نیاز شد)

اگر بعداً خواستید glow ring را برگردانید:

### 1. اضافه کردن geometry
```javascript
const glowGeo = new THREE.RingGeometry(0.4, 0.6, 32);
const glowMat = new THREE.MeshBasicMaterial({
  color: 0xff00ff,
  transparent: true,
  opacity: 0.4,
  side: THREE.DoubleSide,
  depthWrite: false,
});
const glowRing = new THREE.Mesh(glowGeo, glowMat);
glowRing.rotation.x = -Math.PI / 2;
glowRing.position.y = 0.01;
wrapper.add(glowRing);
wrapper.userData.glowRing = glowRing;
```

### 2. اضافه کردن انیمیشن
```javascript
export function updateArcade(time) {
  updatePreviewCanvas(time);

  if (arcadeGroup?.userData?.glowRing) {
    const ring = arcadeGroup.userData.glowRing;
    ring.material.opacity = 0.2 + Math.abs(Math.sin(time * 2)) * 0.4;
    const ps = 1 + Math.sin(time * 2.5) * 0.08;
    ring.scale.set(ps, ps, 1);
  }
}
```

---

## 📝 نکات

### Glow Ring در سایر اشیاء
اگر اشیاء دیگر هم glow ring دارند (مثل صندلی، فضانورد)، می‌توانید آن‌ها را هم حذف کنید:

```javascript
// در helpers_v2.js
if (config.draggable) {
  // ...
  
  // حذف این بخش:
  const ringGeo = new THREE.RingGeometry(...);
  const ringMat = new THREE.MeshBasicMaterial(...);
  const glowRing = new THREE.Mesh(ringGeo, ringMat);
  // ...
}
```

---

## 🚀 نتیجه

**وضعیت**: ✅ **حذف شد**

Glow ring صورتی/بنفش زیر آرکید کاملاً حذف شد:
- ✅ دیگر نمایش داده نمی‌شود
- ✅ انیمیشن pulse حذف شد
- ✅ کد ساده‌تر شد
- ✅ Performance بهتر شد

**تاریخ**: 8 می 2026  
**وضعیت**: تمیز و آماده
