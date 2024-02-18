
const braintree = require("braintree");

exports.GenerateClientToken=async (req,res)=>{

    const gateway = new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        merchantId: "4t7xcq8ym86htr9v",
        publicKey: "jkppc6p8bdzrtgzc",
        privateKey: "124cb34ec19af1f22d68bce8eeee29e5"
    });
    gateway.clientToken.generate({}, (err, response) => {
        return res.json({clientToken:response.clientToken})
    });
}
exports.checkout=async (req,res)=>{
    const nonceFromTheClient = req.body.payment_method_nonce;
    
}
