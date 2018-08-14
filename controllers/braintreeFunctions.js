import braintree from 'braintree';

const gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId:'5xr3bxfx3kkdg9cq',
	publicKey:'qwcygt8wbkyxdb4c',
	privateKey:'b0eb62dc8d3b72715f590e8524a89daf'
});

//* Create Payment Method
