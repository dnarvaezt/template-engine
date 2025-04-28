export class MessageHandlerService {
  static error({
    error,
    defaultMessage,
  }: {
    error?: unknown
    defaultMessage: string
  }): void {
    const errorMessage = error instanceof Error ? error.message : defaultMessage
    console.error(error || errorMessage)
  }

  static success(defaultMessage: string): void {
    console.info(defaultMessage)
  }
}
