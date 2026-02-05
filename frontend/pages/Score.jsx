import React from "react"
import {useformStore} from "../store/formStore.js";
import {
    Item,
    ItemContent,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {useNavigate} from "react-router-dom";

const Score = () => {
        const {score, loading} = useformStore();
        const navigate = useNavigate();
        const handleClick = () => {
            navigate("/Book-Meeting")
        }

        const handleBuy = () => {
            navigate("/CN-Store")
        }

        return (
            <>
            <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black">
                {loading && ( <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
                    <Item variant="muted">
                        <ItemMedia>
                            <Spinner />
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle className="line-clamp-1">Calculating Score</ItemTitle>
                        </ItemContent>
                    </Item>
                </div>)
                }
                { ( !loading && score !== null &&
                    <Card className="w-full max-w-sm text-center">
                        <CardHeader className="font-bold font-sans">Your Score</CardHeader>
                        <CardContent className="text-shadow-amber-50 font-bold">{score}</CardContent>
                        <CardFooter className="text-center">
                            <Button type="submit" className="w-full" onClick = {handleClick}>Book Meeting Now!</Button>
                        </CardFooter>
                        <CardFooter className="text-center">
                            <Button type="submit" className="w-full" onClick = {handleBuy}>Buy Now!</Button>
                        </CardFooter>
                    </Card>
                )}
            </div>
            </>
        )
}

export default Score;