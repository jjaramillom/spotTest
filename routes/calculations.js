var express = require('express');
var router = express.Router();

// const calculate_irr = require('../shared/IRR')
// const calculate_apr = require('../shared/APR')
const finance = require('../shared/finance')

/* GET home page. */
router.post('/calculate', function (req, res, next) {
  const { principal, upfrontFee, schedule } = req.body
  
  const payments = schedule.map(payment => {
    return payment.principal + payment.interestFee
  })

  const irr = finance.calculate_irr(principal, payments, upfrontFee.value)
  const apr = finance.calculate_apr(principal, payments, upfrontFee.value)

  return res.status(200).send({
    irr: irr,
    apr: apr
  })
});

module.exports = router;
