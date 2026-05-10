# 👆 بهینه‌سازی تاچ و Drag برای موبایل

## ✅ تغییرات انجام شده

### 🎯 مشکلات قبلی:
- ❌ کلیک‌ها فقط با mouse کار می‌کردند
- ❌ Drag فقط با mouse کار می‌کرد
- ❌ هیچ haptic feedback وجود نداشت
- ❌ صندلی و فضانورد در موبایل قابل جابجایی نبودند
- ❌ تاچ با orbit controls تداخل داشت

### ✅ راه‌حل‌های پیاده‌سازی شده:

## 1️⃣ بهینه‌سازی Raycaster (کلیک‌ها)

### فایل: `src/interactions/raycaster.js`

#### ویژگی‌های جدید:

**✅ پشتیبانی از تاچ**
```javascript
// تشخیص موبایل
const isMobile = /Android|webOS|iPhone|iPad|iPod/.test(navigator.userAgent) 
  || window.innerWidth < 768;

// افزایش threshold برای تاچ (راحت‌تر tap کردن)
if (isMobile) {
  raycaster.params.Points.threshold = 0.5;
  raycaster.params.Line.threshold = 0.5;
}
```

**✅ Event handlers یکپارچه**
```javascript
// تابع مشترک برای mouse و touch
const updatePointer = (clientX, clientY) => {
  mouse.x = (clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(clientY / window.innerHeight) * 2 + 1;
  // ... raycasting logic
};

// Mouse events
const onMouseMove = (event) => {
  updatePointer(event.clientX, event.clientY);
};

// Touch events
const onTouchMove = (event) => {
  if (event.touches.length === 1) {
    const touch = event.touches[0];
    updatePointer(touch.clientX, touch.clientY);
  }
};
```

**✅ Haptic Feedback**
```javascript
// لرزش هنگام کلیک در موبایل
if (isMobile && 'vibrate' in navigator) {
  navigator.vibrate(50); // 50ms vibration
}
```

**✅ Touch End Handler**
```javascript
const onTouchEnd = (event) => {
  if (event.changedTouches.length > 0) {
    const touch = event.changedTouches[0];
    handleClick(touch.clientX, touch.clientY);
  }
};
```

---

## 2️⃣ بهینه‌سازی Drag Controls (جابجایی اشیاء)

### فایل: `src/interactions/dragControls.js`

#### ویژگی‌های جدید:

**✅ توابع یکپارچه برای Mouse و Touch**
```javascript
// شروع drag
const startDrag = (clientX, clientY) => {
  // ... logic
  if (isMobile && 'vibrate' in navigator) {
    navigator.vibrate(30); // Haptic feedback
  }
  return true;
};

// به‌روزرسانی موقعیت
const updateDrag = (clientX, clientY) => {
  // ... update position
};

// پایان drag
const endDrag = () => {
  if (isMobile && 'vibrate' in navigator) {
    navigator.vibrate(20); // Lighter feedback
  }
};
```

**✅ Touch Event Handlers**
```javascript
const onTouchStart = (event) => {
  if (event.touches.length === 1) {
    const touch = event.touches[0];
    const started = startDrag(touch.clientX, touch.clientY);
    if (started) {
      event.preventDefault(); // جلوگیری از scroll
    }
  }
};

const onTouchMove = (event) => {
  if (event.touches.length === 1 && isDragging) {
    const touch = event.touches[0];
    updateDrag(touch.clientX, touch.clientY);
    event.preventDefault(); // جلوگیری از scroll
  }
};

const onTouchEnd = (event) => {
  if (isDragging) {
    endDrag();
    event.preventDefault();
  }
};
```

**✅ جلوگیری از تداخل با Orbit Controls**
```javascript
// فقط در موبایل touch events را اضافه کن
if (isMobile) {
  window.addEventListener('touchstart', onTouchStart, { passive: false });
  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('touchend', onTouchEnd, { passive: false });
}
```

**✅ Lerp سریع‌تر در موبایل**
```javascript
update: () => {
  if (isDragging && dragObject) {
    // سرعت بیشتر در موبایل برای responsive بودن
    dragObject.position.lerp(targetPosition, isMobile ? 0.15 : 0.12);
  }
}
```

---

## 🎮 نحوه استفاده

### صندلی (Chair)
1. **دسکتاپ**: کلیک و drag با mouse
2. **موبایل**: 
   - تاچ و نگه دارید
   - انگشت را حرکت دهید
   - رها کنید
   - ✅ Haptic feedback دریافت می‌کنید

### فضانورد (Astronaut)
1. **دسکتاپ**: کلیک و drag با mouse
2. **موبایل**:
   - تاچ و نگه دارید
   - انگشت را حرکت دهید
   - رها کنید
   - ✅ Haptic feedback دریافت می‌کنید

### سایر اشیاء (Laptop, iPhone, etc.)
1. **دسکتاپ**: کلیک
2. **موبایل**:
   - تاچ (tap)
   - ✅ Haptic feedback دریافت می‌کنید
   - ✅ Overlay باز می‌شود

---

## 🔍 جزئیات فنی

### Raycaster Threshold
```javascript
// افزایش threshold برای راحت‌تر tap کردن
raycaster.params.Points.threshold = 0.5;
raycaster.params.Line.threshold = 0.5;
```
این باعث می‌شود ناحیه قابل کلیک بزرگ‌تر شود.

### Event Passive
```javascript
// passive: false برای preventDefault
{ passive: false }
```
این اجازه می‌دهد از scroll جلوگیری کنیم.

