import { errorHandler } from './error-handler.ts'
import type { TryThisResult, ErrorFormatter } from './types.ts'

/**
 * @description
 * Perform tasks without having to worry about using try/catch blocks.
 *
 * @template TaskType The type of the task to be performed.
 * @template ThrownValueType The type of the value that might be thrown by the task when it fails. Defaults to `unknown`.
 * @template ReturnedErrorValueType The type of the value that will be returned as the error in case of failure. Defaults to `Error`.
 * @param {TaskType} task The task to be performed.
 * @param {ErrorFormatter<ThrownValueType, ReturnedErrorValueType>} [errorFormatter]
 * An optional function that will be called with the thrown value if the task fails. It should return the error
 * that will be returned as the second value of the tuple.
 * The returned error value will be of the shape returned by the formatter you passed.
 * @returns {TryThisResult<TaskType, ReturnedErrorValueType>} A tuple where the first value is the result
 * of the task in case of success, or `null` in case of failure. The second value is an error in case of
 * failure, or `null` in case of success.
 */
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
