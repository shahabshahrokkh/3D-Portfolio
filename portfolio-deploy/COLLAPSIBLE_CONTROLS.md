# 📱 راهنمای کنترل پنل کشویی موبایل

## 📋 خلاصه
کنترل پنل موبایل اکنون به صورت کشویی (Collapsible) طراحی شده است تا فضای صفحه را اشغال نکند. کاربر می‌تواند با کلیک روی دکمه همبرگر منو (3 خط) کنترل‌ها را باز یا بسته کند.

---

## ✨ ویژگی‌های اصلی

### 🎯 دکمه Toggle (همبرگر منو)
- **آیکون 3 خطی**: نمایش حالت بسته
- **آیکون X**: نمایش حالت باز (انیمیشن تبدیل خطوط)
- **متن "Controls"**: راهنمای کاربر
- **طراحی شناور**: دکمه کوچک در گوشه پایین راست
- **بازخورد لمسی**: ویبره 30ms هنگام کلیک

### 📦 محتوای کشویی
- **حالت بسته**: مخفی، بدون اشغال فضا
- **حالت باز**: نمایش کامل راهنمای کنترل‌ها
- **انیمیشن نرم**: استفاده از cubic-bezier برای حرکت طبیعی
- **ذخیره وضعیت**: حفظ حالت باز/بسته در localStorage

---

## 🎨 طراحی UI

### دکمه Toggle
```
┌─────────────────────┐
│  ≡  Controls        │  ← حالت بسته
└─────────────────────┘

┌─────────────────────┐
│  ✕  Controls        │  ← حالت باز
└─────────────────────┘
```

### پنل باز شده
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

---

## 🔧 پیاده‌سازی فنی

### 1️⃣ ساختار HTML (`index.html`)

```html
<aside id="control-panel-mobile" class="mobile-controls">
  <!-- دکمه Toggle -->
  <button id="control-toggle-btn" class="control-toggle">
    <span class="hamburger-icon">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </span>
    <span class="toggle-text">Controls</span>
  </button>
  
  <!-- محتوای کشویی -->
  <div id="control-content" class="control-content collapsed">
    <!-- راهنمای کنترل‌ها -->
  </div>
</aside>
```

### 2️⃣ استایل CSS (`src/ui/controls.css`)

#### دکمه Toggle
```css
.control-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(10, 10, 15, 0.9);
  border: 1px solid rgba(79, 172, 254, 0.4);
  border-radius: 50px;
  padding: 12px 20px;
  color: #4facfe;
  /* ... */
}
```

#### آیکون همبرگر
```css
.hamburger-icon {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 18px;
  height: 14px;
}

.hamburger-icon .line {
  width: 100%;
  height: 2px;
  background: #4facfe;
  transition: all 0.3s ease;
}
```

#### انیمیشن تبدیل به X
```css
.control-toggle.expanded .hamburger-icon .line:nth-child(1) {
  transform: translateY(5px) rotate(45deg);
}

.control-toggle.expanded .hamburger-icon .line:nth-child(2) {
  opacity: 0;
}

.control-toggle.expanded .hamburger-icon .line:nth-child(3) {
  transform: translateY(-5px) rotate(-45deg);
}
```

#### محتوای کشویی
```css
/* حالت بسته */
.control-content.collapsed {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
  pointer-events: none;
  max-height: 0;
  padding: 0 16px;
  margin-top: 0;
  border-width: 0;
}

/* حالت باز */
.control-content.expanded {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: all;
  max-height: 500px;
  padding: 16px;
  margin-top: 10px;
  border-width: 1px;
}
```

### 3️⃣ منطق JavaScript (`src/main.js`)

```javascript
// Mobile Control Panel Toggle
const controlToggleBtn = document.getElementById('control-toggle-btn');
const controlContent = document.getElementById('control-content');

if (controlToggleBtn && controlContent) {
  // بارگذاری وضعیت ذخیره شده
  const savedState = localStorage.getItem('mobileControlsExpanded');
  if (savedState === 'true') {
    controlContent.classList.remove('collapsed');
    controlContent.classList.add('expanded');
    controlToggleBtn.classList.add('expanded');
  }

  // رویداد کلیک
  controlToggleBtn.addEventListener('click', () => {
    const isCollapsed = controlContent.classList.contains('collapsed');
    
    if (isCollapsed) {
      // باز کردن
      controlContent.classList.remove('collapsed');
      controlContent.classList.add('expanded');
      controlToggleBtn.classList.add('expanded');
      localStorage.setItem('mobileControlsExpanded', 'true');
    } else {
      // بستن
      controlContent.classList.remove('expanded');
      controlContent.classList.add('collapsed');
      controlToggleBtn.classList.remove('expanded');
      localStorage.setItem('mobileControlsExpanded', 'false');
    }

    // بازخورد لمسی
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  });
}
```

---

## 🎬 انیمیشن‌ها

### 1. انیمیشن دکمه Toggle
- **Scale**: کوچک شدن هنگام کلیک (0.95)
- **Duration**: 0.3s
- **Easing**: ease

### 2. انیمیشن همبرگر → X
- **خط 1**: چرخش 45 درجه + حرکت پایین
- **خط 2**: محو شدن (opacity: 0)
- **خط 3**: چرخش -45 درجه + حرکت بالا
- **Duration**: 0.3s

### 3. انیمیشن محتوای کشویی
- **Opacity**: 0 → 1 (باز) / 1 → 0 (بسته)
- **Transform**: translateY + scale
- **Max-height**: 0 → 500px (باز) / 500px → 0 (بسته)
- **Padding**: انیمیشن برای جلوگیری از جهش
- **Duration**: 0.3s
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)

---

