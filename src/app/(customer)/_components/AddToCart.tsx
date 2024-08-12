'use client'

import { useEffect, useState } from 'react'
import useCart from '../hooks/useCart'
import { Product } from '@prisma/client'
import { Button } from '@/components/ui/button'

const AddToCartButton = ({
  product,
}: {
  product: Product
}) => {
  const { addToCart } = useCart()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isSuccess])

  return (
    <Button
      onClick={() => {
        addToCart(product)
        setIsSuccess(true)
      }}
      size='lg'
      className='w-full'>
      {isSuccess ? 'Added!' : 'Add to cart'}
    </Button>
  )
}

export default AddToCartButton