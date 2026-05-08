# 🎮 راهنمای Control Panel - دسکتاپ و موبایل

## ✅ تغییرات انجام شده

### 🎯 مشکل قبلی:
- ❌ فقط یک Control Panel برای دسکتاپ
- ❌ متن‌ها مربوط به Mouse بود (Left Click, Right Click, Scroll)
- ❌ در موبایل گیج‌کننده بود
- ❌ آیکون‌ها مناسب تاچ نبود

### ✅ راه‌حل:
- ✅ دو نسخه جداگانه: Desktop و Mobile
- ✅ متن‌های مناسب برای هر دستگاه
- ✅ آیکون‌های emoji برای موبایل
- ✅ طراحی بهینه برای تاچ
- ✅ Haptic feedback برای دکمه Reset

---

## 📱 نسخه موبایل

### طراحی:
```
┌─────────────────────────────┐
│  👆 TOUCH CONTROLS          │
├─────────────────────────────┤
│  👆  Tap                    │
│      Select Objects         │
├─────────────────────────────┤
│  ☝️  One Finger             │
│      Rotate / Drag          │
├─────────────────────────────┤
│  ✌️  Two Fingers            │
│      Zoom / Pan             │
├─────────────────────────────┤
│  🔄 RESET VIEW              │
└─────────────────────────────┘
```

