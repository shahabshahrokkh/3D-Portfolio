# رنگ‌آمیزی لوگوهای HTML, CSS, JavaScript با Border مشکی

## مدل
فایل `html_css_javascript_model.glb` شامل سه لوگو در یک مدل است:
- **چپ**: HTML
- **وسط**: CSS  
- **راست**: JavaScript

## رنگ‌های اعمال شده

### 1. HTML (قرمز/نارنجی) 🔴
- **رنگ اصلی**: `#E34F26` (نارنجی-قرمز رسمی HTML5)
- **رنگ درخشش**: `#8B2E16` (قرمز تیره)
- **Border**: مشکی (`#000000`)

### 2. CSS (آبی) 🔵
- **رنگ اصلی**: `#1572B6` (آبی رسمی CSS3)
- **رنگ درخشش**: `#0A4275` (آبی تیره)
- **Border**: مشکی (`#000000`)

### 3. JavaScript (زرد) 🟡
- **رنگ اصلی**: `#F7DF1E` (زرد رسمی JavaScript)
- **رنگ درخشش**: `#9C8A12` (زرد تیره)
- **Border**: مشکی (`#000000`)

## ویژگی‌های جدید ✨

### Border مشکی دور نوشته‌ها
- از `EdgesGeometry` برای تشخیص لبه‌های هر mesh استفاده می‌شود
- یک `LineSegments` مشکی دور هر لوگو کشیده می‌شود
- این باعث می‌شود نوشته‌های HTML، CSS، JS داخل هر لوگو واضح‌تر دیده شوند

```javascript
// ایجاد border مشکی
const edges = new THREE.EdgesGeometry(mesh.geometry, 15);
const lineMaterial = new THREE.LineBasicMaterial({ 
    color: 0x000000, // مشکی
    linewidth: 2
});
const outline = new THREE.LineSegments(edges, lineMaterial);
```

## نحوه کار
فایل `src/objects/htmlIcon.js` به‌روزرسانی شد:

1. **جمع‌آوری Meshes**: تمام mesh های مدل جمع‌آوری می‌شوند
2. **مرتب‌سازی**: بر اساس موقعیت X (چپ به راست) مرتب می‌شوند
3. **رنگ‌آمیزی**: هر mesh با رنگ مناسب خود رنگ‌آمیزی می‌شود
4. **اضافه کردن Border**: یک خط مشکی دور هر mesh کشیده می‌شود

## موقعیت در صحنه
لوگوها در قفسه کتاب، طبقه چهارم (بالا)، سمت چپ قرار دارند:
- موقعیت: `[-3.6, 1.70, -7.15]`
- ارتفاع: `0.15`

## Emissive Glow
هر سه لوگو یک درخشش ملایم دارند:
- **Intensity**: `0.3`
- این باعث می‌شود در نور کم بهتر دیده شوند

## تست
برای مشاهده تغییرات:
1. صفحه را رفرش کنید
2. به قفسه کتاب نگاه کنید (طبقه بالا، سمت چپ)
3. باید سه لوگو را با رنگ‌های قرمز، آبی، و زرد **با border مشکی** ببینید

## سفارشی‌سازی

### تغییر رنگ Border
در فایل `src/objects/htmlIcon.js`، خط زیر را تغییر دهید:
```javascript
color: 0x000000, // مشکی - می‌توانید به 0xFFFFFF (سفید) یا هر رنگ دیگری تغییر دهید
```

### تغییر ضخامت Border
```javascript
linewidth: 2 // می‌توانید به 1، 3، یا بیشتر تغییر دهید
```
**توجه**: `linewidth > 1` فقط در برخی سیستم‌ها کار می‌کند.

### تغییر حساسیت Edge Detection
```javascript
const edges = new THREE.EdgesGeometry(mesh.geometry, 15); // عدد 15 را می‌توانید تغییر دهید
```
- عدد کوچکتر = خطوط بیشتر
- عدد بزرگتر = فقط لبه‌های اصلی

## Console Log
در console مرورگر می‌توانید ببینید:
```
Applied HTML color and black outline to mesh at index 0
Applied CSS color and black outline to mesh at index 1
Applied JS color and black outline to mesh at index 2
```
