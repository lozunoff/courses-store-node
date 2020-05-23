const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  avatarUrl: String,
  resetToken: String,
  resetTokenExp: Date,
  cart: {
    items: [
      {
        count: {
          type: Number,
          require: true,
          default: 1,
        },
        courseId: {
          type: Schema.Types.ObjectId,
          ref: 'Course',
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function addToCart(course) {
  const items = [...this.cart.items];
  const idx = items.findIndex((c) => c.courseId.toString() === course._id.toString());

  if (idx >= 0) {
    items[idx].count += 1;
  } else {
    items.push({
      courseId: course._id,
      count: 1,
    });
  }

  this.cart = {
    items,
  };

  return this.save();
};

userSchema.methods.removeFromCart = function removeFromCart(id) {
  let items = [...this.cart.items];

  const idx = items.findIndex((c) => c.courseId.toString() === id.toString());

  if (items[idx].count === 1) {
    items = items.filter((c) => c.courseId.toString() !== id.toString());
  } else {
    items[idx].count -= 1;
  }

  this.cart = {
    items,
  };

  this.save();
};

userSchema.methods.clearCart = function clearCart() {
  this.cart = {
    items: [],
  };

  this.save();
};

module.exports = model('User', userSchema);
