const UserModel = require("../Models/UserModel");

module.exports.userUpdate = async (req, res, next) => {
  if (req.body.password) {
    req.body.password = await bcrypt.compare(password, user.password);
  }
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.userDelete = async (req, res, next) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const User = await UserModel.findById(req.params.id);
    // console.log('userid:',req.params.id)
    if (!User) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(User);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getAllUser = async (req, res, next) => {
  const query = req.query.new;
  try {
    const users = query
      ? await UserModel.find().sort({ id: -1 }).limit(5)
      : await UserModel.find();
    if (!users) {
      return res.status(404).json({ error: "Users not found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getUserStats = async (req, res, next) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  const lastYear = new Date(date);

  console.log("Current date:", new Date());
  console.log("Date one year ago:", lastYear);

  try {
    const data = await UserModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
