import React, { Children, useEffect, useRef, useState } from "react";
import PageContainer from "../../components/PageContainer/PageContainer";
import { KanaModes, KanaModesKeys} from '../../types/kanas';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, IconButton, Tab, Tabs } from "@mui/material";
import { VolumeUp } from "@mui/icons-material";
import { toast } from "react-toastify";

export function getQuestion(modes:KanaModesKeys[]):{question:string, answers:string[],audio:string}{
    // Get a random key from KanaModes
    const randomKey = modes[Math.floor(Math.random() * modes.length)];

    // Get the question from KanaModes
    const category = KanaModes[randomKey] as Record<string,{answers:string[],audio:string}>;

    const randomIndex = Object.keys(category)[Math.floor(Math.random() * Object.keys(category).length)]

    const randomQuestion = category[randomIndex];

    return {
        question: randomIndex,
        answers: randomQuestion.answers,
        audio: randomQuestion.audio
    };
}

const kanaCats = {
    "hiragana":[
        {key:"hirabasic",name:"Hiragana"},
        {key:"hiradakuten", name:"Hiragana con dakuten"},
        {key:"hirayoon", name:"Hiragana Yoon"},
        {key:"hiradakutenYoon", name:"Hiragana con dakuten Yoon"},
    ],
    "katakana":[
        {key:"katabasic",name:"Katakana"},
        {key:"katadakuten", name:"Katakana con dakuten"},
        {key:"katayoon", name:"Katakana Yoon"},
        {key:"katadakutenYoon", name:"Katakana con dakuten Yoon"},
    ]
} as Record<string,{key:string,name:string}[]>;

