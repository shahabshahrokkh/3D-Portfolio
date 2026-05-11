# راهنمای Wireframe اتاق (کف + گنبد + دیوارها)

## ✅ پیاده‌سازی شد!

یک سیستم کامل wireframe برای اتاق شما ایجاد شد که شامل:
1. **کف اتاق** - شبکه دقیق روی زمین
2. **گنبد** - دقیقاً روی لبه‌های کف
3. **دیوارها** - دیوار پشت و چپ

---

## 📐 ابعاد دقیق اتاق

از `environment.js` گرفته شده:
```javascript
{
  width: 11.5,    // عرض (X)
  depth: 11.5,    // عمق (Z)
  height: 5,      // ارتفاع (Y)
  center: (-1.75, 0, -1.75)
}
```

---

## 🎨 اجزای سیستم

### 1. **Floor Wireframe** (کف)
- شبکه 20×20
- دقیقاً روی کف اتاق (Y = 0.01)
- خطوط افقی و عمودی

### 2. **Room Dome** (گنبد)
- شعاع محاسبه شده از قطر اتاق
- 8 حلقه افقی
- 24 خط عمودی
- دقیقاً روی لبه کف

### 3. **Wall Wireframes** (دیوارها)
- دیوار پشت (Back wall)
- دیوار چپ (Left wall)
- شبکه 15×15

---

## 🔧 سفارشی‌سازی

### تغییر رنگ:
در `wireframeDome.js`، هر بخش material خودش را دارد:

```javascript
// کف
const material = new THREE.LineBasicMaterial({
  color: 0xffffff, // سفید
  opacity: 0.15
});

// گنبد
color: 0xffffff, // سفید
opacity: 0.15

// دیوارها
color: 0xffffff, // سفید
opacity: 0.12
```

رنگ‌های پیشنهادی:
```javascript
0x00ffff  // آبی فیروزه‌ای (Cyberpunk)
0xff00ff  // صورتی نئون
0x00ff00  // سبز (Matrix)
0xffbe0b  // زرد طلایی
```

### تغییر شفافیت:

**کف**:
```javascript
opacity: 0.10  // خیلی شفاف
opacity: 0.15  // متوسط (پیش‌فرض)
opacity: 0.25  // واضح
```

**گنبد**:
```javascript
opacity: 0.12  // شفاف
opacity: 0.20  // واضح‌تر
```

**دیوارها**:
```javascript
opacity: 0.08  // خیلی شفاف
opacity: 0.12  // متوسط (پیش‌فرض)
opacity: 0.18  // واضح
```

### تغییر جزئیات:

**کف**:
```javascript
const divisions = 20;  // پیش‌فرض
const divisions = 30;  // جزئیات بیشتر
const divisions = 10;  // جزئیات کمتر
```

**گنبد**:
```javascript
const rings = 8;       // حلقه‌های افقی
const segments = 24;   // خطوط عمودی
```

**دیوارها**:
```javascript
const divisions = 15;  // پیش‌فرض
const divisions = 20;  // جزئیات بیشتر
```

---

## ⚡ انیمیشن‌ها

### کف:
```javascript
material.opacity = 0.12 + Math.sin(time) * 0.03;
```
- ضربان ملایم
- بدون چرخش

### گنبد:
```javascript
material.opacity = 0.12 + Math.sin(time) * 0.03;
group.rotation.y += 0.0002;
```
- ضربان ملایم
- چرخش آرام

### دیوارها:
```javascript
material.opacity = 0.10 + Math.sin(time * 0.8) * 0.02;
```
- ضربان خیلی ملایم
- بدون چرخش

---

## 🎭 حالت‌های مختلف

### حالت 1: فقط کف + گنبد
در `main.js`:
```javascript
const floor = createFloorWireframe(scene);
const dome = createRoomDome(scene);

const animate = () => {
  floor.animate();
  dome.animate();
};
```

### حالت 2: فقط گنبد
```javascript
const dome = createRoomDome(scene);
const animate = () => dome.animate();
```

### حالت 3: همه (پیش‌فرض)
```javascript
const { floor, dome, walls, animate } = createCompleteRoomWireframe(scene);
```

---

## 🎨 افکت‌های اضافی

### 1. Glow Effect (درخشش)
در `wireframeDome.js`، بعد از ساخت هر بخش:

