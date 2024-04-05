"use client"

import Link from "next/link";

import { ComponentProps, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Icons } from "@/components/ui/Icons";


export function NavAdmin({ children }: { children: ReactNode }) {
    return (
        <div className="sticky z-50 top-0 inset-x-0 h-12 ">
            <header className="relative">
                <MaxWidthWrapper>
                    <div className="border-b border-violet-400 flex items-center h-full py-2"> {/* Updated to include items-center and h-full classes */}
                        <div className="ml-4 flex lg:ml-0">
                            <Link href="/">
                                <Icons.logo src="/citruslogoblack.png" className="h-10 w-25" />
                            </Link>
                        </div>
                        <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch items-center space-x-4 h-full"> {/* Updated to include items-center and h-full classes */}
                            {children}
                        </div>
                        <div className="ml-auto flex items-center">
                            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                {/* Admin specific menu items can go here */}
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>
            <div className="h-8" />
        </div>
    );
}


export function NavLink(props: Omit<ComponentProps<typeof Link>, "className"> & { children: ReactNode }) {
    const { children, ...rest } = props;
    const pathname = usePathname();

    return (
        <Link {...rest}>
            <span
                className={cn(
                    "hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
                    pathname === props.href && "bg-background text-foreground",
                    "inline-block px-3 py-2 rounded-md cursor-pointer"
                )}
            >
                {children}
            </span>
        </Link>
    );
}
