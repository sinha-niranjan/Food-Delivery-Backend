import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const restaurantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  restaurantName: { type: String, required: true },
  city: { type: String, required: true },
  Country: { type: String, required: true },
  DeliveryPrice: { type: Number, required: true },
  estimatedDeliveryTime: { type: Number, required: true },
  cuisines: [{ type: String, required: true }],
  menuItems: [menuItemSchema],
  imageUrl: { type: String, required: true },
  lastUpdated: { type: Date, required: true },
});

const Restaurant = mongoose.model("Restauarant", restaurantSchema);

export default Restaurant;
