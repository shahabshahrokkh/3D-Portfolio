# اضافه کردن بروشور رزومه روی تخت

## تغییرات انجام شده

### 1. فایل: `src/utils/config.js`
یک مدل جدید به نام `resume` اضافه شد:

```javascript
resume: {
  url: '/assets/models/trifold_document_brochure_menu.glb',
  position: [-6.5, 0.43, 0.5], // روی تخت، کنار گربه
  rotation: [0, Math.PI / 2, 0], // همجهت با تخت
  targetSize: { width: 0.35 },
  type: 'interactable',
  action: 'openResume'
}
```

**توضیحات:**
- مدل بروشور سه‌لت (trifold) روی تخت قرار گرفته است
- موقعیت: کنار گربه روی تخت
- اندازه: 0.35 متر عرض
- نوع: قابل تعامل (interactable)
- عملکرد: باز کردن فایل PDF رزومه

### 2. فایل: `src/objects/resume.js` (جدید)
یک فایل جدید برای مدیریت مدل رزومه ایجاد شد:

```javascript
import { createObjectWithPlaceholder } from '../utils/helpers_v2.js';

export async function initResume(scene) {
  return await createObjectWithPlaceholder('resume', scene);
}
```

### 3. فایل: `src/main.js`
- Import کردن `initResume` از `./objects/resume.js`
- اضافه کردن `initResume(scene)` به Tier 2 (Secondary Furniture & Essentials)

```javascript
import { initResume } from './objects/resume.js';

// در بخش TIER 2:
const tier2 = [
  initBed(scene),
  initShelves(scene),
  initBookshelf(scene),
  initWhiteboard(scene),
  initMouseKeyboard(scene),
  initResume(scene)  // ← جدید
];
```

### 4. فایل: `src/interactions/hotspots.js`
یک action جدید به نام `openResume` اضافه شد:

```javascript
openResume: (object) => {
  // باز کردن فایل PDF رزومه در تب جدید
  window.open('/SH.SH-Resume.pdf', '_blank');
  showUI('📄 Opening Resume...');
  if (object) {
    focusOnObject(object);
  }
}
```

**عملکرد:**
- وقتی کاربر روی بروشور کلیک می‌کند، فایل PDF رزومه در تب جدید باز می‌شود
- دوربین روی بروشور فوکوس می‌کند
- یک پیام "📄 Opening Resume..." نمایش داده می‌شود

### 5. فایل: `src/ui/SpatialUI.js`
یک label فضایی برای رزومه اضافه شد:

```javascript
{ modelName: 'resume', text: 'Resume', icon: '📄', action: HotspotActions.openResume, extraY: 0.3 }
```

**عملکرد:**
- یک label شناور با آیکون 📄 و متن "Resume" بالای بروشور نمایش داده می‌شود
- کلیک روی label باعث باز شدن رزومه می‌شود

## نحوه استفاده

1. **مشاهده بروشور در صحنه:**
   - بروشور روی تخت، کنار گربه قرار دارد
   - یک label شناور با آیکون 📄 بالای آن نمایش داده می‌شود

2. **باز کردن رزومه:**
   - روی بروشور کلیک کنید
   - یا روی label "Resume" کلیک کنید
   - فایل PDF رزومه در تب جدید مرورگر باز می‌شود

3. **فوکوس دوربین:**
   - با کلیک روی بروشور، دوربین به صورت خودکار روی آن فوکوس می‌کند

## فایل‌های مورد نیاز

- **مدل 3D:** `/public/assets/models/trifold_document_brochure_menu.glb`
- **فایل PDF:** `/public/SH.SH-Resume.pdf`

## تست

برای تست تغییرات:

```bash
npm run dev
```

سپس:
1. صفحه را باز کنید
2. به سمت تخت بروید
3. بروشور را روی تخت پیدا کنید
4. روی آن کلیک کنید
5. رزومه باید در تب جدید باز شود

## نکات

- بروشور در Tier 2 لود می‌شود (همراه با تخت و سایر مبلمان اصلی)
- مدل به صورت خودکار scale می‌شود تا اندازه واقعی داشته باشد
- فایل PDF باید در مسیر `/public/SH.SH-Resume.pdf` قرار داشته باشد
- label فضایی به صورت خودکار موقعیت خود را بر اساس حرکت دوربین به‌روزرسانی می‌کند

## خلاصه

✅ مدل بروشور سه‌لت روی تخت اضافه شد  
✅ فایل PDF رزومه به پروژه اضافه شد  
✅ عملکرد باز کردن رزومه با کلیک پیاده‌سازی شد  
✅ Label فضایی برای راحتی دسترسی اضافه شد  
✅ فوکوس خودکار دوربین روی بروشور فعال شد  
