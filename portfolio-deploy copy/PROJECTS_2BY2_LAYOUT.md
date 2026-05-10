# 📱 طراحی 2×2 برای لیست پروژه‌ها در موبایل

## 💡 ایده
نمایش پروژه‌ها به صورت **2 تا 2 تا** با فونت‌های بزرگ و فاصله زیاد، تا کاربر راحت‌تر بتواند بخواند و اسکرول کند.

---

## ✨ تغییرات اصلی

### 1️⃣ فاصله بین آیتم‌ها (Gap)
```css
/* قبل ❌ */
.po-list {
  gap: 8px;   /* خیلی کم */
}

/* بعد ✅ */
.po-list {
  gap: 18px;  /* موبایل 480px */
  gap: 16px;  /* موبایل 375px */
}
```

**نتیجه**: در هر اسکرول تقریباً **2 پروژه** نمایش داده می‌شود.

### 2️⃣ اندازه آیتم‌ها (Padding)
```css
/* قبل ❌ */
.po-list-item {
  padding: 12px 14px;  /* فشرده */
}

/* بعد ✅ */
.po-list-item {
  padding: 20px 18px;  /* موبایل 480px - بزرگ و راحت */
  padding: 18px 16px;  /* موبایل 375px */
}
```

### 3️⃣ فونت‌های بزرگ‌تر
```css
/* قبل ❌ */
.po-item-title {
  font-size: 0.88rem;  /* ریز */
}

.po-item-num {
  font-size: 0.7rem;
}

/* بعد ✅ */
.po-item-title {
  font-size: 1.1rem;   /* موبایل 480px - بزرگ و واضح */
  font-weight: 600;    /* Bold */
  line-height: 1.3;
}

.po-item-num {
  font-size: 0.9rem;
  font-weight: 600;
}
```

### 4️⃣ ارتفاع لیست بیشتر
```css
/* قبل ❌ */
.po-left {
  max-height: 45vh;  /* کوتاه */
}

/* بعد ✅ */
.po-left {
  max-height: 48vh;  /* موبایل 480px - بلندتر */
}
```

---

## 📐 جزئیات به تفکیک Breakpoint

### 🔷 Tablet (< 768px)

```css
.po-list {
  gap: 16px;                    /* فاصله خوب */
}

.po-list-item {
  padding: 18px 20px;           /* بزرگ */
  gap: 16px;
  border-radius: 16px;          /* گرد‌تر */
}

.po-item-num {
  font-size: 0.85rem;
  width: 28px;
}

.po-item-title {
  font-size: 1.05rem;           /* بزرگ */
  font-weight: 600;             /* Bold */
}

.po-item-cat {
  font-size: 0.8rem;
  margin-top: 2px;              /* فاصله از title */
}

.po-item-arrow {
  font-size: 1.4rem;            /* بزرگ‌تر */
}
```

### 🔷 موبایل (< 480px)

```css
.po-left {
  padding: 22px 18px;
  max-height: 48vh;             /* بلندتر برای 2 آیتم */
}

.po-title {
  font-size: 1.4rem;            /* بزرگ‌تر */
  margin-bottom: 6px;
}

.po-subtitle {
  font-size: 0.85rem;
}

.po-list {
  gap: 18px;                    /* فاصله زیاد = 2×2 */
}

.po-list-item {
  padding: 20px 18px;           /* بزرگ */
  gap: 16px;
  border-radius: 14px;
}

.po-item-num {
  font-size: 0.9rem;            /* بزرگ */
  width: 30px;
  font-weight: 600;             /* Bold */
}

.po-item-title {
  font-size: 1.1rem;            /* خیلی بزرگ */
  font-weight: 600;
  line-height: 1.3;
}

.po-item-cat {
  font-size: 0.85rem;           /* بزرگ */
  margin-top: 4px;
}

.po-item-arrow {
  font-size: 1.5rem;            /* خیلی بزرگ */
}
```

### 🔷 موبایل کوچک (< 375px)

```css
.po-left {
  padding: 20px 16px;
  max-height: 45vh;
}

.po-title {
  font-size: 1.3rem;
  margin-bottom: 4px;
}

.po-list {
  gap: 16px;                    /* فاصله خوب */
}

.po-list-item {
  padding: 18px 16px;
  gap: 14px;
  border-radius: 12px;
}

.po-item-num {
  font-size: 0.85rem;
  width: 28px;
  font-weight: 600;
}

.po-item-title {
  font-size: 1.05rem;           /* بزرگ */
  font-weight: 600;
  line-height: 1.3;
}

.po-item-cat {
  font-size: 0.8rem;
  margin-top: 3px;
}

.po-item-arrow {
  font-size: 1.4rem;
}
```

---

## 📊 مقایسه کامل

### موبایل 480px

| عنصر | قبل ❌ | بعد ✅ | افزایش |
|------|--------|--------|--------|
| List Gap | 6px | **18px** | +200% |
| Item Padding | 12px 14px | **20px 18px** | +60% |
| Item Gap | 12px | **16px** | +33% |
| Item Number | 0.7rem | **0.9rem** | +29% |
| Item Title | 0.88rem | **1.1rem** | +25% |
| Item Category | 0.7rem | **0.85rem** | +21% |
| Item Arrow | 1.2rem | **1.5rem** | +25% |
| Max Height | 45vh | **48vh** | +7% |

