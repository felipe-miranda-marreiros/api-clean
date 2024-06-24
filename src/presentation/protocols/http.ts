export interface HttpResponse<TResponse = unknown> {
  statusCode: number
  body: TResponse
}

export interface HttpRequest<TRequest = unknown> {
  body?: TRequest
}
