import {resend} from "./config.js"
import {strategyEmail, clientEmail, buyEmail} from "./email-template.js";
import {marked} from "marked"

export const emailToClient = async (email, name,text) => {
            const content = marked.parse(text);
            try {
                const {data, error} = await resend.emails.send({
                    from: "Waleed <waleed@morefamilies.online>",
                    to: [email],
                    subject: "Personalized Strategy By CN Media",
                    html: strategyEmail.replace("{name}", name).replace("{bodyEmail}", content),
                })
            } catch (error) {
                console.log(error);
                throw error;
            }
}

export const emailToAgency = async (userInfo, recommendation) => {
    const strategy = marked.parse(recommendation);
    const htmlContent = clientEmail
                              .replace("{name}", userInfo.name)
                              .replace("{email}", userInfo.email)
                              .replace("{phone}", userInfo.phone)
                              .replace("{Q1}", userInfo.Q1)
                              .replace("{Q2}", userInfo.Q2)
                              .replace("{Q3}", userInfo.Q3)
                              .replace("{Q4}", userInfo.Q4)
                              .replace("{Q5}", userInfo.Q5)
                              .replace("{Q6}", userInfo.Q6)
                              .replace("{Q7}", userInfo.Q7)
                              .replace("{Recommendation}", strategy)

    try{
        const {data, error} = await resend.emails.send({
            from: "Waleed <waleed@morefamilies.online>",
            to: "contentbynawab@gmail.com",
            subject: `New Form Filled in by ${userInfo.name}`,
            html: htmlContent
        })
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const buyProductClient = async (email) => {
    try{
        const {data, error} = await resend.emails.send({
            from: "Waleed <waleed@morefamilies.online>",
            to: [email],
            subject: "Thank You For your Purchase",
            html: buyEmail
        })
    }catch (e) {
        console.log(e)
        throw e;
    }
}

export const buyProductAgency = async (email) => {
    try{
        const {data, error} = await resend.emails.send({
            from: "Waleed <waleed@morefamilies.online>",
            to: "contentbynawab@gmail.com",
            subject: `Purchased By ${email}`,
            html: `New client purchased by ${email}`,
        })
    }catch (e) {
        console.log(e)
        throw e;
    }
}