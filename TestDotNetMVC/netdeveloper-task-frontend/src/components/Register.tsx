import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, RegisterUser } from "../services/authService";

const Register: React.FC = () => {
    const [user, setUser] = useState<RegisterUser>({ fullName: "", email: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(user);
            navigate("/login");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                console.error("API Response Error:", error.response.data);
                setError(error.response.data || "Registration failed. Try again.");
            } else {
                console.error("Unexpected Error:", error);
                setError("Something went wrong. Try again.");
            }
        }
    };
    

    return (
        <div className="container mt-4">
            <h2>Register</h2>
            {error && <p className="alert alert-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Full Name</label>
                    <input type="text" name="fullName" className="form-control" value={user.fullName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" value={user.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" value={user.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-success">Register</button>
            </form>
        </div>
    );
};

export default Register;
