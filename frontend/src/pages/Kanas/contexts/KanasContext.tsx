import React,{ createContext, useContext, useEffect, useState } from "react";

type KanasContextType = {
    timeLeft:number;
    setTimeLeft:(time:number)=>void;
    studyMode:boolean;
    setStudyMode:(mode:boolean)=>void;
    answers:Record<string,{correct:number,incorrect:number}>;
    addToAnswers:(key:string,correct:boolean)=>void;
}

const KanasContext = createContext<KanasContextType | undefined>(undefined);

export const useKanas = ():KanasContextType => {
    const context = useContext(KanasContext);
    if (!context) {
        throw new Error("useKanas must be used within a KanasProvider");
    }
    return context;
}

interface KanasProviderProps {
    children:React.ReactNode
}

export function KanasProvider({children}:KanasProviderProps):React.ReactElement {
    const [timeLeft, setTimeLeft] = useState(10*60);
    const [studyMode, setStudyMode] = useState(false);
    const [answers,setAnswers] = useState<Record<string,{correct:number,incorrect:number}>>({});

    useEffect(()=>{
        if(studyMode){
            const interval = setInterval(()=>{
                if(timeLeft === 0){
                    clearInterval(interval)
                    return
                }

                setTimeLeft((prev)=>prev-1)
            },1000)
            return ()=>clearInterval(interval)
        }
    },[studyMode,timeLeft])

    function addToAnswers(key:string,correct:boolean):void {
        if(answers[key]){
            if(correct){
                setAnswers((prev)=>({...prev,[key]:{correct:prev[key].correct+1,incorrect:prev[key].incorrect}}))
            }else{
                setAnswers((prev)=>({...prev,[key]:{correct:prev[key].correct,incorrect:prev[key].incorrect+1}}))
            }
        }else{
            if(correct){
                setAnswers((prev)=>({...prev,[key]:{correct:1,incorrect:0}}))
            }else{
                setAnswers((prev)=>({...prev,[key]:{correct:0,incorrect:1}}))
            }
        }
    }

    return (
        <KanasContext.Provider value={{timeLeft, setTimeLeft,studyMode,setStudyMode,answers,addToAnswers}}>
            {children}
        </KanasContext.Provider>
    )
}