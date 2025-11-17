"use client";
import { FormEvent, useState } from "react";

interface CreateProductModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateProductModal({ isOpen, onClose }: CreateProductModalProps) {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | string>("");
    const [image, setImage] = useState<File | null>(null);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    if (!isOpen) return null;

    const handleAddTag = () => {
        if (tagInput.trim() !== "") {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleSubmit = async (e : FormEvent) => {
         e.preventDefault();
        const res = await fetch("https://dummyjson.com/products", {
            method : "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title : title,
                tags : tags,
                description : description,
                price : price,
                image :image?.name || "No file uploaded"
            })
        })
        .then(res => res.json())
        const data = {
            title,
            tags,
            description,
            price,
            image: image?.name || "No file uploaded",
        };

        setSubmittedData(data);
        setShowConfirmation(true);

        // reset form
        setTitle("");
        setTags([]);
        setDescription("");
        setPrice("");
        setImage(null);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center">
            {/* Main Modal */}
            {!showConfirmation && (
                <div className="bg-white p-6 rounded-lg w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Create Product</h2>

                    <form onSubmit={handleSubmit}>
                        <label className="block mb-2">Product Name</label>
                        <input
                            type="text"
                            className="w-full border p-2 mb-4"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <label className="block mb-2">Tags (Array)</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                className="border p-2 flex-1"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                            />
                            <button type="button" onClick={handleAddTag} className="px-4 bg-black text-white">
                                Add
                            </button>
                        </div>

                        <div className="flex gap-2 mb-4 flex-wrap">
                            {tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <label className="block mb-2">Description</label>
                        <textarea
                            className="w-full border p-2 mb-4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <label className="block mb-2">Price</label>
                        <input
                            type="number"
                            className="w-full border p-2 mb-4"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <label className="block mb-2">Upload Image</label>
                        <input
                            type="file"
                            className="w-full border p-2 mb-4"
                            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                        />

                        <div className="flex justify-end gap-3 mt-4">
                            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300">
                                Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="bg-white p-6 rounded-lg w-full max-w-md text-center">
                    <h2 className="text-xl font-semibold mb-4">Product Created Successfully!</h2>

                    <pre className="bg-gray-100 p-3 text-left rounded mb-4 overflow-auto text-sm">
                        {JSON.stringify(submittedData, null, 2)}
                    </pre>

                    <button
                        className="px-4 py-2 bg-black text-white"
                        onClick={() => {
                            setShowConfirmation(false);
                            onClose();
                        }}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}
