import {React, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {Button} from "@/components/ui/button.jsx";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle
} from "@/components/ui/card.jsx";
import {Progress} from "@/components/ui/progress.jsx";
import {Input} from "@/components/ui/input.jsx";
import {useformStore} from "../../store/formStore.js";
import {useNavigate} from "react-router-dom";

const questions = [
    {
      id: 0,
      question: "Your Basic Details",
      options: []
    },
    {
        id: 1,
        question: "What best describes your business?",
        options: ["Realtor", "Real Estate Agency", "Property Developer", "Other"],
    },

    {
        id: 2,
        question: "What’s your biggest challenge with marketing right now?",
        options: ["Not getting enough leads", "Leads aren’t high quality", "No consistent content", "No brand presence"],
    },
    {
        id: 3,
        question: "Are you currently posting content?",
        options: ["Yes, consistently", "Yes, but inconsistent", "No consistent content", "Not at all"],
    },
    {
        id: 4,
        question: "Would you prioritize running ads if organic strategies are already working?",
        options: ["Yes, For Sure","Not at all"],
    },
    {
        id: 5,
        question: "How fast are you looking to grow?",
        options: ["1 Month","3 Months","6+ Months"],
    },
    {
        id: 6,
        question: "What's your main focus",
        options: ["Long Term Brand","Short Term Sales"],
    },
    {
        id: 7,
        question: "What is your budget per Month?",
        options: ["€3300+", "€6600+", "other"],
    },


];




const variants = {
    initial: (direction) => ({
        x: direction > 0 ? 80 : -80,
        opacity: 0,
    }),
    animate: {
        x : 0,
        opacity: 1,
    },
    exit: (direction) => ({
        x: direction > 0 ? -80:80,
        opacity: 0
    }),
};


const MultiStepForm = () => {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [answer, setAnswer] = useState({});
    const {fillForm} = useformStore();
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        phone: ""
    })
    const [bizType, setBizType] = useState("")
    const [customBudget, setCustomBudget] = useState("")

    const progress = ((step + 1) / (questions.length))  * 100;
    const navigate = useNavigate();

    const saveAnswer = (questionId, value) => {
        setAnswer((prev) => ({
            ...prev,
            [questionId]: value
        }))
    }

    const handleSelect = (option) => {
        const qId = questions[step].id

       saveAnswer(qId, option);

        if(step < questions.length - 1){
            setDirection(1);
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        setDirection(-1);
        setStep(step - 1);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(step < 7) return
        let formData = {
            name: userInfo.name,
            email: userInfo.email,
            phone: userInfo.phone,
            Q1: answer[1],
            Q2: answer[2],
            Q3: answer[3],
            Q4: answer[4],
            Q5: answer[5],
            Q6: answer[6],
            Q7: answer[7]
        }

        console.log("Sending Data to backend", formData)
        navigate("/score");
        await fillForm(formData);
    }

    return(
        <>
            <div className="flex items-center justify-center h-160">
            <form onSubmit={handleSubmit} className="max-w-xl w-full">


                <Card className="overflow-hidden h-6/12 mx-auto rounded-lg">
                    <CardHeader className="text-center">
                        <Progress value={progress} />
                        <p className="text-xs text-muted-foreground">
                            Question {step} of {questions.length}
                        </p>
                    </CardHeader>

                    <CardContent className="relative min-h-100 flex items-center justify-center gap-6">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                            key = {step }
                            custom= {direction}
                            variants={variants}
                            initial="initial"
                            animate= "animate"
                            exit="exit"
                            transition={{duration: 0.3, ease: "easeInOut"}}
                            className="absolute w-[95%]">

                              <CardTitle className="mb-6">
                                  {questions[step ].question}
                              </CardTitle>
                              {
                                   step === 1 && (
                                       <div className="space-y-10">
                                           <Input
                                           placeholder = "Be as detailed as possible!"
                                           value = {bizType}
                                           onChange = { e => setBizType(e.target.value)}
                                           />

                                           <Button
                                           type = "button"
                                           className= "w-full"
                                           onClick = {() => {
                                               if(!bizType) return;

                                               saveAnswer(questions[step ].id, bizType);

                                               setDirection(1);
                                               setStep(step + 1);

                                           }}
                                           >
                                               Continue
                                           </Button>

                                       </div>
                                  )
                              }

                                {
                                    step === 0 && (
                                        <div className="space-y-10">
                                            <Input
                                                placeholder = "Full Name"
                                                value = {userInfo.name}
                                                onChange = { e => setUserInfo({
                                                    ...userInfo,
                                                    name: e.target.value,
                                                })}
                                            />

                                            <Input
                                                placeholder = "Email Address"
                                                value = {userInfo.email}
                                                onChange = {e => {
                                                    setUserInfo({
                                                        ...userInfo,
                                                        email: e.target.value
                                                    })
                                                }}
                                            />

                                            <Input
                                                placeholder = "Enter your Phone Number"
                                                value = {userInfo.phone}
                                                onChange = { e => {
                                                    setUserInfo({
                                                        ...userInfo,
                                                        phone: e.target.value
                                                    })
                                                }}
                                            />

                                            <Button
                                                type = "button"
                                                className= "w-full"
                                                onClick = {() => {
                                                    if(!userInfo.name || !userInfo.email) return;
                                                    setDirection(1);
                                                    setStep(1);
                                                }}
                                            >
                                                Continue
                                            </Button>

                                        </div>
                                    )
                                }

                              <div className="space-y-8">
                                  { step !== 1 && (
                                      questions[step].options.map((option) => {
                                          const selected = answer[questions[step].id] === option;

                                          return (
                                              <Button
                                              key = {option}
                                              type = "button"
                                              variant = {selected ? "default" : "outline"}
                                              className= "w-full justify-start"
                                              onClick = {() => {
                                                  if(option === "other"){
                                                      setAnswer((prev) => ({
                                                      ...prev,
                                                      [questions[step].id] : "other"
                                              }))
                                              }else{
                                                  handleSelect(option)
                                              }
                                              }}
                                              >
                                                  {option}
                                              </Button>


                                          );
                                      }))
                                  }


                                  {
                                      (step === 7 && (answer[7] === "other")) && (
                                          <div className="space-y-3">
                                              <Input
                                              type="number"
                                              placeholder = "Enter your monthly budget"
                                              value = {customBudget}
                                              onChange = { e => setCustomBudget(e.target.value)}
                                              />

                                          </div>
                                      )
                                  }
                              </div>

                            </motion.div>
                        </AnimatePresence>
                    </CardContent>
                </Card>

                <div className="flex justify-between mt-4">
                    { step > 0 && (
                        <Button
                        type = "button"
                        variant = "ghost"
                        onClick = {handleBack}
                        >
                            Back
                        </Button>
                    )}

                    {
                        step === questions.length - 1 && (
                            <Button type = "submit" className="ml-auto"
                            onClick={ () => {

                                if (!customBudget) return;
                                saveAnswer(7, String(customBudget));
                            }}
                            >
                                Submit
                            </Button>
                        )
                    }
                </div>


            </form>
            </div>
        </>
    )
}

export default MultiStepForm;

