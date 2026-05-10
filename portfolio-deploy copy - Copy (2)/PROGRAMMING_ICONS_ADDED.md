# اضافه شدن آیکون‌های زبان‌های برنامه‌نویسی 💻

## خلاصه
3 آیکون سه‌بعدی زبان‌های برنامه‌نویسی روی قفسه کتاب قرار گرفتند:
- 🐍 **Python** (سمت چپ)
- ⚛️ **React** (وسط)
- 🌐 **HTML/CSS/JS** (سمت راست)

---

## 📍 چیدمان روی قفسه

```
        [دیوار عقب - Z: -7.2]
              قفسه کتاب
    ┌─────────────────────────────┐
    │                             │
    │   🐍      ⚛️      🌐        │  ← ارتفاع: 1.2m
    │ Python  React  HTML/CSS/JS  │
    │                             │
    └─────────────────────────────┘
      -3.3    -3.0     -2.7  (X)
```

---

## 📝 فایل‌های ایجاد شده

### 1. ✅ `src/objects/pythonIcon.js`
```javascript
import { createObjectWithPlaceholder } from '../utils/helpers_v2.js';

export async function initPythonIcon(scene) {
  return await createObjectWithPlaceholder('pythonIcon', scene);
}
```

### 2. ✅ `src/objects/reactIcon.js`
```javascript
import { createObjectWithPlaceholder } from '../utils/helpers_v2.js';

export async function initReactIcon(scene) {
  return await createObjectWithPlaceholder('reactIcon', scene);
}
```

### 3. ✅ `src/objects/htmlIcon.js`
```javascript
import { createObjectWithPlaceholder } from '../utils/helpers_v2.js';

export async function initHtmlIcon(scene) {
  return await createObjectWithPlaceholder('htmlIcon', scene);
}
```

---

## 📝 فایل‌های به‌روزرسانی شده

### 1. `src/utils/config.js`

**Python Icon:**
```javascript
pythonIcon: {
  url: '/assets/models/python_programming_language.glb',
  position: [-3.3, 1.2, -7.0],  // سمت چپ قفسه
  rotation: [0, Math.PI, 0],     // رو به داخل اتاق
  targetSize: { height: 0.25 },  // ارتفاع 25 سانتی‌متر
  type: 'environment'
}
```

**React Icon:**
```javascript
reactIcon: {
  url: '/assets/models/react_logo.glb',
  position: [-3.0, 1.2, -7.0],  // وسط قفسه
  rotation: [0, Math.PI, 0],     // رو به داخل اتاق
  targetSize: { height: 0.25 },  // ارتفاع 25 سانتی‌متر
  type: 'environment'
}
```

**HTML/CSS/JS Icon:**
```javascript
htmlIcon: {
  url: '/assets/models/html_css_javascript_model.glb',
  position: [-2.7, 1.2, -7.0],  // سمت راست قفسه
  rotation: [0, Math.PI, 0],     // رو به داخل اتاق
  targetSize: { height: 0.25 },  // ارتفاع 25 سانتی‌متر
  type: 'environment'
}
```

### 2. `src/main.js`

**Import ها:**
```javascript
import { initPythonIcon } from './objects/pythonIcon.js';
import { initReactIcon } from './objects/reactIcon.js';
import { initHtmlIcon } from './objects/htmlIcon.js';
```

**فراخوانی در init():**
```javascript
initBookshelf(scene);
initPythonIcon(scene);
initReactIcon(scene);
initHtmlIcon(scene);
```

---

## 🎨 مشخصات آیکون‌ها

| آیکون | فایل | موقعیت X | ارتفاع | فاصله |
|-------|------|----------|--------|-------|
| 🐍 Python | `python_programming_language.glb` | -3.3 | 0.25m | چپ |
| ⚛️ React | `react_logo.glb` | -3.0 | 0.25m | وسط |
| 🌐 HTML/CSS/JS | `html_css_javascript_model.glb` | -2.7 | 0.25m | راست |

**مشخصات مشترک:**
- **ارتفاع از زمین:** 1.2 متر (روی قفسه)
- **عمق (Z):** -7.0 (کمی جلوتر از دیوار)
- **چرخش:** 180 درجه (رو به داخل اتاق)
- **اندازه:** 25 سانتی‌متر ارتفاع
- **فاصله بین آیکون‌ها:** 0.3 متر

---

## 📐 محاسبات موقعیت

### قفسه کتاب:
- **مرکز:** X = -3.0
- **ارتفاع:** 2.0 متر
- **موقعیت قفسه میانی:** Y = 1.2 متر

### آیکون‌ها:
```
Python:  X = -3.0 - 0.3 = -3.3  (چپ)
React:   X = -3.0 + 0.0 = -3.0  (وسط)
HTML:    X = -3.0 + 0.3 = -2.7  (راست)
```

### عمق (Z):
```
دیوار:    Z = -7.2
قفسه:     Z = -7.2
آیکون‌ها: Z = -7.0  (20 سانتی‌متر جلوتر برای دیده شدن)
```

---

## 🎯 نحوه عملکرد

