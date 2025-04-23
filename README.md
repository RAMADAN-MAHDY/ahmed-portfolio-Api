# AhmedPortfolio API

هذا المشروع هو واجهة برمجية (API) لإدارة المشاريع والصور الخاصة بمحفظة أحمد مهدي. تم تطويره باستخدام Node.js وExpress.js مع MongoDB كقاعدة بيانات.

---

## المميزات

- **إضافة مشروع جديد**: يمكن إضافة مشاريع جديدة مع تفاصيل مثل العنوان والوصف والصورة.
- **تحديث مشروع**: يمكن تعديل تفاصيل المشاريع الموجودة.
- **حذف مشروع**: يمكن حذف المشاريع من قاعدة البيانات.
- **إدارة الصور**: رفع الصور إلى ImgBB وتخزين روابطها في قاعدة البيانات.
- **تسجيل الدخول**: تسجيل الدخول باستخدام كلمة مرور مشفرة.
- **عرض المشاريع**: جلب المشاريع بترتيب زمني (آخر إضافة أو آخر تحديث).

---

## المتطلبات

- Node.js (الإصدار 14 أو أعلى)
- MongoDB
- حساب على ImgBB للحصول على مفتاح API

---

## الإعداد

1. **استنساخ المشروع:**
   ```bash
   git clone <repository-url>
   cd AhmedPortfolio
## تثبيت الحزم:
npm install
إعداد ملف البيئة .env: قم بإنشاء ملف .env في جذر المشروع وأضف القيم التالية:

DB_KEY = "mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"

IMGBB_API_KEY = " your-imgbb-api-key "

---
## هيكل المشروع


AhmedPortfolio-Api/
├── .env
├── .gitignore
├── db.js
├── [index.js](http://_vscodecontentref_/0)
├── package.json
├── MongooseSchema/
│   ├── adminImageSchema.js
│   ├── adminSchema.js
│   ├── [projectSchema.js](http://_vscodecontentref_/1)
├── Routers/
│   ├── DELETE/
│   │   └── [deleteProject.js](http://_vscodecontentref_/2)
│   ├── GET/
│   │   ├── [getImage.js](http://_vscodecontentref_/3)
│   │   ├── [getProjects.js](http://_vscodecontentref_/4)
│   ├── loginAndCreatePass/
│   │   └── [login.js](http://_vscodecontentref_/5)
│   ├── POST/
│   │   ├── [addNewImage.js](http://_vscodecontentref_/6)
│   │   ├── projectRouter.js
│   ├── PUT/
│       └── updateProject.js

---
## المسارات (Routes)
المشاريع
إضافة مشروع جديد:

POST /api/add-project
البيانات المطلوبة: title, description, date, image
جلب المشاريع:

GET /api/get-projects
يمكن الترتيب حسب createdAt أو updatedAt باستخدام query parameters.
تحديث مشروع:

PUT /api/updateProject/:id
البيانات المطلوبة: title, description, date, image
حذف مشروع:

DELETE /api/deleteProject/:id
الصور
رفع صورة جديدة:

POST /api/addNewImage
البيانات المطلوبة: image (ملف)
جلب أحدث صورة:

GET /api/getImage/latest
تسجيل الدخول
إنشاء كلمة مرور:

POST /api/admin/create-password
البيانات المطلوبة: password
تسجيل الدخول:

POST /api/admin/login
البيانات المطلوبة: password
التحقق من الجلسة:

GET /api/admin/check-session

---
## المساهمون

رمضان مهدي  - مطور المشروع.

ملاحظات

تأكد من إعداد قاعدة البيانات بشكل صحيح قبل تشغيل المشروع.
استخدم HTTPS عند تشغيل المشروع في بيئة الإنتاج لتأمين الكوكيز والجلسات.
