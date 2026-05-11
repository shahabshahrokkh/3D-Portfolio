# گزینه‌های پیش‌نمایش رزومه در UI

## وضعیت فعلی ✅

الان از **iframe** استفاده می‌کنیم که PDF واقعی رو نشون میده:

```html
<iframe 
  src="/SH.SH-Resume.pdf#toolbar=0&navpanes=0&scrollbar=0" 
  class="ro-pdf-preview"
></iframe>
```

**مزایا:**
- ✅ محتوای واقعی PDF
- ✅ بدون نیاز به تصویر جداگانه
- ✅ همیشه به‌روز

**معایب:**
- ⚠️ ممکنه در بعضی مرورگرها کند باشه
- ⚠️ toolbar رو نمیشه کاملاً مخفی کرد
- ⚠️ در موبایل ممکنه مشکل داشته باشه

---

## گزینه 1: استفاده از تصویر (پیشنهادی) 🎯

### مرحله 1: تبدیل PDF به تصویر

**روش A: دستی (ساده‌ترین)**
1. PDF رو باز کن
2. صفحه اول رو اسکرین‌شات بگیر
3. تصویر رو ذخیره کن به عنوان `resume-preview.png`
4. فایل رو در `public/assets/textures/` قرار بده

**روش B: آنلاین**
- برو به https://www.ilovepdf.com/pdf_to_jpg
- PDF رو آپلود کن
- صفحه اول رو دانلود کن
- تصویر رو در `public/assets/textures/resume-preview.png` قرار بده

**روش C: با اسکریپت Node.js**
```bash
npm install pdf-poppler
node convert-pdf-to-image.js
```

### مرحله 2: تغییر کد

بعد از اینکه تصویر رو آماده کردی، این تغییرات رو اعمال کن:

#### در `src/ui/resumeOverlay.js`:

```javascript
// جایگزین کن:
<div class="ro-preview">
  <iframe 
    src="/SH.SH-Resume.pdf#toolbar=0&navpanes=0&scrollbar=0" 
    class="ro-pdf-preview"
  ></iframe>
  <div class="ro-preview-overlay">
    <p class="ro-preview-text">📄 Resume Preview</p>
  </div>
</div>

// با:
<div class="ro-preview">
  <img 
    src="/assets/textures/resume-preview.png" 
    alt="Resume Preview"
    class="ro-pdf-preview"
  />
  <div class="ro-preview-overlay">
    <p class="ro-preview-text">📄 Resume Preview</p>
  </div>
</div>
```

#### در CSS (همون فایل):

```css
.ro-pdf-preview {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 16px;
  background: white;
  object-fit: cover; /* اضافه کن برای تصویر */
}
```

**مزایا:**
- ✅ سریع‌تر لود میشه
- ✅ در همه مرورگرها یکسان کار می‌کنه
- ✅ کیفیت بهتر
- ✅ کنترل بیشتر روی نمایش

---

## گزینه 2: استفاده از PDF.js (حرفه‌ای) 🚀

اگه می‌خوای PDF رو به صورت دینامیک render کنی:

### نصب:
```bash
npm install pdfjs-dist
```

### کد:
```javascript
import * as pdfjsLib from 'pdfjs-dist';

async function renderPDFPreview() {
  const pdf = await pdfjsLib.getDocument('/SH.SH-Resume.pdf').promise;
  const page = await pdf.getPage(1);
  
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  const viewport = page.getViewport({ scale: 2 });
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  
  await page.render({ canvasContext: context, viewport }).promise;
  
  return canvas.toDataURL();
}
```

**مزایا:**
- ✅ Render واقعی PDF
- ✅ کیفیت عالی
- ✅ قابل zoom

**معایب:**
- ⚠️ نیاز به کتابخانه اضافی (حجم بیشتر)
- ⚠️ پیچیده‌تر

---

## گزینه 3: ترکیبی (هوشمند) 🧠

استفاده از تصویر برای پیش‌نمایش سریع + fallback به iframe:

```javascript
<div class="ro-preview">
  <img 
    src="/assets/textures/resume-preview.png" 
    alt="Resume Preview"
    class="ro-pdf-preview"
    onerror="this.style.display='none'; document.getElementById('pdf-fallback').style.display='block';"
  />
  <iframe 
    id="pdf-fallback"
    src="/SH.SH-Resume.pdf#toolbar=0" 
    class="ro-pdf-preview"
    style="display: none;"
  ></iframe>
  <div class="ro-preview-overlay">
    <p class="ro-preview-text">📄 Resume Preview</p>
  </div>
</div>
```

---

## توصیه نهایی 💡

**برای بهترین نتیجه:**

1. **یک اسکرین‌شات با کیفیت بالا از صفحه اول رزومه بگیر**
   - رزولوشن: حداقل 1200x1600 پیکسل
   - فرمت: PNG (برای کیفیت بهتر) یا JPG (برای حجم کمتر)

2. **فایل رو اینجا قرار بده:**
   ```
   public/assets/textures/resume-preview.png
   ```

3. **کد رو تغییر بده** (مثل بالا)

4. **همچنین می‌تونی همون تصویر رو روی مدل بروشور هم بذاری:**
   
   در `src/objects/resume.js`:
   ```javascript
   import { loadImageAsTexture } from '../utils/pdfTextureLoader.js';
   
   // جایگزین کن:
   const texture = await loadPDFAsTexture('/SH.SH-Resume.pdf');
   
   // با:
   const texture = await loadImageAsTexture('/assets/textures/resume-preview.png');
   ```

---

## خلاصه

| گزینه | سرعت | کیفیت | سادگی | توصیه |
|-------|------|--------|--------|-------|
| iframe (فعلی) | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | خوب |
| تصویر | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | **بهترین** ✅ |
| PDF.js | ⭐⭐ | ⭐⭐⭐ | ⭐ | حرفه‌ای |
| ترکیبی | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | عالی |

---

## چه کار کنم؟

**الان:** iframe کار می‌کنه و PDF واقعی رو نشون میده ✅

**اگه می‌خوای بهتر بشه:**
1. یک عکس از صفحه اول رزومه بده
2. من کد رو تغییر میدم
3. هم در UI و هم روی مدل بروشور از اون استفاده می‌کنیم

**یا اگه راضی هستی:**
- همین الان کار می‌کنه! فقط refresh کن و تست کن 🚀
