var express = require('express');
var router = express.Router();
var braintree = require('braintree');

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: '5xr3bxfx3kkdg9cq',
    publicKey: 'qwcygt8wbkyxdb4c',
    privateKey: 'b0eb62dc8d3b72715f590e8524a89daf'
  });
/*
  gateway.clientToken.generate({
	  customerId: aCustomerId
  }, function (err, response) {
	  var clientToken = response.clientToken
  });
*/

router.get('/client_token', (req,res) => {
	gateway.clientToken.generate({}, function(req, res) {
		res.send(response.clientToken);
	});
});

router.post('/', function(req, res, next) {
  
  // Use the payment method nonce here
  var nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for $10
  var newTransaction = gateway.transaction.sale({
    amount: '10.00',
    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, function(error, result) {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
});

module.exports = router;