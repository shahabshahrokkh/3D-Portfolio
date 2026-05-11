# اضافه کردن بروشور رزومه با تکسچر

## تغییرات نهایی

### ✅ مشکل حل شد
بروشور حالا با یک تکسچر زیبا و حرفه‌ای روی تخت نمایش داده می‌شود!

## فایل‌های ایجاد شده

### 1. `src/utils/pdfTextureLoader.js` (جدید)
این فایل یک تکسچر زیبا برای بروشور می‌سازد که شامل:
- پس‌زمینه سفید با گرادیانت ملایم
- هدر رنگی با گرادیانت بنفش
- آیکون 📄 و متن "RESUME"
- بخش‌های مختلف رزومه (اطلاعات شخصی، تحصیلات، تجربه کاری، پروژه‌ها)
- طراحی حرفه‌ای و خوانا

**ویژگی‌ها:**
- رزولوشن بالا (2048x2896 پیکسل)
- نسبت ابعاد A4 واقعی
- طراحی مدرن و جذاب
- قابل خواندن از فاصله نزدیک

### 2. `src/objects/resume.js` (به‌روزرسانی شده)
این فایل:
- مدل بروشور را لود می‌کند
- تکسچر رزومه را روی تمام mesh های مدل اعمال می‌کند
- از `MeshStandardMaterial` با تنظیمات بهینه استفاده می‌کند
- تکسچر را روی دو طرف مدل نمایش می‌دهد

**تنظیمات Material:**
```javascript
{
  map: texture,              // تکسچر رزومه
  side: THREE.DoubleSide,    // نمایش در دو طرف
  metalness: 0.1,            // کمی براق
  roughness: 0.8,            // سطح کاغذی
}
```

### 3. `src/utils/config.js` (به‌روزرسانی شده)
موقعیت و تنظیمات بروشور:

```javascript
resume: {
  url: '/assets/models/trifold_document_brochure_menu.glb',
  position: [-5.8, 0.50, 0.3],           // روی تخت
  rotation: [-Math.PI / 2, 0, Math.PI / 2], // صاف روی تخت
  targetSize: { width: 0.4 },            // اندازه مناسب
  type: 'interactable',
  action: 'openResume'
}
```

**توضیحات موقعیت:**
- `position: [-5.8, 0.50, 0.3]` - روی تخت، کمی بالاتر از سطح
- `rotation: [-Math.PI / 2, 0, Math.PI / 2]` - صاف روی تخت، قابل خواندن
- `targetSize: { width: 0.4 }` - اندازه مناسب برای دیده شدن

## نحوه کار

1. **لود مدل:** مدل GLB بروشور از فایل لود می‌شود
2. **ساخت تکسچر:** یک Canvas با طراحی زیبا ساخته می‌شود
3. **اعمال تکسچر:** تکسچر روی تمام mesh های مدل اعمال می‌شود
4. **نمایش:** بروشور با تکسچر روی تخت نمایش داده می‌شود

## تست

```bash
npm run dev
```

سپس:
1. صفحه را refresh کنید (Ctrl+Shift+R)
2. به سمت تخت بروید
3. بروشور با طراحی زیبا روی تخت دیده می‌شود
4. روی آن کلیک کنید تا PDF رزومه باز شود

## کنسول Debug

در کنسول مرورگر این پیام‌ها را خواهید دید:
```
🔍 [DEBUG] Initializing resume model...
✅ [DEBUG] Resume model loaded: [Object]
📄 [DEBUG] Applying texture to mesh: [mesh name]
✅ [DEBUG] Texture applied to resume model
```

## سفارشی‌سازی

### تغییر رنگ هدر
در `pdfTextureLoader.js`:
```javascript
headerGradient.addColorStop(0, '#667eea'); // رنگ اول
headerGradient.addColorStop(1, '#764ba2'); // رنگ دوم
```

### تغییر متن
در `pdfTextureLoader.js`:
```javascript
ctx.fillText('RESUME', canvas.width / 2, 240);           // عنوان
ctx.fillText('Professional Portfolio', canvas.width / 2, 340); // زیرنویس
ctx.fillText('SH.SH', canvas.width / 2, canvas.height - 200);  // نام
```

### تغییر بخش‌ها
در `pdfTextureLoader.js`:
```javascript
const sections = [
  { icon: '👤', text: 'Personal Information', y: 1100 },
  { icon: '🎓', text: 'Education & Skills', y: 1300 },
  // اضافه کردن بخش جدید...
];
```

## استفاده از تصویر واقعی PDF

اگر می‌خواهید تصویر واقعی PDF را استفاده کنید:

### روش 1: تبدیل دستی
1. PDF را در یک برنامه باز کنید
2. اسکرین‌شات از صفحه اول بگیرید
3. تصویر را در `public/assets/textures/resume.png` ذخیره کنید
4. در `resume.js` از `loadImageAsTexture` استفاده کنید:

```javascript
const texture = await loadImageAsTexture('/assets/textures/resume.png');
```

### روش 2: استفاده از اسکریپت تبدیل
```bash
npm install pdf-poppler
node convert-pdf-to-image.js
```

این اسکریپت PDF را به تصویر PNG تبدیل می‌کند.

## نکات مهم

✅ تکسچر به صورت خودکار ساخته می‌شود (نیازی به فایل خارجی نیست)  
✅ طراحی حرفه‌ای و جذاب  
✅ رزولوشن بالا برای کیفیت بهتر  
✅ قابل سفارشی‌سازی کامل  
✅ کلیک روی بروشور PDF واقعی را باز می‌کند  

## خلاصه

🎨 **تکسچر زیبا:** یک طراحی حرفه‌ای با Canvas API  
📍 **موقعیت مناسب:** روی تخت، کنار گربه  
🖱️ **قابل کلیک:** باز کردن PDF در تب جدید  
🏷️ **Label فضایی:** نمایش label "Resume" بالای بروشور  
✨ **کیفیت بالا:** رزولوشن 2048x2896 پیکسل  
