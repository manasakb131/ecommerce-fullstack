const Cart = require('../models/Cart');
const asyncHandler = require('../middleware/asyncHandler');

exports.getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  res.json(cart);
});

exports.addToCart = asyncHandler(async (req, res) => {
  const { product, qty } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

  const item = cart.items.find(i => i.product.toString() === product);

  if (item) item.qty += qty;
  else cart.items.push({ product, qty });

  await cart.save();
  res.json(cart);
});

exports.removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  cart.items = cart.items.filter(i => i.product.toString() !== req.params.id);

  await cart.save();
  res.json(cart);
});