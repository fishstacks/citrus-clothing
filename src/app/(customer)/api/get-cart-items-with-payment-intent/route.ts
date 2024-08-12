import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/admin/db/db';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const { cartItemDetails } = await request.json();

    if (!Array.isArray(cartItemDetails)) {
      console.error('cartItemDetails is not an array:', cartItemDetails);
      return NextResponse.json({ error: 'cartItemDetails must be an array' }, { status: 400 });
    }

    const cartItems = await db.product.findMany({
      where: { id: { in: cartItemDetails.map(item => item.i) } },
    });

    const itemsWithQuantities = cartItems.map(item => ({
      ...item,
      quantity: cartItemDetails.find(detail => detail.i === item.id)?.q,
    }));

    if (itemsWithQuantities.length === 0) {
      return NextResponse.json({ error: 'No valid items found' }, { status: 404 });
    }

    const cartTotal = itemsWithQuantities.reduce(
      (total, { priceInCents, quantity }) => total + priceInCents * quantity,
      0
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: cartTotal,
      currency: 'eur',
    });

    return NextResponse.json({ cartItems: itemsWithQuantities, clientSecret: paymentIntent.client_secret }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return NextResponse.json({ error: 'Failed to fetch cart items and payment intent' }, { status: 500 });
  }
}
