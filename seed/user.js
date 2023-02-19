const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const create = async () => {
  const users = [{ name: "admin", username: "admin", password: "admin" }];

  const saltRounds = 10;
  const hashedUsers = await Promise.all(
    users.map(async (user) => {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      return {
        name: user.name,
        username: user.username,
        password: hashedPassword,
      };
    })
  );

  const newUser = await prisma.user.createMany({
    data: hashedUsers,
  });

  return newUser;
};

create().then((res) => console.log(res));
