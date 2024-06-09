import React from 'react';

import { Button, buttonVariants } from "@/components/ui/button";
import Link from 'next/link'
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Polaroid from "./_components/Polaroid";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";

const perks = [
  {
    name: 'Instant delievery',
    Icon: ArrowDownToLine,
    description: "stuff stuff stuff, the marketing team will figure this out"

  },
  {
    name: 'Instant delievery',
    Icon: CheckCircle,
    description: "stuff stuff stuff, the marketing team will figure this out"

  },
  {
    name: 'Instant delievery',
    Icon: Leaf,
    description: "stuff stuff stuff, the marketing team will figure this out"

  },
]


export default function Home() {
  return (
    <>
    
    <div className='py-10 mx-auto text-center px-4 sm:px-6 lg:px-20' style={{overflowX: 'hidden'}}>
  {/* Container for the whole content */}
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    {/* Block containing text and buttons */}
    <div className='flex flex-col sm:flex-row items-center justify-between'>
    <div className='flex flex-col items-start mb-6 pl-10 pb-10'>
  <h1 className="text-2xl mb-2 font-semibold">Shop our <br/>winter collection</h1>
  {/* Buttons */}
  <div className='flex justify-center w-full'> {/* Centering the button */}
    <Link href='/products' className={buttonVariants()}>Browse collection</Link>
  </div>
</div>

      {/* Polaroid images */}
      <div className='polaroid-container pr-4'>
        <Polaroid imageUrl="/orangesweater.jpg" rotation={3} />
        <Polaroid imageUrl="/twosweaters.jpg" rotation={-3}/>
        <Polaroid imageUrl="/pinksweater.jpg" rotation={5}/>
      </div>
    </div>
  </div>
</div>








    <section className="border-t border-gray-2000 bg-gray-50">
      <MaxWidthWrapper className="py-20">
        <div className='py-20 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
            {perks.map((perk) => (
              <div key={perk.name} className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
                <div className='md: flex-shrink-0 flex justify-center'>
                  <div className='h-16 w-16 flex items-center justify-center rounded-full bg-violet-100 text-violet-900'>
                    {<perk.Icon className='w-1/3 h-1/3'/>}
                  </div>
                </div>
                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className='text-base font-medium text-gray-900'>{perk.name}</h3>
                  <p className='mt-3 text-sm text-muted-foreground'>
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </MaxWidthWrapper>
    </section>
    </>
  );
}


