import { resolve } from "path";
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
      throw new Error('Tipo obrigatório');
    }

    if(!comment) {
      throw new Error('Comentário obrigatório');
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Formato de imagem inválido');
    }

    const templatePath = resolve(__dirname, '..', 'views', 'emails', 'feedbackEmail.hbs');

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    });

    const variables = {
      type,
      comment,
      screenshot: screenshot ? screenshot : 'https://www.rocketseat.com.br/_next/image?url=%2Fassets%2Fvectors%2Fastronauts.svg&w=640&q=100'
    }

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      variables,
      path: templatePath   
    })
  }
}