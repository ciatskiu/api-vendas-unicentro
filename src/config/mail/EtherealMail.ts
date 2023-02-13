import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarMailTemplate';


interface ITemplateVariable{
  [key: string]: string | number;
}

interface IParseMailTemplate{
  file: string;
  variables: ITemplateVariable;
}

interface IMailContact{
  name: string;
  email: string;
}

interface ISendMail{
  to: IMailContact;
  from?: IMailContact; //opcional
  subject: string;
  templateData: IParseMailTemplate;
}


export default class EtherealMail{

  static async sendMail({to , from, subject, templateData}: ISendMail): Promise<void>{
    const account = await nodemailer.createTestAccount();
    const mailTemplate = new HandlebarsMailTemplate();
    const trasporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      auth:{
        user: account.user,
        pass: account.pass
      }
    });
    const message = await trasporter.sendMail({
      from: {
        name: from?.name  || 'Equipe API vendas',
        address: from?.email || 'equipe_vendas@apivendas.com.br'
      },
      to: {
        name: to.name ,
        address: to.email
      },
      subject,
      html : await mailTemplate.parse(templateData)
    });
    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }

}
