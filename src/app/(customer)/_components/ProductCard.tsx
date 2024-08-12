import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
 id: string
 name: string 
 priceInCents: number
 imagePath: string
}

export function ProductCard({id, name, priceInCents, imagePath}: ProductCardProps) {

    const formattedPath: string = imagePath.substring(imagePath.indexOf('/'));

    return (
    <div className="flex flex-nowrap gap-0">
    <Link href={`/products/${id}`} >
    <Card className="flex flex-col w-[15rem]">
  <div className="relative w-full h-[25rem]">
    <Image
      src={formattedPath}
      fill
      alt={name}
      style={{ objectFit: "cover" }}
      className="w-full h-full object-center"
    />
  </div>
  <CardFooter className="pt-3 px-4">
    <div className="flex items-center justify-between w-full">
      <CardTitle className="text-lg">{name}</CardTitle>
      <CardDescription className="ml-auto">{formatPrice(priceInCents / 100)}</CardDescription>
    </div>
  </CardFooter>
</Card>


    </Link>
    </div>
    )
}