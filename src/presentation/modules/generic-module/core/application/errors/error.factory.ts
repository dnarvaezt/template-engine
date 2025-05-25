interface CustomError extends Error {
  errorCode: number
  type: string
  details?: any
  originalError?: Error
  timestamp: string
}

interface ErrorOptions {
  message?: string
  details?: any
  errorCode?: number
  originalError?: Error
}

interface NotFoundErrorOptions extends ErrorOptions {
  resource?: string
  id?: string | number
}

interface UnauthorizedErrorOptions extends ErrorOptions {
  requiredPermissions?: string[]
  userPermissions?: string[]
}

interface ConflictErrorOptions extends ErrorOptions {
  conflictDetails?: any
}

export class ErrorFactory {
  private static createBaseError(
    type: string,
    defaultMessage: string,
    options: ErrorOptions
  ): CustomError {
    const error = new Error(options.message || defaultMessage) as CustomError
    error.errorCode = options.errorCode || this.getDefaultErrorCode(type)
    error.type = type
    error.timestamp = new Date().toISOString()
    if (options.details) error.details = options.details
    if (options.originalError) error.originalError = options.originalError
    return error
  }

  private static getDefaultErrorCode(type: string): number {
    const codes: Record<string, number> = {
      INVALID_DATA: 400,
      NOT_FOUND: 404,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      CONFLICT: 409,
      GENERIC_ERROR: 500,
    }
    return codes[type] || 500
  }

  /**
   * Creates an error for invalid data
   *
   * @param options Error options
   * @returns Configured error
   */
  static invalidData(options: ErrorOptions = {}): CustomError {
    return this.createBaseError('INVALID_DATA', 'Invalid data', {
      errorCode: 400,
      ...options,
    })
  }

  /**
   * Creates an error for resources not found
   *
   * @param options Specific options for not found resource
   * @returns Configured error
   */
  static notFound(options: NotFoundErrorOptions = {}): CustomError {
    const message = options.resource
      ? `Not found${options.id ? ` with ID ${options.id}` : ''}`
      : options.message || 'Not found'

    return this.createBaseError('NOT_FOUND', message, {
      errorCode: 404,
      ...options,
    })
  }

  /**
   * Creates an error for unauthorized access
   *
   * @param options Specific options for unauthorized access
   * @returns Configured error
   */
  static unauthorized(options: UnauthorizedErrorOptions = {}): CustomError {
    const error = this.createBaseError(
      'UNAUTHORIZED',
      options.message || 'Unauthorized',
      { errorCode: 401, ...options }
    )

    if (options.requiredPermissions || options.userPermissions) {
      error.details = {
        ...(error.details || {}),
        requiredPermissions: options.requiredPermissions,
        userPermissions: options.userPermissions,
      }
    }

    return error
  }

  /**
   * Creates an error for conflicts
   *
   * @param options Specific options for conflict
   * @returns Configured error
   */
  static conflict(options: ConflictErrorOptions = {}): CustomError {
    const error = this.createBaseError(
      'CONFLICT',
      options.message || 'Conflict',
      { errorCode: 409, ...options }
    )

    if (options.conflictDetails) {
      error.details = {
        ...(error.details || {}),
        conflictDetails: options.conflictDetails,
      }
    }

    return error
  }

  /**
   * Creates a generic error
   *
   * @param message Main error message
   * @param options Additional options
   * @returns Configured error
   */
  static genericError(
    message: string,
    options: Omit<ErrorOptions, 'message'> & { type?: string } = {}
  ): CustomError {
    return this.createBaseError(options.type || 'GENERIC_ERROR', message, {
      ...options,
    })
  }
}
