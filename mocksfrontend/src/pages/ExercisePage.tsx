import React, { Children, useEffect } from "react";
import { Exercise, ExerciseGroup } from "../types/exercises";
import { twMerge } from "tailwind-merge";
import { useExamStore } from "../stores/exam";
import { getExerciseQuestion } from "../helpers/exercises";
import { useAudioStore } from "@/stores/audio";
import { PhotoView } from "react-photo-view";

interface ExerciseProps{
    exercises:(Exercise|ExerciseGroup)[];
	index:number;
	previousExercises:number;
}

export default function ExercisePage({exercises,index,previousExercises}:ExerciseProps):React.ReactElement{
	const {exam,section,settings}= useExamStore()
	const {setAudio}=useAudioStore()

	const [exampleExercise] = exercises;
	const {type}=exampleExercise;

	function renderQuestionLabel(question:string){
		const questionParts = question.split("*")

		return(
			<>
				{Children.toArray(questionParts.map((part,i)=>(
					<>
						{i%2===0 && <span>{part}</span>}
						{i%2!==0 && <u>{part}</u>}
					</>
				)))}
			</>
		)
	}

	function renderExercise(exercise:Exercise|ExerciseGroup){
		if(!exam) return <></>

		if(("questions") in exercise){

			// Extra exercise
			return (
				<li className="flex flex-col gap-2 pt-3">
					<div dangerouslySetInnerHTML={{__html:exercise.statement}}/>
					{exercise.image&&(
						<div className="w-10/12">
							<PhotoView key={exercise._id} src={`${import.meta.env.VITE_API_URL}/media/images/${exercise.image}`}>
							<img className="w-auto h-full cursor-zoom-in" src={`${import.meta.env.VITE_API_URL}/media/images/${exercise.image}`} alt=""/>
							</PhotoView>
						</div>
					)}
					<ul className="divide-y divide-gray-300 divide-solid">
						{Children.toArray(exercise.questions.map((question)=>(
							<li className="flex flex-col gap-2 pt-2 mt-2">
								<div className="flex gap-4 flex-col">
									{question.image&&(
										<div className="h-[200px] max-w-[90%] mx-auto">
											<PhotoView key={question._id} src={`${import.meta.env.VITE_API_URL}/media/images/${question.image}`} >
											<img className="w-auto h-full cursor-zoom-in" src={`${import.meta.env.VITE_API_URL}/media/images/${question.image}`} alt=""/>
											</PhotoView>
										</div>
									)}
									<div className="flex gap-4 items-center">
										<span className="border px-2 border-solid border-gray-700 text-xs font-semibold">{question.index-previousExercises+1}</span>
										<p className="question underline-offset-2 font-semibold"><span>{renderQuestionLabel(question.question)}</span></p>
									</div>
								</div>
								<ul className="flex flex-wrap gap-x-8 gap-y-2">
									{Children.toArray(question.answers.map((answer,ansI)=>(
										<li className="text-base">
											<p style={{textDecorationThickness:"2px"}} className={twMerge("flex gap-2",(exam.sections[section].answers[question._id]===ansI+1 ? "underline":""))}><span>{ansI+1}</span> {answer}</p>
										</li>
									)))}
								</ul>
							</li>
						)))}
					</ul>
				</li>
			)
		}

		return(
			<li className="flex flex-col gap-2 pt-3">
				<div className="flex gap-4 items-center">
					<span className="border px-2 border-solid border-gray-700 text-xs font-semibold">{exercise.index-previousExercises+1}</span>
					{exercise.image && <img src={exercise.image} alt=""/>}
					<p className="question underline-offset-2 font-medium"><span>{renderQuestionLabel(exercise.question)}</span></p>
				</div>
				<ul className="flex flex-wrap gap-x-8 gap-y-2">
					{Children.toArray(exercise.answers.map((answer,ansI)=>(
						<li className="text-base">
							<p style={{textDecorationThickness:"2px"}} className={twMerge("flex gap-2",(exam.sections[section].answers[exercise._id]===ansI+1 ? "underline":""))}><span>{ansI+1}</span> {answer}</p>
						</li>
					)))}
				</ul>
			</li>
		)
	}

	useEffect(()=>{
		if(exercises.length!==1)return;

		const [firstExercise] = exercises;

		if(!firstExercise.audio)return;

		setAudio(firstExercise.audio)

		return ()=>{
			setAudio(undefined)
		}
	},[exercises,setAudio])

	return(
		<li className="flex flex-col gap-4" style={{fontFamily:settings.expertMode?'Tamanegi_Geki':""}}>
			<h2 className="font-semibold text-xl">問題 {index}: {getExerciseQuestion(type)}</h2>
			<ul className="flex flex-col gap-3 font-normal text-lg divide-y">
				{Children.toArray(exercises.map(renderExercise))}
			</ul>
		</li>
	)
}