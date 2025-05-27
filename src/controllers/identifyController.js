const { handleIdentify } = require("../services/contactService");

async function identifyContact(req, res) {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) {
    return res.status(400).json({ error: "Provide email or phone number" });
  }

  try {
    const result = await handleIdentify(email, phoneNumber);
    res.json({ contact: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { identifyContact };
