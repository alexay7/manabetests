import React, {useState} from "react";

import PageContainer from "../../components/PageContainer/PageContainer";
import DefaultTests from "./components/DefaultTests";
import {Exercises} from "./components/Exercises";

function Home():React.ReactElement {
    const [mode, setMode] = useState(window.localStorage.getItem("mainmenu") || "default");

    return (
        <PageContainer>
            <div className="w-full flex font-semibold p-4 shadow-xl bg-white">
                <button className={`w-1/2 border-r p-3 rounded-full ${mode === "default" ? "bg-blue-600 text-white" : "text-black bg-white"}`} onClick={()=>{
                    window.localStorage.setItem("mainmenu", "default");
                    setMode("default");
                }}
                >テスト
                </button>
                <button className={`w-1/2 border-r p-3 rounded-full ${mode === "custom" ? "bg-blue-600 text-white" : "text-black bg-white"}`}  onClick={()=>{
                    window.localStorage.setItem("mainmenu", "custom");
                    setMode("custom");
                }}
                >日常学習
                </button>
            </div>
            <hr className="border-2 mb-6"/>
            {mode === "default" ? <DefaultTests/> : <Exercises/>}
        </PageContainer>
    );
}

export default Home;