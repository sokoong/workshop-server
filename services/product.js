const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addProduct = async (data) => {
  try {
    const product = await prisma.product.create({ data });
    return product;
  } catch (error) {
    console.log(`Error adding product: ${error.message}`);
    throw new Error("Failed to add product");
  }
};

const updateProduct = async (id, data) => {
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data,
    });
    return product;
  } catch (error) {
    console.log(`Error updating product: ${error.message}`);
    throw new Error("Failed to update product");
  }
};


module.exports = { addProduct, updateProduct }