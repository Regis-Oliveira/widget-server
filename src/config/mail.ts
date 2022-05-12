interface IMailConfig {
  driver: 'nodemailer' | 'sendgrid';
}

export default {
  driver: process.env.MAIL_DRIVER || 'nodemailer'
} as IMailConfig;