import braintree from 'braintree';

const gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId:'5xr3bxfx3kkdg9cq',
	publicKey:'qwcygt8wbkyxdb4c',
	privateKey:'b0eb62dc8d3b72715f590e8524a89daf'
});

const payment = {
	create: gateway.paymentMethod.create({
			/* 
			! get customerId by creating a user
			*/
			customerId: '',
			paymentMethodNonce: nonceFromTheClient
			}, (err, result) => {
				if (result) {
					res.send(result);
				} else {
					res.status(500).send(error);
				}
		}), //? after creating payment method => transaction.sale() cane be executed
	
	update: gateway.paymentMethod.update('token', {
			/* 
			! has several options, see docs
			*/
		}),

	find: 	gateway.paymentMethod.find('token', (err, paymentMethod) => {
			/* 
			? returns a 'notFoundError' / PaymentMethod Response Object
			*/
			if (paymentMethod) {
				res.send(paymentMethod);
			} else {
				res.status(500).send(error);
			}
		}),

	delete: gateway.paymentMethod.delete('token', (err) => {
			/* 
			? delete else throw notFoundError
			*/
			if (err) {
				res.status(500).send(error);
			}
		})
}

const customer = {
	create:	gateway.customer.create({
			/* 
			! has several options, see docs
			*/
			firstName: 'John',
			lastName: 'Smith'
			}, (err, result) => {
			if (result) {
				let resp = {
					"success": result.success,
					"customerId": result.customer.id
				}
				res.send(resp);
			} else {
				res.status(500).send(error);
			}
		}),

	update:	gateway.customer.update('customerId', {
			/* 
			? give update parameters and result in callback returns updated value
			*/
			}, (err, result) => {
			if (result) {
				res.send(result);
			} else {
				res.status(500).send(error);
			}
		}),

	find:	gateway.customer.find('customerid', (err, customer) => {
			/* 
			? returns customer response object else notFoundError
			*/
			if (customer) {
				res.send(customer);
			} else {
				res.status(500).send(error);
			}
		}),
	
	delete:	gateway.customer.delete("theCustomerId", function (err) {
			if (err) {
				res.status(500).send(error);
			}
			
	  	})
}
