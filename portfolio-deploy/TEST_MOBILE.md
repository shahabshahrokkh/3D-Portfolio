# 📱 چک‌لیست تست موبایل

## ✅ تست‌های اساسی

### 1. تست بارگذاری
- [ ] صفحه در کمتر از 5 ثانیه بارگذاری می‌شود
- [ ] Loading screen به درستی نمایش داده می‌شود
- [ ] درصد بارگذاری به درستی به‌روز می‌شود
- [ ] انیمیشن loading روان است

### 2. تست کنترل‌های لمسی
- [ ] چرخش صحنه با یک انگشت کار می‌کند
- [ ] Zoom با دو انگشت (pinch) کار می‌کند
- [ ] Pan با دو انگشت کار می‌کند
- [ ] کنترل‌ها روان و بدون تاخیر هستند
- [ ] دوربین در محدوده مجاز می‌ماند

### 3. تست UI/UX
- [ ] تمام متن‌ها خوانا هستند
- [ ] دکمه‌ها به اندازه کافی بزرگ هستند (حداقل 44x44px)
- [ ] Control Panel در گوشه پایین راست قابل مشاهده است
- [ ] دکمه Reset View کار می‌کند
- [ ] هیچ المان UI از صفحه خارج نمی‌شود

### 4. تست عملکرد
- [ ] FPS بالای 30 است (ترجیحاً 60)
- [ ] هیچ lag یا stuttering وجود ندارد
- [ ] مصرف باتری معقول است
- [ ] دستگاه خیلی داغ نمی‌شود

### 5. تست Responsive
- [ ] در حالت Portrait به درستی نمایش داده می‌شود
- [ ] در حالت Landscape به درستی نمایش داده می‌شود
- [ ] چرخش صفحه بدون مشکل انجام می‌شود
- [ ] UI در هر دو حالت قابل استفاده است

## 📱 تست در دستگاه‌های مختلف

### iPhone
- [ ] iPhone SE (375x667)
- [ ] iPhone 12/13/14 (390x844)
- [ ] iPhone 14 Pro Max (430x932)
- [ ] Safari browser
- [ ] Chrome browser

### Android
- [ ] Samsung Galaxy S21 (360x800)
- [ ] Google Pixel 6 (412x915)
- [ ] OnePlus 9 (412x919)
- [ ] Chrome browser
- [ ] Samsung Internet

### Tablet
- [ ] iPad (768x1024)
- [ ] iPad Pro (1024x1366)
- [ ] Samsung Galaxy Tab
- [ ] در حالت Portrait
- [ ] در حالت Landscape

## 🎮 تست ویژگی‌های خاص

### Arcade Mode
- [ ] کلیک روی arcade machine کار می‌کند
- [ ] Overlay به درستی باز می‌شود
- [ ] بازی با کنترل‌های لمسی قابل بازی است
- [ ] دکمه Close کار می‌کند
- [ ] دکمه ESC در صفحه‌کلید مجازی کار می‌کند

### Projects Overlay
- [ ] کلیک روی laptop/monitor کار می‌کند
- [ ] لیست پروژه‌ها قابل scroll است
- [ ] انتخاب پروژه کار می‌کند
- [ ] ویدیوها به درستی پخش می‌شوند
- [ ] دکمه‌های CTA کار می‌کنند
- [ ] دکمه Close کار می‌کند

### Contact Overlay
- [ ] کلیک روی iPhone کار می‌کند
- [ ] اطلاعات تماس نمایش داده می‌شود
- [ ] لینک‌های social media کار می‌کنند
- [ ] دکمه‌های Call/End کار می‌کنند

### Whiteboard
- [ ] کلیک روی whiteboard کار می‌کند
- [ ] انیمیشن به درستی اجرا می‌شود
- [ ] محتوا خوانا است

## 🔍 تست‌های پیشرفته

### Performance
- [ ] بررسی FPS با Chrome DevTools
- [ ] بررسی Memory Usage
- [ ] بررسی GPU Usage
- [ ] بررسی Network Usage
- [ ] بررسی Battery Drain

### Compatibility
- [ ] iOS Safari (حداقل iOS 14)
- [ ] Chrome Mobile (آخرین نسخه)
- [ ] Firefox Mobile
- [ ] Samsung Internet
- [ ] Edge Mobile

### Network Conditions
- [ ] 4G Fast (بارگذاری سریع)
- [ ] 4G Slow (بارگذاری کند)
- [ ] 3G (بارگذاری خیلی کند)
- [ ] Offline (بعد از بارگذاری اولیه)

