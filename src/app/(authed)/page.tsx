'use client'
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, firestore} from "@/app/firebase/config";
import Button from "@/app/component/Buttons";
import {useState, FormEvent} from "react";
import {arrayUnion, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where} from "@firebase/firestore";
import {RequestInterface, UserInterface} from "@/app/lib/interface";
import {useCollectionData} from "react-firebase-hooks/firestore";


export default function Home() {
    const [user] = useAuthState(auth)
    const [email, setEmail] = useState("");
    const [incomingRequests] = useCollectionData(query(collection(firestore, "requests"), where("receiverID", "==", user?.uid!)));
    const [outgoingRequests] = useCollectionData(query(collection(firestore, "requests"), where("senderID", "==", user?.uid!)));

    const sendRequest = async(e: FormEvent) => {
        e.preventDefault();
        const userQuery = query(collection(firestore, "users"), where("email", "==", email));
        const data = await getDocs(userQuery);
        if (!data.size){
            console.log("this email does not exist")
            //todo
            return
        }
        const {uid: receiverID, displayName: receiverDisplayName} = data.docs[0].data() as UserInterface
        const {uid: senderID, displayName: senderDisplayName} = user!;
        const docData = {
            senderID,
            senderDisplayName,
            receiverID,
            receiverDisplayName,
        } as RequestInterface;

        await setDoc(doc(firestore, "requests", '${senderID)-${receiverID}'), docData);
    }

    const acceptRequest = async(senderID: string, receiverID:string) => {
        await deleteDoc(doc(firestore, "requests", '${senderID)-${receiverID}'))
        await updateDoc(doc(firestore, "users", senderID), {friends: arrayUnion(receiverID)});
        await updateDoc(doc(firestore, "users", receiverID), {friends: arrayUnion(senderID)});
    }
    return (
        <section className="flex h-screen flex-col">
            <form onSubmit={(e) => sendRequest(e)}>
                <input className="bg-secondary" type="email" value = {email} onChange={(e) => setEmail(e.target.value)} />
                <Button text="Send Request"/>
            </form>
            <h3>Incoming Invites</h3>
            {incomingRequests?.map((data) => {
                const {senderDisplayName, senderID, receiverID} = data as RequestInterface;
                return (
                    <div key={senderID} className="flex">
                        <p> {senderDisplayName} Requests you as a friend</p>
                        <button className="p-2 bg-blurple" onClick={() => acceptRequest(senderID, receiverID)}>add friend</button>
                    </div>
                )
            })}
            <h3>Outgoing Invites</h3>
            {outgoingRequests?.map((data) => {
                const {receiverDisplayName, receiverID} = data as RequestInterface;
                return (
                        <p  key={receiverID}> Request to {receiverDisplayName} sent</p>
                )
            })}
        </section>
    );
}