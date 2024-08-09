'use client'
import { Inter } from "next/font/google";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/app/firebase/config";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import SideBar from "@/app/component/SideBar";


const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const [user, loading] = useAuthState(auth)
    const router = useRouter();

    useEffect(() => {
        if (!user && !loading) {
            router.push("/login");
        }
    }, [loading, user])

    return (!loading && user) && <main className="flex">
        <SideBar/>
        {children}
    </main>;

}