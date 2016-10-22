const Book = require("../models/Book").model;
const User = require("../models/User");
module.exports = (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;

    req.logout();
    res.sendStatus("202");

    Book.remove({owner: user._id}, (err) => {
      if(err){
        console.log("Deleting books error: " + err)
      }
      else {
        User.remove({ username: user.username }, (err) => {
          if (err) {
            console.log("Deleting user error: " + err)
          }
        });
      }
    });
  } else {
    res.sendStatus(403);
  }
};
