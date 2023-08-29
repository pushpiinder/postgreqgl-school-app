const { prisma } = require("@/db/prisma");
const { hash } = require("@/utils/hash");

export const createAdminUser = async () => {
    const adminPassword = "1234567890";

    const passwordHash = await hash(adminPassword);

    const admin = await prisma.admin.findFirst({
        where: {
            email: {
                equals: "admin@test.com",
            },
        },
    });

    if(admin) {
        return "Admin already exists";
    }

    await prisma.admin.create({
        data: {
            email: "admin@test.com",
            password: passwordHash,
        }
    });

    return "Created admin user";
};
