import React from 'react';

import { Button, buttonVariants } from "@/components/ui/button";
import Link from 'next/link'
import { ArrowDownToLine, ArrowRight, CheckCircle, CitrusIcon, Leaf, Shirt, Truck } from "lucide-react";
import Polaroid from "./_components/Polaroid";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import db from '../admin/db/db';
import { Product } from '@prisma/client';
import { ProductCard } from './_components/ProductCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const perks = [
  {
    name: 'Fast delivery',
    Icon: Truck,
    description: "the marketing team will figure this one out"

  },
  {
    name: 'Quality garments',
    Icon: Shirt,
    description: "the marketing team will figure this one out"

  },
  {
    name: '100% citrus',
    Icon: CitrusIcon,
    description: "the marketing team will figure this one out"

  },
]

function getPopularProducts(){
  return db.product.findMany({
    where : {isAvailableForPurchase : true},
    orderBy: { orders: {_count: "desc"}},
    take: 6
  })
}

function getNewestProducts(){
  return db.product.findMany({
    where :{isAvailableForPurchase : true},
    orderBy: { createdAt: "desc"},
    take: 6
  })
}

type ProductsCarouselProps = {
  title: string
  productsFetcher: () => Promise<Product[]>
  
}
async function ProductsCarousel({title, productsFetcher}: ProductsCarouselProps){
  return (<div className=" py-20">
    
    <div className="flex gap-4 pb-4">
      <h2 className="text-3xl font-bold">{title}</h2>
      <Button variant="outline" asChild>
        <Link href="/products" className="space-x-2">
          <span>View All</span>
          <ArrowRight className="size-4"/>
        </Link>
      </Button>
    </div>
    <Carousel>
      <CarouselContent>
      {(await productsFetcher()).map(product => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
                <ProductCard {...product} />
                </CarouselItem>
      ))} 
      </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
      </Carousel>
    
  </div>)}

export default function Home() {
  return (
    <>

<div className='py-10 text-center px-4 sm:px-6 lg:px-20' style={{ overflowX: 'hidden' }}>
  <div className='flex flex-col sm:flex-row items-center justify-between'>
    <div className='flex flex-col h-full justify-center pl-20 pb-20'>
      <h1 className="text-2xl mb-2 font-semibold">Shop our <br />winter collection</h1>
      <div className='flex justify-center w-full'>
        <Link href='/products' className={buttonVariants()}>Browse collection</Link>
      </div>
    </div>
    <div className='container pr-20'>
              <Polaroid imageUrl="/orangesweater.jpg" rotation={3} />
              <Polaroid imageUrl="/twosweaters.jpg" rotation={-3}/>
              <Polaroid imageUrl="/pinksweater.jpg" rotation={5}/>
            </div>
  </div>
</div>


    <section className="border-t border-gray-2000 bg-gray-50">
      <MaxWidthWrapper className="py-20">
      <div className="flex flex-col">
          <ProductsCarousel title={"Just In!"} productsFetcher={getNewestProducts} />
          <ProductsCarousel title={"Our bestsellers"} productsFetcher={getPopularProducts} />
          </div>
        <h1 className='text-xl font-semibold'>What we promise you...</h1>
        <div className='py-10 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0 place-items-center pr-9'>
            
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

