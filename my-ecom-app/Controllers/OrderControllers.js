const OrderModel = require("../Models/OrderModel")

module.exports.createOrder = async (req, res, next) => {

    const newOrder = new OrderModel(req.body)
    console.log(newOrder)

    try{

        const savedOrder = await newOrder.save()
        // console.log(savedOrder)
        res.status(200).json(savedOrder)

    }catch(err){
        res.status(500).json(err)
    }
}


module.exports.OrderUpdate = async (req, res, next) => {
    
    try {
      const updatedOrder = await OrderModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  module.exports.OrderDelete = async (req, res, next) => {
    try {
      await OrderModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  module.exports.getOrder = async (req, res, next) => {
    try {
      const Order = await OrderModel.findOne({userId:req.params.userId});
      // console.log('userid:',req.params.id)
      if (!Order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.status(200).json(Order);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  module.exports.getAll = async (req, res, next) => {
    try{
       const orders = await OrderModel.find()
       res.status(200).json(orders)
    }catch(err){
        res.status(500).json(err)
    }
  };

//   get monthly income

module.exports.orderStats = async (req , res, next) => {
    const date = new Date();
  date.setMonth(date.setMonth() - 1);
  const lastMonth = new Date(date);
  new Date().setMonth(lastMonth.setMonth() - 1);
  const previousMonth = new Date(date);

  console.log("Current date:", new Date());
  console.log("Date one year ago:", lastMonth);
  console.log("Date one year ago:", previousMonth);


  try{
    const income = await OrderModel.aggregate([
        {$match: { createdAt:{ $gte:previousMonth}}},
        {
            $project:{
                month:{ $month:"$createdAt"},
                sales:"$amount"
            }
        },
        {
            $group:{
                _id:"$month",
                total:{$sum:"$sales"}
            }
        }
    ])
     res.status(200).json(income)
  }catch(err){
    res.status(500).json(err)
  }

}
  
  