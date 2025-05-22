const el1 = 10
const el2 = 20

const username = 'John Doe'

let age

function sum(a: number, b: number): number {
  return a + b
}

function multiply(a: number, b: number): number {
  return a * b
}

function divide(a: number, b: number): number {
  return a / b
}

function subtract(a: number, b: number): number {
  return a - b
}

const calculate =  (a: number, b: number, operation: string): number => {
  switch (operation) {
    case 'add':
      return sum(a, b)
    case 'subtract':
      return subtract(a, b)
    case 'multiply':
      return multiply(a, b)
    case 'divide':
      return divide(a, b)
    default:
      throw new Error('Invalid operation')
  }
}

console.log('Sum:', calculate(el1, el2, 'add'))
console.log('Subtract:', calculate(el1, el2, 'subtract'))
console.log('Multiply:', calculate(el1, el2, 'multiply'))
console.log('Divide:', calculate(el1, el2, 'divide'))