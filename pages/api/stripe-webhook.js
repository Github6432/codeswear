// pages/api/stripe-webhook.js

import Stripe from 'stripe';
import Order from '@/models/Order';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const event = req.body;

        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                try {
                    // Find the order in the database by the payment intent ID
                    const order = await Order.findOne({ paymentIntent: session.payment_intent });

                    if (order) {
                        order.status = session.payment_status; // Update the order status
                        await order.save();
                    }
                } catch (error) {
                    console.error('Error updating order status:', error);
                }
                break;

            default:
                console.warn(`Unhandled event type ${event.type}`);
        }
        res.status(200).json({ received: true });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