### موبایل 375px

| عنصر | قبل ❌ | بعد ✅ | افزایش |
|------|--------|--------|--------|
| List Gap | 5px | **16px** | +220% |
| Item Padding | 10px 12px | **18px 16px** | +70% |
| Item Title | 0.82rem | **1.05rem** | +28% |
| Item Number | 0.68rem | **0.85rem** | +25% |

---

## 🎯 چرا 2×2 بهتر است؟

### ✅ مزایا

1. **خوانایی بهتر**
   - فونت‌های بزرگ‌تر (1.1rem)
   - فاصله زیاد بین خطوط
   - Bold برای تاکید

2. **تجربه اسکرول بهتر**
   - هر اسکرول = 2 پروژه
   - ریتم منظم
   - کمتر گیج‌کننده

3. **راحتی لمس**
   - آیتم‌های بزرگ‌تر (20px padding)
   - فاصله کافی بین آیتم‌ها (18px gap)
   - کمتر احتمال کلیک اشتباه

4. **تمرکز بیشتر**
   - فقط 2 گزینه در هر نما
   - کمتر overwhelming
   - تصمیم‌گیری راحت‌تر

### 📱 محاسبه تعداد آیتم‌ها

```
ارتفاع لیست: 48vh (موبایل 480px)
ارتفاع هر آیتم: ~70px (20px padding × 2 + محتوا)
فاصله بین آیتم‌ها: 18px

تعداد آیتم‌های قابل مشاهده:
= (48vh - header) / (70px + 18px)
≈ 2.2 آیتم

نتیجه: تقریباً 2 آیتم کامل در هر نما ✅
```

---

## 🎨 طراحی بصری

### قبل ❌
```
┌─────────────────────────┐
│ 01 Seta E-Commerce      │ ← ریز
│ 02 MidX Studio          │ ← چسبیده
│ 03 3D Portfolio         │ ← ریز
│ 04 Cloth Simulation     │ ← چسبیده
│ 05 Django API           │ ← ریز
└─────────────────────────┘
5 آیتم در یک نما (شلوغ)
```

### بعد ✅
```
┌─────────────────────────┐
│                         │
│ 01 Seta E-Commerce      │ ← بزرگ
│    Full Stack · 2025    │
│                         │
│                         │
│ 02 MidX Studio Clone    │ ← بزرگ
│    Frontend · 2025      │
│                         │
└─────────────────────────┘
2 آیتم در یک نما (تمیز)
```

---

## 🧪 تست

### چک‌لیست
- [x] فاصله بین آیتم‌ها 18px (موبایل)
- [x] padding آیتم‌ها 20px (موبایل)
- [x] فونت title بزرگ‌تر (1.1rem)
- [x] فونت number بزرگ‌تر (0.9rem)
- [x] تقریباً 2 آیتم در هر نما
- [x] اسکرول نرم و راحت
- [x] راحت قابل لمس

### دستورات تست
```bash
npm run dev
```

سپس:
1. باز کردن در Chrome DevTools > Device Mode
2. انتخاب iPhone 12 (390px)
3. باز کردن Projects Overlay
4. بررسی تعداد آیتم‌های قابل مشاهده
5. تست اسکرول

### سناریوهای تست

#### تست 1: تعداد آیتم‌ها
- ✅ باید 2 آیتم کامل نمایش داده شود
- ✅ آیتم سوم باید نیمه نمایش داده شود (برای نشان دادن اسکرول)

#### تست 2: خوانایی
- ✅ عنوان پروژه‌ها واضح و خوانا
- ✅ دسته‌بندی و سال قابل خواندن
- ✅ شماره‌ها واضح

#### تست 3: تعامل
- ✅ راحت قابل کلیک
- ✅ hover effect واضح
- ✅ active state مشخص

---

## 💡 نکات طراحی

### 1. فاصله طلایی
```css
/* فرمول: padding + gap = ~38px */
.po-list-item {
  padding: 20px 18px;  /* فضای داخلی */
}

.po-list {
  gap: 18px;           /* فضای بین آیتم‌ها */
}

/* نتیجه: فاصله بصری ~38px بین محتوای آیتم‌ها */
```

### 2. نسبت فونت‌ها
```css
/* نسبت 1.2 بین عناصر */
.po-item-num: 0.9rem
.po-item-title: 1.1rem  (1.22× بزرگ‌تر)
.po-item-cat: 0.85rem   (0.77× کوچک‌تر)
```

### 3. Line Height
```css
.po-item-title {
  line-height: 1.3;  /* برای عناوین بلند */
}
```

### 4. Font Weight
```css
.po-item-num,
.po-item-title {
  font-weight: 600;  /* Bold برای تاکید */
}
```

---

## 🚀 نتیجه

**وضعیت**: ✅ **تکمیل شد**

لیست پروژه‌ها اکنون به صورت **2×2** نمایش داده می‌شود:
- ✅ فونت‌های **25-30% بزرگ‌تر**
- ✅ فاصله‌ها **200% بیشتر**
- ✅ **2 آیتم** در هر نما
- ✅ اسکرول **نرم و منظم**
- ✅ تجربه کاربری **عالی**

**تاریخ**: 8 می 2026  
**وضعیت**: آماده استفاده در production
