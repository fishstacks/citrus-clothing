"use client"


import { Product } from "@prisma/client";
import { formatPrice } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "./_components/CheckoutForm";

interface CartItem extends Product {
  quantity: number;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

async function fetchCartItemsWithPaymentIntent(cartItemDetails: string): Promise<{ cartItems: CartItem[], clientSecret: string }> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-cart-items-with-payment-intent`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cartItemDetails: JSON.parse(cartItemDetails) }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response:', errorText);
    throw new Error('Failed to fetch cart items and payment intent');
  }

  const data = await response.json();
  return data;
}

interface PurchaseProps {
  searchParams: {
    c?: string;
  };
}

export default async function Purchase({ searchParams }: PurchaseProps) {
  const cartItemDetails = searchParams.c;

  if (!cartItemDetails) {
    return <div>No items in the cart.</div>;
  }

  let cartItems: CartItem[] = [];
  let clientSecret: string = '';

  try {
    const result = await fetchCartItemsWithPaymentIntent(cartItemDetails);
    cartItems = result.cartItems;
    clientSecret = result.clientSecret;
  } catch (error) {
    console.error(error);
    return <div>Failed to load cart items.</div>;
  }

  const itemCount = cartItems.length;
  const cartTotal = cartItems.reduce((total, { priceInCents, quantity }) => total + priceInCents * quantity, 0);

  return (
    <div className="flex h-[calc(100vh-3rem)] overflow-hidden">
      <div className="w-2/3">
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm cartItems={cartItems} cartTotal={cartTotal} />
        </Elements>
      </div>
      <div className="w-1/3 flex items-center justify-center p-4">
        <div className="w-full h-[calc(100vh-5rem)] bg-gray-100 p-4 box-border">
          <h1>Purchase Summary ({itemCount})</h1>
          <ul>
            {cartItems.map((item, index) => {
              const formattedPath = item.imagePath.substring(item.imagePath.indexOf('/'));
              return (
                <li key={index} className="flex items-center py-2">
                  <img src={formattedPath} alt={item.name} className="w-16 h-19 object-cover mr-4" />
                  <div>
                    <div className="font-bold">{formatPrice(item.priceInCents / 100)}</div>
                    <div>{item.name}</div>
                    {item.quantity > 1 && (
                    <span className="ml-2">x {item.quantity}</span>
                  )}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="space-y-4 pr-6">
            <Separator />
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center">
                <span className="text-lg font-semibold flex-1">Total</span>
                <span>{formatPrice(cartTotal / 100)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
