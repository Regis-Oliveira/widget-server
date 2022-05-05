import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8c3af11e990805",
    pass: "3bf9104b98573f"
  }
});


export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe feedget oi@feedget.com',
      to: 'Regis de Oliveira <regis_crysis@hotmail.com>',
      subject,
      html: body,
    })
  };
}