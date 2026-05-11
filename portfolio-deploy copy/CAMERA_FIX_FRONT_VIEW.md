# اصلاح نمای دوربین برای تخت گربه و قفسه دیواری

## مشکل
دوربین بعد از کلیک روی تخت گربه و قفسه دیواری از کنار نمایش می‌داد، در حالی که باید از روبرو نمایش دهد.

## راه‌حل
تغییرات زیر در فایل‌های مربوطه اعمال شد:

### 1. فایل: `src/interactions/cameraTransitions.js`
- منطق تشخیص نوع شیء بر اساس نام آن اضافه شد
- برای `shelves` و `cat`/`bed` که روی دیوار چپ قرار دارند، offset دوربین به سمت مثبت X تنظیم شد
- این باعث می‌شود دوربین از روبرو (جلوی اتاق) به این اشیاء نگاه کند

```javascript
if (objectName === 'shelves') {
  // قفسه دیواری - دوربین از جلو (مثبت X)
  offset = new THREE.Vector3(maxDim * 2.5, maxDim * 0.5, 0);
} else if (objectName === 'cat' || objectName === 'bed') {
  // تخت گربه - دوربین از جلو (مثبت X)
  offset = new THREE.Vector3(maxDim * 2.5, maxDim * 0.8, 0);
}
```

### 2. فایل: `src/interactions/hotspots.js`
- تابع `playCatAnimation` به‌روزرسانی شد تا شیء را به `focusOnObject` ارسال کند
- تابع `openAbout` (برای تخت) به‌روزرسانی شد تا شیء را به `focusOnObject` ارسال کند

```javascript
playCatAnimation: (object) => {
  showUI('Meow! 🐱');
  if (object) {
    focusOnObject(object);
  }
  window.dispatchEvent(new CustomEvent('triggerCatAction'));
},

openAbout: (object) => {
  showUI('About Me - Coming Soon!');
  if (object) {
    focusOnObject(object);
  }
},
```

## نتیجه
حالا وقتی روی تخت گربه یا قفسه دیواری کلیک می‌شود، دوربین از روبرو (از داخل اتاق) به آن‌ها نگاه می‌کند، نه از کنار.

## توضیحات فنی
- اشیاء روی دیوار چپ در موقعیت X منفی قرار دارند (مثلاً `-6.0` یا `-7.15`)
- با استفاده از offset مثبت X، دوربین به سمت مرکز اتاق (X مثبت‌تر) حرکت می‌کند
- این باعث می‌شود دوربین از روبرو به اشیاء نگاه کند

## یادداشت
تغییرات مربوط به بهبود تاچ در موبایل برگردانده شدند تا از تداخل با کلیک‌های معمولی جلوگیری شود.
کد به حالت اصلی و کارآمد خود برگشته است.

