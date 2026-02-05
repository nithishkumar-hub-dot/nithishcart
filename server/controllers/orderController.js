const Order = require('../models/Order');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create new order (Razorpay)
// @route   POST /api/orders/checkout
// @access  Private
const createOrderCheckout = async (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: Math.round(amount * 100),
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.json({
            success: true,
            order_id: razorpayOrder.id,
            amount: razorpayOrder.amount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating Razorpay order' });
    }
};

// @desc    Verify Payment & Save Order
// @route   POST /api/orders/verify
// @access  Private
const verifyOrderPayment = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderData,
    } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        try {
            const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = orderData;

            const order = new Order({
                user: req.user._id,
                orderItems,
                shippingAddress,
                paymentMethod: 'Razorpay',
                paymentResult: {
                    id: razorpay_payment_id,
                    status: 'success',
                    update_time: Date.now(),
                    email_address: req.user.email
                },
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                isPaid: true,
                paidAt: Date.now(),
            });

            const createdOrder = await order.save();
            res.json({ success: true, message: 'Payment verified successfully', orderId: createdOrder._id });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Error saving order' });
        }
    } else {
        res.status(400).json({ success: false, message: 'Invalid signature' });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            'user',
            'name email'
        );

        if (order) {
            // Allow admin or order owner to view
            if (req.user.role === 'admin' || order.user._id.toString() === req.user._id.toString()) {
                res.json(order);
            } else {
                res.status(401).json({ message: 'Not authorized to view this order' });
            }
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrderCheckout,
    verifyOrderPayment,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
};
