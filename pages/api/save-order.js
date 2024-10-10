import Stripe from 'stripe';
import Order from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { session_id } = req.body;
        try {
            const session = await stripe.checkout.sessions.retrieve(session_id);
            //   console.log('SSSSSSSSSSSS',session)
            // Create an order object to save in the database
            const order = {
                email: session.customer_email,
                phone: session.metadata.phone,
                amount: session.amount_total,
                status: session.payment_status,
                paymentIntent: session.payment_intent,
                createdAt: new Date(),
                currency: session.currency,
            };
            // Save the order to your database
            await Order.create(order);
            res.status(200).json({ message: 'Your Order Details Saved Successfully', success: true });
        } catch (error) {
            console.error('Error saving order:', error);
            res.status(500).json({ error: 'Unable to save order' });
        }
    }
}
