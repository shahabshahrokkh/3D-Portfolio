# جایگزینی لوگو با Django و رنگ‌آمیزی سبز

## تغییرات انجام شده

### 1. بهینه‌سازی فایل Django
- **فایل اصلی**: `django.glb` - حجم: **1216.73 KB**
- **فایل بهینه‌شده**: `django_optimized.glb` - حجم: **23.54 KB**
- **کاهش حجم**: **98%** 🎉

ابزار استفاده شده: `gltf-pipeline` با فشرده‌سازی Draco

### 2. جایگزینی فایل لوگو
- فایل `logo.glb` قبلی به `logo_backup.glb` پشتیبان‌گیری شد
- فایل `django_optimized.glb` به عنوان `logo.glb` جایگزین شد
- حالا لوگوی Django در قفسه کتاب نمایش داده می‌شود

### 3. رنگ‌آمیزی سبز (رنگ رسمی Django)
فایل `src/objects/logoModel.js` به‌روزرسانی شد:

```javascript
// رنگ اصلی: Django Green (#44B78B)
child.material.color = new THREE.Color(0x44B78B);

// رنگ درخشش: Dark Django Green (#0C4B33)
child.material.emissive = new THREE.Color(0x0C4B33);
child.material.emissiveIntensity = 0.3;
```

## رنگ‌های Django
- **رنگ اصلی**: `#44B78B` (سبز روشن Django)
- **رنگ تیره**: `#0C4B33` (سبز تیره Django)

## موقعیت در صحنه
لوگوی Django در قفسه کتاب، طبقه وسط، وسط قرار دارد:
- موقعیت: `[-3.0, 1.30, -7.15]`
- ارتفاع: `0.18`

## فایل‌های پشتیبان
- `logo_backup.glb` - لوگوی قبلی (برای بازگشت در صورت نیاز)
- `django.glb` - فایل اصلی Django (غیربهینه)
- `django_optimized.glb` - فایل بهینه‌شده Django

## تست
برای مشاهده تغییرات:
1. صفحه را رفرش کنید
2. به قفسه کتاب نگاه کنید
3. لوگوی Django سبز رنگ در طبقه وسط نمایش داده می‌شود

## سفارشی‌سازی رنگ
اگر می‌خواهید رنگ را تغییر دهید، در فایل `src/objects/logoModel.js`:
- برای سبز روشن‌تر: `0x5FD068`
- برای سبز تیره‌تر: `0x0A3622`
- برای سبز نئون: `0x00FF00`
