# Try This

Perform tasks without having to worry about using `try/catch` blocks. Inspired in Go's errors handling.

## Usage 

You only need to pass a task as argument, and optionally, a custom error formatter to model the returned errors to the shape you want.

In case of passing a promise, `tryThis` will return a promise that resolves with a tuple that contains the resolved value of the task and an error. If the task resolves, the result will be the resolved value of the task and the error will be `null`. If the task rejects for any reason, the result will be `null`, and `error !== null`.

By default, if a task fails, and no error formatter is provided, the error will be an `Error` object.

If you pass an error formatter, the error will be of the shape returned by the formatter you passed.

```ts
// Passing a promise that resolves
const [result, error] = await tryThis(Promise.resolve('hello'))
console.log(result) // 'hello'
console.log(error) // null

// The promise rejects and no error formatter is passed
const [result, error] = await tryThis(Promise.reject('fail'))
console.log(result) // null
console.log(error.message) // 'fail'

// The promise rejects and you passed an error formatter
const formatError = (err: { reason: string }) => {
  return `This task failed. Reason: ${err.reason}`
}

const [result, error] = await tryThis(
  Promise.reject({ reason: 'For no reason at all...'}), 
  formatError
)
console.log(result) // null
console.log(error.message) // 'This task failed. Reason: For no reason at all...'
```

In case of passing a function, `tryThis` will return a function with the same signature as the function you passed as argument. This new function will also return a tuple that contains the result and an error. If the function doesn't throw, result will be the value returned by that function and error will be `null`. If the function throws, result will be `null` and `error !== null`.

```ts
const someFunctionThatMightThrow = (...args) => {
  // ...
}  

// Passing a function
const failOrSucceed = tryThis(someFunctionThatMightThrow)
const [result, error] = failOrSucceed(args)
console.log(result) // Return value of `failOrSucceed` in case of success, or `null` in case of failure
console.log(error) // An `Error` object or a custom error (if you pass an error formatter) in case of failure, or `null` in case of success
```

## Contributing 

All kind of contributions are welcome and appreciated!

Before contributing, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.