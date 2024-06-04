const stripe = require("stripe")(process.env.STRIPE_KEY)


module.exports.createPayment = async (req, res, next) => {
    stripe.charges.create(
        {
            source:req.body.tokenId,
            amount: req.body.amount,
            currency:["usd","inr"]
        },
        (stripeErr,stripeRes) =>{
            if(stripeErr){
                res.status(500).json(stripeErr);
            }else{
                res.status(200).json(stripeRes)
            }
        }
    )
}