import React from "react"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button.jsx";
import {useformStore} from "../store/formStore.js";
import { PolarEmbedCheckout } from '@polar-sh/checkout/embed'
import { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom";


const CnStore = () => {
    const {buyProduct} = useformStore();
    const [checkoutInstance, setCheckoutInstance] = useState(null)
    const navigate = useNavigate();
    // Clean up checkout instance on unmount
    useEffect(() => {
        return () => {
            if (checkoutInstance) {
                checkoutInstance.close()
            }
        }
    }, [checkoutInstance])
    const handleBasicBuy = async () => {
        try {
            const checkout = await PolarEmbedCheckout.create(
                'https://buy.polar.sh/polar_cl_Cvy3k49cntQ6odoNlmuwPXTZLCcsyDHY0E8WO0Zimds',
                'dark'
            )

            setCheckoutInstance(checkout)

            checkout.addEventListener('success', (event) => {
                // Track successful purchase
                analytics.track('Purchase Completed', {
                    productId: 'd5ceab94-c575-47cf-9214-c037fa5aac85',
                    // Add other analytics data
                })

                // Show success message or redirect
                if (!event.detail.redirect) {
                    navigate("/pay-success")
                }
            })

            checkout.addEventListener('close', (event) => {
                // Clean up our reference when checkout is closed
                setCheckoutInstance(null)
            })
        } catch (error) {
            console.error('Failed to open checkout', error)
        }
    }
    const handleExtremeBuy = async () => {
        try {
            const checkout = await PolarEmbedCheckout.create(
                'https://buy.polar.sh/polar_cl_f64NJy3dphruT46UygoHM5wRBUzZg4UKybomW4IU6y8',
                'dark'
            )

            setCheckoutInstance(checkout)

            checkout.addEventListener('success', (event) => {
                // Track successful purchase
                analytics.track('Purchase Completed', {
                    productId: '5d351759-1659-4026-89b2-6c2f4b76457d',
                    // Add other analytics data
                })

                // Show success message or redirect
                if (!event.detail.redirect) {
                    navigate("/pay-success")
                }
            })

            checkout.addEventListener('close', (event) => {
                // Clean up our reference when checkout is closed
                setCheckoutInstance(null)
            })
        } catch (error) {
            console.error('Failed to open checkout', error)
        }
    }
    return (
        <>
            <div className="bg-black flex justify-center items-center w-full h-screen gap-5">
                <Card className="bg-white w-3/12 text-center">
                    <CardHeader className="border-gray-300">
                    <CardTitle className="text-xl font-semibold text-black font-sans font-bold">Silver </CardTitle>
                    <CardDescription className="text-sm font-semibold text-gray-500 font-sans font-bold"> €3300/month </CardDescription>
                    </CardHeader>
                    <CardContent className="border-t border-gray-300">
                        <p className="text-xl font-bold">Personalized Content </p>
                        <p className="text-sm font-bold">Editing</p>
                        <p className="text-sm font-bold">Scripts </p>


                    </CardContent>
                    <CardFooter className="border-t border-gray-300 flex justify-center items-center">
                        <CardAction>
                            <Button className="text-xl font-semibold text-black font-sans font-bold" variant="outline"
                            onClick = {handleBasicBuy}
                            >Buy Now</Button>
                        </CardAction>
                    </CardFooter>

                </Card>
                <Card className="bg-white w-3/12 text-center border-red-500 border-4">
                    <CardHeader className="border-gray-300">
                        <CardTitle className="text-xl font-semibold text-black font-sans font-bold">Gold</CardTitle>
                        <CardDescription className="text-sm font-semibold text-gray-500 font-sans font-bold"> €6600 </CardDescription>
                    </CardHeader>
                    <CardContent className="border-t border-gray-300">
                        <p className="text-xl font-bold">Silver + Lead Generation</p>
                        <p className="text-xl font-bold">Sales Management</p>
                        <p className="text-sm font-bold">Automated Follow Ups</p>
                        <p className="text-sm font-bold">Paid Ads</p>
                        <p className="text-sm font-bold">Ai Chat Bot</p>

                    </CardContent>
                    <CardFooter className="border-t border-gray-300 flex justify-center items-center">
                        <CardAction>
                            <Button className="text-xl font-semibold text-black font-sans font-bold" variant="outline"
                                onClick = {handleExtremeBuy}
                            >Buy Now</Button>
                        </CardAction>
                    </CardFooter>

                </Card>
            </div>
        </>
    )
}

export default CnStore;