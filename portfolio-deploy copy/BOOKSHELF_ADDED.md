# اضافه شدن قفسه کتاب جدید 📚

## خلاصه
یک مدل قفسه کتاب جدید به صحنه اضافه شد که بین میز کامپیوتر و دستگاه آرکید، چسبیده به دیوار عقب قرار دارد.

---

## فایل‌های تغییر یافته

### 1. `src/utils/config.js`
**تغییرات:**
- اضافه شدن تنظیمات مدل `bookshelf`:

```javascript
bookshelf: {
  url: '/assets/models/room_shelves.glb',
  position: [-3, 0, -7.2],        // بین میز و آرکید، دیوار عقب
  rotation: [0, Math.PI, 0],      // رو به داخل اتاق
  targetSize: { height: 2.0 },    // ارتفاع 2 متر
  type: 'environment'             // محیطی (غیرقابل تعامل)
}
```

**توضیحات موقعیت:**
- **X: -3** → بین میز (X: 0) و آرکید (X: -6)
- **Y: 0** → روی زمین
- **Z: -7.2** → چسبیده به دیوار عقب (همان Z وایتبورد)

---

### 2. `src/objects/bookshelf.js` (ایجاد شده)
**محتوا:**
```javascript
import { createObjectWithPlaceholder } from '../utils/helpers_v2.js';

export async function initBookshelf(scene) {
  return await createObjectWithPlaceholder('bookshelf', scene);
}
```

**عملکرد:**
- بارگذاری مدل GLB از مسیر `/assets/models/room_shelves.glb`
- ایجاد placeholder موقت تا مدل بارگذاری شود
- نرمال‌سازی مقیاس بر اساس ارتفاع 2 متر
- قرار دادن در موقعیت مشخص شده

---

### 3. `src/main.js`
**تغییرات:**

**Import:**
```javascript
import { initBookshelf } from './objects/bookshelf.js';
```

**فراخوانی در تابع init():**
```javascript
initArcade(scene, camera, renderer);
initShelves(scene);
initBookshelf(scene);  // ← اضافه شده
initCarpet(scene);
```

---

## مشخصات مدل

| ویژگی | مقدار |
|-------|-------|
| **فایل** | `room_shelves.glb` |
| **نوع** | محیطی (environment) |
| **ارتفاع** | 2.0 متر |
| **موقعیت** | بین میز و آرکید |
| **چرخش** | 180 درجه (رو به داخل اتاق) |
| **سایه** | فعال (castShadow & receiveShadow) |
| **تعامل** | غیرفعال |

---

## نحوه عملکرد

### 1. بارگذاری
```
صفحه بارگذاری → Placeholder نمایش داده می‌شود
                ↓
         بارگذاری GLB از سرور
                ↓
         محاسبه Bounding Box
                ↓
    نرمال‌سازی مقیاس (ارتفاع = 2m)
                ↓
         تنظیم موقعیت و چرخش
                ↓
    جایگزینی Placeholder با مدل واقعی
```

### 2. رندرینگ
- **سایه‌اندازی:** فعال (castShadow: true)
- **دریافت سایه:** فعال (receiveShadow: true)
- **Anisotropic Filtering:** 16x (برای کیفیت بالای texture)
- **Material:** تنظیمات پیش‌فرض از GLB

---

## تست عملکرد

### چک‌لیست:
- ✅ مدل در موقعیت صحیح بارگذاری می‌شود
- ✅ مقیاس مناسب است (ارتفاع 2 متر)
- ✅ چرخش صحیح است (رو به داخل اتاق)
- ✅ بین میز و آرکید قرار دارد
- ✅ به دیوار عقب چسبیده است
- ✅ سایه می‌اندازد و دریافت می‌کند
- ✅ با سایر اشیاء تداخل ندارد

### نکات بصری:
- قفسه باید در کنار دیوار عقب، بین وایتبورد و آرکید قرار بگیرد
- ارتفاع آن باید تقریباً به اندازه یک قفسه کتاب معمولی (2 متر) باشد
- باید با نورپردازی صحنه سایه بیندازد

---

## تنظیمات پیشرفته (در صورت نیاز)

### تغییر موقعیت:
```javascript
// در config.js
position: [X, Y, Z]
// X: چپ/راست (منفی = چپ)
// Y: بالا/پایین (0 = روی زمین)
// Z: جلو/عقب (منفی = عقب)
```

### تغییر اندازه:
```javascript
// در config.js
targetSize: { height: 2.5 }  // ارتفاع بیشتر
// یا
targetSize: { width: 1.5 }   // عرض مشخص
```

### تغییر چرخش:
```javascript
// در config.js
rotation: [0, Math.PI / 2, 0]  // 90 درجه
rotation: [0, Math.PI, 0]      // 180 درجه (فعلی)
rotation: [0, -Math.PI / 2, 0] // -90 درجه
```

### تبدیل به تعاملی:
```javascript
// در config.js
type: 'interactable',
action: 'openBooks'  // نیاز به تعریف action در hotspots.js
```

---

## ساختار فایل‌ها

```
portfolio-deploy/
├── public/
│   └── assets/
│       └── models/
│           └── room_shelves.glb ✅ (مدل 3D)
├── src/
│   ├── objects/
│   │   └── bookshelf.js ✅ (ایجاد شده)
│   ├── utils/
│   │   └── config.js ✅ (به‌روزرسانی شده)
│   └── main.js ✅ (به‌روزرسانی شده)
└── BOOKSHELF_ADDED.md ✅ (این فایل)
```

---

## تاریخ: 9 مه 2026
## وضعیت: ✅ کامل شده