## 💾 ذخیره وضعیت

### localStorage
```javascript
// ذخیره وضعیت
localStorage.setItem('mobileControlsExpanded', 'true');  // باز
localStorage.setItem('mobileControlsExpanded', 'false'); // بسته

// بارگذاری وضعیت
const savedState = localStorage.getItem('mobileControlsExpanded');
```

### مزایا
- ✅ حفظ ترجیح کاربر بین بازدیدها
- ✅ تجربه کاربری بهتر
- ✅ کاهش تعامل غیرضروری

---

## 📱 Responsive Design

### موبایل عمودی (Portrait)
```css
@media (max-width: 480px) {
  #control-panel-mobile {
    max-width: 300px;
  }
  
  .control-content {
    width: 340px;
  }
}
```

### موبایل افقی (Landscape)
```css
@media (max-width: 768px) and (orientation: landscape) {
  #control-panel-mobile {
    max-width: 280px;
    padding: 12px;
  }
}
```

### دستگاه‌های کوچک
```css
@media (max-width: 375px) {
  #control-panel-mobile {
    width: calc(100% - 16px);
    max-width: 280px;
  }
}
```

---

## 🎯 تجربه کاربری (UX)

### مزایا
1. **صرفه‌جویی در فضا**: پنل در حالت بسته فضا نمی‌گیرد
2. **دسترسی آسان**: دکمه همیشه قابل مشاهده است
3. **انیمیشن نرم**: حرکت طبیعی و چشم‌نواز
4. **بازخورد لمسی**: ویبره برای تایید عملیات
5. **حفظ وضعیت**: یادآوری ترجیح کاربر

### رفتار پیش‌فرض
- **بار اول**: پنل بسته است (collapsed)
- **بارهای بعدی**: وضعیت قبلی حفظ می‌شود

---

## 🧪 تست

### چک‌لیست تست
- [ ] دکمه toggle کار می‌کند
- [ ] انیمیشن همبرگر → X صحیح است
- [ ] پنل به صورت نرم باز/بسته می‌شود
- [ ] ویبره در موبایل کار می‌کند
- [ ] وضعیت در localStorage ذخیره می‌شود
- [ ] دکمه RESET VIEW کار می‌کند
- [ ] در سایزهای مختلف responsive است
- [ ] در حالت landscape صحیح نمایش داده می‌شود

### دستورات تست
```bash
# اجرای پروژه
npm run dev

# باز کردن در موبایل
# استفاده از Chrome DevTools > Device Mode
# یا اسکن QR code برای تست روی دستگاه واقعی
```

---

## 🐛 رفع مشکلات

### مشکل: انیمیشن کار نمی‌کند
**راه‌حل**: بررسی کنید که `transition` در CSS تعریف شده باشد:
```css
.control-content {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### مشکل: وضعیت ذخیره نمی‌شود
**راه‌حل**: بررسی کنید که localStorage در مرورگر فعال باشد:
```javascript
if (typeof(Storage) !== "undefined") {
  // localStorage موجود است
}
```

### مشکل: ویبره کار نمی‌کند
**راه‌حل**: ویبره فقط در HTTPS یا localhost کار می‌کند:
```javascript
if ('vibrate' in navigator) {
  navigator.vibrate(30);
}
```

### مشکل: پنل در دسکتاپ نمایش داده می‌شود
**راه‌حل**: بررسی media query:
```css
@media (min-width: 769px) {
  #control-panel-mobile {
    display: none !important;
  }
}
```

---

## 📊 مقایسه قبل و بعد

### ❌ قبل
- پنل همیشه باز بود
- فضای زیادی اشغال می‌کرد
- مزاحم تجربه 3D بود
- وضعیت ذخیره نمی‌شد

### ✅ بعد
- پنل کشویی و قابل کنترل
- فضای کمتری اشغال می‌کند
- تجربه تمیزتر و حرفه‌ای‌تر
- وضعیت ذخیره می‌شود
- انیمیشن‌های نرم و زیبا

---

## 🎨 تم رنگی

### موبایل (آبی)
- **Primary**: `#4facfe` (آبی روشن)
- **Border**: `rgba(79, 172, 254, 0.4)`
- **Background**: `rgba(10, 10, 15, 0.9)`
- **Hover**: `rgba(79, 172, 254, 0.1)`

### دسکتاپ (سبز)
- **Primary**: `#00ff41` (سبز نئون)
- **Border**: `rgba(0, 255, 65, 0.2)`
- **Background**: `rgba(10, 10, 15, 0.6)`
- **Hover**: `rgba(0, 255, 65, 0.1)`

---

## 📚 فایل‌های مرتبط

1. **HTML**: `index.html` - ساختار پنل
2. **CSS**: `src/ui/controls.css` - استایل و انیمیشن
3. **JavaScript**: `src/main.js` - منطق toggle
4. **مستندات**: `CONTROL_PANEL_GUIDE.md` - راهنمای کامل

---

## ✅ وضعیت پیاده‌سازی

- [x] ساختار HTML
- [x] استایل CSS
- [x] انیمیشن همبرگر
- [x] منطق JavaScript
- [x] ذخیره وضعیت
- [x] بازخورد لمسی
- [x] Responsive design
- [x] مستندات فارسی

---

## 🚀 نتیجه

کنترل پنل موبایل اکنون به صورت کامل کشویی است و تجربه کاربری بهتری ارائه می‌دهد. کاربران می‌توانند با یک کلیک ساده راهنما را باز یا بسته کنند و فضای بیشتری برای تعامل با صحنه 3D داشته باشند.

**تاریخ تکمیل**: 8 می 2026
**وضعیت**: ✅ کامل و آماده استفاده
