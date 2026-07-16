import Order from "../models/order.js";
import Product from "../models/product.js";

export async function createOrder(req, res) {
  try {
    const { firstName, lastName, email, phone, address, city, postalCode, notes, products } = req.body;

    if (!firstName || !lastName || !email || !phone || !address || !city || !postalCode) {
      return res.status(400).json({ message: "All shipping fields are required" });
    }

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    const orderProducts = [];

    for (const item of products) {
      const product = await Product.findOne({ productId: item.productId });

      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }

      if (!product.isAvailable) {
        return res.status(400).json({ message: `${product.name} is no longer available` });
      }

      if (product.stock < item.qty) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }

      total += product.price * item.qty;

      orderProducts.push({
        productId: product.productId,
        name: product.name,
        image: product.images?.[0] || "",
        price: product.price,
        qty: item.qty,
      });
    }

    const orderId = "ORD" + Date.now();

    const newOrder = new Order({
      orderId,
      email: email.trim().toLowerCase(),
      firstName,
      lastName,
      phone,
      address,
      city,
      postalCode,
      notes,
      products: orderProducts,
      total,
    });

    await newOrder.save();

    for (const item of products) {
      await Product.findOneAndUpdate(
        { productId: item.productId },
        { $inc: { stock: -item.qty } }
      );
    }

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log("CREATE ORDER ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
}

export async function getAllOrders(req, res) {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getMyOrders(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = await Order.find({ email: req.user.email }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getOrderById(req, res) {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { status } = req.body;
    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}