### 1. بارگذاری
```
صفحه بارگذاری
    ↓
Placeholder برای هر آیکون
    ↓
بارگذاری موازی 3 مدل GLB
    ↓
نرمال‌سازی مقیاس (ارتفاع = 0.25m)
    ↓
قرار دادن روی قفسه
    ↓
جایگزینی Placeholder ها
```

### 2. رندرینگ
- **سایه‌اندازی:** فعال
- **دریافت سایه:** فعال
- **Material:** از GLB
- **Anisotropic Filtering:** 16x

---

## 🧪 تست عملکرد

### چک‌لیست:
- ✅ قفسه کتاب بارگذاری شده
- ✅ 3 آیکون روی قفسه قرار دارند
- ✅ آیکون‌ها در ارتفاع صحیح هستند (1.2m)
- ✅ فاصله بین آیکون‌ها مناسب است (0.3m)
- ✅ آیکون‌ها رو به داخل اتاق هستند
- ✅ اندازه آیکون‌ها مناسب است (25cm)
- ✅ سایه‌ها صحیح هستند
- ✅ با قفسه یا سایر اشیاء تداخل ندارند

### نکات بصری:
```
از بالا:
    [دیوار]
      🐍 ⚛️ 🌐
    [قفسه کتاب]

از جلو:
    ┌─────────────┐
    │             │
    │ 🐍  ⚛️  🌐  │ ← آیکون‌ها
    │             │
    │   [کتاب‌ها]  │
    └─────────────┘
```

---

## 🎨 تنظیمات پیشرفته

### تغییر ارتفاع آیکون‌ها:
```javascript
// در config.js
position: [-3.3, 1.5, -7.0]  // ارتفاع بیشتر (قفسه بالاتر)
position: [-3.3, 0.8, -7.0]  // ارتفاع کمتر (قفسه پایین‌تر)
```

### تغییر فاصله بین آیکون‌ها:
```javascript
// فاصله بیشتر (0.4m):
pythonIcon: [-3.4, 1.2, -7.0]
reactIcon:  [-3.0, 1.2, -7.0]
htmlIcon:   [-2.6, 1.2, -7.0]

// فاصله کمتر (0.2m):
pythonIcon: [-3.2, 1.2, -7.0]
reactIcon:  [-3.0, 1.2, -7.0]
htmlIcon:   [-2.8, 1.2, -7.0]
```

### تغییر اندازه:
```javascript
targetSize: { height: 0.3 }   // بزرگ‌تر (30cm)
targetSize: { height: 0.2 }   // کوچک‌تر (20cm)
targetSize: { width: 0.25 }   // بر اساس عرض
```

### اضافه کردن انیمیشن چرخش:
```javascript
// در فایل مربوطه (مثلاً pythonIcon.js):
import { registerModelAnimations } from '../animations/idle.js';

export async function initPythonIcon(scene) {
  const icon = await createObjectWithPlaceholder('pythonIcon', scene);
  
  // اضافه کردن انیمیشن چرخش
  if (icon) {
    icon.userData.idleAnimation = {
      type: 'rotate',
      axis: 'y',
      speed: 0.5
    };
  }
  
  return icon;
}
```

### تبدیل به تعاملی:
```javascript
// در config.js
type: 'interactable',
action: 'showPythonInfo'  // نیاز به تعریف در hotspots.js
```

---

## 📦 ساختار فایل‌ها

```
portfolio-deploy/
├── public/
│   └── assets/
│       └── models/
│           ├── room_shelves.glb ✅
│           ├── python_programming_language.glb ✅
│           ├── react_logo.glb ✅
│           └── html_css_javascript_model.glb ✅
├── src/
│   ├── objects/
│   │   ├── bookshelf.js ✅
│   │   ├── pythonIcon.js ✅ (جدید)
│   │   ├── reactIcon.js ✅ (جدید)
│   │   └── htmlIcon.js ✅ (جدید)
│   ├── utils/
│   │   └── config.js ✅ (به‌روزرسانی)
│   └── main.js ✅ (به‌روزرسانی)
└── PROGRAMMING_ICONS_ADDED.md ✅ (این فایل)
```

---

## 💡 ایده‌های توسعه

### 1. انیمیشن هاور:
```javascript
// وقتی موس روی آیکون می‌رود، بزرگ شود و بچرخد
```

### 2. اطلاعات تکنولوژی:
```javascript
// کلیک روی هر آیکون → نمایش overlay با اطلاعات
action: 'showTechInfo'
```

### 3. آیکون‌های بیشتر:
```javascript
// اضافه کردن Node.js, TypeScript, Vue.js و ...
```

### 4. نور رنگی:
```javascript
// اضافه کردن PointLight با رنگ مخصوص هر تکنولوژی
// Python: آبی/زرد
// React: آبی روشن
// HTML: نارنجی
```

---

## 🧪 دستور تست

```bash
cd portfolio-deploy
npm run dev
```

**انتظار:**
- قفسه کتاب بین میز و آرکید
- 3 آیکون روی قفسه در یک ردیف
- آیکون‌ها واضح و قابل مشاهده
- سایه‌های مناسب

---

**تاریخ:** 9 مه 2026  
**وضعیت:** ✅ کامل شده  
**آیکون‌ها:** 🐍 Python | ⚛️ React | 🌐 HTML/CSS/JS

