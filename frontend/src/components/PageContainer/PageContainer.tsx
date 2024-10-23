import React, { HTMLAttributes, useState } from "react";

import {ReactComponent as Manabe} from "../../assets/icons/manabe.svg";
import {ReactComponent as Discord} from "../../assets/icons/discord.svg";

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
    children:React.ReactNode
}

function PageContainer(props:PageContainerProps):React.ReactElement {
    const {children, ...divProps} = props;

    const [showModal,setShowModal]=useState(document.cookie.indexOf("showModal")===-1);

    return (
        <div className="w-full min-h-screen h-full bg-gradient-to-t from-main-dark to-main max-w-lg m-auto lg:border-x-4 lg:border-black pb-8" {...divProps}>
            {showModal&&(
            <div className="flex justify-center text-main-dark bg-white py-2 items-center gap-8 relative">
                <button className="absolute top-2 right-2 font-bold" onClick={()=>{
                    setShowModal(false)
                    // Create cookie that lasts 1 week
                    document.cookie="showModal=false;max-age=604800"
                }}
                >X
                </button>
                <a target="_blank" rel="noreferrer noopener" href="https://manabe.es/"><Manabe/></a>
                <a target="_blank" rel="noreferrer noopener" className="text-[#636ef6] w-[50px] pt-1" href="https://discord.gg/y8P7mpDTcB"><Discord/></a>
            </div>
            )}
            <hr />
            {children}
        </div>
    );
}

export default PageContainer;