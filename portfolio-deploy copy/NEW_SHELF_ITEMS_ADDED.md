# اضافه شدن Blender و Typewriter به قفسه 🎨⌨️

## ✅ مدل‌های جدید اضافه شده

دو مدل جدید به قفسه کتاب اضافه شدند:
1. **🎨 Blender Logo** - لوگوی سه‌بعدی Blender
2. **⌨️ Victorian Typewriter** - تایپرایتر قدیمی

---

## 📍 چیدمان کامل قفسه

```
نمای از جلو (5 ردیف):

    ┌─────────────────────────┐
    │                         │ ← ردیف 5 (خالی)
    ├─────────────────────────┤
    │  🌐 HTML                │ ← ردیف 4 (1.55m) - چپ
    ├─────────────────────────┤
    │                ⌨️       │ ← ردیف 3 (1.15m) - راست (Typewriter)
    ├─────────────────────────┤
    │         ⚛️ React        │ ← ردیف 2 (0.75m) - وسط-راست
    ├─────────────────────────┤
    │  🐍 Python    🎨 Blender│ ← ردیف 1 (0.35m) - چپ و راست
    └─────────────────────────┘
```

---

## 📊 جدول کامل مدل‌ها

| مدل | ردیف | X | Y | Z | سمت | اندازه |
|-----|------|---|---|---|-----|--------|
| 🐍 Python | 1 | -3.2 | 0.35 | -7.15 | چپ | 0.15m (height) |
| 🎨 **Blender** | **1** | **-2.9** | **0.35** | **-7.15** | **راست** | **0.15m (height)** |
| ⚛️ React | 2 | -2.85 | 0.75 | -7.15 | وسط-راست | 0.15m (height) |
| ⌨️ **Typewriter** | **3** | **-2.85** | **1.15** | **-7.15** | **راست** | **0.25m (width)** |
| 🌐 HTML/CSS/JS | 4 | -3.15 | 1.55 | -7.15 | چپ | 0.15m (height) |

---

## 🎨 Blender Logo

### مشخصات:
```javascript
blenderIcon: {
  url: '/assets/models/free_blender_logo_3d_model.glb',
  position: [-2.9, 0.35, -7.15],
  rotation: [0, Math.PI, 0],
  targetSize: { height: 0.15 },
  type: 'environment'
}
```

### موقعیت:
- **ردیف:** 1 (پایین‌ترین)
- **سمت:** راست
- **کنار:** Python (سمت چپ)
- **ارتفاع:** 35 سانتی‌متر از زمین
- **اندازه:** 15 سانتی‌متر

---

## ⌨️ Victorian Typewriter

### مشخصات:
```javascript
typewriter: {
  url: '/assets/models/victorian_typewriter.glb',
  position: [-2.85, 1.15, -7.15],
  rotation: [0, Math.PI, 0],
  targetSize: { width: 0.25 },  // کوچک‌تر از بقیه
  type: 'environment'
}
```

### موقعیت:
- **ردیف:** 3 (وسط)
- **سمت:** راست
- **ارتفاع:** 115 سانتی‌متر از زمین
- **اندازه:** 25 سانتی‌متر عرض (کوچک)

### چرا width به جای height؟
تایپرایتر افقی است، پس عرض آن را محدود می‌کنیم تا حجم کمتری داشته باشد.

---

## 📝 فایل‌های ایجاد شده

### 1. `src/objects/blenderIcon.js`
```javascript
import { createObjectWithPlaceholder } from '../utils/helpers_v2.js';

export async function initBlenderIcon(scene) {
    return await createObjectWithPlaceholder('blenderIcon', scene);
}
```

### 2. `src/objects/typewriter.js`
```javascript
import { createObjectWithPlaceholder } from '../utils/helpers_v2.js';

export async function initTypewriter(scene) {
    return await createObjectWithPlaceholder('typewriter', scene);
}
```

---

## 📝 فایل‌های به‌روزرسانی شده

### 1. `src/utils/config.js`
اضافه شدن دو مدل جدید:
- `blenderIcon`
- `typewriter`

### 2. `src/main.js`
**Import:**
```javascript
import { initBlenderIcon } from './objects/blenderIcon.js';
import { initTypewriter } from './objects/typewriter.js';
```

**فراخوانی:**
```javascript
initBlenderIcon(scene);
initTypewriter(scene);
```

---

## 🎯 منطق چیدمان

### ردیف 1 (پایین):
- **چپ:** Python 🐍
- **راست:** Blender 🎨
- **منطق:** دو ابزار اصلی برنامه‌نویسی و 3D

### ردیف 2:
- **وسط-راست:** React ⚛️
- **منطق:** فریمورک فرانت‌اند

### ردیف 3:
- **راست:** Typewriter ⌨️
- **منطق:** نماد نوشتن کد و محتوا

### ردیف 4:
- **چپ:** HTML/CSS/JS 🌐
- **منطق:** پایه وب

### ردیف 5:
- **خالی**
- **منطق:** فضای تنفس

---

## 🔧 تنظیمات اندازه

### Blender (مثل سایر آیکون‌ها):
```javascript
targetSize: { height: 0.15 }  // 15 سانتی‌متر
```

### Typewriter (کوچک‌تر):
```javascript
targetSize: { width: 0.25 }   // 25 سانتی‌متر عرض
```

