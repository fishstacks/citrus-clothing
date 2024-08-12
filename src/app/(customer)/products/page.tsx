import db from "@/app/admin/db/db"
import { ProductCard } from "../_components/ProductCard"
import { cache } from "@/lib/cache"



const getAllNewestProducts = cache(() => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { createdAt: "desc" },
    })
  }, ["/products", "getProducts"])

export default async function ProductPage(){
    return (
        <div className="pt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 place-items-center">
          {(await getAllNewestProducts()).map(product => (
                <ProductCard key={product.id} {...product} />
      ))} 
        </div>
      )
}