# اصلاح نهایی رنگ قفسه ✅

## 🎯 مشکل

مدل GLB اصلی خودش رنگ آبی/cyan دارد. باید رنگ بدنه را به خاکستری روشن تغییر دهیم.

---

## ✅ راه‌حل نهایی

رنگ اصلی (base color) همه Material ها را به خاکستری روشن (#e0e0e0) تغییر می‌دهیم و فقط لبه‌ها نور آبی فسفری دارند.

---

## 💻 کد نهایی

```javascript
// تغییر رنگ اصلی به خاکستری روشن
if (material.color) {
    material.color.setHex(0xe0e0e0); // Light gray (almost white)
}

// نور لبه‌ها آبی فسفری
if (material.emissive) {
    const currentEmissive = material.emissive.getHex();
    
    if (material.emissiveIntensity > 0 || currentEmissive !== 0x000000) {
        material.emissive.setHex(0x00ffff); // Cyan glow
        material.emissiveIntensity = 0.3;
    }
}
```

---

## 🎨 نتیجه

### بدنه قفسه:
- **رنگ:** خاکستری روشن (#e0e0e0) - تقریباً سفید
- **سطح:** مات (از مدل اصلی)

### لبه‌های نوری:
- **رنگ:** آبی فسفری (#00ffff)
- **شدت:** 0.3 (متعادل)

---

## 🎨 تنظیم رنگ بدنه

اگر می‌خواهید رنگ بدنه را تغییر دهید:

```javascript
// خط 14 در bookshelf.js
material.color.setHex(0xe0e0e0); // ← این را تغییر دهید
```

### رنگ‌های پیشنهادی:

| رنگ | Hex Code | توضیحات |
|-----|----------|---------|
| **خاکستری روشن** | `0xe0e0e0` | ✅ فعلی - تقریباً سفید |
| سفید | `0xffffff` | کاملاً سفید |
| خاکستری متوسط | `0xa0a0a0` | خاکستری |
| خاکستری تیره | `0x4a4a4a` | تیره‌تر |
| بژ | `0xf5f5dc` | گرم و ملایم |
| قهوه‌ای روشن | `0xd2b48c` | چوبی طبیعی |

---

## 🎨 تنظیم نور لبه‌ها

### تغییر رنگ نور:
```javascript
// خط 23 در bookshelf.js
material.emissive.setHex(0x00ffff); // ← این را تغییر دهید
```

**رنگ‌های پیشنهادی:**
```javascript
0x00ffff  // آبی فسفری (فعلی) ✅
0x0080ff  // آبی الکتریک
0x9d00ff  // بنفش نئون
0x00ff00  // سبز نئون
0xff00ff  // صورتی نئون
0xff6600  // نارنجی
0xffffff  // سفید
```

### تغییر شدت نور:
```javascript
// خط 24 در bookshelf.js
material.emissiveIntensity = 0.3; // ← این را تغییر دهید
```

**مقادیر پیشنهادی:**
```javascript
0.1  // خیلی ملایم
0.2  // ملایم
0.3  // متوسط (فعلی) ✅
0.5  // قوی
0.8  // خیلی قوی
```

---

## 🎨 ترکیب‌های رنگی پیشنهادی

### 1. Minimal White (مینیمال سفید):
```javascript
material.color.setHex(0xffffff);        // سفید
material.emissive.setHex(0x00ffff);     // آبی فسفری
material.emissiveIntensity = 0.2;       // ملایم
```

### 2. Modern Gray (خاکستری مدرن):
```javascript
material.color.setHex(0xa0a0a0);        // خاکستری متوسط
material.emissive.setHex(0x0080ff);     // آبی الکتریک
material.emissiveIntensity = 0.3;       // متوسط
```

### 3. Dark Industrial (صنعتی تیره):
```javascript
material.color.setHex(0x4a4a4a);        // خاکستری تیره
material.emissive.setHex(0x00ff00);     // سبز نئون
material.emissiveIntensity = 0.4;       // قوی
```

### 4. Warm Wood (چوب گرم):
```javascript
material.color.setHex(0xd2b48c);        // قهوه‌ای روشن
material.emissive.setHex(0xff6600);     // نارنجی
material.emissiveIntensity = 0.2;       // ملایم
```

### 5. Cyberpunk:
```javascript
material.color.setHex(0x2a2a2a);        // خاکستری خیلی تیره
material.emissive.setHex(0xff00ff);     // صورتی نئون
material.emissiveIntensity = 0.5;       // قوی
```

---

## 🧪 تست

```bash
npm run dev
```

**انتظار:**
- ✅ بدنه قفسه خاکستری روشن (تقریباً سفید)
- ✅ لبه‌ها با نور آبی فسفری
- ✅ دیگر کل قفسه آبی نیست

---

## 🔍 عیب‌یابی

### اگر هنوز آبی است:
1. **Hard Refresh:** Ctrl+Shift+R
2. **Clear Cache:** پاک کردن Cache مرورگر
3. **بررسی Console:** آیا خطایی وجود دارد؟

### اگر خیلی روشن است:
```javascript
// رنگ تیره‌تر
material.color.setHex(0xa0a0a0); // خاکستری متوسط
```

### اگر خیلی تیره است:
```javascript
// رنگ روشن‌تر
material.color.setHex(0xffffff); // سفید
```

### اگر نور دیده نمی‌شود:
```javascript
// شدت نور بیشتر
material.emissiveIntensity = 0.5;
```

---

## 📊 مقایسه قبل و بعد

### ❌ قبل:
```
بدنه: آبی/Cyan 🔵
لبه‌ها: آبی/Cyan 🔵
```

### ✅ بعد:
```
بدنه: خاکستری روشن ⚪
لبه‌ها: آبی فسفری (نور) 💠
```

---

## 💡 نکات مهم

1. **رنگ اصلی (color):** رنگ بدنه قفسه
2. **رنگ نور (emissive):** رنگ لبه‌های نوری
3. **شدت نور (emissiveIntensity):** قدرت نور لبه‌ها
4. **همه Material ها:** هم بدنه و هم لبه‌ها رنگ اصلی یکسان دارند

---

## 📝 خلاصه تغییرات

### فایل:
- ✅ `src/objects/bookshelf.js`

### تغییرات:
1. ✅ اضافه: تغییر `material.color` به خاکستری روشن
2. ✅ حفظ: تغییر `material.emissive` به آبی فسفری
3. ✅ حفظ: `material.emissiveIntensity = 0.3`

---

**تاریخ:** 9 مه 2026  
**وضعیت:** ✅ اصلاح نهایی  
**رنگ بدنه:** خاکستری روشن (#e0e0e0)  
**رنگ نور:** آبی فسفری (#00ffff)  
**شدت نور:** 0.3

