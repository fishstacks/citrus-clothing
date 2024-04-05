import { PageHeader } from "@/app/admin/_components/PageHeader";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

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

function ProductsTable() {
    return (
        <div className="max-w-full overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-auto text-left"><span>Available for purchase</span></TableHead>
                        <TableHead className="w-auto text-left">Name</TableHead>
                        <TableHead className="w-auto text-left">Price</TableHead>
                        <TableHead className="w-auto text-left">Orders</TableHead>
                        <TableHead className="sr-only"><span>Actions</span></TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
        </div>
    );
}
