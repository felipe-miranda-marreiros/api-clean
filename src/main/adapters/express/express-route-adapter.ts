import { Request, Response } from 'express'
import { Controller, HttpRequest } from '@/presentation/protocols'

export function adapteRoute(controller: Controller) {
  return async (req: Request, res: Response): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(
      httpResponse.body instanceof Error
        ? {
            name: httpResponse.body.name,
            stack: httpResponse.body.message
          }
        : httpResponse.body
    )
  }
}
