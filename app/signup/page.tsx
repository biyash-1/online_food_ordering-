
"use client"
import { useState } from "react";
import axios, { AxiosError } from "axios"; // Import AxiosError
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RingLoader } from "react-spinners";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const BASE_URL = process.env.MODE === "development" ? "http://localhost:3001" : (process.env.NEXT_PUBLIC_API_URL as string) 

    const signupFunction = async (data: { username: string; email: string; password: string }) => {
        const response = await axios.post(`${BASE_URL}/api/user/signup`, data);
        console.log("Signup response:", response.data);
        return response.data;
    };

    const mutation = useMutation({
        mutationFn: signupFunction,
        onSuccess: (data) => {
            console.log("Signup successful:", data);
            router.push("/login");
        },
        onError: (err: AxiosError<{ message?: string }>) => {
            console.error("Signup error:", err);
            setError(err.response?.data?.message || "An error occurred");
            setLoading(false);
        },
        onMutate: () => setLoading(true),
        onSettled: () => setLoading(false),
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username || !email || !password) {
            setError("All fields are required");
            return;
        }
        mutation.mutate({ username, email, password });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            {loading && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                    <RingLoader color="#36d68f" size={150} speedMultiplier={1.5} />
                </div>
            )}
            <Card className="w-80 h-[500px] rounded-xl border-blue-300 p-2">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Register</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <h1 className="p-1">Email</h1>
                        <Input
                            placeholder="Enter your email"
                            className="border-gray-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </CardContent>
                    <CardContent>
                        <h1 className="p-1">Username</h1>
                        <Input
                            placeholder="Enter your username"
                            className="border-gray-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </CardContent>
                    <CardContent>
                        <h1 className="p-1">Password</h1>
                        <Input
                            placeholder="Enter your password"
                            className="border-gray-500"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </CardContent>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <CardFooter className="flex flex-col w-full gap-2 justify-center">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </Button>
                        <p>
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-500 hover:underline">
                                Login
                            </a>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Signup;
