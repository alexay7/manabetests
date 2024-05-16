import React, {useEffect, useState} from "react";

import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import {useTest} from "../../../contexts/TestContext";

export function RealTest():React.ReactElement {
    const {handleParams} = useTest();
    const [level, setLevel] = useState("N1");
    const [year, setYear] = useState("2010");
    const [period, setPeriod] = useState("");
    const [oficialExams, setOficialExams] = useState<{"_id":number, "info":string[]}[]>([]);

    const navigate = useNavigate();

    function handleSubmit(e:React.FormEvent<HTMLFormElement>):void {
        e.preventDefault();
        if (!year || !period) {
            toast.error("Debes seleccionar un año y periodo");
            return;
        }
        handleParams({type:"real", level:level, year:parseInt(year), period:period});
        navigate("/quiz");
    }

    useEffect(()=>{
        async function getData():Promise<void> {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/exercises/realtests/${level}`, {method:"GET"});
            const data = await response.json() as {"_id":number, "info":string[]}[];
            setOficialExams(data.filter((x)=>x._id !== null).sort((x, y)=>x._id > y._id ? 1 : -1));
        }
        void getData();
    }, [level]);

    return (
        <form className="bg-white p-4 rounded-xl w-5/6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <h3 className="text-black font-bold text-2xl text-center">JLPT模擬試験</h3>
            <hr />
            <div className="flex justify-center">
                <FormControl className="w-1/2 text-center" variant="standard">
                    <InputLabel>JLPTのレベル</InputLabel>
                    <Select value={level} onChange={(e)=>setLevel(e.target.value)}>
                        <MenuItem value="N1">N1</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {oficialExams.length > 1 && (
                <div className="flex justify-evenly">
                    <FormControl className="w-1/4 text-center" variant="standard">
                        <InputLabel>年</InputLabel>
                        <Select value={`${year}`} onChange={(e)=>setYear(e.target.value)}>
                            {oficialExams.map((availableYear)=>(
                                <MenuItem key={`${availableYear._id}`} value={`${availableYear._id}`}>{`${availableYear._id}`}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className="w-1/4 text-center" variant="standard">
                        <InputLabel>月</InputLabel>
                        <Select value={period} onChange={(e)=>setPeriod(e.target.value)}>
                            {oficialExams.find((x)=>x._id === parseInt(year))?.info.sort((x)=>x === "Julio" ? -1 : 1).map((periods)=>(
                                <MenuItem key={periods} value={periods}>{periods === "Julio" ? "7月" : "12月"}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            )}
            <button type="submit" className="duration-500 w-full bg-blue-500 border-2 border-blue-700 py-2 px-4 rounded-lg text-white font-semibold hover:bg-white hover:text-blue-500 hover:border-blue-500">はじめる</button>
        </form>
    );
}