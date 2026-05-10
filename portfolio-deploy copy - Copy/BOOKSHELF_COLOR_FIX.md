# اصلاح رنگ قفسه - فقط نور لبه‌ها ✅

## ❌ مشکل قبلی

کل قفسه آبی شده بود چون کد همه Material ها را تغییر می‌داد.

---

## ✅ راه‌حل

حالا **فقط نور لبه‌ها** (emissive) تغییر می‌کند و رنگ اصلی قفسه حفظ می‌شود.

---

## 🎨 تغییرات جدید

### چه چیزی تغییر می‌کند:
- ✅ **نور لبه‌ها:** قرمز → آبی فسفری

### چه چیزی تغییر نمی‌کند:
- ✅ **رنگ اصلی قفسه:** رنگ اصلی مدل حفظ می‌شود
- ✅ **Roughness:** مقدار اصلی حفظ می‌شود
- ✅ **Metalness:** مقدار اصلی حفظ می‌شود

---

## 💻 کد اصلاح شده

```javascript
// فقط emissive را تغییر می‌دهیم
if (material.emissive) {
    const currentEmissive = material.emissive.getHex();
    
    // فقط اگر material دارای emissive باشد (لبه‌های نوری)
    if (material.emissiveIntensity > 0 || currentEmissive !== 0x000000) {
        material.emissive.setHex(0x00ffff); // آبی فسفری
        material.emissiveIntensity = 0.3;
    }
}

// رنگ اصلی، roughness و metalness تغییر نمی‌کنند
```

---

## 🔍 چگونه کار می‌کند؟

### 1. بررسی Material:
```javascript
if (material.emissive)
```
آیا این Material دارای emissive است؟

### 2. بررسی نور:
```javascript
if (material.emissiveIntensity > 0 || currentEmissive !== 0x000000)
```
آیا این Material واقعاً نور دارد؟ (لبه‌های نوری)

### 3. تغییر فقط نور:
```javascript
material.emissive.setHex(0x00ffff);
material.emissiveIntensity = 0.3;
```
فقط رنگ و شدت نور را تغییر می‌دهیم

### 4. حفظ بقیه:
```javascript
// DON'T change color, roughness, or metalness
```
رنگ اصلی و سایر ویژگی‌ها دست نخورده باقی می‌مانند

---

## 🎯 نتیجه

### قبل:
```
کل قفسه: آبی 🔵
لبه‌ها: آبی 🔵
```

### بعد:
```
بدنه قفسه: رنگ اصلی (خاکستری/سفید) ⚪
لبه‌ها: آبی فسفری 💠
```

---

## 🧪 تست

```bash
npm run dev
```

**انتظار:**
- ✅ بدنه قفسه با رنگ اصلی (خاکستری یا سفید)
- ✅ فقط لبه‌ها با نور آبی فسفری
- ✅ سایر ویژگی‌های Material حفظ شده

---

## 🎨 تغییر رنگ نور

اگر می‌خواهید رنگ نور لبه‌ها را تغییر دهید:

```javascript
// خط 17 در bookshelf.js
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

---

## 🔧 تغییر شدت نور

```javascript
// خط 18 در bookshelf.js
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

## 💡 اگر می‌خواهید رنگ بدنه هم تغییر کند

اگر می‌خواهید رنگ اصلی قفسه را هم تغییر دهید، این کد را اضافه کنید:

```javascript
// بعد از بخش emissive
if (material.color) {
    material.color.setHex(0x2a2a2a); // خاکستری تیره
}
```

**اما توصیه می‌شود رنگ اصلی را حفظ کنید!**

---

## 📝 خلاصه تغییرات

### فایل:
- ✅ `src/objects/bookshelf.js`

### تغییرات:
1. ❌ حذف: تغییر `material.color`
2. ❌ حذف: تغییر `material.roughness`
3. ❌ حذف: تغییر `material.metalness`
4. ✅ حفظ: فقط تغییر `material.emissive` (نور لبه‌ها)
5. ✅ اضافه: بررسی اینکه Material واقعاً نور دارد

---

## 🔍 عیب‌یابی

### اگر هنوز کل قفسه آبی است:
1. مطمئن شوید فایل ذخیره شده
2. مرورگر را Hard Refresh کنید (Ctrl+Shift+R)
3. Cache مرورگر را پاک کنید

### اگر نور دیده نمی‌شود:
```javascript
// شدت نور را افزایش دهید
material.emissiveIntensity = 0.5;
```

### اگر نور خیلی قوی است:
```javascript
// شدت نور را کاهش دهید
material.emissiveIntensity = 0.2;
```

---

**تاریخ:** 9 مه 2026  
**وضعیت:** ✅ اصلاح شد - فقط نور لبه‌ها تغییر می‌کند  
**رنگ بدنه:** رنگ اصلی مدل (حفظ شده)  
**رنگ نور:** آبی فسفری (#00ffff)

