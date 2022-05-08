import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from 'adapters/mailAdapter'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'f239883a014414',
    pass: '6b1f4fd7bfd515',
  },
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Feedget <oi@feedget.com>',
      to: 'Renan Spera <renansperacampos@gmail.com>',
      subject,
      html: body,
    })
  }
}
