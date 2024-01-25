import Link from "next/link";

export default function () {
    return (
        <nav
            className="rounded-lg shadow bg-[#e0e0e0] max-w-6xl mx-auto p-3 pl-8 pr-8 flex items-center w-full justify-between"       
            style={{
                boxShadow:
                    "inset 20px 20px 60px #bebebe, inset -20px -20px 60px #ffffff",
                background: "linear-gradient(6deg, purple 10%, blue 50%, red 50%, purple 10%)",
            }}
        >
            <Link
                href="/"
            >
                <div className="text-black font-bold text-2xl bg-white p-3 shadow rounded-xl">  
                    Home
                </div>
            </Link>
            <Link
                href="/profile"
            >
                <div className="text-black font-bold text-2xl bg-white p-3 shadow rounded-xl">
                    Profile
                </div>
            </Link>
        </nav>
    );
}