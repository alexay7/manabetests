import React, {useState} from "react";

import Popup from "../../../components/Popup/Popup";
import {RealTest} from "./RealTest";

export type PosibleTests = "N5"|"N4"|"N3"|"N2"|"N1"

function DefaultTests():React.ReactElement {
    const [selectedTest, setSelectedTest] = useState<PosibleTests|undefined>(undefined);

    return (
        <div className="flex flex-col items-center gap-8">
            {!!selectedTest && <Popup selected={selectedTest} closePopup={setSelectedTest}/>}

            <div className="flex flex-col items-center w-full gap-4">
                <h2 className="text-white font-bold text-2xl">ランダム出題</h2>
                <ul className="flex flex-col gap-4 p-4 bg-white mx-4 rounded-xl shadow-xl select-none w-5/6">
                    <li className="duration-500 cursor-pointer text-white py-4 px-8 bg-[#71BDC7] border-[#4e8a92] border-4 rounded-xl text-center hover:bg-white hover:border-[#71BDC7] hover:text-[#71BDC7] hover:animate-pulse"
                        onClick={()=>{
                            // Redirect to kanas
                            console.log("aaa")
                        }
                        }
                    >
                        <p className="text-xl font-bold">KANAS</p>
                    </li>
                    <li className="duration-500 cursor-pointer text-white py-4 px-8 bg-red-500 border-red-700 border-4 rounded-xl text-center hover:bg-white hover:border-red-600 hover:text-red-600 hover:animate-pulse"
                        onClick={()=>setSelectedTest("N5")}
                    >
                        <p className="text-xl font-bold">JLPT N5</p>
                    </li>
                    <li className="duration-500 cursor-pointer text-white py-4 px-8 bg-orange-500 border-orange-700 border-4 rounded-xl text-center hover:bg-white hover:border-orange-600 hover:text-orange-600 hover:animate-pulse" onClick={()=>setSelectedTest("N4")}>
                        <p className="text-xl font-bold">JLPT N4</p>
                    </li>
                    <li className="duration-500 cursor-pointer text-white py-4 px-8 bg-green-500 border-green-700 border-4 rounded-xl text-center hover:bg-white hover:border-green-600 hover:text-green-600 hover:animate-pulse" onClick={()=>setSelectedTest("N3")}>
                        <p className="text-xl font-bold">JLPT N3</p>
                    </li>
                    <li className="duration-500 cursor-pointer text-white py-4 px-8 bg-blue-500 border-blue-700 border-4 rounded-xl text-center hover:bg-white hover:border-blue-600 hover:text-blue-600 hover:animate-pulse" onClick={()=>setSelectedTest("N2")}>
                        <p className="text-xl font-bold">JLPT N2</p>
                    </li>
                    <li className="duration-500 cursor-pointer text-white py-4 px-8 bg-pink-500 border-pink-700 border-4 rounded-xl text-center hover:bg-white hover:border-pink-600 hover:text-pink-600 hover:animate-pulse" onClick={()=>setSelectedTest("N1")}>
                        <p className="text-xl font-bold">JLPT N1</p>
                    </li>
                </ul>
            </div>
            <RealTest/>
        </div>
    );
}

export default DefaultTests;