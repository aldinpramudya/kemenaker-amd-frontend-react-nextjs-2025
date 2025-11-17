"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { IProduct } from "@/types/Product";

import CardProduct from "@/components/CardProduct";

export default function ProductShow() {
    const [products, setProduct] = useState<IProduct[]>([]);

    // Fetch Data
    const fetchProducts = async () => {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProduct(data.products);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Products List</h1>

                    <Link
                        href="/products/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + Add Product
                    </Link>
                </div>

                <div className="grid grid-cols-4 space-x-3 space-y-4">
                    {products.map((data) => (
                        <CardProduct key={data.id} image={data.images} badge={data.tags} description={data.description} price={data.price}/>
                    ))}
                </div>
            </div>

        </>
    )
}