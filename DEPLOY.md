# 🚀 راهنمای دیپلوی روی Vercel

## پیش‌نیازها
- اکانت GitHub
- اکانت Vercel (رایگان)
- Git نصب شده باشد

## مراحل دیپلوی

### گام 1️⃣: آماده‌سازی کد

پروژه شما الان آماده است! فایل‌های زیر اضافه شده‌اند:
- ✅ `vercel.json` - تنظیمات Vercel
- ✅ `.vercelignore` - فایل‌های نادیده گرفته شده
- ✅ `README.md` - مستندات پروژه

### گام 2️⃣: آپلود به GitHub

اگر هنوز پروژه را به GitHub آپلود نکرده‌اید:

```bash
# اگر git init نکرده‌اید
git init

# اضافه کردن فایل‌ها
git add .

# کامیت
git commit -m "Ready for Vercel deployment"

# اضافه کردن remote (آدرس ریپازیتوری خودتان را جایگزین کنید)
git remote add origin https://github.com/username/repo-name.git

# پوش به GitHub
git push -u origin main
```

### گام 3️⃣: دیپلوی روی Vercel

#### روش A: از طریق وب‌سایت (آسان‌تر)

1. به https://vercel.com بروید
2. با GitHub لاگین کنید
3. روی **"Add New Project"** کلیک کنید
4. ریپازیتوری `3D-portfolio` را انتخاب کنید
5. Vercel خودکار تنظیمات را تشخیص می‌دهد:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. روی **"Deploy"** کلیک کنید
7. صبر کنید تا دیپلوی تمام شود (2-3 دقیقه)
8. لینک سایت شما آماده است! 🎉

#### روش B: از طریق CLI

```bash
# نصب Vercel CLI
npm install -g vercel

# لاگین
vercel login

# دیپلوی (در پوشه پروژه)
vercel

# برای production
vercel --prod
```

### گام 4️⃣: تنظیمات اختیاری

بعد از دیپلوی می‌توانید:
- دامنه سفارشی اضافه کنید
- متغیرهای محیطی تنظیم کنید
- Analytics فعال کنید

## 🔍 بررسی Build

قبل از دیپلوی، می‌توانید build را محلی تست کنید:

```bash
# ساخت پروژه
npm run build

# پیش‌نمایش
npm run preview
```

## ⚠️ نکات مهم

1. **حجم فایل‌ها**: اگر فایل‌های ویدیو یا مدل خیلی بزرگ هستند، آن‌ها را فشرده کنید
2. **مسیرها**: همه مسیرها باید relative باشند (با `/` شروع شوند)
3. **Environment Variables**: اگر API key دارید، در تنظیمات Vercel اضافه کنید

## 🐛 عیب‌یابی

### خطای Build
```bash
# پاک کردن cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### فایل‌ها لود نمی‌شوند
- مطمئن شوید فایل‌ها در پوشه `public` هستند
- مسیرها باید با `/` شروع شوند نه `./`

### سایت سفید است
- Console مرورگر را چک کنید (F12)
- لاگ‌های Vercel را بررسی کنید

## 📞 پشتیبانی

اگر مشکلی داشتید:
- [مستندات Vercel](https://vercel.com/docs)
- [مستندات Vite](https://vitejs.dev/guide/)
- [GitHub Issues](https://github.com/shahabshahrokkh/3D-portfolio/issues)

---

موفق باشید! 🚀
