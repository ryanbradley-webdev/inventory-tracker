export const calculateDueDate = (invoiceDate, term) => {
    let [year, month, day] = invoiceDate.split('-').map(num => Number(num))

    day += Number(term)

    if ([1, 3, 5, 7, 8, 10, 12].includes(month) && day > 31) {
        day -= 31
        if (month === 12) {
            month = 1
            year++
        } else {
            month++
        }
    }

    if ([4, 6, 9, 11].includes(month) && day > 30) {
        day -= 30
        month++
    }

    if (month === 2 && day > 28) {
        day -= 28
        month++
    }

    if (month < 10) {
        month = '0' + month
    }

    if (day < 10) {
        day = '0' + day
    }

    return year + '-' + month + '-' + day
}