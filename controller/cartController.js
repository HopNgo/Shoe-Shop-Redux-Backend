import { cartModel } from "../model/cart.js";
import sendMail from "../utils/emailOption.js";

export const orderCart = async (req, res) => {
  try {
    const { cartInfo, userInfo } = req.body;

    //Save cart in database-----------
    const newCart = new cartModel({
      userInfo: userInfo,
      cartInfo: cartInfo,
    });
    await newCart.save();
    res.status(200).json({ isSuccess: true });

    //Send mail---------------
    const listProductCartText = cartInfo.items.map((item, index) => {
      const priceFormat = Intl.NumberFormat("vi-VN").format(item.price);
      return `<p> <strong> Item ${index + 1} </strong> </p>
                  <ul>
                      <li> Shoe Name: ${item.item.name} </li>
                      <li> Brand: ${item.item.brand} </li>
                      <li> Price: ${item.item.costNew}.000đ </li>
                      <li> Size: ${item.size} </li>
                      <li> Quantity : ${item.qty} </li>
                      <li> Total Price : ${priceFormat}.000đ </li>
                  </ul>`;
    });

    const totalPriceFormat = Intl.NumberFormat("vi-VN").format(
      cartInfo.totalPrice
    );
    const discountFormat = Intl.NumberFormat("vi-VN").format(
      (cartInfo.totalPrice * 10) / 100
    );
    const totalCartFormat = Intl.NumberFormat("vi-VN").format(
      cartInfo.totalPrice + 30 - (cartInfo.totalPrice * 10) / 100
    );

    const html = `
          <h2> You have successfully placed your order </h2>
          <h3> Customer Info </h3>
          <ul>
               <li> <strong> Name: </strong> ${userInfo.name} </li>
               <li> <strong> Address: </strong> ${userInfo.address.ward}, ${userInfo.address.district}, ${userInfo.address.province} </li>
               <li> <strong> Email: </strong> ${userInfo.email} </li>
               <li> <strong> Phone: </strong> ${userInfo.telephone} </li>
          </ul>
          <h3> Order Details </h3>
          ${listProductCartText}
          <p> <strong> Discount (10%): </strong> ${discountFormat}.000đ </p>
          <p> <strong> Cost Shipping </strong> : 30.000đ </p>
          <h2> Total: ${totalCartFormat}.000đ </h2>
      `;

    await sendMail(userInfo.email, "Order From Shoe Store", html);
  } catch (error) {
    console.log(error);
  }
};

export const getAllCart = async (req, res) => {
  try {
    const listCart = await cartModel.find().sort({ updatedAt: -1 });
    res.status(200).json(listCart);
  } catch (error) {
    res.status(500).json(error);
  }
};
