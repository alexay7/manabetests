import React from "react";

export default function Game():React.ReactElement{
	return(
		<div className="flex flex-col items-center">
			<h2 className="text-xl font-semibold">Juégate un Sudoku entre secciones</h2>
			<iframe src="//widget.websudoku.com/?level=2" width="240" height="260" scrolling="no" frameBorder="0"></iframe>
		</div>
	)
}