# 🚀 شروع سریع - بهینه‌سازی موبایل

## ✅ تغییرات اعمال شده

پروژه شما **اکنون بهینه برای موبایل است**! تغییرات زیر به صورت خودکار اعمال شده‌اند:

### 🎯 بهینه‌سازی‌های خودکار
- ✅ تشخیص دستگاه موبایل
- ✅ غیرفعال کردن shadows در موبایل
- ✅ کاهش pixel ratio برای عملکرد بهتر
- ✅ تنظیمات دوربین بهینه
- ✅ کنترل‌های لمسی بهینه
- ✅ UI کاملاً ریسپانسیو

## 🧪 تست کنید!

### روش 1: تست در مرورگر (سریع)
```bash
npm run dev
```

سپس در مرورگر:
1. `F12` - باز کردن DevTools
2. `Ctrl+Shift+M` - فعال کردن Device Toolbar
3. انتخاب یک دستگاه موبایل (مثلاً iPhone 12)
4. `F5` - رفرش صفحه

### روش 2: تست در موبایل واقعی (توصیه می‌شود)
```bash
npm run build
npm run preview
```

سپس:
1. IP آدرس نمایش داده شده را یادداشت کنید
2. در موبایل خود به آن آدرس بروید
3. تمام ویژگی‌ها را تست کنید

## 📱 چه چیزی باید تست کنید؟

### کنترل‌ها
- [ ] چرخش صحنه با یک انگشت
- [ ] Zoom با دو انگشت (pinch)
- [ ] Pan با دو انگشت
- [ ] دکمه Reset View

### UI
- [ ] Loading screen
- [ ] Control panel در گوشه پایین راست
- [ ] Arcade overlay
- [ ] Projects overlay (کلیک روی laptop)
- [ ] Contact overlay (کلیک روی iPhone)

### عملکرد
- [ ] صفحه روان است (بدون lag)
- [ ] بارگذاری سریع است
- [ ] دستگاه داغ نمی‌شود

## 🎨 تنظیمات (اختیاری)

اگر می‌خواهید تنظیمات را شخصی‌سازی کنید:

### تغییر کیفیت گرافیک
در `src/scene/setup.js` خط 36:
```javascript
// کیفیت پایین‌تر (عملکرد بهتر)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));

// کیفیت بالاتر (گرافیک بهتر)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 2 : 2));
```

### فعال کردن Shadows در موبایل
در `src/scene/setup.js` خط 37:
```javascript
// فعال کردن shadows (مصرف بیشتر باتری)
renderer.shadowMap.enabled = true;
```

### تغییر فاصله دوربین
در `src/scene/setup.js` خط 25:
```javascript
// نزدیک‌تر
camera.position.set(isMobile ? 4 : 4, isMobile ? 3 : 3, isMobile ? 6 : 6);

// دورتر
camera.position.set(isMobile ? 6 : 4, isMobile ? 5 : 3, isMobile ? 10 : 6);
```

## 📚 مستندات بیشتر

- **MOBILE_SUMMARY.md** - خلاصه کامل تغییرات
- **MOBILE_OPTIMIZATION.md** - راهنمای جامع فارسی
- **TEST_MOBILE.md** - چک‌لیست تست کامل
- **src/main-mobile-example.js** - مثال کد پیشرفته

## 🐛 مشکل دارید؟

### عملکرد پایین
```javascript
// در src/scene/setup.js خط 36
renderer.setPixelRatio(1); // کاهش کیفیت
```

### UI خیلی کوچک
```css
/* در style.css */
@media (max-width: 768px) {
  body { font-size: 18px !important; }
}
```

### کنترل‌ها کار نمی‌کنند
- مطمئن شوید که در دستگاه واقعی تست می‌کنید
- DevTools را ببندید و دوباره باز کنید
- صفحه را رفرش کنید

## ✨ ویژگی‌های پیشرفته (اختیاری)

اگر می‌خواهید از ویژگی‌های پیشرفته استفاده کنید:

### 1. استفاده از ابزارهای تشخیص
```javascript
import { isMobileDevice, getDeviceType } from './utils/mobileDetect.js';

if (isMobileDevice()) {
  console.log('در حال اجرا در موبایل');
}
```

### 2. بارگذاری مدل‌های مختلف
```javascript
const modelPath = isMobileDevice() 
  ? '/models/low-poly.glb'  // مدل سبک برای موبایل
  : '/models/high-poly.glb'; // مدل با کیفیت برای دسکتاپ
```

### 3. تنظیم تعداد ذرات
```javascript
const particleCount = isMobileDevice() ? 100 : 1000;
```

## 🎉 تمام!

پروژه شما آماده است! فقط کافی است:

1. ✅ تست کنید
2. ✅ در صورت نیاز تنظیمات را تغییر دهید
3. ✅ Deploy کنید

**موفق باشید! 🚀**

---

**نکته**: برای اطلاعات بیشتر، `MOBILE_SUMMARY.md` را بخوانید.
