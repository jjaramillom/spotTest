const assert = require('chai').assert
const path = require('path');
const fs = require('fs')
const apr = require('../shared/finance').calculateApr
const irr = require('../shared/finance').calculateIrr


const testFilePath = (path.resolve(__dirname, '../test/testObjects/test.json'))

const testData = JSON.parse(fs.readFileSync(testFilePath))

const runCalculation = (input, method) => {
    const { principal, upfrontFee, schedule } = input

    const payments = schedule.map(payment => {
        return payment.principal + payment.interestFee
    })
    return method(principal, payments, upfrontFee.value)
}

describe('Finance module', () => {

    describe('APR test', () => {
        testData.forEach(dataset => {
            it(`APR should be approx ${dataset.output.apr}`, () => {
                assert.approximately(runCalculation(dataset.input, apr), dataset.output.apr, 0.2)
            })
        })
    })

    describe('IRR test', () => {
        testData.forEach(dataset => {
            it(`IRR should be approx ${dataset.output.irr}`, () => {
                assert.approximately(runCalculation(dataset.input, irr), dataset.output.irr, 0.001)
            })
        })

    })
})