### ویژگی‌ها:
- ✅ آیکون‌های emoji واضح
- ✅ توضیحات کوتاه و مفید
- ✅ رنگ آبی (#4facfe) برای تمایز
- ✅ Background شفاف‌تر
- ✅ Border radius بیشتر (16px)
- ✅ Haptic feedback برای دکمه

---

## 🖥️ نسخه دسکتاپ

### طراحی:
```
┌─────────────────────────────┐
│        CONTROLS             │
├─────────────────────────────┤
│  Left Click  │ Drag/Select  │
│  Right Click │ Rotate Camera│
│  Scroll      │ Zoom In/Out  │
├─────────────────────────────┤
│       RESET VIEW            │
└─────────────────────────────┘
```

### ویژگی‌ها:
- ✅ متن‌های مربوط به Mouse
- ✅ رنگ سبز (#00ff41) Matrix style
- ✅ طراحی کلاسیک
- ✅ Hover effects

---

## 🎨 تفاوت‌های طراحی

### رنگ‌ها:
| المان | دسکتاپ | موبایل |
|--------|--------|--------|
| **Border** | سبز (#00ff41) | آبی (#4facfe) |
| **Text** | سبز (#00ff41) | آبی (#4facfe) |
| **Background** | rgba(10,10,15,0.6) | rgba(10,10,15,0.8) |
| **Blur** | 12px | 16px |

### اندازه‌ها:
| المان | دسکتاپ | موبایل |
|--------|--------|--------|
| **Width** | 250px | 340px (max) |
| **Padding** | 20px | 16px |
| **Border Radius** | 12px | 16px |
| **Font Size** | 0.85rem | 0.8rem |

### آیکون‌ها:
| عملیات | دسکتاپ | موبایل |
|--------|--------|--------|
| **Select** | "Left Click" | 👆 Tap |
| **Rotate** | "Right Click" | ☝️ One Finger |
| **Zoom** | "Scroll" | ✌️ Two Fingers |
| **Reset** | Text | 🔄 Icon + Text |

---

## 📊 نحوه کار

### Show/Hide Logic:
```css
/* Desktop (> 768px) */
#control-panel { display: block; }
#control-panel-mobile { display: none; }

/* Mobile (≤ 768px) */
#control-panel { display: none; }
#control-panel-mobile { display: block; }
```

### JavaScript:
```javascript
// Desktop Reset Button
const resetBtn = document.getElementById('reset-view-btn');
resetBtn.addEventListener('click', () => {
  controls.reset();
});

// Mobile Reset Button (با haptic)
const resetBtnMobile = document.getElementById('reset-view-btn-mobile');
resetBtnMobile.addEventListener('click', () => {
  controls.reset();
  navigator.vibrate(50); // Haptic feedback
});
```

---

## 🎯 محل قرارگیری

### دسکتاپ:
```
Position: fixed
Right: 15px
Bottom: 15px
```

### موبایل:

#### Portrait (عمودی):
```
Position: fixed
Right: 10px
Bottom: 10px
Width: calc(100% - 20px)
Max-width: 340px
```

#### Landscape (افقی):
```
Position: fixed
Right: 10px
Bottom: 10px
Max-width: 280px (کوچک‌تر)
```

#### Extra Small (< 375px):
```
Right: 8px
Bottom: 8px
Width: calc(100% - 16px)
Max-width: 280px
```

---

## 🧪 تست

### چک‌لیست دسکتاپ:
- [ ] Control panel در گوشه پایین راست
- [ ] متن "Left Click", "Right Click", "Scroll"
- [ ] رنگ سبز
- [ ] Hover effect کار می‌کند
- [ ] دکمه Reset کار می‌کند

### چک‌لیست موبایل:
- [ ] Control panel در گوشه پایین راست
- [ ] آیکون‌های emoji نمایش داده می‌شوند
- [ ] متن "Tap", "One Finger", "Two Fingers"
- [ ] رنگ آبی
- [ ] دکمه Reset با haptic کار می‌کند
- [ ] در landscape کوچک‌تر می‌شود

### تست Responsive:
```bash
npm run dev
```

1. باز کردن در دسکتاپ → Panel سبز با mouse controls ✓
2. F12 → Device Toolbar (Ctrl+Shift+M)
3. انتخاب iPhone → Panel آبی با touch controls ✓
4. چرخش به landscape → Panel کوچک‌تر می‌شود ✓
5. تست در دستگاه واقعی → همه چیز کار می‌کند ✓

---

## 💡 نکات طراحی

### 1. آیکون‌های Emoji
```html
👆 - Tap (انگشت اشاره)
☝️ - One Finger (انگشت بالا)
✌️ - Two Fingers (علامت پیروزی)
🔄 - Reset (چرخش)
```

**چرا emoji؟**
- ✅ واضح و قابل فهم
- ✅ بدون نیاز به فونت اضافی
- ✅ در تمام دستگاه‌ها کار می‌کند
- ✅ جذاب و مدرن

### 2. رنگ‌بندی
**دسکتاپ (سبز):**
- Matrix/Hacker style
- مناسب برای desktop
- حس تکنولوژی

**موبایل (آبی):**
- مدرن و دوستانه
- مناسب برای touch
- تمایز واضح از دسکتاپ

### 3. Layout
**دسکتاپ:**
- دو ستونه (Key | Description)
- فشرده و حرفه‌ای

**موبایل:**
- آیکون + متن عمودی
- فضای بیشتر برای tap
- راحت‌تر برای خواندن

---

## 🔧 شخصی‌سازی

### تغییر رنگ موبایل:
```css
/* در controls.css */
#control-panel-mobile {
  border: 1px solid rgba(255, 100, 100, 0.3); /* قرمز */
}

#control-panel-mobile .panel-header {
  color: #ff6464; /* قرمز */
}
```

### تغییر آیکون‌ها:
```html
<!-- در index.html -->
<span class="control-icon">🖱️</span> <!-- Mouse -->
<span class="control-icon">⌨️</span> <!-- Keyboard -->
<span class="control-icon">🎮</span> <!-- Gamepad -->
```

### تغییر محل قرارگیری:
```css
/* گوشه پایین چپ */
#control-panel-mobile {
  left: 10px;
  right: auto;
}

/* بالای صفحه */
#control-panel-mobile {
  top: 10px;
  bottom: auto;
}
```

---

## 📱 Responsive Breakpoints

```css
/* Desktop */
@media (min-width: 769px) { ... }

/* Tablet & Mobile */
@media (max-width: 768px) { ... }

/* Small Mobile */
@media (max-width: 480px) { ... }

/* Extra Small */
@media (max-width: 375px) { ... }

/* Landscape */
@media (max-width: 768px) and (orientation: landscape) { ... }
```

---

## 🎉 نتیجه

### قبل:
- ❌ یک panel برای همه
- ❌ متن‌های mouse در موبایل
- ❌ گیج‌کننده برای کاربران موبایل

### بعد:
- ✅ دو panel اختصاصی
- ✅ متن‌ها و آیکون‌های مناسب
- ✅ تجربه کاربری عالی
- ✅ واضح و قابل فهم

---

## 📚 فایل‌های مرتبط

### HTML:
- `index.html` (خط 56-90)

### CSS:
- `src/ui/controls.css` (کامل)

### JavaScript:
- `src/main.js` (خط 76-92)

---

**Control Panel شما اکنون کاملاً بهینه برای دسکتاپ و موبایل است! 🎮📱**

**موفق باشید! ✨**
