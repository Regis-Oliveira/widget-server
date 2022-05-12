import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";
import handlebars from 'handlebars';
import fs from 'fs';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8c3af11e990805",
    pass: "3bf9104b98573f"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, variables, path }: SendMailData) {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHtml = templateParse(variables);

    await transport.sendMail({
      from: 'Equipe feedget oi@feedget.com',
      to: 'Régis de Oliveira <regis_crysis@hotmail.com>',
      subject,
      html: templateHtml,
    })
  };
}