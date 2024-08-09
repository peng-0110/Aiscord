'use client'
import Image from "next/image";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, firestore} from "@/app/firebase/config";
import Button from "@/app/component/Buttons";
import {useRouter} from "next/navigation";
import {signOut} from "firebase/auth";
import {useState} from "react";
import {addDoc, collection, serverTimestamp, query, orderBy} from "@firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {MessageInterface} from "@/app/lib/interface";
import MessageCard from "@/app/component/MessageCard";

export default function Home() {
    const [user, loading] = useAuthState(auth)
    const router = useRouter();
    const [text, setText] = useState("");
    const [messages] = useCollectionData(query(collection(firestore, "messages"), orderBy("timestamp", "desc")), {snapshotOptions: {serverTimestamps: "estimate"}});
    const sendMessage = async (event: React.FormEvent) => {
        event.preventDefault();
        setText("");
        const doc = {
            text,
            timestamp: serverTimestamp()
        } as MessageInterface;
        await addDoc(collection(firestore, "messages"), doc)
    }
    return (
        <section className="flex h-screen flex-col">
            <header className="border-tertiary border-b h-12 min-h-10 flex items-center justify-between px-5">
            <span className="flex">
                <img src={user?.photoURL!} alt={user?.displayName!} className="h-6 w-6 rounded-full mr-3 my-auto"/>
                <p> {user?.displayName}</p>
            </span>

                <Button text="Log out" style="px-4 py-1 m-4 w-max" onClick={() => {
                    router.push("/login")
                    signOut(auth)
                }}/>
            </header>
            <ol className="flex flex-col-reverse flex-grow overflow-y-auto">
                {messages?.map((data, index) => {
                    const {text, timestamp} = data as MessageInterface;
                    const {displayName, photoURL} = user!;
                    console.log(timestamp)
                    return (
                        <MessageCard key={index} text={text} displayName={displayName!} timestamp={timestamp!}
                                     photoURL={photoURL!} />
                    )
                })}
            </ol>
            <div>
                <form onSubmit={sendMessage} className="flex items-center w-full ">
                    <input
                        className="bg-primary w-full  p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                        value={text}
                        onChange={(e) => setText(e.target.value)}/>
                    <input type="submit"
                           value="send"
                           className="bg-primary w-1/4 py-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-600
                   border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"/>
                </form>
            </div>


        </section>
    );
}
