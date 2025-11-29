import prisma from "../../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../../utils/AppError.js";

//create login
export const registry = async (req, res) => {
  const { name, email, role, password } = req.body;

  // No manual validations—handled by Zod middleware

  const hashedpassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedpassword,
      role,
    },
  });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role }, // Added role for consistency with login
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.status(201).json({
    message: "user created successfully", // Fixed typo in message
    data: {
      name,
      email,
      role,
      token,
    },
  });
};
// ---------------------------------------------------------------------------------------------------------------------------------

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || email === " ") {
    throw new AppError("email is required", 401);
  }
  if (!password || password === " ") {
    throw new AppError(" password is required", 401);
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new AppError("invalid email or password", 401);
  }
  const hashedPassword = user.password;

  const isvalid = await bcrypt.compare(password, hashedPassword);

  if (!isvalid) {
    throw new AppError(" password is incorrect", 422);
  }
  //create token

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    message: " user logged in successfully",
    data: {
      id: user.id,
      email: user.email,
      role: user.role,
      token,
    },
  });
};

// ---------------------------------------------------------------------------------------------------------------

export const checkFirstAdmin = async (req, res, next) => {
  const { role } = req.body;

  const allowedRoles = ["ADMIN", "LANDLORD", "TENANT"];
  if (!role || !allowedRoles.includes(role)) {
    throw new AppError("Invalid or missing role", 401);
  }

  if (role === "TENANT" || role === "LANDLORD") {
    return next();
  }

  const adminCount = await prisma.user.count({
    where: { role: "ADMIN" },
  });

  if (adminCount === 0) {
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError(" Token required to create new admin", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "ADMIN") {
      throw new AppError(" Only admins can create new admins", 401);
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
