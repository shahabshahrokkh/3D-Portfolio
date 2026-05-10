# 🔧 رفع مشکل دکمه‌های Monitor در موبایل

## ❌ مشکل
دکمه‌های "Live Site" و "GitHub" در بخش Monitor (سمت راست) در حالت موبایل از صفحه بیرون می‌زدند و اسکرول افقی ایجاد می‌کردند.

---

## ✅ راه‌حل

### 1️⃣ اضافه کردن `overflow-x: hidden`
```css
.po-detail-body {
  overflow-y: auto;
  overflow-x: hidden;  /* ← جلوگیری از اسکرول افقی */
}
```

### 2️⃣ محدود کردن عرض دکمه‌ها
```css
.po-cta-wrap {
  width: 100%;
  max-width: 100%;
  flex-shrink: 0;
}

.po-btn {
  flex: 1;
  min-width: 0;
  box-sizing: border-box;
  justify-content: center;
}
```

### 3️⃣ تنظیمات موبایل
```css
@media (max-width: 480px) {
  .po-cta-wrap {
    flex-direction: column;
    width: 100%;
  }

  .po-btn {
    width: 100%;
    max-width: 100%;
    flex: none;  /* ← غیرفعال کردن flex grow */
  }
}
```

---

## 🔧 تغییرات دقیق

### Base Styles

#### `.po-detail-body`
```css
/* قبل ❌ */
.po-detail-body {
  overflow-y: auto;
  /* overflow-x نداشت */
}

/* بعد ✅ */
.po-detail-body {
  overflow-y: auto;
  overflow-x: hidden;  /* جلوگیری از بیرون زدن */
}
```

#### `.po-cta-wrap`
```css
/* قبل ❌ */
.po-cta-wrap {
  display: flex;
  gap: 10px;
  margin-top: auto;
}

/* بعد ✅ */
.po-cta-wrap {
  display: flex;
  gap: 10px;
  margin-top: auto;
  flex-shrink: 0;      /* جلوگیری از فشرده شدن */
  width: 100%;         /* عرض کامل */
  max-width: 100%;     /* محدودیت عرض */
}
```

#### `.po-btn`
```css
/* قبل ❌ */
.po-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 20px;
  /* ... */
}

/* بعد ✅ */
.po-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;  /* وسط‌چین */
  gap: 7px;
  padding: 10px 20px;
  flex: 1;                  /* تقسیم فضا */
  min-width: 0;             /* جلوگیری از overflow */
  box-sizing: border-box;   /* padding در عرض */
  /* ... */
}
```

### Responsive (< 480px)

```css
/* قبل ❌ */
.po-cta-wrap {
  flex-direction: column;
  gap: 10px;
}

.po-btn {
  width: 100%;
  justify-content: center;
  padding: 14px;
  font-size: 0.9rem;
}

/* بعد ✅ */
.po-cta-wrap {
  flex-direction: column;
  gap: 10px;
  width: 100%;           /* عرض کامل */
}

.po-btn {
  width: 100%;
  max-width: 100%;       /* محدودیت عرض */
  justify-content: center;
  padding: 14px;
  font-size: 0.9rem;
  flex: none;            /* غیرفعال کردن flex */
}
```

---

## 📊 مقایسه

### قبل ❌
```
┌─────────────────────────────┐
│ Monitor                     │
│                             │
│ [Live Site────────────────] │ ← بیرون می‌زند
│ [GitHub───────────────────] │ ← بیرون می‌زند
└─────────────────────────────┘
                              ↑
                        اسکرول افقی
```

### بعد ✅
```
┌─────────────────────────────┐
│ Monitor                     │
│                             │
│   [Live Site]               │ ← داخل container
│   [GitHub]                  │ ← داخل container
└─────────────────────────────┘
```

---

## 💡 چرا این مشکل رخ داد؟

### 1. عدم محدودیت عرض
```css
/* مشکل */
.po-btn {
  width: 100%;  /* 100% از چی؟ */
}
```

