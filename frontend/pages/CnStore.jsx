import React, { useState } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"

const CnStore = () => {
    const [serviceList, setServiceList] = useState([
        { name: "Video Editing", sliderLevel: 0, checked: false, price: [500, 1000, 1500] },
        { name: "Scripting", sliderLevel: 0, checked: false, price: [300, 600, 900] },
        { name: "Social Media Management", sliderLevel: 0, checked: false, price: [400, 500, 600] },
        { name: "Employee Training", sliderLevel: 0, checked: false, price: [5000, 5500, 6000] },
        { name: "Custom Website", sliderLevel: 0, checked: false, price: [2000, 3000, 5000] },
        { name: "Business Automation", sliderLevel: 0, checked: false, price: [1000, 1500, 2000] },
        { name: "Digital Marketing", sliderLevel: 0, checked: false, price: [1500, 2500, 3500] }
    ])

    const handleSlider = (toChangeIndex, value) => {
        setServiceList(serviceList.map((service, index) => {
            if (index === toChangeIndex) {
                return { ...service, sliderLevel: value }
            }
            return service
        }))
    }

    const handleCheckbox = (toChangeIndex) => {
        setServiceList(serviceList.map((service, index) => {
            if (index === toChangeIndex) {
                return { ...service, checked: !service.checked }
            }
            return service
        }))
    }

    const total = serviceList.reduce((total, service) => {
        if (service.checked) return total + service.price[service.sliderLevel]
        return total
    }, 0)

    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md border border-white rounded-xl overflow-hidden">
                {serviceList.map((service, index) => (
                    <Card key={index} className="bg-[#1a1a1a] border-0 border-b border-white rounded-none">
                        <CardHeader className="flex flex-row items-start justify-between pb-1">
                            <div className="flex flex-col w-full">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-white text-base font-semibold">
                                        {service.name}
                                    </CardTitle>
                                    <input
                                        type="checkbox"
                                        checked={service.checked}
                                        onChange={() => handleCheckbox(index)}
                                        className="w-4 h-4 cursor-pointer"
                                    />
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="2"
                                    value={service.sliderLevel}
                                    onChange={e => handleSlider(index, Number(e.target.value))}
                                    className="w-1/2 mt-2 accent-white"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-white text-right font-bold">
                                €{service.price[service.sliderLevel]}
                            </p>
                        </CardContent>
                    </Card>
                ))}

                {/* Total Row */}
                <div className="bg-[#1a1a1a] flex justify-between items-center px-6 py-4 border-t border-white">
                    <p className="text-white font-bold text-base">Total:</p>
                    <p className="text-white font-bold text-base">€{total}</p>
                </div>

                {/* Invest Now Button */}
                <div className="bg-[#1a1a1a] flex justify-center pb-6">
                    <button className="border border-white text-white px-6 py-2 rounded hover:bg-white hover:text-black transition-colors">
                        Invest Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CnStore