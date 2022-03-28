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
      return `<p> <strong> Chi tiết sản phẩm thứ ${index + 1} </strong> </p>
                  <ul>
                      <li> Tên giày: ${item.item.name} </li>
                      <li> Thương hiệu: ${item.item.brand} </li>
                      <li> Giá: ${item.item.costNew}.000đ </li>
                      <li> Size: ${item.size} </li>
                      <li> Số lượng : ${item.qty} </li>
                      <li> Thành tiền : ${priceFormat}.000đ </li>
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
          <h2> Bạn có một đơn đặt hàng </h2>
          <h3> Thông tin khách hàng </h3>
          <ul>
               <li> <strong> Tên khách hàng: </strong> ${userInfo.name} </li>
               <li> <strong> Địa chỉ nhận hàng: </strong> ${userInfo.address.ward}, ${userInfo.address.district}, ${userInfo.address.province} </li>
               <li> <strong> Email: </strong> ${userInfo.email} </li>
               <li> <strong> Số điện thoại: </strong> ${userInfo.telephone} </li>
          </ul>
          <h3> Chi tiết đơn hàng </h3>
          ${listProductCartText}
          <p> <strong> Tổng giá trị các sản phẩm: </strong> ${totalPriceFormat}.000đ </p>
          <p> <strong> Giảm giá 10%: </strong> ${discountFormat}.000đ </p>
          <p> <strong> Phí vận chuyển </strong> : 30.000đ </p>
          <h2> Tổng giá trị đơn hàng: ${totalCartFormat}.000đ </h2>
      `;

    await sendMail(userInfo.email, "Đơn hàng", html);
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
