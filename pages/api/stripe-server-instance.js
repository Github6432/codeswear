import Stripe from "stripe";
import Product from '../../models/Product';
export const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export default async function handler(req, res) {
    const { cart, subTotal, selectedAddress, email, phone } = req.body;
    const cartItems = Object.values(cart);

    if(!selectedAddress){
        return res.status(400).json({ success: false, error: 'Please Select the address then place the order.' });
    }

    //check cart tempring
    let product, cartSubTotal = 0;
    for (let item in cart) {
        cartSubTotal += cart[item].price * cart[item].qty
        product = await Product.findOne({ slug: item });
        if (product.price != cart[item].price) {
            return res.status(200).json({ success: false, error: 'The price of some items in your cart have Changed. Please try again' })
        }
        // Check if there's enough quantity available
        if (product.availableQty < cart[item].qty) {
            return res.status(200).json({ success: false, error: 'Not enough quantity available for some items.' });
        }

        // Update the available quantity
        if (selectedAddress) {
            await Product.findByIdAndUpdate(product._id, { $inc: { availableQty: - cart[item].qty } });
        }
    }
    if (cartSubTotal !== subTotal) {
        return rea.status(200).json({ success: false, error: 'Your cart Total price is  chenged. Please retry' })

    }
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
                address: JSON.stringify({
                    _id: selectedAddress._id,
                    userid: selectedAddress.userid,
                    name: selectedAddress.name,
                    lastname: selectedAddress.lastname,
                    email: selectedAddress.email,
                    phone: selectedAddress.phone,
                    city: selectedAddress.city,
                    state: selectedAddress.state,
                    country: selectedAddress.country,
                    landmark: selectedAddress.landmark,
                    pincode: selectedAddress.pincode,
                }),
                products: JSON.stringify(cartItems.map(item => ({
                    name: item.name,
                    description: `${item.size}, ${item.variant}`,
                    quantity: item.qty,
                    price: item.price,
                    image: item.image,
                })))
            },
        });
        res.status(200).json({ success: true, session });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Unable to create checkout session' });
    }
}
