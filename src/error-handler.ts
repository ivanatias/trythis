import type { ErrorFormatter } from './types.ts'

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
