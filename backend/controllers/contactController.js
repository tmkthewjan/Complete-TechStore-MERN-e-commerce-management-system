import ContactMessage from "../models/contact.js";

// Customer sends a message (public)
export async function sendMessage(req, res) {
  try {
    const { fullName, email, subject, message } = req.body;

    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = new ContactMessage({
      fullName,
      email: email.trim().toLowerCase(),
      subject,
      message,
    });

    await newMessage.save();

    res.status(201).json({
      message: "Message sent successfully",
      contactMessage: newMessage,
    });
  } catch (error) {
    console.log("SEND MESSAGE ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
}

// Logged-in customer views their own messages
export async function getMyMessages(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const messages = await ContactMessage.find({ email: req.user.email }).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Admin views all messages
export async function getAllMessages(req, res) {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Admin replies to a message
export async function replyMessage(req, res) {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { reply } = req.body;

    if (!reply || !reply.trim()) {
      return res.status(400).json({ message: "Reply cannot be empty" });
    }

    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      {
        reply: reply.trim(),
        replied: true,
      },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({
      message: "Reply sent successfully",
      contactMessage: updatedMessage,
    });
  } catch (error) {
    console.log("REPLY MESSAGE ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
}

// Admin deletes a message
export async function deleteMessage(req, res) {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const deletedMessage = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}