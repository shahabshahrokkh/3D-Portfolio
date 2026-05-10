# 📱 بهبود نمایش Projects در موبایل

## ❌ مشکل
لیست پروژه‌ها در نمای موبایل خیلی ریز و فشرده بود. فونت‌ها کوچک و خطوط به هم چسبیده بودند.

---

## ✅ راه‌حل

فونت‌ها، padding ها و gap ها در سه breakpoint مختلف بزرگ‌تر شدند.

---

## 📐 تغییرات به تفکیک Breakpoint

### 1️⃣ Tablet / موبایل بزرگ (< 768px)

#### لیست پروژه‌ها (چپ)
```css
.po-left {
  max-height: 50vh;        /* ← از 45vh */
  padding: 24px 20px 18px; /* ← از 20px 18px 15px */
}

.po-title {
  font-size: 1.5rem;       /* ← از 1.3rem */
}

.po-subtitle {
  font-size: 0.85rem;      /* ← از 0.75rem */
}

.po-list {
  gap: 8px;                /* ← اضافه شد */
}

.po-list-item {
  padding: 14px 16px;      /* ← از 10px 12px */
  gap: 14px;               /* ← اضافه شد */
}

.po-item-num {
  font-size: 0.75rem;      /* ← اضافه شد */
  width: 24px;             /* ← اضافه شد */
}

.po-item-title {
  font-size: 0.95rem;      /* ← از 0.82rem */
}

.po-item-cat {
  font-size: 0.75rem;      /* ← از 0.68rem */
}

.po-item-arrow {
  font-size: 1.3rem;       /* ← اضافه شد */
}
```

#### جزئیات پروژه (راست)
```css
.po-right {
  padding: 20px;           /* ← از 18px */
}

.po-detail-title {
  font-size: 1.25rem;      /* ← از 1.15rem */
}

.po-detail-desc {
  font-size: 0.85rem;      /* ← از 0.78rem */
  line-height: 1.8;        /* ← از 1.7 */
}

.po-btn {
  padding: 12px 18px;      /* ← از 9px 16px */
  font-size: 0.85rem;      /* ← از 0.78rem */
}
```

### 2️⃣ موبایل متوسط (< 480px)

```css
.po-container {
  padding: 12px;           /* ← از 10px */
  gap: 12px;               /* ← اضافه شد */
}

.po-left {
  padding: 20px 16px;      /* ← از 15px */
  max-height: 45vh;        /* ← از 40vh */
}

.po-title {
  font-size: 1.3rem;       /* ← از 1.1rem */
}

.po-subtitle {
  font-size: 0.8rem;       /* ← اضافه شد */
}

.po-list {
  gap: 6px;                /* ← اضافه شد */
}

.po-list-item {
  padding: 12px 14px;      /* ← از 8px 10px */
  gap: 12px;               /* ← از 8px */
}

.po-item-num {
  font-size: 0.7rem;       /* ← از 0.65rem */
  width: 22px;             /* ← از 18px */
}

.po-item-title {
  font-size: 0.88rem;      /* ← از 0.75rem */
}

.po-item-cat {
  font-size: 0.7rem;       /* ← از 0.62rem */
}

.po-item-arrow {
  font-size: 1.2rem;       /* ← اضافه شد */
}

.po-right {
  padding: 18px;           /* ← از 15px */
}

.po-detail-title {
  font-size: 1.15rem;      /* ← از 1rem */
}

.po-detail-desc {
  font-size: 0.8rem;       /* ← از 0.72rem */
  line-height: 1.7;        /* ← از 1.6 */
}

.po-tech-tag {
  font-size: 0.7rem;       /* ← از 0.65rem */
  padding: 5px 10px;       /* ← از 3px 8px */
}

.po-btn {
  padding: 12px;           /* ← از 10px */
  font-size: 0.85rem;      /* ← از 0.8rem */
}

.po-close-btn {
  padding: 12px;           /* ← اضافه شد */
  font-size: 0.85rem;      /* ← اضافه شد */
}
```

### 3️⃣ موبایل کوچک (< 375px) - جدید ✨

```css
.po-container {
  padding: 10px;
  gap: 10px;
}

.po-left {
  padding: 18px 14px;
  max-height: 42vh;
}

.po-title {
  font-size: 1.2rem;
}

.po-subtitle {
  font-size: 0.75rem;
}

.po-list {
  gap: 5px;
}

.po-list-item {
  padding: 10px 12px;
  gap: 10px;
}

.po-item-num {
  font-size: 0.68rem;
  width: 20px;
}

.po-item-title {
  font-size: 0.82rem;
}

.po-item-cat {
  font-size: 0.68rem;
}

.po-right {
  padding: 16px;
}

.po-detail-title {
  font-size: 1.05rem;
}

.po-detail-desc {
  font-size: 0.75rem;
}

.po-tech-tag {
  font-size: 0.68rem;
  padding: 4px 9px;
}

.po-btn {
  padding: 11px;
  font-size: 0.8rem;
}

.po-close-btn {
  padding: 11px;
  font-size: 0.8rem;
}
```

