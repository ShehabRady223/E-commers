import orderModel from './../models/orderModel.js';
import userModel from './../models/userModel.js';

export async function placeOrder(req, res) {
    try {
        const { userId, items, amount, address } = req.body
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({ success: true, message: 'Order Placed' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export async function allOrders(req, res) {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export async function userOrders(req, res) {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export async function updateStatus(req, res) {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// export async function placeOrderStripe(req, res) {

// }
// export async function placeOrderRazorpay(req, res) {

// }
