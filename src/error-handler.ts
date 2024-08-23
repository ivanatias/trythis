import type { ErrorFormatter } from './types.ts'

/**
 * Handle the error thrown by the task.
 *
 * @param err The error value that was thrown by the task.
 * @param errorFormatter An optional error formatter that will be called with the thrown error value.
 * If this argument is provided, it should return the error that will be returned as the second value of the tuple.
 * The returned value will be of the shape returned by the formatter you passed.
 * If this argument is not provided, the error will be an `Error` object.
 * @returns The error that will be returned as the second value of the tuple.
 */
export const errorHandler = <ThrowValueType, ReturnedErrorValueType>(
  err: ThrowValueType,
  errorFormatter?: ErrorFormatter<ThrowValueType, ReturnedErrorValueType>
) => {
  if (errorFormatter !== undefined) return errorFormatter(err)
  if (!(err instanceof Error)) {
    return new Error(typeof err === 'string' ? err : JSON.stringify(err))
  }
  return err
}
