# غیرفعال‌سازی تعاملات صحنه هنگام باز بودن Overlay ها

## خلاصه تغییرات

هنگامی که کاربر یکی از overlay های زیر را باز می‌کند، دیگر نمی‌تواند با صحنه 3D تعامل داشته باشد:
- **پروژه‌ها** (لپ‌تاپ)
- **بازی آرکید** (دستگاه آرکید)
- **تماس** (گوشی iPhone)

این قابلیت از کلیک‌های ناخواسته روی اشیاء 3D و حرکت دوربین هنگام استفاده از overlay ها جلوگیری می‌کند.

---

## فایل‌های تغییر یافته

### 1. `src/utils/controlsManager.js` (ایجاد شده)
ماژول مدیریت مرکزی برای فعال/غیرفعال کردن تعاملات:

```javascript
// توابع اصلی:
- initControlsManager(controls)  // مقداردهی اولیه با OrbitControls
- disableControls()              // غیرفعال کردن تعاملات
- enableControls()               // فعال کردن تعاملات
- isRaycasterEnabled()           // بررسی وضعیت raycaster
```

**عملکرد:**
- غیرفعال کردن `OrbitControls` (جلوگیری از چرخش/زوم دوربین)
- غیرفعال کردن `Raycaster` (جلوگیری از کلیک روی اشیاء 3D)

---

### 2. `src/ui/projectsOverlay.js`
**تغییرات:**
- Import کردن `disableControls` و `enableControls`
- فراخوانی `disableControls()` در تابع `openProjects()`
- فراخوانی `enableControls()` در تابع `closeProjects()`

**نتیجه:**
- هنگام باز شدن لیست پروژه‌ها → تعاملات صحنه غیرفعال
- هنگام بستن (دکمه Exit یا ESC) → تعاملات صحنه فعال

---

### 3. `src/interactions/arcadeInteraction.js`
**تغییرات:**
- Import کردن `disableControls` و `enableControls`
- فراخوانی `disableControls()` در تابع `activateArcadeMode()`
- فراخوانی `enableControls()` در تابع `deactivateArcadeMode()`

**نتیجه:**
- هنگام باز شدن بازی آرکید → تعاملات صحنه غیرفعال
- هنگام بستن (دکمه Close یا ESC) → تعاملات صحنه فعال

---

### 4. `src/ui/contactOverlay.js`
**تغییرات:**
- Import کردن `disableControls` و `enableControls`
- فراخوانی `disableControls()` در `toggleContactUI(true)`
- فراخوانی `enableControls()` در `toggleContactUI(false)`

**نتیجه:**
- هنگام باز شدن صفحه تماس → تعاملات صحنه غیرفعال
- هنگام بستن (کلیک روی backdrop یا دکمه‌ها) → تعاملات صحنه فعال

---

### 5. `src/interactions/raycaster.js` (قبلاً به‌روزرسانی شده)
**تغییرات قبلی:**
- Import کردن `isRaycasterEnabled`
- بررسی `isRaycasterEnabled()` قبل از پردازش تعاملات
- ریست کردن hover effect هنگام غیرفعال بودن

**نتیجه:**
- Raycaster فقط زمانی کار می‌کند که overlay ها بسته باشند

---

### 6. `src/main.js` (قبلاً به‌روزرسانی شده)
**تغییرات قبلی:**
- Import کردن `initControlsManager`
- فراخوانی `initControlsManager(controls)` بعد از ایجاد OrbitControls

---

## نحوه عملکرد

### 1. مقداردهی اولیه
```javascript
// در src/main.js
import { initControlsManager } from './utils/controlsManager.js';

const controls = new OrbitControls(camera, renderer.domElement);
initControlsManager(controls); // ارسال reference به controlsManager
```

### 2. غیرفعال کردن (هنگام باز شدن overlay)
```javascript
import { disableControls } from '../utils/controlsManager.js';

function openOverlay() {
  disableControls(); // غیرفعال کردن OrbitControls و Raycaster
  // ... نمایش overlay
}
```

### 3. فعال کردن (هنگام بستن overlay)
```javascript
import { enableControls } from '../utils/controlsManager.js';

function closeOverlay() {
  // ... مخفی کردن overlay
  enableControls(); // فعال کردن مجدد OrbitControls و Raycaster
}
```

---

## تست عملکرد

### دسکتاپ:
1. ✅ کلیک روی لپ‌تاپ → لیست پروژه‌ها باز می‌شود
2. ✅ سعی کنید دوربین را بچرخانید → کار نمی‌کند
3. ✅ سعی کنید روی اشیاء دیگر کلیک کنید → کار نمی‌کند
4. ✅ دکمه Exit یا ESC → overlay بسته می‌شود
5. ✅ حالا می‌توانید دوربین را بچرخانید و روی اشیاء کلیک کنید

### موبایل:
1. ✅ تپ روی لپ‌تاپ → لیست پروژه‌ها باز می‌شود
2. ✅ سعی کنید با یک انگشت دوربین را بچرخانید → کار نمی‌کند
3. ✅ سعی کنید با دو انگشت زوم کنید → کار نمی‌کند
4. ✅ سعی کنید روی اشیاء دیگر تپ کنید → کار نمی‌کند
5. ✅ دکمه Exit → overlay بسته می‌شود
6. ✅ حالا می‌توانید دوربین را بچرخانید و روی اشیاء تپ کنید

### همین تست‌ها را برای آرکید و گوشی تماس تکرار کنید

---

## نکات فنی

### چرا از یک ماژول مرکزی استفاده کردیم؟
- **یکپارچگی:** همه overlay ها از یک منبع واحد استفاده می‌کنند
- **قابلیت نگهداری:** تغییرات فقط در یک فایل انجام می‌شود
- **جلوگیری از تداخل:** state مدیریت شده در یک مکان

### چرا هم OrbitControls و هم Raycaster را غیرفعال می‌کنیم؟
- **OrbitControls:** جلوگیری از چرخش/زوم/pan دوربین
- **Raycaster:** جلوگیری از کلیک/hover روی اشیاء 3D

### چه اتفاقی برای hover effect می‌افتد؟
وقتی raycaster غیرفعال می‌شود:
1. Hover effect فعلی ریست می‌شود
2. Cursor به حالت `default` برمی‌گردد
3. تا بستن overlay، هیچ hover جدیدی اعمال نمی‌شود

---

## تاریخ: 9 مه 2026
## وضعیت: ✅ کامل شده

