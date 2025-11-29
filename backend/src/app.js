import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js"
import userRoute from "./modules/user/user.routes.js"
import propertyRoute from "./modules/property/property.routes.js"
import unitRoute from "./modules/unit/unit.routes.js"
import globalErrorHandler from "./middlewares/errorHandler.js";



const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoute)
app.use("/api/v1/property", propertyRoute)
app.use("/api/v1/units", unitRoute)






app.use(globalErrorHandler)

// Export
export default app;
