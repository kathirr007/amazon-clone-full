const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcrypt-nodejs");
// const { genSalt, hash, compareSync } = require("bcrypt");
const { genSalt, hash, compareSync } = require("bcryptjs");

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: { type: Schema.Types.ObjectId, ref: "Address" },
  admin: { type: Boolean, default: false },
});

/* UserSchema.pre("save", function(next) {
  let user = this;
  debugger;
  if (this.isModified("password") || this.isNew) {
    genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }

      hash(user.password, salt, null, function(err, hash) {
        if (err) {
          return next(err);
        }

        user.password = hash;
        next();
      });
    });
  }
}); */

UserSchema.pre("save", function (next) {
  const user = this;

  genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (password, next) {
  let user = this;
  return compareSync(password, user.password);
};

module.exports = mongoose.model("User", UserSchema);
