# 🚀 Hướng Dẫn Deploy lên Render

## Yêu Cầu Trước Khi Deploy

1. **Tài khoản cần thiết**:
   - Tài khoản [Render](https://render.com) (miễn phí)
   - Tài khoản [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (miễn phí)
   - Repository trên GitHub/GitLab

2. **Chuẩn bị MongoDB Atlas**:
   - Tạo cluster MongoDB (chọn gói Free tier)
   - Tạo database user với username và password
   - Whitelist tất cả IP addresses (0.0.0.0/0) cho Render
   - Lấy connection string: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>`

## 📋 Các Bước Deploy

### Bước 1: Push Code lên GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Bước 2: Tạo Web Service trên Render

1. Đăng nhập vào [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Kết nối với GitHub repository của bạn
4. Chọn repository **SDN301-Assignment4-Dep-BE**

### Bước 3: Cấu Hình Web Service

Điền thông tin sau:

| Field | Value |
|-------|-------|
| **Name** | `quiz-management-api` (hoặc tên bạn muốn) |
| **Region** | Singapore (hoặc gần bạn nhất) |
| **Branch** | `main` |
| **Root Directory** | (để trống) |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free |

### Bước 4: Thêm Environment Variables

Trong phần **Environment Variables**, thêm các biến sau:

| Key | Value | Ghi chú |
|-----|-------|---------|
| `NODE_ENV` | `production` | Môi trường production |
| `MONGODB_URI` | `mongodb+srv://...` | Connection string từ MongoDB Atlas |
| `JWT_SECRET` | `your-secret-key-here` | Key bí mật cho JWT (tạo random phức tạp) |
| `JWT_EXPIRE` | `7d` | Thời gian hết hạn JWT |
| `PORT` | `10000` | Port mặc định của Render |
| `CORS_ORIGIN` | `*` hoặc frontend URL | URL frontend của bạn |

**Lưu ý về JWT_SECRET**: Tạo một chuỗi random phức tạp, ví dụ:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Bước 5: Deploy

1. Click **"Create Web Service"**
2. Render sẽ tự động:
   - Clone repository
   - Chạy `npm install`
   - Chạy `npm start`
   - Cấp một URL như: `https://quiz-management-api.onrender.com`

### Bước 6: Kiểm Tra Deployment

1. **Test health check**:
   ```
   GET https://your-app.onrender.com/health
   ```
   
   Kết quả mong đợi:
   ```json
   {
     "status": "OK",
     "uptime": 123.456,
     "timestamp": "2026-03-12T10:30:00.000Z",
     "mongodb": "Connected"
   }
   ```

2. **Test API root**:
   ```
   GET https://your-app.onrender.com/
   ```

3. **Test endpoints**:
   ```
   GET https://your-app.onrender.com/api/subjects
   GET https://your-app.onrender.com/api/difficulties
   ```

### Bước 7: Seed Database (Tùy chọn)

Nếu muốn seed dữ liệu mẫu, có 2 cách:

**Cách 1: Từ local**
```bash
# Tạo file .env với MONGODB_URI từ Render
MONGODB_URI=mongodb+srv://... node seedData.js
```

**Cách 2: Từ Render Shell**
1. Vào Dashboard → Web Service
2. Click **"Shell"** tab
3. Chạy: `node seedData.js`

## 🔧 Troubleshooting

### Lỗi: Cannot connect to MongoDB

**Giải pháp**:
- Kiểm tra connection string có đúng không
- Xác nhận IP whitelist trên MongoDB Atlas (phải có 0.0.0.0/0)
- Kiểm tra username/password

### Lỗi: Module not found

**Giải pháp**:
- Xác nhận tất cả dependencies có trong `package.json`
- Trigger rebuild: Settings → Manual Deploy → Deploy latest commit

### Free Tier Sleeps After Inactivity

Render free tier sẽ sleep sau 15 phút không hoạt động.

**Giải pháp**:
- Upgrade lên paid plan
- Dùng ping service (như [UptimeRobot](https://uptimerobot.com)) để ping endpoint mỗi 14 phút

### CORS Errors từ Frontend

**Giải pháp**:
- Cập nhật `CORS_ORIGIN` environment variable với URL frontend thực tế
- Hoặc set `CORS_ORIGIN=*` để cho phép tất cả origins (không khuyến khích cho production)

## 📝 Auto-Deploy

Render tự động deploy khi có commit mới trên branch `main`:

```bash
git add .
git commit -m "Update features"
git push origin main
# Render sẽ tự động detect và deploy
```

## 🔄 Cập Nhật Environment Variables

1. Vào Render Dashboard → Web Service
2. Click **"Environment"** tab
3. Thêm/sửa/xóa variables
4. Click **"Save Changes"**
5. Service sẽ tự động restart

## 📊 Monitoring

### Xem Logs
1. Vào Dashboard → Web Service
2. Click **"Logs"** tab
3. Xem real-time logs

### Metrics
1. Click **"Metrics"** tab
2. Xem CPU, Memory, Bandwidth usage

## 🎯 Best Practices

1. **Environment Variables**: Không bao giờ commit secrets vào Git
2. **MongoDB Atlas**: Luôn whitelist IP và dùng strong password
3. **Regular Backups**: Backup MongoDB định kỳ từ Atlas
4. **Monitor Logs**: Thường xuyên check logs để phát hiện lỗi
5. **Health Checks**: Dùng `/health` endpoint để monitor uptime

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [Node.js Deployment Guide](https://render.com/docs/deploy-node-express-app)

## ✅ Checklist Deploy

- [ ] Code đã push lên GitHub
- [ ] MongoDB Atlas cluster đã tạo
- [ ] MongoDB connection string đã có
- [ ] Render web service đã tạo
- [ ] Environment variables đã cấu hình
- [ ] Deploy thành công
- [ ] `/health` endpoint hoạt động
- [ ] API endpoints test thành công
- [ ] (Tùy chọn) Database đã seed
- [ ] Frontend đã cập nhật API URL

---

**Chúc bạn deploy thành công! 🎉**
