import { errorHandler } from '../error-handler.ts'

describe('errorHandler', () => {
  it('should format error if an error formatter is passed', () => {
    const formatError = (err: { reason: string }) => {
      return `This task failed because of: ${err.reason}`
    }

    expect(errorHandler({ reason: 'it just failed...' }, formatError)).toBe(
      'This task failed because of: it just failed...'
    )
  })

  it('should return an error object if no error formatter is passed and the thrown value is not an error object', () => {
    expect(errorHandler('something went wrong')).toBeInstanceOf(Error)
  })

  it('should return an error object with appropriate message if no error formatter is passed', () => {
    expect(errorHandler('something went wrong')).toHaveProperty(
      'message',
      'something went wrong'
    )

    const thrownValue = { reason: 'something went wrong' }

    expect(errorHandler(thrownValue)).toHaveProperty(
      'message',
      JSON.stringify(thrownValue, null, 2)
    )
  })

  it('should return the thrown value as is if it is an error object and no error formatter is passed', () => {
    const error = new Error('something went wrong')
    expect(errorHandler(error)).toEqual(error)
  })

  it('should return the custom error returned by the error formatter even if the passed thrown value is an error object', () => {
    const error = new Error('something went wrong')
    const formatError = (err: Error) => {
      return `This task failed because of: ${err.message}`
    }

    expect(errorHandler(error, formatError)).toBe(
      'This task failed because of: something went wrong'
    )
  })
})
