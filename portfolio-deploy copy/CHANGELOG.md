# Changelog - Portfolio Production

## [به‌روزرسانی 3] - 2026-05-11 15:57

### Added ✨
- `src/utils/mobileHitbox.js` - سیستم جدید مدیریت hitbox برای دستگاه‌های موبایل
- `scripts/convert-webp.mjs` - اسکریپت تبدیل تصاویر به فرمت WebP

### Changed 🔄
- `src/main.js` - بهبود لاجیک اصلی برنامه
- `src/main-mobile-example.js` - بهینه‌سازی نسخه موبایل
- `src/utils/config.js` - به‌روزرسانی تنظیمات پروژه
- `src/utils/mobileDetect.js` - بهبود الگوریتم تشخیص موبایل
- `src/scene/setup.js` - بهینه‌سازی تنظیمات صحنه
- `src/scene/wireframeDome.js` - بهبود رندرینگ wireframe
- `src/objects/cat.js` - بهبود آبجکت گربه
- `src/objects/iphone.js` - بهبود تعاملات آیفون
- `src/objects/laptop.js` - بهبود تعاملات لپتاپ
- `src/objects/resume.js` - بهبود نمایش رزومه
- `src/objects/shelves.js` - بهبود قفسه‌ها
- `src/ui/resumeOverlay.js` - بهبود UI اورلی رزومه
- `src/interactions/hotspots.js` - بهبود سیستم hotspot

### Removed 🗑️
- `public/assets/models/window.glb` (131 KB) - مدل استفاده نشده
- `src/objects/window.js` - فایل استفاده نشده
- `public/assets/models/logo_backup.glb` (28 KB) - فایل backup غیرضروری
- `public/assets/models/three-js-original.glb` (6.6 MB) - نسخه اصلی (فشرده موجود)

### Performance ⚡
- کاهش حجم از 22.53 MB به 15.68 MB (-6.85 MB / -30%)
- بهینه‌سازی تعاملات موبایل
- بهبود پاسخ‌دهی لمسی
- حذف فایل‌های backup و نسخه‌های اصلی

---

## [به‌روزرسانی 2] - 2026-05-11 06:54

### Added ✨
- `src/objects/resume.js` - آبجکت رزومه سه‌بعدی
- `src/objects/threejsIcon.js` - آیکون Three.js
- `src/ui/resumeOverlay.js` - اورلی نمایش رزومه
- `src/utils/pdfTextureLoader.js` - لودر تکسچر PDF
- `public/assets/models/three-js.glb` (122 KB) - مدل Three.js فشرده
- `public/assets/models/three-js-original.glb` (6.6 MB) - مدل اصلی
- `public/assets/models/trifold_document_brochure_menu.glb` (4.8 KB) - مدل رزومه
- `public/assets/textures/resume-preview.webp` (174 KB) - پیش‌نمایش رزومه
- `public/Black and White Minimalist Corporate Resume.png` (451 KB)
- `compress-threejs-model.js` - اسکریپت فشرده‌سازی مدل
- `convert-image-to-webp.js` - تبدیل تصویر به WebP
- `convert-pdf-to-image.js` - تبدیل PDF به تصویر

### Changed 🔄
- `src/main.js` - اضافه شدن initResume و initThreejsIcon
- `src/utils/config.js` - تنظیمات resume و threejs
- `src/interactions/hotspots.js` - پشتیبانی از resume action
- `src/ui/SpatialUI.js` - به‌روزرسانی UI

### Removed 🗑️
- `arcade_game_machine_001.glb` (1.03 MB) - مدل قدیمی
- `white_board_asset.glb` (6.36 KB) - مدل استفاده نشده
- `polaroid_art.png` (823 KB) - نسخه PNG (WebP موجود)
- `_Generated_Image.png` (1.6 MB) - نسخه PNG (WebP موجود)

### Performance ⚡
- افزایش حجم از 18.5 MB به 22.53 MB (+4 MB برای فیچرهای جدید)
- افزودن 16 فایل جدید
- حذف 4 فایل اضافی

---

## [به‌روزرسانی 1] - 2026-05-11 05:52

### Added ✨
- `src/scene/wireframeDome.js` - اتاق wireframe کامل
- `src/objects/logoModel.js` - مدل لوگو
- `scripts/convert-webp.mjs` - اسکریپت تبدیل
- `src/debug_arcade.js` - ابزار دیباگ
- `src/main-mobile-example.js` - نمونه موبایل
- `.gitattributes` - تنظیمات Git
- `.npmrc` - تنظیمات NPM
- `.vercelignore` - تنظیمات Vercel
- `public/SH.SH-Resume.pdf` - فایل رزومه PDF
- `public/assets/models/logo.glb` - مدل لوگو
- `public/assets/models/logo_backup.glb` - پشتیبان لوگو

### Changed 🔄
- `src/main.js` - ساختار اصلی برنامه
- `src/scene/setup.js` - تنظیمات صحنه
- `src/scene/environment.js` - محیط سه‌بعدی
- `src/objects/htmlIcon.js` - آیکون HTML
- `src/interactions/cameraTransitions.js` - انتقال دوربین
- `src/interactions/hotspots.js` - سیستم hotspot
- `src/interactions/raycaster.js` - raycaster
- `src/ui/contactOverlay.js` - اورلی تماس
- `src/utils/config.js` - تنظیمات کلی
- `index.html` - صفحه اصلی
- `style.css` - استایل‌ها

### Removed 🗑️
- تمام فایل‌های `.md` (62 فایل)
- تمام فایل‌های `.txt`
- `delete_unused_models.bat`
- پوشه `node_modules` (از production)
- پوشه `dist` (از production)
- پوشه `scratch` (از production)

### Performance ⚡
- کاهش حجم از 128.81 MB به 18.5 MB (-85%)
- کاهش تعداد فایل‌ها از 1,754 به 112 (-93%)
- حذف فایل‌های غیرضروری
- بهینه‌سازی ساختار پروژه

---

## خلاصه کلی

### آمار نهایی
- **فایل‌ها:** 117
- **حجم:** 15.68 MB
- **کاهش کلی:** از 128 MB به 15.68 MB (-88%)

### ویژگی‌های اصلی
1. ✅ Resume 3D Interactive
2. ✅ Three.js Icon
3. ✅ Mobile Hitbox System
4. ✅ Wireframe Room
5. ✅ Optimized Performance

### وضعیت
✅ آماده برای دیپلوی در production
