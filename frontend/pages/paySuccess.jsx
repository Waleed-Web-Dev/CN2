import React, {useState} from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useformStore} from "../store/formStore.js";
import { ToastContainer, toast } from 'react-toastify';

const paySuccess = () => {
    const [email, setEmail] = useState("");
    const [saved, setSaved] = useState(false);
    const {buyProduct} = useformStore();
    const handleSubmit = async () => {
        toast.info('Job Done, you may now close this tab!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        await buyProduct(email);
        setSaved(true);

    }

    return (
        <>
            <div className="flex justify-center items-center w-full h-screen bg-black rounded-lg">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Thanks For the Purchase!</CardTitle>
                        <CardDescription>
                            At last enter your email and our agent will reach out to you!
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full"
                        onClick = {handleSubmit}
                        >
                            Submit
                        </Button>
                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick={false}
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                            />
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default paySuccess;