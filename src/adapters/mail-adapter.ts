interface EmailFeedbackProps {
  type: string;
  comment: string;
  screenshot: string;
}
export interface SendMailData {
  subject: string;
  variables: EmailFeedbackProps;
  path: string;
}

export interface MailAdapter {
  sendMail: (data: SendMailData) => Promise<void>;
}