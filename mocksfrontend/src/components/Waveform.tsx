// https://codepen.io/ayaos/pen/wvPBbdX

import React, { useEffect } from "react";

import "./style.css";
import { twMerge } from "tailwind-merge";
import { useAudioStore } from "@/stores/audio";

export default function Waveform():React.ReactElement{
	const {playing}=useAudioStore()

	useEffect(()=>{
		function changeWaves(){
			const bar = document.querySelectorAll(".bar");
			for (let i = 0; i < bar.length; i++) {
				bar.forEach((item) => {

					// Random move
					item.setAttribute("style", `animation-duration: ${Math.random() * (0.7 - 0.2) + 0.2}s`);
				});
			}
		}

		changeWaves()
	},[])

	return(
		<div className="sound-wave">
			{Array.from({length:50}).map((_,i)=>(
				<div className={twMerge("bar",playing?"":"stop")} key={i}></div>
			))}
		</div>
	)
}