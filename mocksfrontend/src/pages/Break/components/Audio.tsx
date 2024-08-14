import React from "react";

export default function Audio():React.ReactElement{
	return(
		<div className="flex flex-col items-center gap-4">
			<h2 className="text-xl font-semibold">Escucha música entre secciones</h2>
			<div className="h-[200px] w-[200px]">
				<img className="w-full h-auto" src="https://avatars.githubusercontent.com/u/26034028?s=200&v=4" alt="Listen.moe radio" />
			</div>
			<audio controls>
				<source src="https://listen.moe/fallback"/>
			</audio>
		</div>
	)
}