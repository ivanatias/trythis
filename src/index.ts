import { errorHandler } from './error-handler.ts'
import type { TryThisResult, ErrorFormatter } from './types.ts'

export function tryThis<
  TaskType,
  ThrownValueType = unknown,
  ReturnedErrorValueType = Error
>(
  task: TaskType,
  errorFormatter?: ErrorFormatter<ThrownValueType, ReturnedErrorValueType>
): TryThisResult<TaskType, ReturnedErrorValueType> {
  if (task instanceof Promise) {
    return task
      .then((result) => [result, null])
      .catch((err) => {
        return [null, errorHandler(err, errorFormatter)]
      }) as any
  }

  if (typeof task === 'function') {
    return ((...args: any[]) => {
      try {
        const result = task(...args)
        return [result, null]
      } catch (err) {
        return [null, errorHandler(err as any, errorFormatter)]
      }
    }) as any
  }

  return task as any
}
