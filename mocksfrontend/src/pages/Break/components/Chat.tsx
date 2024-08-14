import React from "react";

export default function Chat():React.ReactElement{
	return(
		<div className="flex flex-col items-center">
			<h2 className="text-xl font-semibold">Habla con gente entre secciones</h2>
			<iframe src="https://xat.com/embed/chat.php#id=220528088&gn=ManabeTests" width="650" height="486" frameBorder="0" scrolling="no"></iframe>
		</div>
	)
}