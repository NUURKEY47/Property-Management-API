import prisma from "../../config/db.js";

export const authRepository = {
  createUser: async (data) => {
    return await prisma.user.create({ data });
  },

  findUserByEmail: async (email) => {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        managedById: true  // ← force include (fixes undefined)
      }
    });
  },

  countAdmins: async () => {
    return await prisma.user.count({ where: { role: "ADMIN" } });
  },
};