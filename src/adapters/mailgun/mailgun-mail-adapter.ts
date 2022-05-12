import { MailAdapter, SendMailData } from "../mail-adapter";
import handlebars from 'handlebars';
import fs from 'fs';
import Mailgun from 'mailgun.js';
import formData from 'form-data';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
	username: 'api',
	key: process.env.MAILGUN_KEY || process.env.MAILGUN_ID || '',
});

export class MailgunMailAdapter implements MailAdapter {
  async sendMail({ subject, variables, path }: SendMailData) {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHtml = templateParse(variables);

    await mg.messages
    .create('sandboxba69a763b9c34673acb6e0c4286e2a7a.mailgun.org', {
      from: "Mailgun Sandbox <postmaster@sandboxba69a763b9c34673acb6e0c4286e2a7a.mailgun.org>",
      to: ["regis_crysis@hotmail.com"],
      subject,
      html: templateHtml
    })
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.log(err)); // logs any error`;
    }
  };
