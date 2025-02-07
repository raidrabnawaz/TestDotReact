import axios from "axios";

const API_URL = "https://localhost:7263/api/auth"; // Ensure this matches your ASP.NET Core API

export interface User {
    email: string;
    password: string;
}

export interface RegisterUser extends User {
    fullName: string;
}

// Register a new user
export const register = async (user: RegisterUser): Promise<void> => {
    await axios.post(`${API_URL}/register`, user);
};

// Login user
export const login = async (user: User): Promise<string> => {
    const response = await axios.post<{ token: string }>(`${API_URL}/login`, user);
    localStorage.setItem("token", response.data.token);
    return response.data.token;
};

// Logout user
export const logout = (): void => {
    localStorage.removeItem("token");
};

// Get the authentication token
export const getToken = (): string | null => {
    return localStorage.getItem("token");
};
