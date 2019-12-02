const assert = require('chai').assert
const path = require('path');
const fs = require('fs')
const apr = require('../shared/finance').calculateApr
const irr = require('../shared/finance').calculateIrr


const testFilesPath = (path.resolve(__dirname, '../test/testObjects')) //location of JSON test files

const readFile = (fileName) => { return JSON.parse(fs.readFileSync(testFilesPath + `/${fileName}`)) }

const runCalculation = (input, method) => {
    const { principal, upfrontFee, schedule } = input

    const payments = schedule.map(payment => {
        return payment.principal + payment.interestFee
    })
    return method(principal, payments, upfrontFee.value)
}

describe('Finance module', () => {

    describe('APR test', () => {
        it('APR should be 48.3', () => {
            const testData = readFile('test1.json')
            assert.equal(runCalculation(testData.input, apr), testData.output.apr)
        })
    })

    describe('IRR test', () => {
        it('IRR should be approx 0.033', () => {
            const testData = readFile('test1.json')
            assert.approximately(runCalculation(testData.input, irr), testData.output.irr, 0.001)
        })
    })
})