export default function Kanas():React.ReactElement{
    const [question,setQuestion] = useState<{question:string, answers:string[],audio:string}|undefined>(undefined);
    const [answer, setAnswer] = useState<string>("");
    const [kanaModes, setKanaModes] = useState<KanaModesKeys[]>(["hirabasic-a"]);
    const [showOptions, setShowOptions] = useState<"hiragana"|"katakana">("hiragana");

    const [openModes,setOpenModes]=useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        if(!question){
            const randomQuestion = getQuestion(kanaModes);

            setQuestion(randomQuestion);
            setAnswer("")

            if(inputRef.current){
                inputRef.current.focus();
            }
        }
    },[question,kanaModes]);

    useEffect(()=>{
        if(!question || answer==="")return;

        if(question.answers.includes(answer)){
            const url = "/sounds/"+question.audio+".mp3";

            const audio = new Audio(url);

            audio.currentTime = 0.4;

            audio.play();

            // Wait for a second before changing the question
            setTimeout(()=>{
                const randomQuestion = getQuestion(kanaModes);

                setQuestion(randomQuestion);
                setAnswer("")
            },100)
        }
    },[answer,question,kanaModes])

    function selectAll(mode:"hira"|"kana"|"all"){
        if(mode==="all"){
            setKanaModes(Object.keys(KanaModes) as KanaModesKeys[]);
            return;
        }

        // Search for all hiragana modes
        const hiraganaModes = Object.keys(KanaModes).filter((key)=>{
            return key.includes(mode);
        }) as KanaModesKeys[];

        setKanaModes(hiraganaModes);
    }

    return(
        <PageContainer>
            <h1>Kanas</h1>
            <div className="my-4 flex justify-center flex-col items-center gap-4">
                <div className="bg-white w-3/4 p-4 rounded-lg text-center relative shadow-lg">
                    <IconButton className="absolute top-2 right-2" onClick={()=>{
                        if(!question)return;

                        const url = "/sounds/"+question.audio+".mp3";

                        const audio = new Audio(url);

                        audio.play()
                    }}>
                        <VolumeUp/>
                    </IconButton>
                    <p className="text-6xl">{question?.question||"〇"}</p>
                </div>
                {!!question && answer.length>=question.answers[0].length&&!question.answers.includes(answer)&&(
                    <p className="text-red-600 font-semibold text-xl">{question.question} = {question.answers.join("/")}</p>
                )}

                <input className="w-3/4 py-2 border-4 border-blue-600 border-solid rounded-full text-center capitalize" ref={inputRef} type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
            </div>
            
            <Accordion expanded={openModes} onChange={(ev,ex)=>{setOpenModes(ex)}} sx={{
                "&.Mui-expanded":{
                    margin:0
                }
            }}>
                <AccordionSummary>
                    Selector de Modos
                </AccordionSummary>
                <AccordionDetails>
                <div className="">
                        <button onClick={()=>selectAll("all")}>Seleccionar todo</button>
                    </div>
                    <div className="flex flex-col gap-2">
                    <Tabs value={showOptions} onChange={(e,v)=>setShowOptions(v)}>
                        <Tab label="Hiragana" value="hiragana"/>
                        <Tab label="Katakana" value="katakana"/>
                    </Tabs>
                    <div className="">
                        <button onClick={()=>selectAll(showOptions.substring(0,3) as "hira"|"kana")}>Seleccionar todo el {showOptions}</button>
                    </div>
                    {showOptions==="hiragana" ? Children.toArray(kanaCats["hiragana"].map((cat)=>(
                        <div className="flex flex-col">
                            <h2 className="font-semibold">{cat.name}</h2>
                            <div className="flex">
                            {Children.toArray(Object.keys(KanaModes).filter((key)=>{
                                const subKey = key.split("-")

                                if(subKey.length>1){
                                    return subKey[0]===cat.key;
                                }

                                return false;
                            }).map((key)=>{
                                const mode = KanaModes[key as KanaModesKeys] as Record<string, {answers:string[],audio:string}>;

                                return(
                                    <div className="flex flex-col items-center border border-gray-400 border-solid">
                                        <Checkbox checked={kanaModes.includes(key as KanaModesKeys)} onChange={(e)=>{
                                            if(e.target.checked){
                                                setKanaModes([...kanaModes,key as KanaModesKeys]);
                                                setQuestion(undefined);
                                            }else{
                                                if(kanaModes.length===1){
                                                    toast.error("Debes tener al menos un modo seleccionado");
                                                    return;
                                                }

                                                setKanaModes(kanaModes.filter((k)=>k!==key));
                                                setQuestion(undefined);
                                            }
                                        }}/>
                                        <ul>
                                            {Children.toArray(Object.keys(mode).map((k)=>{
                                                return(
                                                    <li>{k}</li>
                                                )
                                            }))}
                                        </ul>
                                    </div>
                                )
                            }))}
                        </div>
                    </div>
                    ))) : 
                    Children.toArray(kanaCats["katakana"].map((cat)=>(
                        <div className="flex flex-col">
                            <h2 className="font-semibold">{cat.name}</h2>
                            <div className="flex">
                            {Children.toArray(Object.keys(KanaModes).filter((key)=>{
                                const subKey = key.split("-")

                                if(subKey.length>1){
                                    return subKey[0]===cat.key;
                                }

                                return false;
                            }).map((key)=>{
                                const mode = KanaModes[key as KanaModesKeys] as Record<string, {answers:string[],audio:string}>;

                                return(
                                    <div className="flex flex-col items-center border border-gray-400 border-solid">
                                        <Checkbox checked={kanaModes.includes(key as KanaModesKeys)} onChange={(e)=>{
                                            if(e.target.checked){
                                                setKanaModes([...kanaModes,key as KanaModesKeys]);
                                                setQuestion(undefined);
                                            }else{
                                                if(kanaModes.length===1){
                                                    toast.error("Debes tener al menos un modo seleccionado");
                                                    return;
                                                }

                                                setKanaModes(kanaModes.filter((k)=>k!==key));
                                                setQuestion(undefined);
                                            }
                                        }}/>
                                        <ul>
                                            {Children.toArray(Object.keys(mode).map((k)=>{
                                                return(
                                                    <li>{k}</li>
                                                )
                                            }))}
                                        </ul>
                                    </div>
                                )
                            }))}
                        </div>
                    </div>
                    )))}
                    </div>
                </AccordionDetails>
            </Accordion>

        </PageContainer>    
    )
}