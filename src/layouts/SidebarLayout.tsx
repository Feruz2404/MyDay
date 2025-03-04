import { Layout, Menu } from "antd";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { FaBuilding, FaChevronDown } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { LuLandmark } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdBook } from "react-icons/io";
import { FiUsers } from "react-icons/fi";
import { TfiPieChart } from "react-icons/tfi";

const { Sider, Content } = Layout;

interface SidebarProps {
    children: ReactNode;
}

const menuItems = [
    { key: "dashboard", icon: <RxDashboard />, label: "Dashboard" },
    { key: "leads", icon: <IoCalendarClearOutline />, label: "Leads" },
    { key: "clients", icon: <FaRegUser />, label: "Clients" },
    { key: "groups", icon: <PiStudent />, label: "Groups" },
    { key: "courses", icon: <IoMdBook />, label: "Courses" },
    { key: "personnel", icon: <FiUsers />, label: "Personnel" },
    { key: "finance", icon: <LuLandmark />, label: "Finance" },
    { key: "reports", icon: <TfiPieChart />, label: "Reports" },
    { key: "profile", icon: <IoSettingsOutline />, label: "Settings" },
];

export default function SidebarLayout({ children }: SidebarProps) {
    const [isMainBranchOpen, setIsMainBranchOpen] = useState(false);

    return (
        <Layout className="h-screen flex !bg-white">
            <Sider
                // collapsible  // Remove the collapsible prop
                // collapsed={collapsed} // Remove the collapsed prop
                // onCollapse={setCollapsed}  // Remove the onCollapse prop
                width={250}
                className="h-screen !bg-white"
            >
                <div className="h-[60px] flex items-center gap-3 px-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full ml-1 flex items-center justify-center">
                        <FaBuilding className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-black">Main branch</h2>
                    </div>
                    <div
                        onClick={() => setIsMainBranchOpen(!isMainBranchOpen)}
                        className="ml-auto cursor-pointer bg-white p-2 rounded-full"
                    >
                        <FaChevronDown
                            className={`text-gray-400 transition-transform ${isMainBranchOpen ? 'rotate-180' : ''}`}
                        />
                    </div>
                </div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={["dashboard"]}
                    className=""
                    items={menuItems.map((item) => ({
                        key: item.key,
                        icon: item.icon,
                        label: <Link to={`/${item.key}`} className="text-gray-500 text-lg">{item.label}</Link>,
                    }))}
                />
            </Sider>
            <Layout className="flex-1 overflow-y-auto">
                <Content className="p-6 bg-gray-100 min-h-screen">{children}</Content>
            </Layout>
        </Layout>
    );
}
