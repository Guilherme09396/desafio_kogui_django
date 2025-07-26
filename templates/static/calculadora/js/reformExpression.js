export function reformExpression(expression) {
    const number1IsNegative = expression[0] == '-' ? true : false
    if (number1IsNegative) {
        expression = expression.slice(1)
    }
    const operation = expression.match(/[+*/%-]/)
    let [number1, number2] = expression.split(operation)
    const newExpression = number1IsNegative ? `-${number1}${operation}${number2}` : `${number1}${operation}${number2}`
    return newExpression
}