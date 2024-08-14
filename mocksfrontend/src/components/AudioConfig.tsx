import { useUserStore } from "@/stores/user";
import React from "react";

export default function AudioConfig():React.ReactElement{
	const {setVolume}=useUserStore()

	const audioRef = React.useRef<HTMLAudioElement>(null)

	return(
		<div className="flex flex-col gap-4 items-center">
			<h2 className="text-primary text-3xl">Pasos previos a la sección de audio</h2>
			<div className="flex flex-col w-full items-center gap-4">
				<p className="text-xl">1. Comprueba que el volumen está a tu gusto</p>
			<audio ref={audioRef} className="w-2/3" controls onVolumeChange={(e)=>{
				e.preventDefault()

				setVolume(e.currentTarget.volume*100)
			}}>
				<source src={`${import.meta.env.VITE_API_URL}/media/audios/test.mp3`} type="audio/mpeg"/>
			</audio>
			</div>
			<p className="text-xs">Define el volumen que quieres que tengan los ejercicios, puedes cambiarlo durante el examen</p>

			<p className="text-xl pb-2">2. No olvides coger un cuaderno para tomar notas!!!</p>
		</div>
	)
}