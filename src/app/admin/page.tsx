
import { formatNumber, formatPrice } from "@/lib/utils";
import db from "./db/db";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import DashboardCard from "./_components/DashboardCard";


async function getSalesData(){
    const data = await db.order.aggregate({
        _sum: {pricePaid: true},
        _count: true
    })
    await wait(2000)
    return {
        amount : (data._sum.pricePaid || 0) / 100,
        numberOfSales: data._count
    }
}

async function getUserData() {
    const [userCount, orderData] = await Promise.all([
      db.user.count(),
      db.order.aggregate({
        _sum: { pricePaid: true },
      }),
    ])
  
    return {
      userCount,
      averageValuePerUser:
        userCount === 0
          ? 0
          : (orderData._sum.pricePaid || 0) / userCount / 100,
    }
  }

async function getProductData() {
    const [activeCount, inactiveCount] = await Promise.all([
      db.product.count({ where: { isAvailableForPurchase: true } }),
      db.product.count({ where: { isAvailableForPurchase: false } }),
    ])
  
    return { activeCount, inactiveCount }
  }


function wait(duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration))
}

export default async function AdminDashboard(){
    const [salesData, userData, productData] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData()
      ])
    
    return <MaxWidthWrapper>
    <div className="px-5 grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Sales" subtitle={`${formatNumber(salesData.numberOfSales)} Orders`} body={formatPrice(salesData.amount)} />
    </div>
    <div className="px-5 pt-5 grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Customers" subtitle={`${formatPrice(
          userData.averageValuePerUser)} Average Value`} body={formatNumber(userData.userCount)}/>
    </div>
    <div className="px-5 pt-5 grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
    </MaxWidthWrapper>

}


