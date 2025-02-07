import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, User } from "../services/authService";

const Login: React.FC = () => {
    const [user, setUser] = useState<User>({ email: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(user);
            navigate("/");
        } catch (error) {
            setError("Invalid email or password."+error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Login</h2>
            {error && <p className="alert alert-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" value={user.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" value={user.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;
