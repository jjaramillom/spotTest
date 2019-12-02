/**
 * Processes the equation to find the APR. When the returned value is equal to 0, the APR value is equal to the interest parameter.
 * @param {number} investment Value invested. Should be positive
 * @param {Array<number>} cashFlows Value invested. Should be positive
 * @param {number} interest
 * @param {number} upfrontFee Optional extra fee charged and payed in period 0
 */
const aprEquation = ({ investment, cashFlows, interest, upfrontFee = 0 }) => {
    return - investment + upfrontFee + cashFlows.reduce((accumulated, cashFlow, index) => {
        return accumulated + (cashFlow / Math.pow((1 + interest), (index + 1) / 12))
    }, 0)
}

/**
 * Calculates Net Present Value
 * @param {number} investment Value invested. Should be positive
 * @param {Array<number>} cashFlows Value invested. Should be positive
 * @param {number} interest
 * @param {number} upfrontFee Optional extra fee charged and payed in period 0
 */
const npv = ({ investment, cashFlows, interest, upfrontFee = 0 }) => {
    return -investment + upfrontFee + cashFlows.reduce((accumulated, cashFlow, index) => {
        return accumulated + (cashFlow / Math.pow((1 + interest), index + 1))
    }, 0)
}

/**
 * Finds the root of the equation
 * @param {number} iterations Max number of iterations to run.
 * @param {number} precision Allowed precision of the found root value
 * @param {number} lowerLimit Initial lower limit of the searching range
 * @param {number} upperLimit Initial upper limit of the searching range
 * @param {Function} evaluator Function of which the root is to be found
 * @param {JSON} parameters (constant) parameters to pass to the evaluator function (except the independent variable)
 */
const findRoot = (iterations, precision, lowerLimit, upperLimit, evaluator, parameters) => {
    const indVar = (upperLimit + lowerLimit) / 2 //Independent variable. (variable to variate to find the root of the evaluator function)
    const evalParams = { ...parameters, interest: indVar }

    for (let i = 0; i < iterations; i++) {
        if (Math.abs(evaluator(evalParams)) < precision) {
            return evalParams.interest
        }

        evalParams.interest = (upperLimit + lowerLimit) / 2

        if (evaluator({ ...evalParams, interest: lowerLimit }) * evaluator(evalParams) < 0) {
            upperLimit = evalParams.interest
        } else {
            lowerLimit = evalParams.interest
        }
    }
    return 0
}

/**
 * Returns the Annual Percentage Rate 
 * @param {number} investment Value invested. Should be positive
 * @param {Array<number>} cashFlows Array containing the expected cash flow (interest + principal)
 * @param {number} upfrontFee Optional extra fee charged
 * @param {Array<Date>} dates Array containing the payment dates
 * @returns {number} The APR is given as a percentage ( 0 < APR < 100). If APR = 0, it could not be calculated.
 * TODO Include dates array? If so, which date should be taken as start date.
 */
const apr = (investment, cashFlows, upfrontFee = 0) => {
    const iterations = 1000
    const tolerance = 0.1
    const lowerLimit = 0.001
    const upperLimit = 0.9
    const parameters = {
        investment: investment,
        cashFlows: cashFlows,
        upfrontFee: upfrontFee
    }

    try {
        const apr = findRoot(iterations, tolerance, lowerLimit, upperLimit, aprEquation, parameters)
        return Math.round(apr * 1000) / 10
    } catch (error) {
        return 0
    }
}

/**
 * Calculates the IRR of the provided data using the Bisection method.
 * @param {number} investment Value invested. Should be positive
 * @param {Array<number>} cashFlows Array containing the expected cash flow (interest + principal)
 * @param {number} upfrontFee Optional extra fee charged
 * @returns {number} The IRR is given as a decimal number ( 0 < IRR < 1). If IRR = 0, it could not be calculated.
 * TODO Include dates array? If so, which date should be taken as start date.
 */
const irr = (investment, cashFlows, upfrontFee = 0) => {
    const iterations = 1000
    const tolerance = 0.1
    const lowerLimit = 0.001
    const upperLimit = 0.9
    const parameters = {
        investment: investment,
        cashFlows: cashFlows,
        upfrontFee: upfrontFee
    }

    try {
        const irr = findRoot(iterations, tolerance, lowerLimit, upperLimit, npv, parameters)
        return Math.round(irr * 1e10) / 1e10
    } catch (error) {
        return 0
    }
}

exports.calculateApr = apr
exports.calculateIrr = irr