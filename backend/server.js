const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const helmet = require("helmet");


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/tasks", require("./routes/taskRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(require("./middleware/errorMiddleware"));

app.listen(5000, () => console.log("Server running on port 5000"));