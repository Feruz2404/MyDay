import { Layout, Avatar, Dropdown, MenuProps, message } from "antd";
import { FaBell } from "react-icons/fa";
import { FiSearch, FiPlusSquare, FiClock } from "react-icons/fi";
// import { GoDotFill } from "react-icons/go";
import img from "../assets/Layer_40_copy.png";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../services/Service";
import { ThreeDot } from "react-loading-indicators";
import { useEffect } from "react";

const { Header } = Layout;

export default function Navbar() {
    const navigate = useNavigate();
    const { data, isLoading } = useGetUserQuery({});

    // Mock user agar API ishlamasa
    const mockUser = {
        profile_photo: "https://randomuser.me/api/portraits/men/75.jpg",
        first_name: "Uka",
        last_name: "Feruzbek",
    };

    // API dan kelgan ma'lumotlarni localStorage'ga saqlash
    useEffect(() => {
        if (data) {
            localStorage.setItem("userData", JSON.stringify(data));
        }
    }, [data]);

    // LocalStorage'dan ma'lumot olish
    const storedUser = localStorage.getItem("userData");
    const userData = data || (storedUser ? JSON.parse(storedUser) : mockUser);

    const handleLogout = async () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            message.success("You have logged out successfully!");
            navigate("/");
        } catch (error) {
            message.error("Logout failed. Please try again later.");
        }
    };

    const menuItems: MenuProps["items"] = [
        { key: "1", label: "My profile", onClick: () => navigate("/profile") },
        { key: "2", label: "Settings", onClick: () => console.log("Settings clicked") },
        { key: "3", label: "Logout", danger: true, onClick: handleLogout },
    ];

    return (
        <Header className="sticky top-0 z-10 !bg-white shadow-md px-6 py-8 flex justify-between items-center">
            {/* LOGO */}
            <div className="flex items-center">
                <img src={img} alt="Logo" className="h-14" />
            </div>

            {/* SEARCH BAR */}
            <div className="relative w-80">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
                <input
                    type="text"
                    placeholder="Global search"
                    className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-100 text-gray-500 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* ICONS & PROFILE */}
            <div className="flex items-center gap-4">
                {/* Plus Icon */}
                <FiPlusSquare className="text-2xl text-gray-600 cursor-pointer hover:text-blue-500" />

                {/* Notification Bell with Dot */}
                <div className="relative px-2">
                    <FaBell className="text-2xl text-gray-600 cursor-pointer hover:text-blue-500" />
                    {/* <GoDotFill className="absolute top-0 right-0 text-red-500 text-xs" /> */}
                </div>

                {/* Clock Icon */}
                <FiClock className="text-2xl text-gray-600 cursor-pointer hover:text-blue-500" />

                {/* User Profile */}
                {isLoading ? (
                    <ThreeDot color="#4e31cc" size="small" text="" textColor="" />
                ) : userData.profile_photo ? (
                    <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                        <div className="flex items-center cursor-pointer ml-10">
                            <Avatar src={userData.profile_photo} size="large" />
                            <div className="ml-2 text-right">
                                <div className="font-semibold text-gray-900">
                                    {userData.last_name} {userData.first_name?.charAt(0).toUpperCase()}.
                                </div>
                                <p className="text-sm text-gray-500">{userData.user?.user_role}</p>
                            </div>
                        </div>
                    </Dropdown>
                ) : (
                    <span className="text-gray-500">User not found</span>
                )}
            </div>
        </Header>
    );
}
