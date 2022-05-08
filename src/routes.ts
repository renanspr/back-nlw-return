import { Router } from 'express'
import { PrismaFeedbacksRepository } from 'repositories/prisma/prismaFeedbacksRepository'
import { SubmitFeedbackService } from 'services/submitFeedback'
import { NodemailerMailAdapter } from 'adapters/nodemailer/nodemailMailAdapter'

const router = Router()

router.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const prismaFeedbackRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()

  const submitFeedbackService = new SubmitFeedbackService(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  )

  await submitFeedbackService.execute({ type, comment, screenshot })

  return res.status(201).send()
})

export default router
