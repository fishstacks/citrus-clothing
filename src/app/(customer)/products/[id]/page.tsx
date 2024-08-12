import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import db from "@/app/admin/db/db"
import { notFound } from "next/navigation"
import AddToCartButton from "../../_components/AddToCart"



export default async function ProductPage({
    params: { id },
  }: {
    params: { id: string }
  }) {
    const product = await db.product.findUnique({ where: { id } })
    if (product == null) return notFound()
    const formattedPath: string = product.imagePath.substring(product.imagePath.indexOf('/'))


    return(
        <MaxWidthWrapper>
          <div className="flex flex-col md:flex-row p-4">
             <div className="relative w-[30rem] h-[35rem]">
              <Image src={formattedPath}
               fill
               style={{ objectFit: "cover" }}
               alt={product.name}
               className="w-full h-full"/>
             </div>
          <div className="w-full md:w-1/2 md:pl-8 mt-4 md:mt-0">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-xl font-semibold">{formatPrice(product.priceInCents / 100)}</p>
            <div className="py-5">
            <Separator/>
            </div>
            <AddToCartButton product={product}/>
            </div>
            </div>

        </MaxWidthWrapper>)
    
}