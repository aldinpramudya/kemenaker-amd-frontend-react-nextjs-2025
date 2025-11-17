import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from '@/components/ui/card'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from 'next/image'


import { FiEdit, FiTrash2 } from "react-icons/fi"

interface CardProductProps {
    id: number
    title: string
    image: string[],
    badge: string[],
    description: string,
    price: number
    onEdit?: (id: number) => void,
    onDelete?: (id: number) => void,

}

export default function CardProduct(
    {
        id,
        title,
        image,
        badge,
        description,
        price,
        onEdit,
        onDelete,
    }: CardProductProps
) {
    const handleEdit = () => {
        if (onEdit && id) {
            onEdit(id);
        }
    };

    const handleDelete = () => {
        if (onDelete && id) {
            onDelete(id);
        }
    };
    return (

        <>
            <div className='relative max-w-md rounded-xl bg-linear-to-r from-neutral-600 to-violet-300 pt-0 shadow-lg'>
                <div className='flex h-60 items-center justify-center'>
                    <Image
                        src={image[0]}
                        alt='testing'
                        width={100}
                        height={100}
                    />
                </div>
                <Card className='border-none'>
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription className='flex items-center gap-2'>
                            {badge.map((tag, index) => (
                                <Badge key={index} variant='outline'>{tag}</Badge>
                            ))}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>
                            {description}
                        </p>
                    </CardContent>
                    <CardFooter className='justify-between gap-3 max-sm:flex-col max-sm:items-stretch'>
                        <div className='flex flex-col'>
                            <span className='text-sm font-medium uppercase'>Price</span>
                            <span className='text-xl font-semibold'>${price}</span>
                        </div>
                        {/* Action Buttons */}
                        <div className='flex gap-3 w-full'>
                            <Button 
                                variant="outline" 
                                className='flex-1 gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-colors'
                                onClick={handleEdit}
                            >
                                <FiEdit className="w-4 h-4" />
                                Edit
                            </Button>
                            <Button 
                                variant="outline" 
                                className='flex-1 gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition-colors'
                                onClick={handleDelete}
                            >
                                <FiTrash2 className="w-4 h-4" />
                                Delete
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}