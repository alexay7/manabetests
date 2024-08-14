import React from "react";

export default function Discord():React.ReactElement{
	return(
		<div className="flex flex-col items-center">
			<h2 className="text-xl font-semibold">Únete al Discord de Manabe</h2>
			<iframe src="https://discord.com/widget?id=654351832734498836&theme=dark" width="350" height="500" allowTransparency={true} frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
		</div>
	)
}