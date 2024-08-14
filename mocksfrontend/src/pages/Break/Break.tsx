import { Button } from "@/components/ui/button";
import Audio from "@/pages/Break/components/Audio";
import Chat from "@/pages/Break/components/Chat";
import Discord from "@/pages/Break/components/Discord";
import Game from "@/pages/Break/components/Game";
import { useExamStore } from "@/stores/exam";
import { ChevronLeft, ChevronRight, Gamepad, MessageSquare, Music } from "lucide-react";
import React, { useState } from "react";
import DiscordIcon from "@/assets/discord.svg?react";

export default function Break():React.ReactElement{
	const {breakForSection,setBreakForSection,setSection}=useExamStore()

	const [option,setOption]=useState<"game"|"music"|"chat"|"discord"|undefined>(undefined)

	function renderOption(){
		switch(option){
		case "game":
			return <Game/>
		case "music":
			return <Audio/>
		case "chat":
			return <Chat/>
		case "discord":
			return <Discord/>
		}
	}

	return(
		<div className="flex justify-center items-center h-screen flex-col gap-8">
			<h1 className="text-4xl font-semibold">Sala de descanso</h1>
			<div className="flex flex-col gap-4">
				{option&&(
					<div>
						<Button onClick={()=>{
							setOption(undefined)
						}} className="mt-4"><ChevronLeft/>Back</Button>
					</div>
				)}
				{option?renderOption():(
					<div className="grid grid-cols-2 text-white text-xl font-semibold">
						<button className="w-[200px] h-[200px] bg-red-500 flex justify-center items-center" onClick={()=>{
							setOption("game")
						}}>
							<Gamepad width={100} height={100}/>
						</button>
						<button className="w-[200px] h-[200px] bg-pink-600 flex justify-center items-center" onClick={()=>{
							setOption("music")
						}}>
							<Music width={100} height={100}/>
						</button>
						<button className="w-[200px] h-[200px] bg-green-600 flex justify-center items-center" onClick={()=>{
							setOption("chat")
						}}>
							<MessageSquare width={100} height={100}/>
						</button>
						<button className="w-[200px] h-[200px] bg-blue-600 flex justify-center items-center" onClick={()=>{
							setOption("discord")
						}}>
							<DiscordIcon width={100} height={100}/>
						</button>
					</div>
				)}
				<Button onClick={()=>{
				// Este elemento solo existe si breakForSection es diferente de undefined
					setSection(breakForSection!)
					setBreakForSection(undefined)
				}} className="mt-4">Ir a la siguiente sección <ChevronRight/></Button>
			</div>
		</div>
	)
}