var express = require('express');
var router = express.Router();

const finance = require('../shared/finance')

router.get('/', (req, res) => {

  return res.status(200).send({
    msg: 'server is running'
  })

})


router.post('/calculate', (req, res) => {
  const { principal, upfrontFee, schedule } = req.body

  const payments = schedule.map(payment => {
    return payment.principal + payment.interestFee
  })

  const irr = finance.calculateIrr(principal, payments, upfrontFee.value)
  const apr = finance.calculateApr(principal, payments, upfrontFee.value)

  return res.status(200).send({
    irr: irr,
    apr: apr
  })
});


module.exports = router;
