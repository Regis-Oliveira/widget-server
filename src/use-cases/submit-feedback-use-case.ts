import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if(!type) {
      throw new Error('Type is required');
    }

    if(!comment) {
      throw new Error('Comment is required');
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot format');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [      
        `<div style="flex: 1; align-items: center; justify-content: center; background-color: #09090A; height: auto;">`,
          `<div>`,
            `<h1 style="font-family: sans-serif; text-align: center; color: #8257E5; padding-top: 20px">Novo feedback recebido</h1>`,        
          `</div>`,
          `<div style="background-color: #18181B; margin: 20px; padding: 20px">`,
            `<div style="display: flex; align-items: center; justify-content: flex-start; flex-direction: row; margin-bottom: 14px;">`,
              `<h3 style="color: #8257E5; font-family: sans-serif; font-weight: bold; margin-right: 6px">Tipo do feedback:</h3>`,
              `<p style="font-family: sans-serif; color: #fff; font-size: 16px; font-weight: 400; align-self: center">${type}</p>`,
            `</div>`,
            `<div style="display: flex; align-items: center; justify-content: flex-start; flex-direction: row;">`,
              `<h3 style="color: #8257E5; font-family: sans-serif; font-weight: bold; margin-right: 6px">Comentário:</h3>`,
              `<p style="font-family: sans-serif; color: #fff; font-size: 16px; font-weight: 400; align-self: center">${comment}</p>`,        
            `</div>`,
          `</div>`,
          `<div style="background-color: #18181B; margin: 0 20px; padding: 20px; display: flex; align-items: center; justify-content: flex-start; flex-direction: row;">`,
            `<h3 style="color: #8257E5; font-family: sans-serif; font-weight: bold;">Print da tela abaixo:</h3>`,
          `</div>`,
          `<div style="background-color: #18181B; margin: 0 20px 0; padding: 20px; display: flex; align-items: center; justify-content: center; flex-direction: row; padding-bottom: 20px">`,
            `<div style="border: 1px solid blueviolet">`,
              screenshot ? `<img style="width: 900px; height: 900px;" src="${screenshot}" alt="It's a screenshot from feedback of type ${type}" />` : null,
            `</div>`,
          `</div>`,
        `</div>`,        
      ].join('\n')      
    })
  }
}