### Accessibility
- [ ] تست با Screen Reader
- [ ] تست با Voice Control
- [ ] تست با Switch Control
- [ ] تست با Zoom (بزرگنمایی سیستم)
- [ ] تست با Dark Mode
- [ ] تست با Light Mode

## 🐛 مشکلات شناخته شده

### مشکلات احتمالی و راه‌حل‌ها:

#### 1. عملکرد پایین
**علائم**: FPS پایین، lag، stuttering
**راه‌حل**:
- کاهش pixel ratio به 1
- غیرفعال کردن shadows
- کاهش تعداد مدل‌ها
- استفاده از مدل‌های Low-poly

#### 2. کنترل‌ها کار نمی‌کنند
**علائم**: نمی‌توان صحنه را چرخاند یا zoom کرد
**راه‌حل**:
- بررسی `touch-action: none` در CSS
- بررسی event listeners
- بررسی z-index overlay ها

#### 3. UI خیلی کوچک
**علائم**: متن‌ها خوانا نیستند، دکمه‌ها کوچک هستند
**راه‌حل**:
- افزایش font-size در media queries
- افزایش padding دکمه‌ها
- استفاده از viewport units

#### 4. مصرف باتری بالا
**علائم**: دستگاه داغ می‌شود، باتری سریع تمام می‌شود
**راه‌حل**:
- کاهش frame rate
- استفاده از `powerPreference: 'low-power'`
- محدود کردن انیمیشن‌ها

#### 5. بارگذاری کند
**علائم**: صفحه بیش از 10 ثانیه طول می‌کشد
**راه‌حل**:
- فشرده‌سازی مدل‌ها (Draco compression)
- Lazy loading برای مدل‌ها
- استفاده از CDN
- بهینه‌سازی تصاویر

## 📊 معیارهای موفقیت

### عملکرد
- ✅ FPS: حداقل 30, هدف 60
- ✅ First Load: کمتر از 5 ثانیه
- ✅ Time to Interactive: کمتر از 3 ثانیه
- ✅ Memory Usage: کمتر از 200MB

### تجربه کاربری
- ✅ تمام ویژگی‌ها کار می‌کنند
- ✅ UI در تمام اندازه‌ها قابل استفاده است
- ✅ کنترل‌ها responsive و روان هستند
- ✅ هیچ bug بحرانی وجود ندارد

## 🛠️ ابزارهای تست

### Browser DevTools
```
Chrome DevTools:
1. F12 یا Ctrl+Shift+I
2. Device Toolbar: Ctrl+Shift+M
3. Performance Tab: بررسی FPS
4. Network Tab: بررسی بارگذاری
5. Memory Tab: بررسی مصرف حافظه
```

### Online Tools
- [WebPageTest](https://www.webpagetest.org/) - تست سرعت
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - تست کلی
- [GTmetrix](https://gtmetrix.com/) - تحلیل عملکرد
- [BrowserStack](https://www.browserstack.com/) - تست در دستگاه‌های واقعی

### Mobile Testing
```
Android:
1. Enable USB Debugging
2. Connect to Chrome DevTools
3. chrome://inspect

iOS:
1. Enable Web Inspector
2. Connect to Safari DevTools
3. Develop > [Device Name]
```

## 📝 گزارش Bug

هنگام یافتن bug، موارد زیر را ثبت کنید:

```
Device: [نام دستگاه]
OS: [نسخه سیستم عامل]
Browser: [نام و نسخه مرورگر]
Screen Size: [اندازه صفحه]
Orientation: [Portrait/Landscape]

Steps to Reproduce:
1. [مرحله 1]
2. [مرحله 2]
3. [مرحله 3]

Expected Result:
[نتیجه مورد انتظار]

Actual Result:
[نتیجه واقعی]

Screenshots/Video:
[اسکرین‌شات یا ویدیو]

Console Errors:
[خطاهای console]
```

## ✨ نکات تست

1. **همیشه در دستگاه واقعی تست کنید** - Emulator کافی نیست
2. **شبکه را throttle کنید** - تست در شرایط واقعی
3. **باتری را بررسی کنید** - مصرف باتری مهم است
4. **در شرایط مختلف تست کنید** - روز/شب، داخل/خارج
5. **از کاربران واقعی feedback بگیرید** - تجربه واقعی مهم است

---

**آخرین به‌روزرسانی**: 2026-05-08
