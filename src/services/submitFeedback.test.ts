import { SubmitFeedbackService } from './submitFeedback'

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'test',
        screenshot: 'data:image/png;base64,test',
      })
    ).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able to submit feedback without a type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'test',
        screenshot: 'data:image/png;base64,test',
      })
    ).rejects.toThrow()
  })

  it('should not be able to submit feedback without a comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,test',
      })
    ).rejects.toThrow()
  })

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'test',
        screenshot: 'test.jpg',
      })
    ).rejects.toThrow()
  })
})
