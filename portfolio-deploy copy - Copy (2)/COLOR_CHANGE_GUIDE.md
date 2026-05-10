# راهنمای سریع تغییر رنگ قفسه 🎨

## 🎯 تغییرات فعلی

✅ **رنگ بدنه:** خاکستری تیره (مشابه تخت)  
✅ **نور لبه‌ها:** آبی فسفری (به جای قرمز)

---

## ⚡ تغییر سریع رنگ‌ها

### فایل: `src/objects/bookshelf.js`

### 1️⃣ تغییر رنگ نور لبه‌ها:

```javascript
// خط 17 - رنگ نور
material.emissive.setHex(0x00ffff); // ← این خط را تغییر دهید
```

**رنگ‌های پیشنهادی:**
```javascript
0x00ffff  // آبی فسفری (فعلی) ✅
0x0080ff  // آبی الکتریک
0x9d00ff  // بنفش نئون
0x00ff00  // سبز نئون
0xff00ff  // صورتی نئون
0xff6600  // نارنجی
```

---

### 2️⃣ تغییر شدت نور:

```javascript
// خط 18 - شدت نور
material.emissiveIntensity = 0.3; // ← این خط را تغییر دهید
```

**مقادیر پیشنهادی:**
```javascript
0.2  // ملایم
0.3  // متوسط (فعلی) ✅
0.5  // قوی
0.8  // خیلی قوی
```

---

### 3️⃣ تغییر رنگ بدنه قفسه:

```javascript
// خط 24 - رنگ اصلی
material.color.setHex(0x2a2a2a); // ← این خط را تغییر دهید
```

**رنگ‌های پیشنهادی:**
```javascript
0x2a2a2a  // خاکستری تیره (فعلی) ✅
0x1a1a1a  // مشکی
0x4a4a4a  // خاکستری روشن
0x3d2817  // قهوه‌ای چوبی
0x1a2332  // آبی تیره
0xf0f0f0  // سفید
```

---

## 🎨 ترکیب‌های آماده

### کپی و جایگزین کنید:

#### 1. Cyberpunk (صورتی نئون):
```javascript
material.emissive.setHex(0xff00ff);
material.emissiveIntensity = 0.5;
material.color.setHex(0x1a1a1a);
```

#### 2. Matrix (سبز نئون):
```javascript
material.emissive.setHex(0x00ff00);
material.emissiveIntensity = 0.4;
material.color.setHex(0x0a0a0a);
```

#### 3. Modern Blue (آبی مدرن):
```javascript
material.emissive.setHex(0x00ffff);
material.emissiveIntensity = 0.3;
material.color.setHex(0x1a2332);
```

#### 4. Warm Wood (چوب گرم):
```javascript
material.emissive.setHex(0xff6600);
material.emissiveIntensity = 0.2;
material.color.setHex(0x3d2817);
```

---

## 📍 محل دقیق تغییرات

```javascript
// فایل: src/objects/bookshelf.js
// خطوط 10-35

bookshelf.traverse((child) => {
    if (child.isMesh) {
        const material = child.material;
        
        if (material) {
            // ← اینجا تغییر دهید
            if (material.emissive) {
                material.emissive.setHex(0x00ffff);     // رنگ نور
                material.emissiveIntensity = 0.3;       // شدت نور
            }
            
            // ← اینجا تغییر دهید
            if (material.color) {
                material.color.setHex(0x2a2a2a);        // رنگ بدنه
            }
        }
    }
});
```

---

## 🧪 تست تغییرات

1. فایل `src/objects/bookshelf.js` را باز کنید
2. رنگ‌ها را تغییر دهید
3. ذخیره کنید
4. مرورگر را Refresh کنید
5. قفسه را بررسی کنید

---

## 💡 نکات

- **Hex Code** باید با `0x` شروع شود
- مقادیر بین `0x000000` (مشکی) تا `0xffffff` (سفید)
- برای نور، رنگ‌های روشن بهتر هستند
- برای بدنه، رنگ‌های تیره با محیط سازگارترند

---

**تاریخ:** 9 مه 2026  
**فایل:** `src/objects/bookshelf.js`  
**خطوط:** 17, 18, 24

