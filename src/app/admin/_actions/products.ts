"use server"

import { z } from "zod"
import db from "../db/db"
import fs from "fs/promises"

const imageSchema = z.instanceof(File, { message: "required" })

const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    priceInCents: z.coerce.number().int().min(1),
    image: imageSchema.refine(file => file.size > 0, "required")

})

export async function addProduct(formData: FormData){
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false) {
        return result.error.formErrors.fieldErrors
      }
    
    const data = result.data

    fs.mkdir("products", { recursive: true })

    db.product.create({
        data: {
          isAvailableForPurchase: false,
          name: data.name,
          description: data.description,
          price: data.priceInCents,
          imagePath
        },
      })
}