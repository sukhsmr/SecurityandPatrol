export type FieldErrors = Record<string, string>;

/** Base error for expected CMS failures. `message` is safe to show to admins. */
export class CmsError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string,
  ) {
    super(message);
    this.name = 'CmsError';
  }
}

export class NotFoundError extends CmsError {
  constructor(message = 'The requested item was not found.') {
    super(message, 404, 'not_found');
  }
}

export class ConflictError extends CmsError {
  constructor(message: string) {
    super(message, 409, 'conflict');
  }
}

export class ValidationError extends CmsError {
  constructor(
    public readonly fieldErrors: FieldErrors,
    message = 'Please correct the highlighted fields.',
  ) {
    super(message, 422, 'validation_failed');
  }
}

export class StorageError extends CmsError {
  constructor(message: string) {
    super(message, 500, 'storage_error');
  }
}