**چرا کوچک‌تر؟**
- تایپرایتر مدل بزرگ‌تری است
- با محدود کردن عرض، حجم کمتری می‌گیرد
- بهتر در قفسه جا می‌شود

---

## 🎨 تنظیمات پیشرفته

### تغییر اندازه Blender:
```javascript
// بزرگ‌تر
targetSize: { height: 0.18 }

// کوچک‌تر
targetSize: { height: 0.12 }
```

### تغییر اندازه Typewriter:
```javascript
// بزرگ‌تر
targetSize: { width: 0.3 }

// کوچک‌تر
targetSize: { width: 0.2 }

// یا بر اساس ارتفاع
targetSize: { height: 0.15 }
```

---

## 📐 تغییر موقعیت

### جابجایی Blender:
```javascript
// به چپ
position: [-3.1, 0.35, -7.15]

// به وسط
position: [-3.0, 0.35, -7.15]

// به ردیف بالاتر
position: [-2.9, 0.75, -7.15]  // ردیف 2
```

### جابجایی Typewriter:
```javascript
// به چپ
position: [-3.1, 1.15, -7.15]

// به ردیف پایین‌تر
position: [-2.85, 0.75, -7.15]  // ردیف 2

// به ردیف بالاتر
position: [-2.85, 1.55, -7.15]  // ردیف 4
```

---

## 🧪 تست

```bash
npm run dev
```

### چک‌لیست:
- [ ] Blender در ردیف پایین، سمت راست
- [ ] Typewriter در ردیف 3، سمت راست
- [ ] Python و Blender در یک ردیف (ردیف 1)
- [ ] همه داخل قفسه هستند
- [ ] اندازه‌ها مناسب هستند
- [ ] با سایر آیتم‌ها تداخل ندارند

---

## 💡 ایده‌های توسعه

### 1. تبدیل به Interactable:
```javascript
blenderIcon: {
  type: 'interactable',
  action: 'showBlenderInfo'
}

typewriter: {
  type: 'interactable',
  action: 'showTypewriterInfo'
}
```

### 2. انیمیشن Typewriter:
```javascript
// تایپرایتر می‌تواند انیمیشن تایپ داشته باشد
animateTypewriter() {
  // حرکت کلیدها
  // صدای تایپ
  // کاغذ بالا می‌رود
}
```

### 3. Tooltip:
```javascript
// نمایش اطلاعات هنگام hover
onHover: () => {
  showTooltip('Blender - 3D Modeling & Animation');
  showTooltip('Vintage Typewriter - Content Creation');
}
```

### 4. اضافه کردن آیتم‌های بیشتر:
```javascript
// Git logo
// VS Code logo
// Node.js logo
// Docker logo
// کتاب‌های کوچک
// گیاه کوچک
```

---

## 📊 آمار کل قفسه

| مورد | تعداد |
|------|-------|
| **مدل‌های روی قفسه** | 5 |
| **ردیف‌های استفاده شده** | 4 از 5 |
| **ردیف‌های خالی** | 1 (ردیف 5) |
| **آیکون‌های برنامه‌نویسی** | 4 (Python, React, HTML, Blender) |
| **اشیاء دکوری** | 1 (Typewriter) |

---

## 🎨 ترکیب رنگی

| آیتم | رنگ اصلی |
|------|----------|
| Python | آبی/زرد |
| Blender | نارنجی/آبی |
| React | آبی روشن |
| Typewriter | فلزی/مشکی |
| HTML/CSS/JS | نارنجی/آبی/زرد |

---

## 🔍 عیب‌یابی

### مشکل: Typewriter خیلی بزرگ است
**راه‌حل:**
```javascript
targetSize: { width: 0.2 }  // کوچک‌تر
```

### مشکل: Blender دیده نمی‌شود
**راه‌حل:**
```javascript
targetSize: { height: 0.18 }  // بزرگ‌تر
position: [-2.9, 0.35, -7.1]  // جلوتر
```

### مشکل: آیتم‌ها با هم تداخل دارند
**راه‌حل:**
```javascript
// فاصله بیشتر بین آیتم‌ها
position: [-2.8, Y, -7.15]  // راست‌تر
position: [-3.3, Y, -7.15]  // چپ‌تر
```

### مشکل: Typewriter از قفسه بیرون زده
**راه‌حل:**
```javascript
position: [-2.85, 1.15, -7.16]  // عقب‌تر
targetSize: { width: 0.2 }      // کوچک‌تر
```

---

## 📝 خلاصه تغییرات

### فایل‌های جدید:
1. ✅ `src/objects/blenderIcon.js`
2. ✅ `src/objects/typewriter.js`

### فایل‌های به‌روزرسانی شده:
1. ✅ `src/utils/config.js` - اضافه شدن 2 مدل
2. ✅ `src/main.js` - Import و فراخوانی

### مدل‌های GLB:
1. ✅ `free_blender_logo_3d_model.glb`
2. ✅ `victorian_typewriter.glb`

---

**تاریخ:** 9 مه 2026  
**وضعیت:** ✅ 2 مدل جدید اضافه شد  
**مدل‌های روی قفسه:** 5 (Python, Blender, React, Typewriter, HTML)  
**ردیف‌های استفاده شده:** 4 از 5

