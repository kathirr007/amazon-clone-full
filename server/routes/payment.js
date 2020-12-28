const router = require("express").Router();
// const moment = require("moment");
import { add, format } from "date-fns";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const verifyToken = require("../middlewares/verify-token");
const User = require("../models/user");
const Order = require("../models/order");

const SHIPMENT = {
  normal: {
    price: 13.98,
    days: 7
  },
  fast: {
    price: 49.98,
    days: 3
  }
};

function shipmentPrice(shipmentOption) {
  // debugger;
  /* let estimated2 = moment()
    .add(shipmentOption.days, "d")
    .format("dddd MMM Do"); */
  let estimated = format(
    add(new Date(), {
      days: shipmentOption.days
    }),
    "LLLL dd, yyyy hh:mm aa"
  );

  return {
    estimated,
    price: shipmentOption.price
  };
}

// POST request - for shipment setting
router.post("/shipment", (req, res) => {
  let shipment;
  if (req.body.shipment === "normal") {
    shipment = shipmentPrice(SHIPMENT.normal);
  } else {
    shipment = shipmentPrice(SHIPMENT.fast);
  }

  res.json({
    success: true,
    shipment: shipment
  });
});

// Stripe Payment
router.post("/payment", verifyToken, async (req, res) => {
  let totalPrice = Math.round(req.body.totalPrice * 100);
  let foundUser = await User.findOne({ _id: req.decoded._id })
    .populate("address")
    .exec();
  debugger;
  // console.log(foundUser)
  stripe.customers
    .create({
      email: req.decoded.email,
      name: req.decoded.name,
      // address: {
      //     line1: '510 Townsend St',
      //     postal_code: '98140',
      //     city: 'San Francisco',
      //     state: 'CA',
      //     country: 'US',
      //   },
      address: {
        country: foundUser.address.country,
        line1: foundUser.address.streetAddress,
        city: foundUser.address.city,
        state: foundUser.address.state,
        postal_code: foundUser.address.zipCode
      }
    })
    .then(customer => {
      return stripe.customers.createSource(customer.id, {
        source: "tok_visa"
      });
    })
    .then(source => {
      return stripe.charges.create({
        amount: totalPrice,
        currency: "inr",
        customer: source.customer,
        description: "Software development services"
      });
    })
    .then(async charge => {
      let order = new Order();
      let cart = req.body.cart;

      cart.map(product => {
        order.products.push({
          productID: product._id,
          quantity: parseInt(product.quantity),
          price: product.price
        });
      });

      order.owner = req.decoded._id;
      order.estimatedDelivery = req.body.estimatedDelivery;
      await order.save();

      res.json({
        success: true,
        message: "Successfully made a payment"
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

// GET request - get categories
router.get("/categories", async (req, res) => {
  try {
    let categories = await Category.find();
    res.json({
      success: true,
      categories: categories
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET request - get a single product

// PUT request - Update a single product

// DELETE request - delete a single product

module.exports = router;
