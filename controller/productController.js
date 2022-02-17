import { homeproductModel } from "../model/homeproduct.js";

export const getAllProduct = async (req, res) => {
    try {
        const latestProducts = await homeproductModel.find();
        res.status(200).json(latestProducts);
    } catch (err) {
        res.status(500).json(err);
    }
}