import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


type DashboardCardProps = {
    title: String
    subtitle: string
    body: string
}

function DashboardCard({title, subtitle, body}: DashboardCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>{body}</CardContent>
        </Card>
    )
}

export default DashboardCard