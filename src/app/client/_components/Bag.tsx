"use client"

import { ShoppingBagIcon, PartyPopperIcon } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils"
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

const Bag = () => {

    const itemCount = 0

    const fee = 5

    return <Sheet>
        <SheetTrigger className="group -m-2 flex items-center p-2"><ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"/>
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
        </SheetTrigger>
        <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
            <SheetHeader className="space-y-2.5 pr-6">
                <SheetTitle>Basket (0)</SheetTitle>
            </SheetHeader>
            {itemCount > 0 ? (
                <>
                <div className="flex w-full flex-col pr-6">
                    bag items
                </div>
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
                            <span>{formatPrice(fee)}</span>
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetTrigger asChild>
                            <Link href="/Bag" className={buttonVariants({className: 'w-full'})}>Continue to checkout</Link>
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

export default Bag