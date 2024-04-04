import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR"| "TND",
    notation?: Intl.NumberFormatOptions["notation"]
  } = {}
) {
  const {currency = "EUR", notation="compact"} = options
  const numericPrice = typeof price === "string" ? parseFloat(price) : price 
  return new Intl.NumberFormat("en-US", {
    style:"currency",
    currency,
    notation,
    maximumFractionDigits: 2}).format(numericPrice)
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US")

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number)
}

