import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, updateProduct, getProductById, Product } from "../services/productService";

const ProductForm: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState<Product>({
        name: "",
        price: 0,
        quantity: 0
    });

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        if (id) {
            const data = await getProductById(Number(id));
            setProduct(data);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            await updateProduct({ ...product, id: Number(id) });
        } else {
            await createProduct(product);
        }
        navigate("/");
    };

    return (
        <div className="container mt-4">
            <h2>{id ? "Edit Product" : "Create Product"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input type="text" name="name" value={product.name} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input type="number" name="price" value={product.price} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label>Quantity</label>
                    <input type="number" name="quantity" value={product.quantity} onChange={handleChange} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-success">Save</button>
                <button type="button" className="btn btn-secondary mx-2" onClick={() => navigate("/")}>Cancel</button>
            </form>
        </div>
    );
};

export default ProductForm;
