import { PageHeader } from "@/app/admin/_components/PageHeader";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { ProductForm } from "../../_components/ProductForm";
import db from "@/app/admin/db/db";

export default async function EditProductPage(
    {params: {id}}
    : {params:{id: string}}) {
        const product = await db.product.findUnique({where : {id}})

  return (
    <>
    <MaxWidthWrapper>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product}/>
    </MaxWidthWrapper>
    </>
  )
}