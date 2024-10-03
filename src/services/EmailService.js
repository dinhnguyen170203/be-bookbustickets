require('dotenv').config();
const nodemailer = require('nodemailer');

let sendOtpEmail = async ({ email, otp }) => {
  console.log('email:', email);
  console.log('otp:', otp);

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true cho cổng 465, false cho các cổng khác
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    let info = await transporter.sendMail({
      // from: `"Vexe" <${process.env.EMAIL || 'yudlinh0810@gmail.com'}>`,
      to: email,
      subject: 'Thông tin xác thực email',
      html: getBodyHTMLEmail(otp),
    });

    console.log('Email sent:', info.messageId);
    return info; // Trả về thông tin email đã gửi
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send OTP email'); // Ném lỗi nếu không gửi được email
  }
};

let getBodyHTMLEmail = (otp) => {
  let result = `
        <h3>Mã xác thực email: Chỉ sử dụng một lần!</h3>
        <p>Bạn nhận được email này vì bạn đã đăng ký tài khoản tại Vexe.</p>
        <p>Vui lòng nhập mã sau để xác minh:</p>
        <div><b>${otp}</b></div>
        <div>Nếu bạn không yêu cầu thay đổi này, vui lòng thay đổi mật khẩu hoặc liên hệ với chúng tôi.</div>
        <div>Xin chân thành cảm ơn!</div>
    `;
  return result;
};

module.exports = {
  sendOtpEmail,
};
