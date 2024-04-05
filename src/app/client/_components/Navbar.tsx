import React from 'react';

import { Icons } from "@/components/ui/Icons"
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper"
import Link from "next/link"
import NavItems from "./NavItems"
import { buttonVariants } from "@/components/ui/button"
import Bag from "./Bag"
import { cn } from "@/lib/utils"


const Navbar = () => {

    const user = null

    return (
        <div className="bg-white sticky z-50 top-0 inset-x-0 h-12">
            <header className="relative bg-white">
                <MaxWidthWrapper>
                    <div className='border-b border-gray-200'>
                        <div className='flex h-12 items-center'>
                            {/* TO DO MOBILE */}
                            <div className='ml-4 flex lg:ml-0'>
                                <Link href='/'>
                                    <Icons.logo src="/citruslogo.png" className="h-10 w-25" />
                                </Link>
                            </div>
                            <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                                <NavItems />
                            </div>
                            <div className="ml-auto flex item-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    {user ? null : (<Link href="/sign-in" className={cn(buttonVariants({variant: "ghost"}), "text-violet-600 font-semibold")}>Sign In</Link>)}
                                    {user ? null : (
                                        <span className="h-6 w-px bg-gray-200"/>
                                    )}
                                    {user ? <p></p> : <Link href="/sign-up" className={buttonVariants({variant: "ghost"})}>Sign Up</Link>}
                                    {user ? <span className="h-6 w-px bg-gray-200"/> : null}
                                    {user ? null : <div className="flex lg:ml-6 "><span className="h-6 w-px bg-gray-200"/></div>}
                                    <div className="ml-4 flow-root lg:ml-6"><Bag/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>

            </header>
        </div>
    )
}

export default Navbar