const express = require("express");
const Product = require("../models/productModel");

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send({
      success: true,
      msg: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).send({ success: false, msg: "Error in fetching" });
    console.error("Error fetching product:", error.message);
  }
};

// Create products
const createProduct = async (req, res) => {
  try {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide all fields" });
    }
    const newProduct = new Product(product);
    await newProduct.save();
    res.status(201).send({ status: true, msg: "Product created successfully" });
  } catch (error) {
    res.status(500).send({ status: false, msg: "Error creating product" });
    console.error("Error creating product:", error.message);
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send({ status: false, msg: "Invalid product id" });
    }
    const updateProduct = await Product.findByIdAndUpdate(id, product);
    res.status(200).send({ status: true, msg: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error.message);
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send({ status: false, msg: "Invalid product id" });
    }
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.status(200).send({ status: true, msg: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
