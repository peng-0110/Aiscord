'use client'
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import {auth,firestore} from "@/app/firebase/config";
import Button from "@/app/component/Buttons";
import {useRouter} from "next/navigation";
import {UserInterface} from "@/app/lib/interface";
import {setDoc, doc} from "@firebase/firestore";

export default function Home(){
    const [signInWithGoogle, cred, loading, error]= useSignInWithGoogle(auth);
    const router = useRouter();
    const signIn = async () => {
        const res = await signInWithGoogle();
        const {uid, displayName, photoURL, email} = res?.user!;
        const docData = {
            uid,
            displayName,
            photoURL,
            email
        } as UserInterface;
        await setDoc(doc(firestore, "users", uid), docData);
        if (res) {
            router.push("/");
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col w-80 p-12 rounded shadow-md bg-drawer items-center">
                <h2 className="mb-4 text-4xl font-bold text-center flex justify-center items-center">Aiscord</h2>
                <Button text="Login with Google" onClick={signIn} loading={loading} />
                {error && <p className="text-sm text-warning">Sign in failed, please try again</p>}
            </div>
        </div>
    );
}



