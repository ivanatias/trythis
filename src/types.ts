export type Result<ValueType, ErrorValueType> = [ValueType, null] | [null, ErrorValueType]

export type ErrorFormatter<ThrownValueType, ReturnedErrorValueType> = (
  throwValue: ThrownValueType
) => ReturnedErrorValueType

export type TryThisResult<TaskType, ReturnedErrorValueType> = TaskType extends Promise<
  infer ResolvedValue
>
  ? Promise<Result<ResolvedValue, ReturnedErrorValueType>>
  : TaskType extends (...args: any[]) => any
    ? (
        ...args: Parameters<TaskType>
      ) => Result<ReturnType<TaskType>, ReturnedErrorValueType>
    : TaskType
