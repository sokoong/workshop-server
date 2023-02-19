const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const axios = require("axios");

const prisma = new PrismaClient();

const create = async () => {
  const response = await axios.get("https://dummyjson.com/products");
  const products = response.data.products.map((product) => ({
    title: product.title,
    description: product.description,
    price: product.price,
    stock: product.stock,
    brand: product.brand,
    category: product.category,
    thumbnail: product.thumbnail,
  }));
  const newProduct = await prisma.product.createMany({
    data: products,
  });

  return newProduct;
};

create().then((res) => console.log(res));
