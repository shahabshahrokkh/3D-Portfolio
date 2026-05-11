# اضافه کردن نورپردازی به بروشور رزومه

## ✅ تغییرات انجام شده

دو نور مختلف برای برجسته کردن بروشور روی تخت اضافه شد:

### 1. SpotLight (نور متمرکز)
نوری که از بالا به بروشور می‌تابد و آن را برجسته می‌کند.

### 2. PointLight (نور محیطی)
نوری که اطراف بروشور را روشن می‌کند و یک glow ملایم ایجاد می‌کند.

---

## جزئیات نورپردازی

### SpotLight (نور اصلی):
```javascript
const resumeLight = new THREE.SpotLight(
  0xffffff,      // رنگ: سفید
  2.5,           // شدت: متوسط تا قوی
  3,             // فاصله: 3 متر
  Math.PI / 6,   // زاویه: 30 درجه (مخروط نور)
  0.5,           // penumbra: نرمی لبه نور
  1              // decay: کاهش شدت با فاصله
);

// موقعیت: بالای بروشور
resumeLight.position.set(-5.8, 2.5, 0.3);

// هدف: مرکز بروشور
resumeLight.target.position.set(-5.8, 0.50, 0.3);

// سایه
resumeLight.castShadow = true;
resumeLight.shadow.mapSize.width = 512;
resumeLight.shadow.mapSize.height = 512;
```

**ویژگی‌ها:**
- 💡 نور متمرکز از بالا
- 🎯 دقیقاً روی بروشور
- 🌓 سایه می‌اندازد
- ⭕ مخروط نور 30 درجه

### PointLight (نور محیطی):
```javascript
const glowLight = new THREE.PointLight(
  0xffffcc,      // رنگ: زرد کرم ملایم
  1.2,           // شدت: متوسط
  1.5            // فاصله: 1.5 متر
);

// موقعیت: کمی بالای بروشور
glowLight.position.set(-5.8, 0.55, 0.3);
```

**ویژگی‌ها:**
- 🌟 نور دایره‌ای در همه جهات
- 💛 رنگ گرم و دلنشین
- ✨ ایجاد glow اطراف بروشور
- 🚫 بدون سایه (برای عملکرد بهتر)

---

## موقعیت‌ها

### بروشور:
```javascript
position: [-5.8, 0.50, 0.3]
```

### SpotLight:
```javascript
position: [-5.8, 2.5, 0.3]  // 2 متر بالاتر از بروشور
target:   [-5.8, 0.50, 0.3] // دقیقاً روی بروشور
```

### PointLight:
```javascript
position: [-5.8, 0.55, 0.3]  // 5cm بالاتر از بروشور
```

---

## تصویر نورپردازی

```
        💡 SpotLight
         │
         │ (2m بالا)
         │
         ▼
    ╱───────╲
   ╱  مخروط  ╲
  ╱    نور    ╲
 ╱─────────────╲
      ✨ Glow
    ┌─────────┐
    │ 📄 Resume│  ← بروشور روی تخت
    └─────────┘
    🛏️ Bed
```

---

## تنظیمات نور

### شدت نور:
```javascript
// SpotLight
intensity: 2.5  // قوی برای برجسته کردن

// PointLight
intensity: 1.2  // متوسط برای glow ملایم
```

### رنگ:
```javascript
// SpotLight
color: 0xffffff  // سفید خالص

// PointLight
color: 0xffffcc  // زرد کرم (گرم‌تر)
```

### فاصله تأثیر:
```javascript
// SpotLight
distance: 3      // 3 متر

// PointLight
distance: 1.5    // 1.5 متر (محلی‌تر)
```

---

## مقایسه قبل و بعد

### قبل (بدون نور اضافی):
```
🛏️ ┌─────────┐
   │ 📄      │  ← کم‌نور، مشخص نیست
   └─────────┘
```

