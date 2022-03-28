import { homeproductModel } from "../model/homeproduct.js";

export const getAllProduct = async (req, res) => {
  try {
    const latestProducts = await homeproductModel.find();
    res.status(200).json(latestProducts);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const addProduct = async (req, res) => {
  try {
    const body = req.body;
    const newProduct = new homeproductModel(body);
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const editProduct = async (req, res) => {
  try {
    const body = req.body;
    const newEditProduct = await homeproductModel.findOneAndUpdate(
      { _id: body._id },
      body,
      { new: true }
    );
    res.status(200).json(newEditProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const body = req.body;
    const productDeleted = await homeproductModel.findOneAndDelete({
      _id: body._id,
    });
    res.status(200).json(productDeleted);
  } catch (err) {
    res.status(500).json(err);
  }
};
