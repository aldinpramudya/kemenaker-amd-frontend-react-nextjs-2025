import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from '@/components/ui/card'
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'

interface CardProductProps {
    image: string[],
    badge: string[],
    description : string,
    price : number

}

export default function CardProduct(
    {
        image,
        badge,
        description,
        price,

    }: CardProductProps
) {
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
                        <CardTitle>Nike Jordan Air Rev</CardTitle>
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
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}