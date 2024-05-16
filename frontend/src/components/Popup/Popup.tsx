import React, {useState} from "react";

import {Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {useTest} from "../../contexts/TestContext";
import {getJapaneseName, getSections} from "../../helpers/helper";
import { PosibleTests } from "../../pages/Home/components/DefaultTests";

interface PopupProps {
    selected:string,
    closePopup:(status:PosibleTests|undefined)=>void;
}

function Popup(props:PopupProps):React.ReactElement {
    const {selected, closePopup} = props;
    const {handleParams, params} = useTest();
    const [testMode, setTestMode] = useState("random");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const navigate = useNavigate();

    function handleSection(section:string):void {
        if (params?.sections?.includes(section)) {
            handleParams({sections:params.sections.filter((x)=>x !== section)});
        } else {
            if (params?.sections) {
                handleParams({sections:[...params.sections, section]});
            } else {
                handleParams({sections:[section]});
            }
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-gray-800 bg-opacity-70 flex justify-center items-center z-10">
            <div className="bg-white rounded-xl shadow-xl p-5 md:w-2/5 lg:w-2/5 2xl:w-1/4 flex flex-col w-5/6">
                <div className="flex justify-end" onClick={()=>closePopup(undefined)}>
                    <button className="text-red-800 font-semibold text-lg w-10 h-10 border-red-800 border-2 rounded-lg hover:bg-red-800 hover:text-white duration-300">X</button>
                </div>
                <hr className="my-4"/>
                <div className="flex flex-col gap-4 items-start">
                    <h3 className="text-xl font-semibold text-center w-full">JLPT {selected} 全問</h3>
                    {/* <div className="flex items-center justify-center select-none gap-2 w-full">
                        <label htmlFor="timer">制限時間</label>
                        <Checkbox id="timer"  onChange={(e)=>{
                            handleParams({timer:e.target.checked});
                        }}
                        value={params?.timer}
                        />
                    </div> */}
                    <div className="flex flex-row justify-center w-full gap-2">
                        <label htmlFor="questionum">問題数</label>
                        <input id="questionum" type="number" className=" border-b border-gray-300 w-[4ch]" max={20} min={1} onChange={(e)=>{
                            handleParams({questionNum:parseInt(e.target.value)});
                        }}
                        value={params?.questionNum}
                        />
                    </div>
                    <hr className="w-full"/>
                    <div className="flex justify-center w-full">
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label" className="text-center">モード</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={testMode}
                                name="radio-buttons-group"
                                onChange={(e)=>{
                                    if (e.target.value === "random") {
                                        setSelectedCategory(null);
                                        handleParams({sections:[]});
                                    }
                                    setTestMode(e.target.value);
                                }}
                            >
                                <FormControlLabel value="random" control={<Radio />} label="ランダム" />
                                <FormControlLabel value="cat" control={<Radio />} label="試験科目" />
                                <FormControlLabel value="sect" control={<Radio />} label="大問" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    {testMode !== "random" && (
                        <div className="flex justify-center w-full">
                            {testMode === "cat" ? (
                                <div className="flex justify-center w-full">
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label" className="text-center">試験科目</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            value={selectedCategory}
                                            name="radio-buttons-group"
                                            onChange={(e)=>{
                                                handleParams({sections:getSections(selected, e.target.value)});
                                                setSelectedCategory(e.target.value);
                                            }}
                                        >
                                            <FormControlLabel value="vocabulario" control={<Radio />} label="文字・語彙" />
                                            <FormControlLabel value="gramatica" control={<Radio />} label="文法" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            ) : (
                                <div className="flex justify-center w-full">
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label" className="text-center">大問</FormLabel>
                                        <ul className="flex justify-center w-full flex-wrap">
                                            {getSections(selected).map((section)=>(
                                                <li key={section} className="flex items-center">
                                                    <Checkbox
                                                        name={section} onChange={(e)=>handleSection(e.target.name)}
                                                    />
                                                    <p>{getJapaneseName(section)}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </FormControl>
                                </div>
                            )}
                        </div>
                    )}
                    <button  className="duration-500 w-full bg-main border-2 border-main-dark py-2 px-4 rounded-lg font-semibold hover:bg-white text-white hover:text-main-dark"
                        onClick={()=>{
                            handleParams({level:selected, type:"normal"});
                            navigate("/quiz");
                        }}
                    >はじめる
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Popup;