---

## 📊 مقایسه قبل و بعد

### لیست پروژه‌ها (480px)

| عنصر | قبل ❌ | بعد ✅ |
|------|--------|--------|
| Title | 1.1rem | 1.3rem |
| Item Padding | 8px 10px | 12px 14px |
| Item Gap | 8px | 12px |
| Item Title | 0.75rem | 0.88rem |
| Item Category | 0.62rem | 0.7rem |
| Item Number | 0.65rem | 0.7rem |

### جزئیات پروژه (480px)

| عنصر | قبل ❌ | بعد ✅ |
|------|--------|--------|
| Detail Title | 1rem | 1.15rem |
| Description | 0.72rem | 0.8rem |
| Tech Tag | 0.65rem | 0.7rem |
| Tech Padding | 3px 8px | 5px 10px |
| Button | 10px / 0.8rem | 12px / 0.85rem |

---

## 🎯 مزایا

### ✅ خوانایی بهتر
- فونت‌ها بزرگ‌تر و واضح‌تر
- خطوط از هم فاصله دارند
- راحت‌تر قابل کلیک

### ✅ تجربه کاربری بهتر
- لیست راحت‌تر قابل اسکرول
- دکمه‌ها بزرگ‌تر و راحت‌تر قابل لمس
- فضای کافی بین عناصر

### ✅ Responsive کامل
- سه breakpoint مختلف
- بهینه برای تمام سایزها
- از 375px تا 768px

---

## 📱 Breakpoints

| دستگاه | عرض | Title Size | Item Padding | Item Title |
|--------|-----|------------|--------------|------------|
| Tablet | < 768px | 1.5rem | 14px 16px | 0.95rem |
| Mobile | < 480px | 1.3rem | 12px 14px | 0.88rem |
| Small | < 375px | 1.2rem | 10px 12px | 0.82rem |

---

## 🧪 تست

### چک‌لیست
- [x] فونت‌ها بزرگ‌تر شدند
- [x] padding ها افزایش یافتند
- [x] gap ها بین آیتم‌ها اضافه شدند
- [x] دکمه‌ها راحت‌تر قابل لمس
- [x] در تمام سایزها responsive است

### دستورات تست
```bash
npm run dev
```

سپس در Chrome DevTools > Device Mode تست کنید:
- iPhone SE (375px)
- iPhone 12 (390px)
- iPhone 12 Pro Max (428px)
- Samsung Galaxy S20 (360px)
- iPad Mini (768px)

---

## 💡 نکات طراحی

### فاصله بین آیتم‌ها
```css
.po-list {
  gap: 8px;  /* Tablet */
  gap: 6px;  /* Mobile */
  gap: 5px;  /* Small */
}
```

### Padding آیتم‌ها
```css
.po-list-item {
  padding: 14px 16px;  /* Tablet - راحت برای لمس */
  padding: 12px 14px;  /* Mobile - متعادل */
  padding: 10px 12px;  /* Small - فشرده اما خوانا */
}
```

### سایز فونت‌ها
```css
/* قانون کلی: حداقل 0.7rem برای موبایل */
.po-item-title {
  font-size: 0.95rem;  /* Tablet */
  font-size: 0.88rem;  /* Mobile */
  font-size: 0.82rem;  /* Small */
}
```

---

## 🎨 بهبودهای بصری

### 1. فاصله بین خطوط
```css
.po-detail-desc {
  line-height: 1.8;  /* Tablet - راحت برای خواندن */
  line-height: 1.7;  /* Mobile - متعادل */
}
```

### 2. اندازه دکمه‌ها
```css
.po-btn {
  padding: 12px 18px;  /* Tablet */
  padding: 12px;       /* Mobile - full width */
  padding: 11px;       /* Small */
}
```

### 3. Tech Tags
```css
.po-tech-tag {
  padding: 5px 10px;   /* Mobile - قابل خواندن */
  padding: 4px 9px;    /* Small - فشرده */
}
```

---

## 🚀 نتیجه

**وضعیت**: ✅ **تکمیل شد**

لیست پروژه‌ها اکنون در موبایل کاملاً خوانا و قابل استفاده است. فونت‌ها بزرگ‌تر، فاصله‌ها مناسب و تجربه کاربری بهتر شده است.

**تاریخ**: 8 می 2026  
**وضعیت**: آماده استفاده
