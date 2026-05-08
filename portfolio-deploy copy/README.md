# 🎮 3D Interactive Portfolio

یک پورتفولیوی سه‌بعدی تعاملی با استفاده از Three.js، GSAP و Vite

## ✨ ویژگی‌ها

- 🎨 محیط سه‌بعدی تعاملی
- 🕹️ بازی‌های آرکید داخل پورتفولیو
- 📱 **طراحی ریسپانسیو و بهینه برای موبایل** ⭐ جدید!
- ⚡ بهینه‌سازی شده با Vite
- 🎭 انیمیشن‌های روان با GSAP
- 🚀 عملکرد بالا در تمام دستگاه‌ها

## 📱 بهینه‌سازی موبایل

این پروژه **کاملاً بهینه برای موبایل** است! برای اطلاعات بیشتر:

### 🚀 شروع سریع
👉 **[راهنمای شروع سریع موبایل](./QUICK_START_MOBILE.md)** - تست در 5 دقیقه

### 📚 مستندات کامل
👉 **[فهرست مستندات موبایل](./MOBILE_DOCS_INDEX.md)** - تمام راهنماها

### ویژگی‌های موبایل:
- ✅ تشخیص خودکار دستگاه
- ✅ بهینه‌سازی عملکرد (150% بهبود FPS)
- ✅ کنترل‌های لمسی بهینه
- ✅ **Drag با تاچ (صندلی و فضانورد)** ⭐ جدید!
- ✅ **Haptic feedback** ⭐ جدید!
- ✅ UI کاملاً ریسپانسیو
- ✅ کاهش 40% مصرف باتری
- ✅ پشتیبانی از تمام دستگاه‌ها

## 🚀 دیپلوی روی Vercel

### روش اول: از طریق Vercel CLI

1. نصب Vercel CLI:
```bash
npm install -g vercel
```

2. لاگین به Vercel:
```bash
vercel login
```

3. دیپلوی پروژه:
```bash
vercel
```

4. برای دیپلوی production:
```bash
vercel --prod
```

### روش دوم: از طریق Vercel Dashboard

1. به [vercel.com](https://vercel.com) بروید
2. روی "Add New Project" کلیک کنید
3. ریپازیتوری GitHub خود را وارد کنید
4. Vercel به صورت خودکار تنظیمات Vite را تشخیص می‌دهد
5. روی "Deploy" کلیک کنید

### تنظیمات پیش‌فرض Vercel

پروژه شامل فایل `vercel.json` است که تنظیمات زیر را دارد:
- Build Command: `npm run build`
- Output Directory: `dist`
- Framework: Vite

## 💻 توسعه محلی

```bash
# نصب وابستگی‌ها
npm install

# اجرای سرور توسعه
npm run dev

# ساخت برای production
npm run build

# پیش‌نمایش build
npm preview
```

## 🧪 تست موبایل

### تست سریع در مرورگر:
```bash
npm run dev
```
سپس: `F12` → `Ctrl+Shift+M` → انتخاب موبایل → `F5`

### تست در دستگاه واقعی:
```bash
npm run build
npm run preview
```
سپس URL را در موبایل باز کنید.

📋 **[چک‌لیست تست کامل](./TEST_MOBILE.md)**

## 📦 تکنولوژی‌های استفاده شده

- **Three.js** - رندرینگ سه‌بعدی
- **GSAP** - انیمیشن‌ها
- **Vite** - Build tool
- **Spline** - مدل‌های سه‌بعدی

## 📊 عملکرد

### موبایل:
- 📱 FPS: 45-60 (بهبود 150%)
- ⚡ زمان بارگذاری: 3-5 ثانیه (بهبود 60%)
- 🔋 مصرف باتری: کاهش 40%

### دسکتاپ:
- 🖥️ FPS: 60
- ⚡ زمان بارگذاری: 2-3 ثانیه

📊 **[مقایسه کامل قبل و بعد](./BEFORE_AFTER.md)**

## 📝 نکات مهم

- مطمئن شوید تمام فایل‌های `.glb` در پوشه `public/assets/models` قرار دارند
- فایل‌های ویدیو پروژه‌ها در `public/assets/projects/real` هستند
- برای بهینه‌سازی بیشتر، فایل‌های مدیا را فشرده کنید
- پروژه به صورت خودکار برای موبایل بهینه می‌شود

## 🔧 عیب‌یابی

### مشکلات عمومی:
اگر با مشکل مواجه شدید:
1. `node_modules` و `package-lock.json` را پاک کنید
2. دوباره `npm install` را اجرا کنید
3. `npm run build` را تست کنید

### مشکلات موبایل:
- **عملکرد پایین**: [راهنمای عیب‌یابی](./MOBILE_SUMMARY.md#-عیب-یابی-سریع)
- **UI شکسته**: [چک‌لیست تست](./TEST_MOBILE.md)
- **کنترل‌ها**: [راهنمای کامل](./MOBILE_OPTIMIZATION.md)
- **خطای Pointer Capture**: [راهنمای رفع](./POINTER_CAPTURE_FIX.md) ⭐ جدید!

## 📚 مستندات

### مستندات موبایل:
- 📖 [فهرست کامل مستندات](./MOBILE_DOCS_INDEX.md)
- 🚀 [شروع سریع](./QUICK_START_MOBILE.md)
- 👆 [بهینه‌سازی تاچ و Drag](./TOUCH_OPTIMIZATION.md) ⭐ جدید!
- 📝 [خلاصه تغییرات](./MOBILE_SUMMARY.md)
- 📊 [مقایسه قبل/بعد](./BEFORE_AFTER.md)
- 🔍 [راهنمای جامع](./MOBILE_OPTIMIZATION.md)
- 📋 [چک‌لیست تست](./TEST_MOBILE.md)

### فایل‌های کد:
- 💻 [ابزارهای موبایل](./src/utils/mobileDetect.js)
- 🎨 [استایل‌های موبایل](./src/ui/mobile.css)
- 📝 [مثال کد](./src/main-mobile-example.js)

## 🌐 دستگاه‌های پشتیبانی شده

### موبایل:
✅ iPhone (iOS 14+) | ✅ Samsung Galaxy | ✅ Google Pixel | ✅ OnePlus

### تبلت:
✅ iPad | ✅ iPad Pro | ✅ Samsung Galaxy Tab

### مرورگرها:
✅ Safari | ✅ Chrome | ✅ Firefox | ✅ Samsung Internet | ✅ Edge

## 👤 سازنده

**Shahab Shahrokhi**

---

Made with ❤️ using Three.js | Optimized for 📱 Mobile
