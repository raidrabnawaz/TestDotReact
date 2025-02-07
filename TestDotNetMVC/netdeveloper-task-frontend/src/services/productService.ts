import axios from "axios";
import { getToken } from "./authService";

const API_URL = "https://localhost:7263/api/products"; // Ensure this matches ASP.NET API

export interface Product {
    id?: number;
    name: string;
    price: number;
    quantity: number;
}

const getAuthHeaders = () => ({
    headers: {
        "Authorization": `Bearer ${getToken()}`, 
        "Content-Type": "application/json"
    }
});
// Get all products
export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>(API_URL, getAuthHeaders());
        console.log("Raw API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Unauthorized or API error:", error);
        throw error;
    }
};


// Get a single product by ID
export const getProductById = async (id: number): Promise<Product> => {
    const response = await axios.get<Product>(`${API_URL}/${id}`);
    return response.data;
};

// Create a new product
export const createProduct = async (product: Product): Promise<void> => {
    await axios.post(API_URL, product);
};

// Update an existing product
export const updateProduct = async (product: Product): Promise<void> => {
    await axios.put(`${API_URL}/${product.id}`, product);
};

// Delete a product
export const deleteProduct = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};
