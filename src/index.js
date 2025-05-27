const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const identifyRoutes = require("./routes/identify");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/identify", identifyRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
