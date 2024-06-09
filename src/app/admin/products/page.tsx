import { PageHeader } from "@/app/admin/_components/PageHeader";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "../db/db"
import Link from "next/link";
import { formatNumber, formatPrice } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeleteDropdownItem, ProductAvailabilityDropdownItem } from "./_components/ProductsActions";

export default function AdminProductsPage() {
    return (<><MaxWidthWrapper>
        <div className="flex justify-between items-center gap-4">
    <PageHeader>Products</PageHeader>
        <Button asChild>
        <Link href="/admin/products/new">Add new</Link>
        </Button>
        </div>
        <ProductsTable/>
        </MaxWidthWrapper></>)}

async function ProductsTable() {
    const products = await db.product.findMany({ 
        select: { id: true, name: true, priceInCents: true, isAvailableForPurchase: true, 
            _count: { select: { orders: true}}},
            orderBy: { name: "asc" }
        })
    if (products.length === 0) return <p>No products found</p>
    return (
        <div className="max-w-full overflow-x-auto">
            <Table style={{ tableLayout: 'fixed' }}>
                <TableHeader>
                    <TableRow>
                        <TableHead>Availability</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead><span>Actions</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map(product => (
                        <TableRow key={product.id} >
                            <TableCell>
                            {product.isAvailableForPurchase ? ( <span>Available</span>) : (<span>Unavailable</span>)}
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{formatPrice(product.priceInCents / 100)}</TableCell>
                            <TableCell>{formatNumber(product._count.orders)}</TableCell>
                            <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <ProductAvailabilityDropdownItem id={product.id} isAvailableForPurchase={product.isAvailableForPurchase}/>
                                    <DropdownMenuSeparator />
                                    <DeleteDropdownItem id={product.id} disabled={product._count.orders > 0}/>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

