"use client"

import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatPrice } from "@/lib/utils"
import error from "next/error"
import { useState } from "react"
import { addProduct, updateProduct } from "../../_actions/products"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client"


export function ProductForm({ product }: { product?: Product | null }) {
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  )
  const [priceInCents, setPriceInCents] = useState<number>()
    
    return (
        <MaxWidthWrapper>
            <form action={action} className="space-y-8">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" name="name" required defaultValue={product?.name || ""}/>
                    {error.name && <div className="text-destructive">{error.name}</div>}
                </div>
                <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          defaultValue={product?.priceInCents || ""}
          value={priceInCents}
          onChange={e => setPriceInCents(Number(e.target.value) || undefined)}
        />
        {error.priceInCents && <div className="text-destructive">{error.priceInCents}</div>}
        <div className="text-muted-foreground">
          {formatPrice((priceInCents || 0) / 100)}
        </div>
        <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description || ""} />
          {error.description && <div className="text-destructive">{error.description}</div>}
          </div>
          <div className="space-y-2">
                    <Label htmlFor="image">Image</Label>
                    <Input type="file" id="image" name="image" required={product==null}/>
                    {error.image && <div className="text-destructive">{error.image}</div>}
                </div>
      </div> 
      <SubmitButton />
            </form>
        </MaxWidthWrapper>
    )

}

function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}