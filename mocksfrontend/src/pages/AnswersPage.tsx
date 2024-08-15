import React, { Children, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useExamStore } from "../stores/exam";
import { Exercise } from "../types/exercises";
import { useAudioStore } from "@/stores/audio";
import { useUserStore } from "@/stores/user";

interface AnwersPageProps {
	categories: {
		questions: {
			_id: string;
			index: number;
			category: Exercise["category"];
			level: Exercise["level"];
			answerNumber: number;
		}[]
	}[],
	title: string;
	previousExercises: number;
}


export default function AnswersPage({ categories, previousExercises, title }: AnwersPageProps): React.ReactElement {
	const { exam, answerQuestion, page, section, setPage, settings } = useExamStore()
	const { username } = useUserStore()
	const { playing } = useAudioStore()

	const handWrittenFonts = ["Handwritten", "Handwritten2"]
	const [font] = useState(handWrittenFonts[Math.floor(Math.random() * handWrittenFonts.length)])

	useEffect(() => {
		// Scroll to the question
		const question = document.getElementById(`page${page + 1}`)

		if (question) {
			question.scrollIntoView({ behavior: "smooth" })
		}
	}, [page])

	if (!exam) return <></>

	return (
		<div className="max-h-[400px]">
			<p className="font-normal">{title}</p>
			<div className="grid grid-cols-4 divide-x text-center border border-black divide-black font-normal mt-4">
				<div className="flex flex-col gap-0 items-center">
					<p className="text-base flex gap-2"><span>名</span><span>前</span></p>
					<p className="text-[0.5rem]">Name</p>
				</div>
				<div className="col-span-3 flex items-center px-4">
					<p style={{ fontFamily: font }}>{username}</p>
				</div>
			</div>
			<ul className="overflow-auto flex flex-col items-center my-4 border-2 border-black border-solid border-t-0">
				{Children.toArray(categories.map((cat, i) => (
					<li className="w-full border-t-2 border-black border-solid">
						<button className="bg-transparent border-none p-0 m-0 justify-center flex w-full focus:outline-none" onClick={() => {
							if (playing) {
								if (settings.strict && confirm("El audio no ha terminado, ¿estás seguro?")) {
									setPage(i)
									return
								}
								setPage(i)
								return
							}
							setPage(i)
						}}>
							<p className="font-normal tracking-[1rem] text-center" id={`page${i + 1}`}>問題 {i + 1}</p>
						</button>
						<ul className="border-t border-black border-solid">
							{Children.toArray(cat.questions.map(question => (
								<li className="grid grid-cols-4 divide-x-2 divide-black items-center" id={`${question._id + 1}`}>
									<button className="text-center" onClick={() => {
										setPage(i)
									}}>{question.index - previousExercises + 1}</button>
									<ul className="flex justify-evenly col-span-3 h-full">
										{Children.toArray(Array.from({ length: question.answerNumber }).map((_, i2) => (
											<li className="flex items-center">
												{/* Write the number inside the radio */}
												<label htmlFor={`question-${question._id}-${i2}`} className={twMerge("border-primary text-primary border-solid border rounded-[50%] w-3 text-center text-xs cursor-pointer", (exam.sections[section].answers[question._id] === i2 + 1) ? "bg-primary" : "")}>
													<p className="cursor-pointer">{i2 + 1}</p>
													<input className="hidden" onChange={(e) => {
														if (e.target.checked) {
															if (playing) {
																if (page != i && settings.strict && confirm("El audio no ha terminado, ¿estás seguro?")) {
																	setPage(i)
																	answerQuestion(section, question, i2 + 1)
																	return
																}
																setPage(i)
																answerQuestion(section, question, i2 + 1)
																return
															}
															setPage(i)
															answerQuestion(section, question, i2 + 1)
														}
													}} type="radio" name={`question-${question._id}`} id={`question-${question._id}-${i2}`} />
												</label>
											</li>
										)))}
									</ul>
								</li>
							)))}
							<li className="grid grid-cols-4 divide-x-2 divide-black w-full text-transparent text-[4px]">
								<div className="col-span-1">.</div>
								<div className="col-span-3">.</div>
							</li>
						</ul>
					</li>
				)))}
			</ul>
			<div className="h-4"></div>
		</div>
	)
}