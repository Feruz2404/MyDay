import { Layout, Table, Tag, Progress } from "antd";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { FaClock, FaUser, FaUsers, FaBook, FaBuilding } from "react-icons/fa";
import SidebarLayout from "../layouts/SidebarLayout";

const { Content } = Layout;

const pieData = [
    { name: "Paid", value: 60, color: "#1677FF" },
    { name: "Not Paid", value: 40, color: "#D9E8FF" },
];

const barData = [
    { month: "JAN", value: 10 },
    { month: "FEB", value: 20 },
    { month: "MAR", value: 30 },
    { month: "APR", value: 25 },
    { month: "MAY", value: 35 },
    { month: "JUN", value: 50 },
    { month: "JUL", value: 30 },
    { month: "AUG", value: 40 },
];

const stats = [
    {
        percent: 67,
        amount: "255 000 000",
        color: "#ff4d4f",
        description: "General English",
        students: 1255,
    },
    {
        percent: 35,
        amount: "218 000 000",
        color: "#52c41a",
        description: "General English",
        students: 1255,
    },
    {
        percent: 21,
        amount: "156 000 000",
        color: "#fa8c16",
        description: "General English",
        students: 1255,
    },
];

const columns = [
    { title: "#", dataIndex: "id", key: "id" },
    {
        title: "Lesson time",
        dataIndex: "time",
        key: "time",
        render: (text: string) => {
            return (
                <Tag color={text && text.includes("09:00") ? "red" : "blue"}>
                    <FaClock className="mr-1" /> {text}
                </Tag>
            );
        },
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Teacher name", dataIndex: "teacher", key: "teacher" },
    { title: "Subject name: level", dataIndex: "subject", key: "subject" },
    { title: "Lesson type", dataIndex: "lessonType", key: "lessonType" },
    {
        title: "Room",
        dataIndex: "room",
        key: "room",
        render: (text: string) => (
            <Tag color="blue" className="!rounded-md">
                {text}
            </Tag>
        ),
    },
    { title: "Students", dataIndex: "students", key: "students" },
];

const data = [
    {
        id: 18,
        key: 1,
        time: "09:00-10:00",
        name: "Group 52",
        teacher: "Mr. Johnson",
        subject: "General English: Indermatade level",
        lessonType: "Group",
        room: "Room 2-3",
        students: "18 students",
    },
    {
        id: 18,
        key: 2,
        time: "09:00-10:00",
        name: "Steve Hoover",
        teacher: "Mr. Johnson",
        subject: "General English: Indermatade level",
        lessonType: "Individual",
        room: "Room 2-3",
        students: "1 student",
    },
    {
        id: 18,
        key: 3,
        time: "09:00-10:00",
        name: "Group 52",
        teacher: "Mr. Johnson",
        subject: "General English: Indermatade level",
        lessonType: "Group",
        room: "Room 2-3",
        students: "18 students",
    },
    {
        id: 18,
        key: 4,
        time: "09:00-10:00",
        name: "Steve Hoover",
        teacher: "Mr. Johnson",
        subject: "General English: Indermatade level",
        lessonType: "Individual",
        room: "Room 2-3",
        students: "1 student",
    },
];

const Dashboard = () => {
    return (
        <div className="fullContainer">
            <SidebarLayout>
                <Layout className="bg-white">
                    <Content
                        className="p-6 !bg-gray-100"
                        style={{
                            margin: "24px 16px",
                            overflow: "initial",
                        }}
                    >
                        <div className="text-2xl font-semibold mb-4">Dashboard</div>


                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div
                                className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4"
                                style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}
                            >
                                <div
                                    className="w-12 h-12 rounded-full text-blue-500 flex items-center justify-center text-2xl"
                                    style={{
                                        backgroundColor: "#DDF3FE",
                                        borderRadius: "8px",
                                        width: "56px",
                                        height: "56px",
                                    }}
                                >
                                    <FaUser />
                                </div>
                                <div>
                                    <div className="text-2xl font-semibold">45</div>
                                    <div className="text-gray-500">New leads</div>
                                </div>
                            </div>
                            <div
                                className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4"
                                style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}
                            >
                                <div
                                    className="w-12 h-12 rounded-full text-blue-500 flex items-center justify-center text-2xl"
                                    style={{
                                        backgroundColor: "#DDF3FE",
                                        borderRadius: "8px",
                                        width: "56px",
                                        height: "56px",
                                    }}
                                >
                                    <FaBook />
                                </div>
                                <div>
                                    <div className="text-2xl font-semibold">45</div>
                                    <div className="text-gray-500">All students</div>
                                </div>
                            </div>
                            <div
                                className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4"
                                style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}
                            >
                                <div
                                    className="w-12 h-12 rounded-full text-blue-500 flex items-center justify-center text-2xl"
                                    style={{
                                        backgroundColor: "#DDF3FE",
                                        borderRadius: "8px",
                                        width: "56px",
                                        height: "56px",
                                    }}
                                >
                                    <FaUsers />
                                </div>
                                <div>
                                    <div className="text-2xl font-semibold">45</div>
                                    <div className="text-gray-500">Groups</div>
                                </div>
                            </div>
                            <div
                                className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4"
                                style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}
                            >
                                <div
                                    className="w-12 h-12 rounded-full text-blue-500 flex items-center justify-center text-2xl"
                                    style={{

                                        backgroundColor: "#DDF3FE",
                                        borderRadius: "8px",
                                        width: "56px",
                                        height: "56px",
                                    }}
                                >
                                    <FaBuilding />
                                </div>
                                <div>
                                    <div className="text-2xl font-semibold">16</div>
                                    <div className="text-gray-500">Debtors</div>
                                </div>
                            </div>
                        </div>

                        {/* Charts and Stats */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            {/* Payment Status */}
                            <div
                                className="bg-white p-6 rounded-lg shadow-md"
                                style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}
                            >
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                    Payment status
                                </h3>
                                <PieChart width={200} height={200} className="mx-auto">
                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        stroke="none"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                                <div className="flex justify-center gap-4">
                                    <p className="text-center text-gray-600 font-semibold flex items-center gap-1">
                                        <span className="inline-block w-3 h-3 rounded-full bg-[#1677FF]"></span>Paid
                                    </p>
                                    <p className="text-center text-gray-600 font-semibold flex items-center gap-1">
                                        <span className="inline-block w-3 h-3 rounded-full bg-[#D9E8FF]"></span>Not
                                        paid
                                    </p>
                                </div>
                                <p className="text-center text-gray-600 font-semibold">Payments</p>
                            </div>


                            {/* Monthly Financial Indicators */}
                            <div
                                className="bg-white p-6 rounded-lg shadow-md"
                                style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}
                            >
                                <h3 className="text-lg font-semibold mb-4">
                                    Monthly financial indicators
                                </h3>
                                <ResponsiveContainer width="100%" height={225}>
                                    <BarChart data={barData}>
                                        <XAxis dataKey="month" />
                                        <YAxis tickFormatter={(value) => `${value / 1000000} so'm`} />
                                        <Tooltip formatter={(value) => `${value} so'm`} />
                                        <Bar dataKey="value" fill="#0066FF" radius={[8, 8, 6, 6]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* In This Month Stats */}
                            <div
                                className="bg-white p-4 rounded-lg shadow-md"
                                style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}
                            >
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    In This Month
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {stats.map((stat, index) => (
                                        <div
                                            key={index}
                                            className="flex hover:shadow-md duration-200 cursor-pointer items-center bg-gray-100 p-2 rounded-lg"
                                        >
                                            <Progress
                                                type="circle"
                                                percent={stat.percent}
                                                strokeColor={stat.color}
                                                size={50}
                                                strokeWidth={10}
                                                style={{ marginRight: "10px" }}
                                            />
                                            <div className="ml-4">
                                                <p className="text-md font-bold text-gray-800">
                                                    {stat.amount} so‘m
                                                </p>
                                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                                    <FaBook /> {stat.description}
                                                    <span className="ml-auto">
                                                        <FaUsers /> {stat.students}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="overflow-x-auto">
                            <Table
                                dataSource={data}
                                columns={columns}
                                rowKey="id"
                                pagination={false}
                            />
                        </div>
                    </Content>
                </Layout>
            </SidebarLayout>
        </div>
    );
};

export default Dashboard;
