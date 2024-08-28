import { tryThis } from '../try.ts'

describe('tryThis', () => {
  it('should return a promise if the task passed as argument is also a promise', () => {
    const promise = tryThis(Promise.resolve('test'))
    expect(promise instanceof Promise).toBe(true)
  })

  it('should return a value if the task passed as argument is also a value', () => {
    expect(tryThis([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('should return a promise that resolves with a tuple that contains the task resolved value and an empty error value if the task passed as argument is a promise that resolves', async () => {
    expect(await tryThis(Promise.resolve('test'))).toEqual(['test', null])
  })

  it('should return a promise that resolves with a tuple that contains an empty task value and an error value if the task passed as argument is a promise that rejects', async () => {
    const [result, error] = await tryThis(Promise.reject('test'))
    expect(result).toBeNull()
    expect(error instanceof Error).toBe(true)
    expect(error?.message).toBe('test')
  })

  it('should return a function if the task passed as argument is a function', () => {
    const fn = tryThis(JSON.parse)
    expect(typeof fn === 'function').toBe(true)
  })

  it('should return a tuple that contains the task result value and an empty error value if the task passed as argument is a function that does not fail', () => {
    expect(tryThis(JSON.parse)('{"foo":"bar"}')).toEqual([{ foo: 'bar' }, null])
  })

  it('should return a tuple that contains an empty task result value and an error value if the task passed as argument is a function that fails', () => {
    // @ts-expect-error
    const [result, error] = tryThis(JSON.parse)()
    expect(result).toBeNull()
    expect(error).not.toBeNull()
    expect(error instanceof Error).toBe(true)
  })

  it('should return a tuple that contains an empty task result value and a custom error value if the task fails and an error formatter is passed as second argument', async () => {
    const formatError = () => {
      return 'This task failed'
    }

    // @ts-expect-error
    const [result, error] = tryThis(JSON.parse, formatError)()
    expect(result).toBeNull()
    expect(error).not.toBeNull()
    expect(error).toBe('This task failed')

    const [result2, error2] = await tryThis(Promise.reject('test'), formatError)
    expect(result2).toBeNull()
    expect(error2).not.toBeNull()
    expect(error2).toBe('This task failed')
  })
})
