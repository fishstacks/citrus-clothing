import { PageHeader } from "@/app/admin/_components/PageHeader";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { ProductForm } from "../_components/ProductForm";


export default function NewProductPage() {
  return (
    <>
    <MaxWidthWrapper>
      <PageHeader>Add Product</PageHeader>
      <ProductForm/>
    </MaxWidthWrapper>
    </>
  )
}