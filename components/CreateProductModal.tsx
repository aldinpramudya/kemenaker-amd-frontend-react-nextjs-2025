"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface CreateProductModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ProductResponse {
    title: string;
    tags: string[];
    description: string;
    price: number;
    images: string[];
}

export default function CreateProductModal({
    isOpen,
    onClose,
}: CreateProductModalProps) {
    // Semua hooks harus dideklarasikan di sini (tidak di dalam kondisi)
    const [title, setTitle] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [savedProduct, setSavedProduct] = useState<ProductResponse | null>(null);

    // onDrop didefinisikan dengan useCallback agar referensi stabil (opsional)
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result as string);
        reader.readAsDataURL(file);
    }, []);

    // PENTING: useDropzone harus dipanggil setiap render (tidak di dalam kondisi)
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    // Jika modal closed, kita tetap memanggil hooks tapi jangan render UI modal
    if (!isOpen) return null;

    // TAG HANDLER
    const handleAddTag = () => {
        if (!tagInput.trim()) return;
        setTags((prev) => [...prev, tagInput.trim()]);
        setTagInput("");
    };

    const removeTag = (idx: number) => {
        setTags((prev) => prev.filter((_, i) => i !== idx));
    };

    // SUBMIT
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) return alert("Image belum di-upload.");

        const payload = {
            title,
            tags,
            description,
            price: Number(price),
            images: [image],
        };

        const res = await fetch("https://dummyjson.com/products/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = (await res.json()) as ProductResponse;
        setSavedProduct(data);
    };

    const closeModal = () => {
        setSavedProduct(null);
        setTitle("");
        setTags([]);
        setTagInput("");
        setDescription("");
        setPrice("");
        setImage(null);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-xl relative">
                <h2 className="text-xl font-semibold mb-4">Create Product</h2>

                {!savedProduct && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            className="border p-2 w-full"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        {/* TAGS */}
                        <div>
                            <div className="flex gap-2">
                                <input
                                    className="border p-2 w-full"
                                    placeholder="Add Tag"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    className="px-4 py-2 bg-green-600 text-white rounded"
                                >
                                    Add
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(idx)}
                                            className="text-red-500 font-bold"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <textarea
                            className="border p-2 w-full"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <input
                            className="border p-2 w-full"
                            placeholder="Price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        {/* DROPZONE */}
                        <div
                            {...getRootProps()}
                            className="p-6 border-2 border-dashed text-center cursor-pointer"
                        >
                            <input {...getInputProps()} />
                            {image ? (
                                <img src={image} alt="preview" className="h-32 mx-auto" />
                            ) : (
                                <p>Drop file image here</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-400 text-white rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Save Product
                            </button>
                        </div>
                    </form>
                )}

                {savedProduct && (
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-2">Product Saved!</h3>

                        <p><strong>Title:</strong> ${savedProduct.title}</p>
                        {Array.isArray(savedProduct.tags) && (
                            <p><strong>Tags:</strong> ${savedProduct.tags.join(", ")}</p>
                        )}
                        <p><strong>Price:</strong> ${savedProduct.price}</p>

                        {savedProduct.images?.length > 0 && (
                            <img
                                src={savedProduct.images[0]}
                                alt="saved"
                                className="mt-3 h-40 mx-auto"
                            />
                        )}

                        <button
                            onClick={closeModal}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
