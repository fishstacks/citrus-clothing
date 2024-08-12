import db from '@/app/admin/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, cartItems, cartTotal } = req.body;

  if (!email || !cartItems || cartItems.length === 0 || !cartTotal) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    // Step 1: Create or find the user
    const user = await db.user.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    // Step 2: Create the order
    const order = await db.order.create({
      data: {
        pricePaid: cartTotal,
        userId: user.id,
        orderItems: {
          create: cartItems.map((item: any) => ({
            quantity: item.quantity,
            productId: item.id,
          })),
        },
      },
    });

    // Step 3: Respond with the order ID and any other relevant info
    res.status(200).json({ orderId: order.id });
  } catch (error: any) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
