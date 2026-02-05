import React from "react"
import { InlineWidget } from "react-calendly";

const BookMeeting = () => {
    return (
        <>
            <div className="App flex flex-col align-center justify-center bg-black w-full h-screen overflow-hidden ">
                <InlineWidget url="https://calendly.com/contentbynawab/30min"
                styles={{
                    height: "100%",
                    width: "100%",
                }}
                />
            </div>
        </>
    )
}

export default BookMeeting;