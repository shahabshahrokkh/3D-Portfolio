# اضافه شدن Camera Focus به قفسه کتاب 📷

## ✅ تغییرات اعمال شده

قفسه کتاب حالا **interactable** است و دوربین می‌تواند روی آن focus کند.

---

## 🎯 عملکرد

### قبل:
- ❌ کلیک روی قفسه → هیچ اتفاقی نمی‌افتد
- ❌ دوربین focus نمی‌کند

### بعد:
- ✅ کلیک روی قفسه → دوربین focus می‌کند
- ✅ نمایش پیام: "📚 Programming Languages"
- ✅ نمای نزدیک به آیکون‌های برنامه‌نویسی

---

## 📝 فایل‌های تغییر یافته

### 1. `src/utils/config.js`

**قبل:**
```javascript
bookshelf: {
  type: 'environment'  // غیرقابل تعامل
}
```

**بعد:**
```javascript
bookshelf: {
  type: 'interactable',      // قابل تعامل ✅
  action: 'focusBookshelf'   // action مشخص ✅
}
```

---

### 2. `src/interactions/hotspots.js`

**اضافه شده:**
```javascript
focusBookshelf: () => {
  // Just focus on the bookshelf to see the programming icons
  showUI('📚 Programming Languages');
}
```

---

## 🎮 نحوه استفاده

### دسکتاپ:
1. موس را روی قفسه ببرید
2. Cursor به pointer تبدیل می‌شود
3. قفسه کمی بزرگ می‌شود (hover effect)
4. کلیک کنید
5. دوربین روی قفسه focus می‌کند
6. پیام "📚 Programming Languages" نمایش داده می‌شود

### موبایل:
1. روی قفسه تپ کنید
2. Haptic feedback (لرزش 50ms)
3. دوربین روی قفسه focus می‌کند
4. پیام "📚 Programming Languages" نمایش داده می‌شود

---

## 🔧 جزئیات تکنیکی

### Camera Focus:
```javascript
// در raycaster.js - خودکار انجام می‌شود
focusOnObject(targetGroup);
```

**پارامترهای Focus:**
- **Distance:** فاصله مناسب از شیء
- **Duration:** مدت زمان انیمیشن (معمولاً 1-1.5 ثانیه)
- **Easing:** نرم و طبیعی

### Hover Effect:
```javascript
// Scale up 5% on hover
const hoverScale = baseScale * 1.05;
```

### Interactable Registration:
```javascript
// در helpers_v2.js - خودکار انجام می‌شود
ModelRegistry.registerInteractable(mesh);
```

---

## 💡 سفارشی‌سازی

### تغییر پیام نمایشی:

```javascript
// در hotspots.js
focusBookshelf: () => {
  showUI('📚 My Tech Stack'); // ← تغییر دهید
}
```

**پیام‌های پیشنهادی:**
```javascript
'📚 Programming Languages'     // فعلی ✅
'💻 Tech Stack'
'🛠️ My Tools'
'⚡ Technologies I Use'
'🎨 Skills & Technologies'
```

---

### اضافه کردن عملکرد بیشتر:

```javascript
focusBookshelf: () => {
  showUI('📚 Programming Languages');
  
  // مثال: باز کردن overlay با اطلاعات تکنولوژی‌ها
  // openTechStackOverlay();
  
  // مثال: انیمیشن آیکون‌ها
  // animateProgrammingIcons();
  
  // مثال: نمایش tooltip برای هر آیکون
  // showIconTooltips();
}
```

---

## 🎨 افکت‌های بصری

### Hover Effect:
- ✅ Scale: 1.0 → 1.05 (5% بزرگ‌تر)
- ✅ Duration: 0.3s
- ✅ Easing: power2.out

### Emissive Highlight:
- ✅ Color: نور آبی فسفری روشن‌تر می‌شود
- ✅ Intensity: افزایش موقت

### Cursor:
- ✅ Default → Pointer

---

## 🧪 تست

```bash
npm run dev
```

### چک‌لیست:
- [ ] موس روی قفسه → cursor تغییر می‌کند
- [ ] موس روی قفسه → قفسه کمی بزرگ می‌شود
- [ ] کلیک روی قفسه → دوربین focus می‌کند
- [ ] پیام "📚 Programming Languages" نمایش داده می‌شود
- [ ] در موبایل: تپ → haptic feedback + focus

---

## 🔍 مقایسه با سایر اشیاء

| شیء | Type | Action | Camera Focus |
|-----|------|--------|--------------|
| تخت | interactable | openAbout | ✅ |
| گربه | interactable | playCatAnimation | ✅ |
| آرکید | interactable | playArcade | ✅ |
| میز | environment | - | ❌ |
| لپ‌تاپ | interactable | openProjects | ✅ |
| گوشی | interactable | openContact | ✅ |
| وایتبورد | interactable | openWhiteboard | ✅ |
| **قفسه کتاب** | **interactable** | **focusBookshelf** | **✅** |

---

## 💡 ایده‌های توسعه

### 1. Overlay اطلاعات تکنولوژی:
```javascript
focusBookshelf: () => {
  showUI('📚 Programming Languages');
  openTechStackOverlay(); // نمایش overlay با جزئیات
}
```

### 2. انیمیشن آیکون‌ها:
```javascript
focusBookshelf: () => {
  showUI('📚 Programming Languages');
  // آیکون‌ها به آرامی می‌چرخند یا bounce می‌کنند
  animateIcons();
}
```

### 3. Tooltip برای هر آیکون:
```javascript
// کلیک روی هر آیکون → نمایش اطلاعات
pythonIcon: {
  type: 'interactable',
  action: 'showPythonInfo'
}
```

### 4. Progress Bar مهارت:
```javascript
// نمایش سطح مهارت برای هر تکنولوژی
showSkillLevel('Python', 90);
showSkillLevel('React', 85);
showSkillLevel('HTML/CSS/JS', 95);
```

---

## 🎯 Camera Focus Settings

اگر می‌خواهید تنظیمات focus را تغییر دهید:

```javascript
// در cameraTransitions.js
focusOnObject(object, {
  distance: 3,      // فاصله از شیء
  duration: 1.5,    // مدت زمان انیمیشن
  offset: {         // offset دوربین
    x: 0,
    y: 0.5,
    z: 0
  }
});
```

---

## 📝 خلاصه تغییرات

### فایل‌های تغییر یافته:
1. ✅ `src/utils/config.js` - تغییر type به interactable
2. ✅ `src/interactions/hotspots.js` - اضافه شدن action

### تغییرات:
- **Type:** environment → interactable
- **Action:** - → focusBookshelf
- **Camera Focus:** ❌ → ✅
- **Hover Effect:** ❌ → ✅
- **Clickable:** ❌ → ✅

---

## 🔧 عیب‌یابی

### مشکل: کلیک کار نمی‌کند
**راه‌حل:**
1. بررسی Console برای خطا
2. مطمئن شوید `type: 'interactable'`
3. مطمئن شوید action در hotspots تعریف شده

### مشکل: دوربین focus نمی‌کند
**راه‌حل:**
1. بررسی `focusOnObject` در raycaster.js
2. بررسی موقعیت قفسه در صحنه
3. بررسی OrbitControls فعال است

### مشکل: Hover effect کار نمی‌کند
**راه‌حل:**
1. بررسی raycaster threshold
2. بررسی Material های قفسه
3. بررسی `registerInteractable` فراخوانی شده

---

**تاریخ:** 9 مه 2026  
**وضعیت:** ✅ Camera focus اضافه شد  
**Type:** interactable  
**Action:** focusBookshelf  
**پیام:** 📚 Programming Languages

