import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export default async function handler(req, res) {
    const { cart, email, phone } = req.body;
    console.log('phone', phone)
    
    // Convert cart object to array
    const cartItems = Object.values(cart);

    // Create line items for Stripe session
    const line_items = cartItems.map(item => ({
        price_data: {
            currency: 'INR',
            product_data: {
                name: item.name,
                description: `${item.size}, ${item.variant}`,
            },
            unit_amount: Math.round(item.price * 100), // Convert to cents for Stripe
        },
        quantity: item.qty,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: `${process.env.NEXT_PUBLIC_HOST}/orders`,
            cancel_url: `${process.env.NEXT_PUBLIC_HOST}`,
            customer_email: email,
            line_items: line_items, // Pass line items to the session
            mode: 'payment',
            metadata: {
                phone: phone,
              },
        });

        res.status(200).json({ session });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Unable to create checkout session' });
    }
}
