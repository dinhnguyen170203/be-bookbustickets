#Tên Dự Án: Be Book Bus Tickets

##1. Giới thiệu

Dự án này là dịch vụ backend cho ứng dụng thương mại điện tử, cho phép người dùng đặt vé xe khách trực tuyến. Dịch vụ này cung cấp API cho frontend, quản lý người dùng, vé xe, và nhiều chức năng khác.

##2. Công nghệ sử dụng

- Ngôn ngữ lập trình: JavaScript
- Thư viện Backend: Node.js, Express.js
- Cơ sở dữ liệu: MongoDB (thông qua Mongoose)
- Các công nghệ khác: JSON Web Token (JWT), Bcrypt, Cloudinary

##3. Cấu trúc thư mục
be-bookbustickets
├── src
│ ├── config # Cấu hình ứng dụng
│ ├── controllers # Các controller xử lý logic
│ ├── middleware # Middleware cho xử lý yêu cầu
│ ├── models # Các mô hình dữ liệu
│ ├── routes # Các định nghĩa route
│ ├── services # Các dịch vụ xử lý logic
│ ├── index.js # Điểm khởi đầu của ứng dụng
├── .env # Biến môi trường
├── .gitignore # Danh sách các tệp và thư mục được bỏ qua khi commit
├── package-lock.json # Khóa phiên bản phụ thuộc
├── package.json # Thông tin và phụ thuộc của dự án

##4. Hướng dẫn cài đặt

###Yêu cầu hệ thống:

- Node.js v20 trở lên

###Cách cài đặt và chạy dự án

1. Clone dự án về máy:

   ```bash
   git clone https://github.com/dinhnguyen170203/be-bookbustickets.git
   cd be-bookbustickets

   ```

2. Cài đặt các gói phụ thuộc:

npm install

3. Chạy ứng dụng:

npm start

4. Truy cập API:

   http://localhost:3000
