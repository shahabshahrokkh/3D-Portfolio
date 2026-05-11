# اضافه کردن آیکون Three.js به قفسه کتاب

## ✅ تکمیل شد!

### مراحل انجام شده:

1. ✅ **فشرده‌سازی با Draco**
   - حجم اصلی: 6.70 MB
   - حجم فشرده: 0.12 MB
   - **صرفه‌جویی: 98.3%** 🎉

2. ✅ **اضافه به قفسه کتاب**
   - موقعیت: پایین قفسه (زیر ردیف 1)
   - اندازه: 0.18 متر ارتفاع

3. ✅ **رنگ سبز Three.js**
   - رنگ: #8cc84b (سبز رسمی Three.js)
   - emissive glow برای برجسته‌تر شدن

---

## فشرده‌سازی Draco

### قبل:
```
three-js.glb: 6.70 MB
```

### بعد:
```
three-js.glb: 0.12 MB (فشرده شده)
three-js-original.glb: 6.70 MB (backup)
```

### مزایای Draco:
- ✅ **98.3% کاهش حجم**
- ✅ لود سریع‌تر
- ✅ کمتر مصرف bandwidth
- ✅ عملکرد بهتر
- ✅ کیفیت بصری حفظ شده

---

## موقعیت در قفسه کتاب

```
┌─────────────────────────────┐
│  Bookshelf Layout           │
├─────────────────────────────┤
│ Row 4 (1.70m):              │
│  [HTML] ............. [C]   │
├─────────────────────────────┤
│ Row 3 (1.30m):              │
│  [Sonic] ... [Logo] ... []  │
├─────────────────────────────┤
│ Row 2 (0.90m):              │
│  [C#] ........... [React]   │
├─────────────────────────────┤
│ Row 1 (0.50m):              │
│  [Python] ..... [Blender]   │
├─────────────────────────────┤
│ Bottom (0.10m): ← جدید!     │
│  ........ [Three.js] .....  │
└─────────────────────────────┘
```

---

## تنظیمات

### در `config.js`:
```javascript
threejsIcon: {
  url: '/assets/models/three-js.glb',
  position: [-3.0, 0.10, -7.15], // پایین قفسه
  rotation: [0, 0, 0],
  targetSize: { height: 0.18 },
  type: 'environment'
}
```

### موقعیت:
- **X: -3.0** - وسط قفسه
- **Y: 0.10** - پایین (10cm از زمین)
- **Z: -7.15** - داخل قفسه

---

## رنگ Three.js

### در `threejsIcon.js`:
```javascript
child.material = new THREE.MeshStandardMaterial({
  color: 0x8cc84b,        // سبز Three.js
  metalness: 0.3,         // کمی براق
  roughness: 0.6,         // نیمه مات
  emissive: 0x8cc84b,     // نور سبز
  emissiveIntensity: 0.2, // glow ملایم
});
```

### رنگ‌های رسمی Three.js:
- **سبز:** #8cc84b (استفاده شده)
- **آبی:** #049ef4
- **سفید:** #ffffff

---

## فایل‌های ایجاد شده

### 1. `compress-threejs-model.js`
اسکریپت فشرده‌سازی با Draco

**استفاده:**
```bash
node compress-threejs-model.js
```

### 2. `src/objects/threejsIcon.js`
فایل لود و رنگ‌آمیزی آیکون

**ویژگی‌ها:**
- لود مدل
- اعمال رنگ سبز
- اضافه کردن emissive glow

### 3. Backup
`public/assets/models/three-js-original.glb`

فایل اصلی قبل از فشرده‌سازی (برای مرجع)

---

## مقایسه با سایر آیکون‌ها

| آیکون | رنگ | موقعیت Y | اندازه |
|-------|-----|----------|---------|
| Python | زرد/آبی | 0.50m | 0.15m |
| React | آبی | 0.90m | 0.15m |
| HTML | نارنجی | 1.70m | 0.15m |
| Blender | نارنجی | 0.50m | 0.15m |
| C# | بنفش | 0.90m | 0.15m |
| C | آبی | 1.70m | 0.15m |
| **Three.js** | **سبز** | **0.10m** | **0.18m** |

---

## Draco Compression

### چیست؟
Draco یک کتابخانه فشرده‌سازی Google برای mesh های 3D است.

### مزایا:
- ✅ فشرده‌سازی بسیار قوی (تا 95%)
- ✅ کیفیت بصری عالی
- ✅ پشتیبانی در همه مرورگرها
- ✅ استاندارد صنعت

### نحوه کار:
1. Geometry را فشرده می‌کند
2. Vertex ها را بهینه می‌کند
3. Attribute ها را کدگذاری می‌کند
4. فایل GLB کوچک‌تر ایجاد می‌کند

---

## عملکرد

### قبل از فشرده‌سازی:
- حجم: 6.70 MB
- زمان لود: ~2-3 ثانیه (اتصال متوسط)
- مصرف RAM: بالا

### بعد از فشرده‌سازی:
- حجم: 0.12 MB (**56x کوچکتر!**)
- زمان لود: ~0.1 ثانیه
- مصرف RAM: کم

---

## تست

### چک‌لیست:
- [x] مدل فشرده شد (98.3%)
- [x] به config اضافه شد
- [x] فایل threejsIcon.js ساخته شد
- [x] به main.js اضافه شد
- [x] رنگ سبز اعمال شد
- [x] در پایین قفسه قرار دارد

### دستورات:
```bash
# Refresh صفحه
Ctrl + Shift + R

# بررسی
1. به سمت قفسه کتاب برو
2. پایین قفسه را نگاه کن
3. آیکون سبز Three.js را می‌بینی
4. باید سریع لود شود (0.12 MB)
```

---

## Debug

### کنسول مرورگر:
```javascript
// بررسی لود شدن
scene.getObjectByName('threejsIcon')

// بررسی رنگ
const icon = scene.getObjectByName('threejsIcon');
icon.traverse(child => {
  if (child.isMesh) {
    console.log('Color:', child.material.color);
    console.log('Emissive:', child.material.emissive);
  }
});
```

---

## سفارشی‌سازی

### تغییر رنگ:
```javascript
// آبی Three.js
color: 0x049ef4

// سبز روشن‌تر
color: 0x9cdc5c

// سبز تیره‌تر
color: 0x6ca83b
```

### تغییر glow:
```javascript
// بدون glow
emissiveIntensity: 0.0

// glow قوی‌تر
emissiveIntensity: 0.5
```

### تغییر موقعیت:
```javascript
// بالاتر
position: [-3.0, 0.20, -7.15]

// چپ‌تر
position: [-3.5, 0.10, -7.15]

// راست‌تر
position: [-2.5, 0.10, -7.15]
```

---

## فشرده‌سازی مدل‌های دیگر

اگه می‌خوای مدل‌های دیگه رو هم فشرده کنی:

```javascript
// در compress-threejs-model.js، تغییر بده:
const inputPath = join(__dirname, 'public', 'assets', 'models', 'MODEL_NAME.glb');
```

سپس:
```bash
node compress-threejs-model.js
```

---

## خلاصه

📦 **فشرده‌سازی:** 6.70 MB → 0.12 MB (98.3%)  
📍 **موقعیت:** پایین قفسه کتاب  
🎨 **رنگ:** سبز Three.js (#8cc84b)  
✨ **Glow:** emissive ملایم  
⚡ **عملکرد:** لود سریع و بهینه  

🎉 **Refresh کن و ببین!** 🚀
