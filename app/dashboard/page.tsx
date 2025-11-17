"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface IUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;
}

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("user");

        if (!token) {
            router.push("/login");
            return;
        }

        if (userData) {
            setUser(JSON.parse(userData))
        }

    }, [router]);

    // Handle Logout
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        router.push("/login");
    };

    if (!user) return <p className="p-6">Loading...</p>;


    return (
        <>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Welcome, {user.firstName}!</h1>
                <button
                    onClick={logout}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                    Logout
                </button>
            </div>
        </>
    )
}