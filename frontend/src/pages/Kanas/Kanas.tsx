import React, { ChangeEvent, Children, Fragment, useEffect, useRef, useState } from "react";
import PageContainer from "../../components/PageContainer/PageContainer";
import { KanaModes, KanaModesKeys} from '../../types/kanas';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Divider, IconButton, Tab, Tabs } from "@mui/material";
import { VolumeUp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {ReactComponent as HomeIcon} from "../../assets/icons/home.svg";
import { StudySession } from "./components/StudySession";
import { useKanas } from "./contexts/KanasContext";
import { twMerge } from 'tailwind-merge';

export function getQuestion(modes:KanaModesKeys[],current?:string):{question:string, answers:string[],audio:string}{
    // Get a random key from KanaModes
    const randomKey = modes[Math.floor(Math.random() * modes.length)];

    // Get the question from KanaModes
    const category = KanaModes[randomKey] as Record<string,{answers:string[],audio:string}>;

    // Remove the current question from the category creating an auxiliar object
    const auxCategory = {...category};

    if(current){
        delete auxCategory[current];
    }

    const randomIndex = Object.keys(auxCategory)[Math.floor(Math.random() * Object.keys(auxCategory).length)]

    const randomQuestion = auxCategory[randomIndex];

    return {
        question: randomIndex,
        answers: randomQuestion.answers,
        audio: randomQuestion.audio
    };
}

const kanaCats = {
    "hiragana":[
        {key:"hirabasic",name:"Hiragana"},
        {key:"hiraadakuten", name:"Hiragana con dakuten"},
        {key:"hirayoon", name:"Hiragana Yoon"},
        {key:"hiradakutenYoon", name:"Hiragana con dakuten Yoon"},
    ],
    "katakana":[
        {key:"katabasic",name:"Katakana"},
        {key:"kataadakuten", name:"Katakana con dakuten"},
        {key:"katayoon", name:"Katakana Yoon"},
        {key:"katadakutenYoon", name:"Katakana con dakuten Yoon"},
    ]
} as Record<string,{key:string,name:string}[]>;

export default function Kanas():React.ReactElement{
    const {addToAnswers,studyMode}=useKanas()

    const [question,setQuestion] = useState<{question:string, answers:string[],audio:string}|undefined>(undefined);
    const [answer, setAnswer] = useState<string>("");
    const [kanaModes, setKanaModes] = useState<KanaModesKeys[]>(["hirabasic-a"]);
    const [showOptions, setShowOptions] = useState<"hiragana"|"katakana">("hiragana");
    const [wrong,setWrong]=useState(false);

    const [openModes,setOpenModes]=useState(true);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        if(!question){
            const randomQuestion = getQuestion(kanaModes,);

            setQuestion(randomQuestion);
            setAnswer("")

            if(inputRef.current){
                inputRef.current.focus();
            }
        }
    },[question,kanaModes]);

    async function checkAnswer(e:ChangeEvent<HTMLInputElement>):Promise<void>{
        e.preventDefault();

        const answer = e.target.value.toLowerCase();

        setAnswer(answer);

        if(!question)return;

        if(question.answers.includes(answer) || question.question===answer){
            const url = `/sounds/${question.audio}.mp3`;

            const audio = new Audio(url);

            audio.currentTime = 0.4;

            await audio.play();

            if(studyMode){
                addToAnswers(question.question,!wrong)
            }

            // Wait for a second before changing the question
            setTimeout(()=>{
                const randomQuestion = getQuestion(kanaModes, question.question);

                setQuestion(randomQuestion);
                setAnswer("")
            },100)

            if(inputRef.current){
                inputRef.current.value = "";
            }
            setWrong(false);
        }else{
            setWrong(true);
        }
    }

    function areAllSelected(mode:string):boolean{
        if(mode==="all"){
            return kanaModes.length===Object.keys(KanaModes).length;
        }

        // Search for all hiragana modes
        const auxKanaModes = Object.keys(KanaModes).filter((key)=>{
            return key.includes(mode);
        }) as KanaModesKeys[];

        return auxKanaModes.every((k)=>kanaModes.includes(k));
    }

    useEffect(()=>{
        if(kanaModes.length===0){
            // Select first
            setKanaModes(["hirabasic-a"]);
        }
    },[kanaModes])

    function renderKanaModes():React.ReactElement{
        return (
            <Fragment>
                {Children.toArray(kanaCats[showOptions].map((cat)=>(
                    <div className="flex flex-col">
                        <div className="flex gap-1">
                            <h2 className="font-semibold">{cat.name}</h2>
                            <button className="text-xs text-gray-500 hover:underline" onClick={()=>{
                                if(areAllSelected(cat.key)){
                                    setKanaModes(kanaModes.filter((k)=>!k.includes(cat.key)));
                                    return;
                                }

                                setKanaModes([...kanaModes,...Object.keys(KanaModes).filter((key)=>key.includes(cat.key)) as KanaModesKeys[]]);
                            }}
                            >{areAllSelected(cat.key) ? "Quitar todos":"Seleccionar todos"}
                            </button>
                        </div>
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
                                }else{
                                    setKanaModes(kanaModes.filter((k)=>k!==key));
                                }
                            }}
                            />
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
            </Fragment>
        )
    }

    return(
        <PageContainer>
            <div className="w-full py-3 flex justify-center">
                <Link to="/">
                    <HomeIcon className="text-main-dark w-12 bg-white border-main-dark border-2 rounded-full p-2"/>
                </Link>
            </div>
            <div className="my-4 flex justify-center flex-col items-center gap-4">
                <div className="bg-white w-3/4 p-4 rounded-lg text-center relative shadow-lg">
                    <IconButton className="absolute top-2 right-2" onClick={()=>{
                        if(!question)return;

                        const url = `/sounds/${question.audio}.mp3`;

                        const audio = new Audio(url);

                        void audio.play()
                    }}
                    >
                        <VolumeUp/>
                    </IconButton>
                    <p className="text-6xl">{question?.question||"〇"}</p>
                </div>
                {!!question && answer.length>=question.answers[0].length&&(!question.answers.includes(answer) && question.question!==answer)&&(
                    <p className="text-red-600 font-semibold text-xl">{question.question} = {question.answers.join("/")}</p>
                )}

                <input id="answer" className="w-3/4 py-2 border-2 focus:border-4 border-main-dark border-solid rounded-full text-center capitalize focus:outline-none" ref={inputRef} type="text" value={answer} onChange={(e)=>checkAnswer(e)}/>
            </div>

            <StudySession className="my-4 w-3/4 mx-auto"/>

            <Accordion expanded={openModes} onChange={(ev,ex)=>{setOpenModes(ex)}} sx={{
                "&.Mui-expanded":{
                    margin:0
                }
            }}
            >
                <AccordionSummary>
                    <p className="font-semibold text-xl mx-auto">モードセレクター</p>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="mx-auto w-fit flex flex-col gap-2">
                        <button className={twMerge("border-main border-2 border-solid rounded-full px-4 hover:bg-main hover:text-white transition-colors")} onClick={()=>{
                            if(areAllSelected("all")){
                                setKanaModes([]);
                                return;
                            }

                            setKanaModes(Object.keys(KanaModes) as KanaModesKeys[]);
                        }}
                        >{areAllSelected("all") ? "Quitar":"Seleccionar"} todo
                        </button>
                        <button className="border-main border-2 border-solid rounded-full px-4 hover:bg-main hover:text-white transition-colors" onClick={()=>{
                            setShowOptions("hiragana");

                            if(areAllSelected("hira")){
                                setKanaModes(kanaModes.filter((k)=>!k.includes("hira")));
                                return;
                            }

                            setKanaModes([...kanaModes,...Object.keys(KanaModes).filter((key)=>key.includes("hira")) as KanaModesKeys[]]);
                        }}
                        >{areAllSelected("hira") ? "Quitar":"Seleccionar"} todo el hiragana
                        </button>
                        <button className="border-main border-2 border-solid rounded-full px-4 hover:bg-main hover:text-white transition-colors" onClick={()=>{
                            setShowOptions("katakana");
                            if(areAllSelected("kata")){
                                setKanaModes(kanaModes.filter((k)=>!k.includes("kata")));
                                return;
                            }

                            setKanaModes([...kanaModes,...Object.keys(KanaModes).filter((key)=>key.includes("kata")) as KanaModesKeys[]]);

                        }}
                        >{areAllSelected("kata") ? "Quitar":"Seleccionar"} todo el katakana
                        </button>
                    </div>
                    <Divider className="my-4"/>
                    <div className="flex flex-col gap-2">
                        <Tabs value={showOptions} onChange={(e,v)=>setShowOptions(v)}>
                            <Tab label="Hiragana" value="hiragana"/>
                            <Tab label="Katakana" value="katakana"/>
                        </Tabs>
                        {renderKanaModes()}
                    </div>
                </AccordionDetails>
            </Accordion>

        </PageContainer>
    )
}