import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import bgImg from "../assets/loginBg.png";
import logo from "../assets/logo 1.png";
import { Form, Input, Button, Card, message } from "antd";

interface LoginData {
    username: string;
    password: string;
}

interface ErrorResponse {
    response?: {
        status: number;
    };
}

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const handleLogin = async (values: LoginData) => {
        setLoading(true);
        try {
            const loginResponse = await login(values);

            localStorage.setItem("token", loginResponse.access);
            localStorage.setItem("refresh_token", loginResponse.refresh);
            localStorage.setItem("user_id", loginResponse.user_id);
            localStorage.setItem("user_role", loginResponse.user_role);

            message.success("Login successful!");
            navigate("/dashboard");
        } catch (err: any) {
            const error = err as ErrorResponse;
            if (error.response && error.response.status === 401) {
                message.error("Incorrect username or password.");
            } else {
                message.error("An error occurred. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="flex justify-center items-center h-screen bg-cover bg-center" 
            style={{ backgroundImage: `url(${bgImg})` }}
        >
            <Card 
                className="w-[400px] md:w-[500px] shadow-2xl rounded-4xl px-10 py-8 bg-white/80 backdrop-blur-lg transition-all duration-300 hover:shadow-3xl"
                bodyStyle={{ padding: "32px 80px" }}
            >
                <div className="flex flex-col items-center pt-10">
                    <img src={logo} alt="logo" className="w-[240px] mb-4 drop-shadow-md" />
                    <h2 className="text-2xl text-[#334D6E] font-bold py-6">Welcome !</h2>
                </div>
                
                <Form layout="vertical" onFinish={handleLogin}>
                    <Form.Item
                        name="username"
                        label={<span className="text-[#334D6E] font-medium text-lg">Username</span>}
                        rules={[
                            { required: true, message: "Please enter your username!" },
                            { min: 3, message: "Username must be at least 3 characters long!" }
                        ]}
                    >
                        <Input 
                            placeholder="username" 
                            className="h-12 rounded-xl px-4 text-lg border-gray-300 focus:border-blue-500 transition-all"
                        />
                    </Form.Item>
                    
                    <Form.Item
                        name="password"
                        label={<span className="text-[#334D6E] font-medium text-lg">Password</span>}
                        rules={[
                            { required: true, message: "Please enter your password!" },
                            { min: 6, message: "Password must be at least 6 characters long!" }
                        ]}
                    >
                        <Input.Password 
                            placeholder="password" 
                            className="h-12 rounded-xl px-4 text-lg border-gray-300 focus:border-blue-500 transition-all"
                        />
                    </Form.Item>

                    {/* Forgot Password link tashqariga olib chiqildi */}
                    <div className="text-right mb-4">
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-all">
                            Forgot Password?
                        </a>
                    </div>


                    <Form.Item>
                        <div className="flex justify-center mt-3 mb-4">
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                loading={loading} 
                                style={{ padding: "16px 24px", height: "45px" }}
                                className="w-[55%] bg-gradient-to-r from-blue-500 to-blue-700 
                                    hover:from-blue-600 hover:to-blue-800 text-white 
                                    font-semibold rounded-xl text-lg shadow-md transform 
                                    transition-all duration-300 hover:scale-105"
                            >
                                {loading ? "Loading..." : "Confirm"}
                            </Button>
                        </div>
                    </Form.Item>

                    <div className="text-center mt-4">
                        <button className="text-sm w-[200px] text-gray-600 hover:text-gray-800 font-medium transition-all">
                            Sign up →
                        </button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
