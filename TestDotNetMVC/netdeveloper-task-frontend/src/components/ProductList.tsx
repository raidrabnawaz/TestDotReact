import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct, Product } from "../services/productService";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/authService"; 

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!getToken()) {
            console.warn("User not authorized. Redirecting to login...");
            navigate("/login"); 
            return;
        }
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id);
                fetchProducts(); 
            } catch (error) {
                console.error("Error deleting product", error);
            }
        }
    };

    
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2>Product List</h2>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary mb-3" onClick={() => navigate("/create")}>
                Add Product
            </button>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button
                                        className="btn btn-warning mx-1"
                                        onClick={() => navigate(`/edit/${product.id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger mx-1"
                                        onClick={() => handleDelete(product.id!)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center">No products found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
