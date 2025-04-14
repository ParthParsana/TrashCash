import { Card, Space, Statistic, Typography, List } from "antd";
import { FileDoneOutlined, OrderedListOutlined, ShoppingCartOutlined, UserOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

function Dashboard() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalTrashItems, setTotalTrashItems] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalPayouts, setTotalPayouts] = useState(0);
    const [recentOrders, setRecentOrders] = useState([]);
    const [recentPayouts, setRecentPayouts] = useState([]);
    const [totalPayoutAmount, setTotalPayoutAmount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await fetch("http://localhost:8080/api/auth/getemail");
                const usersData = await usersResponse.json();
                setTotalUsers(usersData.length);

                const trashItemsResponse = await fetch("http://localhost:8080/api/trashitem/all");
                const trashItemsData = await trashItemsResponse.json();
                setTotalTrashItems(trashItemsData.length);

                const ordersResponse = await fetch("http://localhost:8080/api/orders/all");
                const ordersData = await ordersResponse.json();
                setTotalOrders(ordersData.length);
                setRecentOrders(ordersData.slice(-5)); // Last 5 orders

                const payoutsResponse = await fetch("http://localhost:8080/payout/all");
                const payoutsData = await payoutsResponse.json();
                setTotalPayouts(payoutsData.length);
                setRecentPayouts(payoutsData.slice(-5)); // Last 5 payouts

                // Sum total payout amount
                const totalAmount = payoutsData.reduce((sum, payout) => sum + payout.amount, 0);
                setTotalPayoutAmount(totalAmount);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="Dashboard">
            <Typography.Title level={4}>Dashboard</Typography.Title>

            {/* Dashboard Statistics */}
            <Space direction="horizontal" size="large" wrap>
                <DashboardCard
                    icon={<UserOutlined style={iconStyle("green", "rgba(0,255,0,0.25)")} />}
                    title="Total Users"
                    value={totalUsers}
                />
                <DashboardCard
                    icon={<ShoppingCartOutlined style={iconStyle("blue", "rgba(104, 198, 242, 0.98)")} />}
                    title="Total Orders"
                    value={totalOrders}
                />
                <DashboardCard
                    icon={<OrderedListOutlined style={iconStyle("red", "rgba(241, 5, 12, 0.6)")} />}
                    title="Total Trash Items"
                    value={totalTrashItems}
                />
                <DashboardCard
                    icon={<FileDoneOutlined style={iconStyle("purple", "rgba(236, 69, 220, 0.71)")} />}
                    title="Total Payments"
                    value={totalPayouts}
                />
                <DashboardCard
                    icon={<DollarCircleOutlined style={iconStyle("gold", "rgba(255, 165, 0, 0.4)")} />}
                    title="Total Payout (₹)"
                    value={`₹${totalPayoutAmount}`}
                />
            </Space>

            {/* Recent Orders & Recent Payouts - Now in Horizontal Layout */}
            <div style={{ display: "flex", gap: "16px", marginTop: "20px", flexWrap: "wrap" }}>
                <Card title="Recent Orders" bordered={false} style={{ flex: 1, minWidth: "350px" }}>
                    <List
                        grid={{ gutter: 16, column: 2 }} // Displays items in 2 columns
                        dataSource={recentOrders}
                        renderItem={(order) => (
                            <List.Item>
                                <Typography.Text>{order.orderId} - {order.status}</Typography.Text>
                            </List.Item>
                        )}
                    />
                </Card>

                <Card title="Recent Payouts" bordered={false} style={{ flex: 1, minWidth: "350px" }}>
                    <List
                        grid={{ gutter: 16, column: 2 }} // Displays items in 2 columns
                        dataSource={recentPayouts}
                        renderItem={(payout) => (
                            <List.Item>
                                <Typography.Text>₹{payout.amount} - {payout.status}</Typography.Text>
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        </div>
    );
}

// Component for individual dashboard statistic cards
function DashboardCard({ title, value, icon }) {
    return (
        <Card style={{ borderWidth: 2, borderColor: 'rgba(0, 0, 0, 0.29)', padding: 10 }}>
            <Space direction="horizontal" size="large">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}

// Function to style icons dynamically
const iconStyle = (color, background) => ({
    color,
    backgroundColor: background,
    borderRadius: 20,
    fontSize: 24,
    padding: 8,
});

export default Dashboard;
