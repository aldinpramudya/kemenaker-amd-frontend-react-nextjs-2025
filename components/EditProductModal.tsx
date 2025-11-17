"use client";

import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface EditProductModalProps {
    isOpen: boolean;
    productId: number | null;
    onClose: () => void;
}

export default function EditProductModal({
    isOpen,
    productId,
    onClose,
}: EditProductModalProps) {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [savedProduct, setSavedProduct] = useState<any>(null);
    const [modalConfirm, setModalConfirm] = useState(false);

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result as string);
        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    useEffect(() => {
        if (!isOpen || !productId) return;

        const fetchData = async () => {
            setLoading(true);
            const res = await fetch(`https://dummyjson.com/products/${productId}`);
            const data = await res.json();

            setTitle(data.title);
            setTags(data.tags || []);
            setDescription(data.description);
            setPrice(data.price);
            setImage(data.images?.[0] ?? null);

            setLoading(false);
        };

        fetchData();
    }, [isOpen, productId]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            title,
            tags,
            description,
            price,
            images: [image],
        };

        const res = await fetch(`https://dummyjson.com/products/${productId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const updated = await res.json();
        setSavedProduct(updated);
        setModalConfirm(true);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            {!modalConfirm ? (
                <div className="bg-white rounded-lg p-6 w-[450px] shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Edit Product</h2>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <form onSubmit={handleUpdate} className="space-y-3">
                            <input
                                className="border p-2 w-full"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <input
                                className="border p-2 w-full"
                                placeholder="tags (pisahkan koma)"
                                value={tags.join(", ")}
                                onChange={(e) =>
                                    setTags(
                                        e.target.value.split(",").map((tag) => tag.trim())
                                    )
                                }
                            />

                            <textarea
                                className="border p-2 w-full"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <input
                                type="number"
                                className="border p-2 w-full"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />

                            {/* DROPZONE */}
                            <div
                                {...getRootProps()}
                                className="p-6 border-2 border-dashed rounded text-center cursor-pointer"
                            >
                                <input {...getInputProps()} />
                                {image ? (
                                    <img src={image} className="h-32 mx-auto" />
                                ) : (
                                    <p>Drop image here</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                            >
                                Update Product
                            </button>

                            <button
                                type="button"
                                className="mt-2 bg-gray-400 text-white px-4 py-2 rounded w-full"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </form>
                    )}
                </div>
            ) : (
                <div className="bg-white p-5 rounded-lg shadow-lg w-[350px]">
                    <h3 className="text-lg font-semibold">Product Updated!</h3>

                    <p className="mt-2">
                        <strong>{savedProduct.title}</strong> berhasil diperbarui.
                    </p>

                    {savedProduct.images?.[0] && (
                        <img
                            src={savedProduct.images[0]}
                            className="h-28 mt-3 mx-auto"
                        />
                    )}

                    <button
                        onClick={() => {
                            setModalConfirm(false);
                            onClose();
                        }}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}
