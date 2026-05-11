# راهنمای Wireframe Dome (گنبد سیمی)

## ✅ پیاده‌سازی شد!

یک گنبد سیمی زیبا دور اتاق شما اضافه شد که شبیه تصویر شماست.

---

## 🎨 انواع Dome های موجود

در فایل `src/scene/wireframeDome.js` چهار نوع مختلف وجود دارد:

### 1. **Hexagonal Dome** (پیش‌فرض - فعال)
```javascript
createHexagonalDome(scene)
```
- شبکه شش‌ضلعی مثل تصویر شما
- خطوط افقی و عمودی
- ظاهر تمیز و هندسی
- **این الان فعال است** ✅

### 2. **Wireframe Dome** (کروی ساده)
```javascript
createWireframeDome(scene)
```
- بر اساس کره
- شبکه مثلثی
- ساده‌تر

### 3. **Icosahedron Dome** (بیست وجهی)
```javascript
createIcosahedronDome(scene)
```
- شکل هندسی بیست وجهی
- خطوط تمیز و مشخص
- ظاهر مدرن

### 4. **Geodesic Dome** (ژئودزیک با Glow)
```javascript
createGeodesicDome(scene)
```
- دو لایه: اصلی + glow
- افکت درخشش
- جذاب‌تر

---

## 🔧 تنظیمات

### تغییر نوع Dome:

در فایل `src/main.js` خط زیر را پیدا کنید:
```javascript
const { dome: wireframeDome, animate: animateDome } = createHexagonalDome(scene);
```

و تابع را تغییر دهید:
```javascript
// برای Wireframe ساده:
const { dome: wireframeDome, animate: animateDome } = createWireframeDome(scene);

// برای Icosahedron:
const { dome: wireframeDome, animate: animateDome } = createIcosahedronDome(scene);

// برای Geodesic با Glow:
const { dome, glowDome, animate: animateDome } = createGeodesicDome(scene);
```

---

## 🎨 سفارشی‌سازی

### تغییر رنگ:
در `src/scene/wireframeDome.js`، خط زیر را پیدا کنید:
```javascript
color: 0xffffff, // سفید
```

رنگ‌های پیشنهادی:
```javascript
color: 0x00ffff, // آبی فیروزه‌ای
color: 0xff00ff, // صورتی
color: 0x00ff00, // سبز
color: 0xffff00, // زرد
color: 0xff0000, // قرمز
```

### تغییر شفافیت:
```javascript
opacity: 0.15, // 0.0 (نامرئی) تا 1.0 (کاملاً مات)
```

پیشنهادات:
- `0.10` - خیلی شفاف
- `0.15` - متوسط (پیش‌فرض)
- `0.25` - واضح‌تر
- `0.40` - خیلی واضح

### تغییر اندازه:
```javascript
const radius = 12; // شعاع گنبد
```

پیشنهادات:
- `10` - کوچکتر (نزدیک‌تر به اتاق)
- `12` - متوسط (پیش‌فرض)
- `15` - بزرگتر (دورتر از اتاق)

### تغییر جزئیات:
```javascript
const rings = 8;     // تعداد حلقه‌های افقی
const segments = 16; // تعداد خطوط عمودی
```

بیشتر = جزئیات بیشتر اما performance کمتر

---

## ⚡ انیمیشن

### سرعت چرخش:
```javascript
group.rotation.y += 0.0002; // کندتر
group.rotation.y += 0.001;  // سریع‌تر
```

### افکت Pulse (ضربان):
```javascript
material.opacity = 0.12 + Math.sin(time) * 0.03;
```

تغییر `0.03` به:
- `0.01` - ضربان ملایم
- `0.05` - ضربان قوی
- `0.10` - ضربان خیلی قوی

### غیرفعال کردن انیمیشن:
در تابع `animate`:
```javascript
const animate = () => {
  // time += 0.01;
  // material.opacity = 0.12 + Math.sin(time) * 0.03;
  // group.rotation.y += 0.0002;
};
```

---

## 🎭 افکت‌های اضافی

### 1. Glow Effect (درخشش)
```javascript
const glowMaterial = new THREE.LineBasicMaterial({
  color: 0x00d9ff,
  transparent: true,
  opacity: 0.05,
  linewidth: 2
});

const glowDome = new THREE.LineSegments(wireframe.clone(), glowMaterial);
glowDome.scale.set(1.01, 1.01, 1.01);
scene.add(glowDome);
```

### 2. Multiple Layers (چند لایه)
```javascript
// لایه اول
const dome1 = createHexagonalDome(scene);

// لایه دوم (بزرگتر)
const dome2 = createHexagonalDome(scene);
dome2.dome.scale.set(1.1, 1.1, 1.1);
dome2.dome.material.opacity = 0.08;
```

### 3. Color Gradient (گرادیانت رنگ)
```javascript
// در animate function:
const hue = (time * 0.1) % 1;
material.color.setHSL(hue, 1, 0.5);
```

---

## 📊 Performance

### برای موبایل:
```javascript
const isMobile = window.innerWidth < 768;

if (isMobile) {
  // کمتر جزئیات
  const rings = 6;
  const segments = 12;
  // opacity کمتر
  opacity: 0.10;
}
```

### غیرفعال کردن در موبایل:
```javascript
if (!isMobile) {
  const { dome, animate } = createHexagonalDome(scene);
}
```

---

## 🐛 عیب‌یابی

### Dome دیده نمی‌شود:
1. شعاع را بزرگتر کنید: `radius = 15`
2. opacity را بیشتر کنید: `opacity: 0.3`
3. رنگ را تغییر دهید: `color: 0xff0000` (قرمز)

### خطوط خیلی ضخیم:
```javascript
linewidth: 1 // به جای 2 یا 3
```

### Performance پایین:
1. تعداد segments را کم کنید
2. انیمیشن را غیرفعال کنید
3. در موبایل غیرفعال کنید

---

## 🎨 ترکیب‌های رنگی پیشنهادی

### Cyberpunk:
```javascript
color: 0x00ffff,  // آبی فیروزه‌ای
opacity: 0.20
```

### Neon:
```javascript
color: 0xff00ff,  // صورتی نئون
opacity: 0.25
```

### Matrix:
```javascript
color: 0x00ff00,  // سبز
opacity: 0.15
```

### Sunset:
```javascript
color: 0xff6b35,  // نارنجی
opacity: 0.18
```

### Ice:
```javascript
color: 0xb8e6ff,  // آبی یخی
opacity: 0.12
```

---

## 📝 نکات مهم

1. **Linewidth**: در بیشتر مرورگرها فقط `1` کار می‌کند
2. **Performance**: با تعداد خطوط زیاد، performance کم می‌شود
3. **Z-fighting**: اگر دو dome روی هم باشند، ممکن است flicker داشته باشند
4. **Transparency**: با `transparent: true` و `opacity < 1` استفاده کنید

---

## 🚀 نتیجه

حالا یک گنبد سیمی زیبا دور اتاق شما وجود دارد! 🎉

برای تست:
1. صفحه را رفرش کنید
2. باید یک شبکه سفید شفاف دور صحنه ببینید
3. آرام در حال چرخش است
4. با ضربان ملایم opacity تغییر می‌کند

**لذت ببرید!** ✨
