/* 
 * This file contains all the required functions for payment
 */

import express from 'express';
import braintree from 'braintree';

const router = express.Router();

const gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId:'5xr3bxfx3kkdg9cq',
	publicKey:'qwcygt8wbkyxdb4c',
	privateKey:'b0eb62dc8d3b72715f590e8524a89daf'
});

/* 
 * send a client token to client
 */
router.get('/client_token', (req, res) => {
	gateway.clientToken.generate({}, (err, response) => {
		let clientToken = response.clientToken;
		res.send(clientToken);
	});
});

router.post('/checkout', (req, res) => {
	let nonceFromTheClient = req.body.payment_method_nonce;
	let newTransaction = gateway.transaction.sale({
		amount: '10.00',
		paymentMethodNonce: nonceFromTheClient,

		options: {
			submitForSettlement: true,
			verifyCard: true
		}
	}, (err, result) => {
		if (result) {
			res.send(result);
		} else {
			res.status(500).send(error);
		}
	});
});