### بعد (با نورپردازی):
```
      💡
       │
       ▼
🛏️ ┌─────────┐
   │ ✨📄✨  │  ← روشن و برجسته!
   └─────────┘
```

---

## تأثیرات بصری

### 1. برجسته‌سازی:
- ✅ بروشور از محیط اطراف متمایز می‌شود
- ✅ توجه کاربر جلب می‌شود
- ✅ راحت‌تر پیدا می‌شود

### 2. عمق:
- ✅ سایه ایجاد می‌شود
- ✅ احساس 3D بهتر
- ✅ واقع‌گرایی بیشتر

### 3. جو:
- ✅ نور گرم و دلنشین
- ✅ احساس اهمیت
- ✅ جذاب‌تر

---

## بهینه‌سازی

### Shadow Map:
```javascript
shadow.mapSize.width = 512;
shadow.mapSize.height = 512;
```
- رزولوشن متوسط برای تعادل بین کیفیت و عملکرد
- برای کیفیت بالاتر: 1024x1024
- برای عملکرد بهتر: 256x256

### Light Decay:
```javascript
decay: 1  // کاهش طبیعی شدت نور
```
- 0: بدون کاهش (غیرواقعی)
- 1: کاهش خطی (توصیه شده)
- 2: کاهش فیزیکی (واقع‌گرایانه‌تر)

---

## Debug و تنظیم

### فعال کردن Helper:
```javascript
// در resume.js، خط را uncomment کن:
const lightHelper = new THREE.SpotLightHelper(resumeLight);
scene.add(lightHelper);
```

این یک خط زرد نشان می‌دهد که نور از کجا می‌تابد و به کجا می‌رود.

### تنظیم شدت:
```javascript
// خیلی تاریک؟
resumeLight.intensity = 3.0;  // افزایش

// خیلی روشن؟
resumeLight.intensity = 2.0;  // کاهش
```

### تنظیم رنگ:
```javascript
// سفیدتر
glowLight.color.setHex(0xffffff);

// زردتر
glowLight.color.setHex(0xffdd88);

// آبی سرد
glowLight.color.setHex(0xccddff);
```

---

## کنسول Debug

```javascript
console.log('✅ [DEBUG] Resume texture and lighting applied');
```

این پیام در کنسول نشان می‌دهد که نورها با موفقیت اضافه شدند.

---

## تست

### چک‌لیست:
- [x] SpotLight اضافه شد
- [x] PointLight اضافه شد
- [x] نور روی بروشور می‌تابد
- [x] سایه ایجاد می‌شود
- [x] glow اطراف بروشور دیده می‌شود
- [x] بروشور برجسته‌تر است

### دستورات:
```bash
# Refresh صفحه
Ctrl + Shift + R

# بررسی
1. به سمت تخت برو
2. بروشور را پیدا کن
3. باید روشن‌تر و برجسته‌تر باشد
4. یک glow ملایم اطرافش دیده می‌شود
```

---

## سفارشی‌سازی

### نور قوی‌تر:
```javascript
resumeLight.intensity = 3.5;
glowLight.intensity = 1.8;
```

### نور ملایم‌تر:
```javascript
resumeLight.intensity = 1.8;
glowLight.intensity = 0.8;
```

### رنگ آبی سرد:
```javascript
const resumeLight = new THREE.SpotLight(0xccddff, 2.5, ...);
const glowLight = new THREE.PointLight(0xaaccff, 1.2, ...);
```

### بدون سایه (عملکرد بهتر):
```javascript
resumeLight.castShadow = false;
```

---

## خلاصه

🔦 **SpotLight:** نور متمرکز از بالا  
✨ **PointLight:** glow محیطی  
🎯 **موقعیت:** دقیقاً روی بروشور  
💡 **شدت:** متوسط تا قوی  
🌟 **نتیجه:** بروشور برجسته و مشخص  

🎉 **Refresh کن و ببین چقدر بهتر دیده می‌شود!** 🚀
