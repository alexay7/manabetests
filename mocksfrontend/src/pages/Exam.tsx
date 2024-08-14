import React, { useEffect } from "react";
import { useExamStore } from "../stores/exam";
import Section from "./Section";
import { useNavigate } from "react-router-dom";

export default function Exam():React.ReactElement{
	const navigate = useNavigate()
	const {exam,section}=useExamStore()

	useEffect(()=>{
		if(!exam){
			navigate("/")
		}
	},[exam,navigate])

	useEffect(()=>{
		// Don't allow iframes from extensions
		function handleYomiMutation(mutations: MutationRecord[]) {
			mutations.forEach((mutation) => {
				const target = mutation.target as HTMLElement;

				// Find if any child has a shadow-root
				// Travel down the tree to find the shadow-root
				const childs = target.querySelectorAll("div");

				childs.forEach((child) => {
					if(child.attributes.getNamedItem("style")?.value.includes("all")){
						alert("No se puede usar yomichan en esta página");
						child.remove();
					}
				});
			})
		
		  }

		const yomiObserver = new MutationObserver(handleYomiMutation);

		yomiObserver.observe(document.body, {
			childList: true,
			subtree: true,
		});
	},[])

	if (!exam){
		return <div>Loading...</div>
	}

	return(
		<div className="max-w-screen-xl mx-auto w-full text-dark text-left h-screen select-none">
			<Section section={exam.sections[section]} />
		</div>
	)
}