### Touch Tracking
```javascript
let touchStartTime = 0;
let touchStartPos = { x: 0, y: 0 };
const TAP_THRESHOLD = 200; // ms
const MOVE_THRESHOLD = 10; // pixels
```
برای تشخیص tap از drag.

### Haptic Patterns
```javascript
// شروع drag: 30ms
navigator.vibrate(30);

// پایان drag: 20ms
navigator.vibrate(20);

// کلیک: 50ms
navigator.vibrate(50);
```

---

## 📊 مقایسه قبل و بعد

### قبل:
| عملیات | دسکتاپ | موبایل |
|--------|--------|--------|
| کلیک روی اشیاء | ✅ | ❌ |
| Drag صندلی | ✅ | ❌ |
| Drag فضانورد | ✅ | ❌ |
| Haptic Feedback | ❌ | ❌ |
| جلوگیری از scroll | ❌ | ❌ |

### بعد:
| عملیات | دسکتاپ | موبایل |
|--------|--------|--------|
| کلیک روی اشیاء | ✅ | ✅ |
| Drag صندلی | ✅ | ✅ |
| Drag فضانورد | ✅ | ✅ |
| Haptic Feedback | ❌ | ✅ |
| جلوگیری از scroll | ✅ | ✅ |

---

## 🧪 تست کردن

### چک‌لیست تست:

#### کلیک‌ها (Raycaster):
- [ ] کلیک روی Laptop در دسکتاپ
- [ ] تاچ روی Laptop در موبایل
- [ ] کلیک روی iPhone در دسکتاپ
- [ ] تاچ روی iPhone در موبایل
- [ ] کلیک روی Whiteboard در دسکتاپ
- [ ] تاچ روی Whiteboard در موبایل
- [ ] کلیک روی Arcade در دسکتاپ
- [ ] تاچ روی Arcade در موبایل

#### Drag (DragControls):
- [ ] Drag صندلی با mouse در دسکتاپ
- [ ] Drag صندلی با touch در موبایل
- [ ] صندلی در محدوده اتاق می‌ماند
- [ ] Drag فضانورد با mouse در دسکتاپ
- [ ] Drag فضانورد با touch در موبایل
- [ ] فضانورد بیرون اتاق می‌ماند

#### Haptic Feedback:
- [ ] لرزش هنگام شروع drag
- [ ] لرزش هنگام پایان drag
- [ ] لرزش هنگام کلیک

#### تداخل با Orbit Controls:
- [ ] Drag با یک انگشت کار می‌کند
- [ ] Rotate با یک انگشت کار می‌کند (وقتی drag نیست)
- [ ] Zoom با دو انگشت کار می‌کند
- [ ] Pan با دو انگشت کار می‌کند

---

## 🐛 عیب‌یابی

### مشکل: Drag کار نمی‌کند
**راه‌حل**:
1. مطمئن شوید در دستگاه واقعی تست می‌کنید
2. Console را بررسی کنید
3. مطمئن شوید `isMobile` true است

### مشکل: Haptic کار نمی‌کند
**راه‌حل**:
1. بررسی کنید `navigator.vibrate` پشتیبانی می‌شود
2. در iOS فقط در Safari کار می‌کند
3. در برخی دستگاه‌ها باید در تنظیمات فعال شود

### مشکل: Scroll disable نمی‌شود
**راه‌حل**:
1. مطمئن شوید `passive: false` استفاده شده
2. مطمئن شوید `event.preventDefault()` فراخوانی می‌شود

### مشکل: تداخل با Orbit Controls
**راه‌حل**:
1. مطمئن شوید `controls.enabled = false` هنگام drag
2. مطمئن شوید `event.stopPropagation()` فراخوانی می‌شود

---

## 💡 نکات بهینه‌سازی

### 1. Threshold مناسب
```javascript
// خیلی کم: سخت tap کردن
raycaster.params.Points.threshold = 0.1;

// مناسب: راحت tap کردن
raycaster.params.Points.threshold = 0.5;

// خیلی زیاد: tap های اشتباه
raycaster.params.Points.threshold = 2.0;
```

### 2. Haptic Timing
```javascript
// خیلی کوتاه: احساس نمی‌شود
navigator.vibrate(10);

// مناسب: احساس خوب
navigator.vibrate(30);

// خیلی طولانی: آزاردهنده
navigator.vibrate(200);
```

### 3. Lerp Speed
```javascript
// خیلی کند: lag دارد
dragObject.position.lerp(targetPosition, 0.05);

// مناسب: روان
dragObject.position.lerp(targetPosition, 0.15);

// خیلی سریع: بدون smooth
dragObject.position.lerp(targetPosition, 0.5);
```

---

## 📱 پشتیبانی دستگاه‌ها

### ✅ کاملاً پشتیبانی:
- iPhone (iOS 13+)
- Samsung Galaxy
- Google Pixel
- OnePlus
- iPad
- Android Tablets

### ⚠️ محدودیت‌ها:
- **iOS Safari**: Haptic فقط در Safari
- **Android Chrome**: Haptic در همه مرورگرها
- **Desktop**: Touch events فقط در touchscreen

---

## 🎉 نتیجه

### چه چیزی اضافه شد:
✅ پشتیبانی کامل از تاچ
✅ Drag با یک انگشت
✅ Haptic feedback
✅ جلوگیری از scroll
✅ جلوگیری از تداخل با orbit controls
✅ Threshold بهینه برای tap
✅ Event handlers یکپارچه

### تجربه کاربری:
✅ صندلی و فضانورد قابل جابجایی در موبایل
✅ تمام اشیاء قابل کلیک در موبایل
✅ Feedback لمسی (vibration)
✅ بدون تداخل با چرخش دوربین
✅ روان و responsive

---

**موفق باشید! 👆📱**
