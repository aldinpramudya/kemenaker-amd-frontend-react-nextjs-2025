import Image from "next/image"

interface NavbarProps {
    onClick?: () => void;
}


export default function Navbar({
    onClick
}: NavbarProps) {
    return (
        <nav className="sticky top-0 left-0 md:w-full z-50 backdrop-blur-lg">
            <div className="flex px-50 py-10">
                <div className="flex items-center gap-4">
                    <Image
                        src="/favicon.png"
                        alt="logo"
                        width={50}
                        height={50}
                    />
                    <button onClick={onClick} className="text-black font-bold hover:text-red-600">Logout</button>
                </div>
            </div>
        </nav>


    )
}