بدون `max-width: 100%` و `box-sizing: border-box`, دکمه می‌تواند از container بیرون بزند.

### 2. عدم overflow control
```css
/* مشکل */
.po-detail-body {
  overflow-y: auto;
  /* overflow-x تعریف نشده */
}
```

بدون `overflow-x: hidden`, محتوای بیرون‌زده اسکرول افقی ایجاد می‌کند.

### 3. Flex behavior
```css
/* مشکل */
.po-btn {
  flex: 1;  /* در موبایل باید none باشد */
}
```

در حالت column، `flex: 1` باعث می‌شود دکمه‌ها فضای اضافی بگیرند.

---

## 🎯 راه‌حل‌های کلیدی

### 1. Box Sizing
```css
.po-btn {
  box-sizing: border-box;
}
```
**توضیح**: padding در عرض محاسبه می‌شود، نه اضافه می‌شود.

### 2. Min Width Zero
```css
.po-btn {
  min-width: 0;
}
```
**توضیح**: جلوگیری از overflow در flex items.

### 3. Max Width 100%
```css
.po-btn {
  max-width: 100%;
}
```
**توضیح**: دکمه نمی‌تواند از container بزرگ‌تر شود.

### 4. Overflow Hidden
```css
.po-detail-body {
  overflow-x: hidden;
}
```
**توضیح**: محتوای بیرون‌زده مخفی می‌شود.

### 5. Flex None در موبایل
```css
@media (max-width: 480px) {
  .po-btn {
    flex: none;
  }
}
```
**توضیح**: دکمه فقط به اندازه محتوا + padding است.

---

## 🧪 تست

### چک‌لیست
- [x] دکمه‌ها داخل container هستند
- [x] اسکرول افقی وجود ندارد
- [x] دکمه‌ها full width در موبایل
- [x] دکمه‌ها وسط‌چین هستند
- [x] در desktop هم کار می‌کند

### دستورات تست
```bash
npm run dev
```

سپس:
1. باز کردن Projects Overlay
2. کلیک روی یک پروژه
3. اسکرول به پایین تا دکمه‌ها
4. بررسی عدم اسکرول افقی
5. تست در سایزهای مختلف

### سناریوهای تست

#### تست 1: Desktop
- ✅ دو دکمه کنار هم
- ✅ عرض مساوی (flex: 1)
- ✅ داخل container

#### تست 2: موبایل (< 480px)
- ✅ دکمه‌ها زیر هم
- ✅ full width
- ✅ بدون اسکرول افقی

#### تست 3: Tablet (< 768px)
- ✅ دو دکمه کنار هم
- ✅ داخل container
- ✅ responsive

---

## 📱 نتیجه در سایزهای مختلف

### Desktop
```
┌─────────────────────────────┐
│ [Live Site]    [GitHub]     │ ← کنار هم
└─────────────────────────────┘
```

### Tablet
```
┌─────────────────────────────┐
│ [Live Site]    [GitHub]     │ ← کنار هم
└─────────────────────────────┘
```

### موبایل
```
┌─────────────────────────────┐
│   [Live Site]               │ ← full width
│   [GitHub]                  │ ← full width
└─────────────────────────────┘
```

---

## ✅ مزایا

### قبل ❌
- دکمه‌ها از صفحه بیرون می‌زدند
- اسکرول افقی ناخواسته
- تجربه کاربری بد

### بعد ✅
- دکمه‌ها داخل container
- بدون اسکرول افقی
- تجربه کاربری عالی
- responsive کامل

---

## 🚀 نتیجه

**وضعیت**: ✅ **تکمیل شد**

دکمه‌های Monitor اکنون در تمام سایزها به درستی نمایش داده می‌شوند:
- ✅ Desktop: دو دکمه کنار هم
- ✅ Tablet: دو دکمه کنار هم
- ✅ موبایل: دکمه‌ها زیر هم (full width)
- ✅ بدون اسکرول افقی
- ✅ داخل container

**تاریخ**: 8 می 2026  
**وضعیت**: آماده استفاده
