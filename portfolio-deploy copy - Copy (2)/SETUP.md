# 📦 نسخه سبک پروژه - آماده دیپلوی

این پوشه شامل فقط فایل‌های ضروری برای دیپلوی است (بدون node_modules و dist).

## 📋 محتویات

```
portfolio-deploy/
├── public/          # فایل‌های استاتیک (مدل‌ها، تصاویر، ویدیوها)
├── src/             # کدهای منبع
├── index.html       # فایل HTML اصلی
├── style.css        # استایل‌ها
├── package.json     # وابستگی‌ها
├── vercel.json      # تنظیمات Vercel
├── .gitignore       # فایل‌های نادیده گرفته شده
├── .vercelignore    # فایل‌های نادیده شده در Vercel
├── README.md        # مستندات
└── DEPLOY.md        # راهنمای دیپلوی
```

## 🚀 نصب و اجرا

### 1. نصب وابستگی‌ها

```bash
npm install
```

این دستور فقط 4 پکیج اصلی را نصب می‌کند:
- `three` - کتابخانه 3D
- `gsap` - انیمیشن
- `@splinetool/loader` و `@splinetool/runtime` - لودر مدل‌ها
- `vite` - Build tool

### 2. اجرای محلی

```bash
npm run dev
```

سایت روی http://localhost:5173 اجرا می‌شود.

### 3. ساخت برای Production

```bash
npm run build
```

فایل‌های نهایی در پوشه `dist` ایجاد می‌شوند.

## 📤 دیپلوی روی Vercel

### روش 1: از طریق Git

```bash
# ایجاد ریپازیتوری Git
git init

# اضافه کردن فایل‌ها
git add .

# کامیت
git commit -m "Initial commit"

# اضافه کردن remote
git remote add origin https://github.com/username/repo.git

# پوش
git push -u origin main
```

سپس در Vercel:
1. Import Project
2. انتخاب ریپازیتوری
3. Deploy

### روش 2: با Vercel CLI

```bash
# نصب CLI
npm install -g vercel

# دیپلوی
vercel

# یا مستقیم production
vercel --prod
```

### روش 3: Drag & Drop

1. ساخت پروژه: `npm run build`
2. رفتن به https://vercel.com/new
3. کشیدن پوشه `dist` به صفحه

## 📊 حجم پروژه

- **بدون node_modules**: ~150 MB (مدل‌ها و ویدیوها)
- **با node_modules**: ~200 MB
- **Build شده (dist)**: ~150 MB

## 🎯 بهینه‌سازی‌های انجام شده

✅ فقط فایل‌های ضروری کپی شده
✅ بدون node_modules (نصب با npm install)
✅ بدون dist (ساخته می‌شود با npm run build)
✅ بدون فایل‌های اضافی (Project-Sample حذف شده)
✅ تنظیمات Vercel آماده

## ⚡ نکات سرعت

برای دیپلوی سریع‌تر:
1. فایل‌های ویدیو را فشرده کنید
2. مدل‌های GLB را بهینه کنید
3. از CDN برای فایل‌های بزرگ استفاده کنید

## 🔧 عیب‌یابی

اگر خطا گرفتید:

```bash
# پاک کردن و نصب مجدد
rm -rf node_modules package-lock.json
npm install

# تست build
npm run build
```

---

✨ این پوشه آماده آپلود به GitHub و دیپلوی روی Vercel است!
