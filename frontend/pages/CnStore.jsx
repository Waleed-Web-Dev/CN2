import React, { useState } from "react"

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
        setServiceList(serviceList.map((service, index) =>
            index === toChangeIndex ? { ...service, sliderLevel: value } : service
        ))
    }

    const handleCheckbox = (toChangeIndex) => {
        setServiceList(serviceList.map((service, index) =>
            index === toChangeIndex ? { ...service, checked: !service.checked } : service
        ))
    }

    const total = serviceList.reduce((total, service) => {
        if (service.checked) return total + service.price[service.sliderLevel]
        return total
    }, 0)

    return (
        <div className="bg-black h-screen p-4 overflow-y-auto">
            <div className="w-full max-w-md mx-auto border border-white rounded-xl ">
                {serviceList.map((service, index) => (
                    <div key={index} className="border-b border-white p-4">
                        <div className="flex justify-between items-center">
                            <p className="text-white font-semibold text-sm">{service.name}</p>
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
                        <p className="text-white text-right font-bold text-sm">
                            €{service.price[service.sliderLevel]}
                        </p>
                    </div>
                ))}

                <div className="flex justify-between items-center px-4 py-3 border-t border-white">
                    <p className="text-white font-bold">Total:</p>
                    <p className="text-white font-bold">€{total}</p>
                </div>

                <div className="flex justify-center py-4">
                    <button className="border border-white text-white px-6 py-2 rounded text-sm hover:bg-white hover:text-black transition-colors">
                        Invest Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CnStore