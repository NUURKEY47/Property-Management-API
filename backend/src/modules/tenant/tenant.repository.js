import prisma from "../../config/db.js";

export const tenantRepository = {
    createUser: async (data) => {
        return await prisma.user.create({ data });
    },

    findUserById: async (id) => {
        return await prisma.user.findUnique({
            where: { id },
            include: { unit: { include: { property: true } } }
        });
    },

    findUnitById: async (id) => {
        return await prisma.unit.findUnique({
            where: { id },
            include: { property: { include: { landlord: true } } }
        });
    },

    updateUserUnitId: async (tenantId, unitId) => {
        return await prisma.user.update({
            where: { id: tenantId },
            data: { unitId },
            select: { id: true, unitId: true } // return updated unitId
        });
    },

    updateUnitStatus: async (unitId, status) => {
        return await prisma.unit.update({
            where: { id: unitId },
            data: { status },
        });
    },

    findManyTenants: async (where) => {
        return await prisma.user.findMany({
            where,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                unitId: true,
            },
        });
    },

    findTenantDashboardData: async (tenantId) => {
        return await prisma.user.findUnique({
            where: { id: tenantId },
            include: {
                unit: true,
                invoices: true,
                payments: true,
                bookings: true,
            },
        });
    },
};