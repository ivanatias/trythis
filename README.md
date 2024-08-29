# Try This

Perform tasks without having to worry about using `try/catch` blocks. Inspired in Go's errors handling.

## Installation

### NPM
```
npm install @ivnatsr/trythis
```

### PNPM
```
pnpm add @ivnatsr/trythis
```

### BUN
```
bun add @ivnatsr/trythis
```

## Usage 

You only need to pass a task as argument (it can be a promise or a function that might throw), and optionally, a custom error formatter to model the returned error to the shape you want.

In case of passing a promise, `tryThis` will return a promise that resolves with a tuple that contains the resolved value of the task and an error. If the task resolves, the result will be the resolved value of that task and the error will be `null`. If the task rejects for any reason, the result will be `null`, and `error !== null`.

By default, if a task fails, and no error formatter is provided, the error will be an `Error` object.

If you pass an error formatter, the error will be of the shape returned by the formatter you passed.

```ts
import { tryThis } from '@ivnatsr/trythis'

// Passing a promise
const [result, error] = await tryThis(promise)

console.log(result) // Resolved value of the promise if it resolves, or null if it rejects
console.log(error) // An Error object if the promise rejects, or null if the promise resolves

// With error formatter
const formatError = (err: { reason: string }) => {
  return `This task failed. Reason: ${err.reason}`
}

const getRandomUser = async () => {
  const res = await fetch('https://randomuser.me/api/')
  if (!res.ok) return Promise.reject({ reason: 'it just went wrong...' })
  return res.json()
}

const [result, error] = await tryThis(getRandomUser(), formatError)

if (error !== null) {
  console.log(error) // "This task failed. Reason: it just went wrong..."
  console.log(result) // null
} else {
  console.log(result) // Random user data 
}
```

In case of passing a function, `tryThis` will return a function with the same signature as the function you passed as argument. This new function will also return a tuple that contains the result and an error. If the function doesn't throw, result will be the value returned by the function you passed as argument, and error will be `null`. If the function throws, result will be `null` and `error !== null`.

```ts
import { tryThis } from '@ivnatsr/trythis'

// Passing a function
const someFunctionThatMightThrow = (...args) => {
  // ...
}  

const failOrSucceed = tryThis(someFunctionThatMightThrow)
const [result, error] = failOrSucceed(args)
console.log(result) // Return value of `someFunctionThatMightThrow` in case of success, or `null` in case of failure
console.log(error) // An `Error` object or a custom error (if you pass an error formatter) in case of failure, or `null` in case of success
```

## Contributing 

All kind of contributions are welcome and appreciated!

Before contributing, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.