# لیست فایل‌های مدل استفاده نشده

## فایل‌های استفاده شده در پروژه ✅
این فایل‌ها در `config.js` تعریف شده‌اند و **نباید** حذف شوند:

1. ✅ `computer_desk.glb` - میز
2. ✅ `free_desk_or_gamer_chair.glb` - صندلی
3. ✅ `laptop.glb` - لپتاپ
4. ✅ `custom_iphone_17_3d_model.glb` - گوشی آیفون
5. ✅ `curved_gamming_monitor.glb` - مانیتور
6. ✅ `gaming_mouse_keyboard__rgb_pad_-_3d_model.glb` - موس و کیبورد
7. ✅ `messy_bed_2.0_with_wall_mounted_backboard.glb` - تخت
8. ✅ `sleeping_cat_on_the_table_-_3d_scan.glb` - گربه
9. ✅ `whiteboard.glb` - تخته وایت برد
10. ✅ `arcade_machine.glb` - دستگاه آرکید
11. ✅ `modern_wall_shelves.glb` - قفسه دیواری
12. ✅ `room_shelves.glb` - قفسه کتاب
13. ✅ `python_programming_language.glb` - لوگوی پایتون
14. ✅ `react_logo.glb` - لوگوی ری‌اکت
15. ✅ `html_css_javascript_model.glb` - لوگوهای HTML/CSS/JS
16. ✅ `free_blender_logo_3d_model.glb` - لوگوی بلندر
17. ✅ `victorian_typewriter.glb` - ماشین تحریر
18. ✅ `c sharp (1).glb` - لوگوی C#
19. ✅ `c.glb` - لوگوی C
20. ✅ `sci_fi_space_helmet.glb` - کلاه فضانوردی
21. ✅ `sonic_2_mega_drive_cartridge.glb` - کارتریج سونیک
22. ✅ `logo.glb` - لوگو (Django)
23. ✅ `persian_nain_carpet.glb` - فرش
24. ✅ `window.glb` - پنجره
25. ✅ `drifting_astronaut.glb` - فضانورد

---

## فایل‌های استفاده نشده ❌
این فایل‌ها در پروژه استفاده **نمی‌شوند** و می‌توانید آن‌ها را حذف کنید:

### 1. ❌ `arcade_game_machine_001.glb`
- **دلیل**: نسخه قدیمی arcade machine
- **جایگزین**: `arcade_machine.glb` استفاده می‌شود
- **حجم**: 1007.19 KB (~1 MB)
- **توصیه**: حذف شود

### 2. ❌ `black_marker.glb`
- **دلیل**: در config.js تعریف نشده
- **استفاده**: احتمالاً برای whiteboard بوده اما استفاده نمی‌شود
- **حجم**: 134.11 KB
- **توصیه**: حذف شود

### 3. ❌ `django.glb`
- **دلیل**: فایل اصلی غیربهینه
- **جایگزین**: نسخه بهینه‌شده به عنوان `logo.glb` استفاده می‌شود (23.5 KB)
- **حجم**: 1216.73 KB (~1.2 MB) ⚠️ **بزرگترین فایل استفاده نشده**
- **توصیه**: حذف شود (حجم زیاد)

### 4. ❌ `logo_backup.glb`
- **دلیل**: فایل پشتیبان لوگوی قبلی
- **استفاده**: فقط برای backup نگه داشته شده
- **حجم**: 28.26 KB
- **توصیه**: می‌توانید حذف کنید یا نگه دارید برای بازگشت

### 5. ❌ `white_board_asset.glb`
- **دلیل**: نسخه قدیمی whiteboard
- **جایگزین**: `whiteboard.glb` استفاده می‌شود
- **حجم**: 6.21 KB
- **توصیه**: حذف شود

---

## خلاصه

### تعداد کل فایل‌ها: 30
- ✅ **استفاده شده**: 25 فایل
- ❌ **استفاده نشده**: 5 فایل

### فایل‌های قابل حذف (توصیه شده):
```
1. arcade_game_machine_001.glb
2. black_marker.glb
3. django.glb (1.2 MB - حجم زیاد!)
4. white_board_asset.glb
```

### فایل اختیاری:
```
5. logo_backup.glb (می‌توانید نگه دارید برای backup)
```

---

## دستور حذف (PowerShell)

اگر می‌خواهید فایل‌های استفاده نشده را حذف کنید:

```powershell
# حذف فایل‌های استفاده نشده
Remove-Item "public\assets\models\arcade_game_machine_001.glb"
Remove-Item "public\assets\models\black_marker.glb"
Remove-Item "public\assets\models\django.glb"
Remove-Item "public\assets\models\white_board_asset.glb"

# اختیاری: حذف backup
# Remove-Item "public\assets\models\logo_backup.glb"
```

---

## صرفه‌جویی در حجم

با حذف فایل‌های استفاده نشده:
- **حجم کل فایل‌های استفاده نشده**: ~2.4 MB
  - `django.glb`: 1.2 MB
  - `arcade_game_machine_001.glb`: 1.0 MB
  - `black_marker.glb`: 134 KB
  - `logo_backup.glb`: 28 KB
  - `white_board_asset.glb`: 6 KB
- **صرفه‌جویی**: حدود **2.4 MB** کاهش حجم
- بارگذاری سریع‌تر پروژه
- مدیریت بهتر فایل‌ها

---

## توجه ⚠️

قبل از حذف، مطمئن شوید که:
1. پروژه را تست کرده‌اید
2. از فایل‌های مهم backup دارید
3. هیچ کد دیگری از این فایل‌ها استفاده نمی‌کند
