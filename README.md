# 🎮 3D Interactive Portfolio

یک پورتفولیوی سه‌بعدی تعاملی با استفاده از Three.js، GSAP و Vite

## ✨ ویژگی‌ها

- 🎨 محیط سه‌بعدی تعاملی
- 🕹️ بازی‌های آرکید داخل پورتفولیو
- 📱 طراحی ریسپانسیو
- ⚡ بهینه‌سازی شده با Vite
- 🎭 انیمیشن‌های روان با GSAP

## 🚀 دیپلوی روی Vercel

### روش اول: از طریق Vercel CLI

1. نصب Vercel CLI:
```bash
npm install -g vercel
```

2. لاگین به Vercel:
```bash
vercel login
```

3. دیپلوی پروژه:
```bash
vercel
```

4. برای دیپلوی production:
```bash
vercel --prod
```

### روش دوم: از طریق Vercel Dashboard

1. به [vercel.com](https://vercel.com) بروید
2. روی "Add New Project" کلیک کنید
3. ریپازیتوری GitHub خود را وارد کنید
4. Vercel به صورت خودکار تنظیمات Vite را تشخیص می‌دهد
5. روی "Deploy" کلیک کنید

### تنظیمات پیش‌فرض Vercel

پروژه شامل فایل `vercel.json` است که تنظیمات زیر را دارد:
- Build Command: `npm run build`
- Output Directory: `dist`
- Framework: Vite

## 💻 توسعه محلی

```bash
# نصب وابستگی‌ها
npm install

# اجرای سرور توسعه
npm run dev

# ساخت برای production
npm run build

# پیش‌نمایش build
npm preview
```

## 📦 تکنولوژی‌های استفاده شده

- **Three.js** - رندرینگ سه‌بعدی
- **GSAP** - انیمیشن‌ها
- **Vite** - Build tool
- **Spline** - مدل‌های سه‌بعدی

## 📝 نکات مهم

- مطمئن شوید تمام فایل‌های `.glb` در پوشه `public/assets/models` قرار دارند
- فایل‌های ویدیو پروژه‌ها در `public/assets/projects/real` هستند
- برای بهینه‌سازی بیشتر، فایل‌های مدیا را فشرده کنید

## 🔧 عیب‌یابی

اگر با مشکل مواجه شدید:
1. `node_modules` و `package-lock.json` را پاک کنید
2. دوباره `npm install` را اجرا کنید
3. `npm run build` را تست کنید

## 👤 سازنده

**Shahab Shahrokhi**

---

Made with ❤️ using Three.js
