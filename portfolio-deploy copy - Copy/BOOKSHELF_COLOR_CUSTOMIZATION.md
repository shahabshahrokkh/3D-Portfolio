# سفارشی‌سازی رنگ قفسه کتاب 🎨

## ✅ تغییرات اعمال شده

رنگ قفسه کتاب و نور لبه‌هایش تغییر کرد تا با محیط اتاق سازگار باشد.

---

## 🎨 تغییرات رنگ

### 1. رنگ اصلی قفسه
**قبل:** رنگ اصلی مدل (احتماالاً روشن)  
**بعد:** خاکستری تیره (#2a2a2a) - مشابه تخت

### 2. نور لبه‌ها (Emissive)
**قبل:** قرمز (#ff0000)  
**بعد:** آبی فسفری / Cyan (#00ffff)

### 3. Material Properties
- **Roughness:** 0.8 (سطح مات، مشابه تخت)
- **Metalness:** 0.1 (کمتر فلزی)
- **Emissive Intensity:** 0.3 (شدت نور متعادل)

---

## 💻 کد پیاده‌سازی

```javascript
// در bookshelf.js
bookshelf.traverse((child) => {
    if (child.isMesh) {
        const material = child.material;
        
        if (material) {
            // تغییر نور لبه‌ها به آبی فسفری
            if (material.emissive) {
                material.emissive.setHex(0x00ffff); // Cyan
                material.emissiveIntensity = 0.3;
            }
            
            // تغییر رنگ اصلی به خاکستری تیره
            if (material.color) {
                material.color.setHex(0x2a2a2a); // Dark gray
            }
            
            // تنظیم roughness و metalness
            if (material.roughness !== undefined) {
                material.roughness = 0.8; // Matte
            }
            
            if (material.metalness !== undefined) {
                material.metalness = 0.1; // Less metallic
            }
        }
    }
});
```

---

## 🎨 پالت رنگی

### رنگ‌های پیشنهادی برای نور لبه‌ها:

| رنگ | Hex Code | توضیحات |
|-----|----------|---------|
| **آبی فسفری (Cyan)** | `0x00ffff` | ✅ فعلی - سازگار با محیط |
| آبی الکتریک | `0x0080ff` | روشن و انرژی‌بخش |
| بنفش نئون | `0x9d00ff` | مدرن و جذاب |
| سبز نئون | `0x00ff00` | Matrix style |
| صورتی نئون | `0xff00ff` | Cyberpunk |
| نارنجی | `0xff6600` | گرم و دوستانه |
| سفید آبی | `0xadd8e6` | ملایم و آرام |

### رنگ‌های پیشنهادی برای بدنه قفسه:

| رنگ | Hex Code | توضیحات |
|-----|----------|---------|
| **خاکستری تیره** | `0x2a2a2a` | ✅ فعلی - مشابه تخت |
| مشکی | `0x1a1a1a` | تیره‌تر |
| خاکستری متوسط | `0x4a4a4a` | روشن‌تر |
| قهوه‌ای تیره | `0x3d2817` | چوبی طبیعی |
| آبی تیره | `0x1a2332` | سرد و مدرن |
| سفید | `0xf0f0f0` | مینیمال و تمیز |

---

## 🔧 تنظیمات پیشرفته

### تغییر رنگ نور لبه‌ها:

```javascript
// آبی الکتریک
material.emissive.setHex(0x0080ff);

// بنفش نئون
material.emissive.setHex(0x9d00ff);

// سبز نئون
material.emissive.setHex(0x00ff00);
```

### تغییر شدت نور:

```javascript
// نور ملایم‌تر
material.emissiveIntensity = 0.2;

// نور قوی‌تر
material.emissiveIntensity = 0.5;

// نور خیلی قوی
material.emissiveIntensity = 0.8;
```

### تغییر رنگ بدنه:

```javascript
// مشکی
material.color.setHex(0x1a1a1a);

// قهوه‌ای چوبی
material.color.setHex(0x3d2817);

// سفید
material.color.setHex(0xf0f0f0);
```

### تغییر سطح (Roughness):

```javascript
// خیلی براق
material.roughness = 0.2;

// نیمه براق
material.roughness = 0.5;

// کاملاً مات (فعلی)
material.roughness = 0.8;
```

---

## 🎨 ترکیب‌های رنگی پیشنهادی

### 1. Cyberpunk Style:
```javascript
material.color.setHex(0x1a1a1a);        // مشکی
material.emissive.setHex(0xff00ff);     // صورتی نئون
material.emissiveIntensity = 0.5;
```

### 2. Matrix Style:
```javascript
material.color.setHex(0x0a0a0a);        // مشکی خیلی تیره
material.emissive.setHex(0x00ff00);     // سبز نئون
material.emissiveIntensity = 0.4;
```

### 3. Modern Blue:
```javascript
material.color.setHex(0x1a2332);        // آبی تیره
material.emissive.setHex(0x00ffff);     // آبی فسفری
material.emissiveIntensity = 0.3;
```

### 4. Warm Wood:
```javascript
material.color.setHex(0x3d2817);        // قهوه‌ای چوبی
material.emissive.setHex(0xff6600);     // نارنجی
material.emissiveIntensity = 0.2;
```

### 5. Minimal White:
```javascript
material.color.setHex(0xf0f0f0);        // سفید
material.emissive.setHex(0xadd8e6);     // آبی ملایم
material.emissiveIntensity = 0.15;
```

---

## 🔍 عیب‌یابی

### مشکل: رنگ تغییر نمی‌کند
**راه‌حل:**
1. بررسی Console برای خطا
2. مطمئن شوید مدل بارگذاری شده
3. بررسی کنید Material دارای property مورد نظر است

### مشکل: نور خیلی قوی است
**راه‌حل:**
```javascript
material.emissiveIntensity = 0.2; // کاهش شدت
```

### مشکل: نور دیده نمی‌شود
**راه‌حل:**
```javascript
material.emissiveIntensity = 0.5; // افزایش شدت
// یا بررسی کنید که نورپردازی صحنه مناسب است
```

### مشکل: رنگ با محیط سازگار نیست
**راه‌حل:**
- از رنگ‌های تیره‌تر استفاده کنید
- شدت نور را کاهش دهید
- از رنگ‌های سرد (آبی، سبز) استفاده کنید

---

## 🎯 سازگاری با محیط

### رنگ‌های موجود در صحنه:

| شیء | رنگ اصلی | نور |
|-----|----------|-----|
| تخت | خاکستری تیره | - |
| میز | قهوه‌ای/خاکستری | - |
| دیوار | خاکستری | - |
| **قفسه (جدید)** | خاکستری تیره | آبی فسفری |

### چرا آبی فسفری؟
- ✅ سازگار با تم تکنولوژی
- ✅ کنتراست خوب با خاکستری تیره
- ✅ مدرن و جذاب
- ✅ نور ملایم و چشم‌نواز
- ✅ مناسب برای قفسه آیکون‌های برنامه‌نویسی

---

## 💡 ایده‌های پیشرفته

### 1. انیمیشن نور:
```javascript
// در updateAnimations یا animate loop
const time = Date.now() * 0.001;
material.emissiveIntensity = 0.3 + Math.sin(time) * 0.1;
// نور به آرامی pulse می‌کند
```

### 2. نور متفاوت برای هر لبه:
```javascript
bookshelf.traverse((child) => {
    if (child.name.includes('edge_top')) {
        child.material.emissive.setHex(0x00ffff); // آبی
    } else if (child.name.includes('edge_bottom')) {
        child.material.emissive.setHex(0xff00ff); // صورتی
    }
});
```

### 3. تغییر رنگ بر اساس وقت روز:
```javascript
const hour = new Date().getHours();
if (hour >= 6 && hour < 18) {
    // روز - نور ملایم
    material.emissiveIntensity = 0.2;
} else {
    // شب - نور قوی‌تر
    material.emissiveIntensity = 0.4;
}
```

### 4. افکت Rainbow:
```javascript
const time = Date.now() * 0.001;
const hue = (time * 0.1) % 1;
material.emissive.setHSL(hue, 1, 0.5);
// رنگ به آرامی تغییر می‌کند
```

---

## 📝 خلاصه تغییرات

### فایل تغییر یافته:
- ✅ `src/objects/bookshelf.js`

### تغییرات:
1. **Import Three.js** برای دسترسی به THREE.Color
2. **Traverse مدل** برای یافتن همه Mesh ها
3. **تغییر emissive** به آبی فسفری (#00ffff)
4. **تغییر color** به خاکستری تیره (#2a2a2a)
5. **تنظیم roughness** به 0.8 (مات)
6. **تنظیم metalness** به 0.1 (کم فلزی)

---

## 🧪 تست

```bash
npm run dev
```

**انتظار:**
- ✅ قفسه با رنگ خاکستری تیره (مشابه تخت)
- ✅ لبه‌ها با نور آبی فسفری
- ✅ سطح مات و غیر براق
- ✅ سازگار با محیط اتاق

---

**تاریخ:** 9 مه 2026  
**وضعیت:** ✅ سفارشی‌سازی رنگ اعمال شد  
**رنگ بدنه:** خاکستری تیره (#2a2a2a)  
**رنگ نور:** آبی فسفری (#00ffff)

