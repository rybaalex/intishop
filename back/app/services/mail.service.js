const nodemailer = require("nodemailer");
const mailSetting = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};

class MailService {

  constructor() {
    this.transporter = nodemailer.createTransport(mailSetting);
  }

  async sendActivationMail(to, link) {
    const info = await this.transporter.sendMail({
      from: process.env.SMTP_USER + "@yandex.ru Секретарь",
      to,
      subject: "Активация аккаунта интернет магазина " + process.env.SHOP_NAME,
      text: "",
      html: `<div>
        <h1>Для активации перейдите по ссылке</h1>
        <a href="${link}">${link}</a>
      </div>`
    });
  }
}

module.exports = new MailService();