```javascript
// کپی material با رنگ متفاوت
const glowMaterial = material.clone();
glowMaterial.color.setHex(0x00d9ff);
glowMaterial.opacity = 0.05;

// کپی geometry
const glowGroup = group.clone();
glowGroup.material = glowMaterial;
glowGroup.scale.set(1.01, 1.01, 1.01);
scene.add(glowGroup);
```

### 2. Multiple Colors (چند رنگ)
```javascript
// کف: آبی
floorMaterial.color.setHex(0x00ffff);

// گنبد: سفید
domeMaterial.color.setHex(0xffffff);

// دیوارها: صورتی
wallsMaterial.color.setHex(0xff00ff);
```

### 3. Gradient Animation (گرادیانت متحرک)
در animate function:
```javascript
const hue = (time * 0.1) % 1;
material.color.setHSL(hue, 1, 0.5);
```

---

## 🔍 اضافه کردن دیوارهای دیگر

در `createWallWireframes`:

```javascript
// Right wall (دیوار راست)
const rightWall = createWallGrid(depth, height, material);
rightWall.rotation.y = -Math.PI / 2;
rightWall.position.set(centerX + width / 2, height / 2, centerZ);
group.add(rightWall);

// Front wall (دیوار جلو)
const frontWall = createWallGrid(width, height, material);
frontWall.rotation.y = Math.PI;
frontWall.position.set(centerX, height / 2, centerZ + depth / 2);
group.add(frontWall);
```

---

## 📊 Performance

### برای موبایل:
```javascript
const isMobile = window.innerWidth < 768;

if (isMobile) {
  // کمتر جزئیات
  const divisions = 10;  // به جای 20
  const rings = 6;       // به جای 8
  const segments = 16;   // به جای 24
  
  // opacity کمتر
  opacity: 0.08;
}
```

### غیرفعال کردن بخش‌ها:
```javascript
// فقط کف و گنبد، بدون دیوار
const floor = createFloorWireframe(scene);
const dome = createRoomDome(scene);
// walls را نسازید
```

---

## 🐛 عیب‌یابی

### Wireframe دیده نمی‌شود:
1. **Opacity را بیشتر کنید**:
   ```javascript
   opacity: 0.3
   ```

2. **رنگ را تغییر دهید**:
   ```javascript
   color: 0xff0000  // قرمز برای تست
   ```

3. **Position را چک کنید**:
   ```javascript
   console.log(group.position);
   ```

### خطوط روی هم می‌افتند (Z-fighting):
```javascript
// کف را کمی بالاتر بگذارید
floorY + 0.01  // به جای floorY
```

### Performance پایین:
1. تعداد divisions را کم کنید
2. انیمیشن را غیرفعال کنید
3. در موبایل غیرفعال کنید

---

## 🎯 ترکیب‌های رنگی پیشنهادی

### Cyberpunk:
```javascript
floor: 0x00ffff   // آبی فیروزه‌ای
dome: 0xff00ff    // صورتی
walls: 0xffbe0b   // زرد
```

### Matrix:
```javascript
floor: 0x00ff00   // سبز
dome: 0x00ff00    // سبز
walls: 0x003300   // سبز تیره
```

### Neon:
```javascript
floor: 0xff006e   // صورتی
dome: 0x00d9ff    // آبی
walls: 0xffbe0b   // زرد
```

### Minimal:
```javascript
floor: 0xffffff   // سفید
dome: 0xffffff    // سفید
walls: 0xcccccc   // خاکستری روشن
```

---

## 📝 نکات مهم

1. **ابعاد دقیق**: گنبد دقیقاً روی لبه کف قرار دارد
2. **مرکز اتاق**: همه چیز نسبت به `(-1.75, 0, -1.75)` است
3. **Performance**: با جزئیات زیاد، FPS کم می‌شود
4. **Layering**: کف کمی بالاتر از Y=0 است تا Z-fighting نداشته باشد

---

## 🚀 نتیجه

حالا یک سیستم کامل wireframe دارید که:
- ✅ دقیقاً با ابعاد اتاق مطابقت دارد
- ✅ کف + گنبد + دیوارها
- ✅ انیمیشن ملایم
- ✅ کاملاً قابل سفارشی‌سازی

**صفحه را رفرش کنید!** 🎉

شما باید ببینید:
- شبکه روی کف
- گنبد دقیقاً روی لبه‌های کف
- دیوارهای پشت و چپ با شبکه

**لذت ببرید!** ✨
