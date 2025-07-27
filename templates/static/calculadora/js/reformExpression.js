export function reformExpression(expression) {
    const number1IsNegative = expression[0] === '-'
    if (number1IsNegative) {
        expression = expression.slice(1)
    }

    const operationMatch = expression.match(/[+*/%-]/)
    if (!operationMatch) return expression

    const operation = operationMatch[0]
    const parts = expression.split(operation)
    if (parts.length !== 2) return expression

    let [number1, number2] = parts

    number2 = number2.replace(/^\((.*)\)$/, '$1')

    const newExpression = number1IsNegative
        ? `-${number1}${operation}${number2}`
        : `${number1}${operation}${number2}`

    return newExpression
}