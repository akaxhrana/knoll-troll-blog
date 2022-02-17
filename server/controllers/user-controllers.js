const {User} = require("../db/knoll-model");
const bcrypt = require("bcrypt")

createUser = (req, res) => {
  const body = req.body;

  if(!body){
    return res.status(400).json({
      success: false,
      error:"Something is wrong with the received data!"
    })
  }

  const user = new User(body);

  if(!user){
    return res.status(400).json({success:false, error: "Someting is wrong at user creation!"})
  }

  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: user._id,
        message: "User created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "User not created!",
      });
    });
}

getUser = async (req, res) => {
  const { username, password } = req.body;

  await User.findOne({ username }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (user) {
      bcrypt.compare(req.body.password, user.password, (error, same) => {
        if (same) {
          return res.status(200).json({
            data: user,
          });
        } else {
          return res.status(400).json({ success: false, data: error });
        }
      });
    }
  }).clone().populate('posts').then(user => console.log(user))
};

module.exports = { createUser, getUser };
