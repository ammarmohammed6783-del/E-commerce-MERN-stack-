// A hook is useful when you want React components to easily access authentication state.
// you can do const { user, isLoading, isAuthenticated } = useAuth(); instead of every time call getme

"use client";

import { useEffect, useState } from "react";
import getMe from "../services/getMe";
import { User } from "../types/auth";

export default function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const loggedInUser = await getMe();
                setUser(loggedInUser);
            } catch {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
    };
}