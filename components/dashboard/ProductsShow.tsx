"use client"

import { useEffect, useState } from "react";
import { IProduct } from "@/types/Product";

import CardProduct from "@/components/CardProduct";
import CreateProductModal from "@/components/CreateProductModal";
import EditProductModal from "../EditProductModal";

export default function ProductShow() {
    const [products, setProduct] = useState<IProduct[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [openEditModal, setOpenEditModal] = useState(false);

    // Fetch or Get Data
    const fetchProducts = async () => {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProduct(data.products);
    }

    // Delete a Product
    const deleteProduct = async (id: number) => {
        const confirmation = confirm("Are you sure want to delete this item?");

        if (!confirmation) return;

        await fetch(`https://dummyjson.com/products/${id}`, {
            method: "DELETE",
        });

        alert("Product deleted!");
        fetchProducts();
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Products List</h1>

                    <button
                        onClick={() => setOpenModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        + Create Product
                    </button>

                    <CreateProductModal
                        isOpen={openModal}
                        onClose={() => setOpenModal(false)}
                    />

                    <EditProductModal
                        isOpen={openEditModal}
                        productId={selectedProductId}
                        onClose={() => setOpenEditModal(false)}
                    />
                </div>

                <div className="grid grid-cols-4 space-x-3 space-y-4">
                    {products.map((data) => (
                        <CardProduct
                            key={data.id}
                            title={data.title}
                            id={data.id}
                            onDelete={() => deleteProduct(data.id)}
                            onEdit={() => {
                                setSelectedProductId(data.id);
                                setOpenEditModal(true);
                            }}
                            image={data.images} badge={data.tags}
                            description={data.description}
                            price={data.price} />
                    ))}
                </div>
            </div>

        </>
    )
}