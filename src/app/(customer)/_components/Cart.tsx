"use client"

import React from 'react';

import { ShoppingBagIcon, PartyPopperIcon, TrashIcon } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils"
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import useCart from '../hooks/useCart'
import { Product } from '@prisma/client';

interface CartItem extends Product {
    quantity: number;
  }
  

interface CartProps {
    cartItems: CartItem[];
  }

const Cart = () => {

    const { cartItems, removeCartItem } = useCart();
    const itemCount = cartItems.length
    const fee = 5
    const cartTotal = cartItems.reduce(
        (total, { priceInCents, quantity }) => total + priceInCents * quantity,
        0
      );
    const cartItemDetails = cartItems.map(item => ({
        i: item.id,
        q: item.quantity,
      }));

    return <Sheet>
        <SheetTrigger className="group -m-2 flex items-center p-2"><ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"/>
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{itemCount}</span>
        </SheetTrigger>
        <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
            <SheetHeader className="space-y-2.5 pr-6">
                <SheetTitle>Basket ({itemCount})</SheetTitle>
            </SheetHeader>
            {itemCount > 0 ? (
                <>
                <div className="flex w-full flex-col pr-6">
                    bag items
                </div>
                <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center py-2 pr-6">{item.name} - {formatPrice(item.priceInCents / 100) }
              {item.quantity > 1 && (
                    <span className="ml-2">x {item.quantity}</span>
                  )}
              <button className="ml-14" onClick={() => removeCartItem(item.id)}><TrashIcon/></button>
              </li>
            ))}
          </ul>
                <div className="space-y-4 pr-6">
                <Separator />
                    <div className="space-y-1.5 text-sm">
                        <div className="flex items-center">
                            <PartyPopperIcon className="h-4 w-4 flex-shrink-0 mr-2 text-violet-700 group-hover:text-gray-500"/> {/* Adjusted margin */}
                            <span className="text-base font-semibold">Promotional Code</span> 
                            <span className="ml-auto">Add</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-lg font-semibold flex-1">Total</span>
                            <span>{formatPrice(cartTotal / 100)}</span>
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetTrigger asChild>
                        <Link href={{ pathname: '/Purchase', query: { c: JSON.stringify(cartItemDetails) } }} className={buttonVariants({ className: 'w-full' })}>
                        Continue to checkout</Link>
                        </SheetTrigger>
                    </SheetFooter>

                </div>
                </>
            ) : (<div className="flex h-full flex-col items-center justify-center space-y-1">
                <div className="relative mb-4 h-60 w-60 text-muted-foreground">
                    <Image src='/empty-shopping-bag.png' fill alt='empty shopping bag image'/>
                </div>
                <div className="text-xl ">Your basket is still empty</div>
                <SheetTrigger asChild>
                    <Link href='/products' className={buttonVariants({variant: "link", size: "sm"})}>Discover everything we've got for you</Link>
                </SheetTrigger>
            </div>)}
        </SheetContent>
    </Sheet>
}

export default Cart