"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

import useAuthStore from './../stores/authStore';
import ClipLoader from "react-spinners/ClipLoader";

interface LoginRequestData {
  email: string;
  password: string;
}

interface LoginResponseData {
  username: string;
  email: string;
  token: string;
  role: string;
}

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const login = useAuthStore((state) => state.login);
  // const url = "http://localhost:3001/api/user/login";
  const url = "https://food-ordering-backend-eight.vercel.app/api/user/login"

  
  const loginFunction = async (data: LoginRequestData) => {
    try {
      const response = await axios.post<LoginResponseData>(url, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Login failed");
      }
      throw new Error("An unexpected error occurred");
    }
  };
  
  const mutation = useMutation({
    mutationFn: loginFunction,
    onSuccess: (data) => {
      const { username, email, role } = data;
      login({ username, email, role });
  
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/food");
      }
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setLoading(false);
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
  
  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    // Trigger the mutation
    mutation.mutate({ email, password });
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null); // Clear the error when user types
    setter(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && ( // Use loading state for the loader
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <ClipLoader color="#36d68f" size={200} speedMultiplier={1.5} />
        </div>
      )}

      {!loading && (
        <Card className="w-80 h-[400px] rounded-xl border-blue-300 p-2">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <h1 className="p-1">Email</h1>
              <Input
                placeholder="Enter your email"
                aria-label="Email input"
                className="border-gray-500"
                value={email}
                onChange={handleInputChange(setEmail)}
              />
            </CardContent>
            <CardContent>
              <h1 className="p-1">Password</h1>
              <Input
                placeholder="Enter your password"
                aria-label="Password input"
                className="border-gray-500"
                type="password"
                value={password}
                onChange={handleInputChange(setPassword)}
              />
            </CardContent>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <CardFooter className="flex flex-col w-full gap-2 justify-center">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </Button>
              <p className="text-center">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="text-blue-500 hover:underline">
                  Sign up
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
};

export default Login;
