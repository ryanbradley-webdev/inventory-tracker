export const formatCurrency = (money) => {
    const [dollars, cents] = parseNumber(money)

    let returnString = ''

    if (dollars.length > 3) {
        const reverseStringArr = dollars.split('').reverse()

        reverseStringArr.forEach((letter, idx) => {
            if ((idx + 1) % 3 === 0) {
                returnString = ',' + letter + returnString
            } else {
                returnString = letter + returnString
            }
        })
    } else {
        returnString = dollars
    }

    return returnString + '.' + cents
}

const parseNumber = (number) => {
    let dollars, cents = ''

    if (number % 1 === 0) {
        dollars = number.toString()
        cents = '00'
    } else {
        const string = number.toString()

        const decimalIdx = string.indexOf('.')

        if (decimalIdx !== -1) {
            dollars = string.slice(0, decimalIdx)
            cents = string.slice(decimalIdx + 1, string.length)

            if (cents.length === 1) {
                cents += '0'
            }
        }
    }

    return [dollars, cents]
}