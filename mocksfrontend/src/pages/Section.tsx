import React, { Fragment, useEffect, useRef, useState } from "react";
import { Exam, ExamSectionAnswers } from "../types/exam";
import ExercisePage from "./ExercisePage";
import { useExamStore } from "../stores/exam";
import AnswersPage from "./AnswersPage";
import { twMerge } from "tailwind-merge";
import { questionsAPI } from "../api/questions";
import { gradeExam } from "../helpers/exercises";
import Waveform from "../components/Waveform";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { useAudioStore } from "@/stores/audio";
import { convertSecondsToTime } from "@/helpers/general";
import { useStopwatch, useTimer } from "react-timer-hook";
import Break from "@/pages/Break/Break";
import { useToast } from "@/components/ui/use-toast";
import AudioConfig from "@/components/AudioConfig";
import { useResultsStore } from "@/stores/results";
import { Result } from "@/types/results";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/user";
import { Slider } from "@/components/ui/slider";

interface SectionProps {
	section: Exam["sections"][0];
}

export default function Section({ section }: SectionProps): React.ReactElement {
	const navigate = useNavigate()

	const { page, setPage, setBreakForSection, section: sectNum, exam, breakForSection, settings, setSectionTime, sectionTime, endSection } = useExamStore()
	const { audio, setPlaying, previousAudios, addToPreviousAudios, playing } = useAudioStore()
	const { addResult } = useResultsStore()
	const { volume,setVolume } = useUserStore()

	const { toast } = useToast()
	const { totalSeconds: timeOver, start: startStopwatch, reset: resetStopwatch } = useStopwatch({ autoStart: false })
	const { totalSeconds, restart, pause } = useTimer({
		expiryTimestamp: new Date(Date.now() + 999999999), autoStart: breakForSection ? false : true, onExpire: () => {
			if (!settings.strict) {
				// Si no es estricto no hace nada al acabarse el tiempo
				startStopwatch()
			} else {
				// Si es estricto pasar a la siguiente sección, dar 10 segundos de margen
				toast({
					title: "¡Se acabó el tiempo!",
					description: "Se te llevará a la sala de descanso en 10 segundos",
					variant: "destructive"
				})

				async function timeOver() {
					await new Promise((resolve) => {
						setTimeout(() => {
							resolve(1)
						}, 10000)
					})

					setBreakForSection(sectNum + 1)
				}

				timeOver()
			}
		}
	})

	const [locked, setLocked] = useState(true);
	const [totalSections] = useState(Object.keys(exam?.sections || {}).length)
	const [configOpen, setConfigOpen] = useState(false);

	const questionsRef = useRef<HTMLUListElement>(null);
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		// Si estamos en la última sección no hay tiempo límite, abrir la configuración
		if (section.index === totalSections) {
			setSectionTime(undefined);
			setLocked(false);
			setConfigOpen(true)
		}
	}, [section, totalSections, setSectionTime])

	useEffect(() => {
		if (breakForSection) return;

		if (!sectionTime && section.index !== totalSections) {
			// Dar 5 segundos de margen para empezar
			setSectionTime(new Date(Date.now() + section.time * 1000 + 5000))
			return
		}

		if (section.index !== totalSections) {
			// Si no es la última sección poner marcha atrás antes de empezar
			resetStopwatch(new Date(), false)
			restart(new Date(Date.now() + 5000), true)
			setLocked(true);
		} else {
			return
		}

		const time = section.time * 1000;

		// Al pasar 5 segundos que se inicie el contador real
		const timeout = setTimeout(() => {
			if (section.index < totalSections) {
				restart(sectionTime ? new Date(sectionTime) : new Date(Date.now() + time), true)
				// Get differente between current time and section time (seconds)
				const diff = Math.floor((Date.now() - new Date(sectionTime || 0).getTime()))

				if (diff > 0) {
					// Si se ha reiniciado la página y hay tiempo extra, añadirlo
					resetStopwatch(new Date(Date.now() + diff), true)
				}
			} else {
				// La última sección no tiene tiempo límite
				restart(new Date(Date.now() + 99999999), false)
			}
			setLocked(false);
		}, 4980)

		return () => {
			clearTimeout(timeout)
		}
	}, [section, restart, resetStopwatch, totalSections, setSectionTime, sectionTime, breakForSection])

	useEffect(() => {
		const questionsContainer = questionsRef.current;

		if (!questionsContainer) return;

		// Scroll hacia arriba al cambiar de página
		questionsContainer.scrollTo(0, 0)
	}, [page, questionsRef])

	useEffect(() => {
		if (configOpen) {
			const audioEl = audioRef.current;

			if (!audioEl) return;

			audioEl.pause()

			return
		}

		async function startAudio() {
			if (!audio) return

			if (previousAudios.length === 0 && settings.strict) {
				// Wait 1 second to start the audio
				await new Promise((resolve) => {
					setTimeout(() => {
						resolve(1)
					}, 1000)
				})
			}

			const audioEl = audioRef.current;

			if (!audioEl) return;

			if (!audioEl.src.includes(audio)) {
				audioEl.pause()
			}

			if (previousAudios.includes(audio)) return;

			if (settings.strict) {
				addToPreviousAudios(audio)
			}

			// Detect change on audio source
			if (!audioEl.src.includes(audio)) {
				audioEl.src = `${import.meta.env.VITE_API_URL}/media/audios/${audio}`
				audioEl.load()
				audioEl.play()
			}
		}

		startAudio()
	}, [audio, addToPreviousAudios, previousAudios, configOpen, settings])

	useEffect(() => {
		const audioEl = audioRef.current;

		if (!audioEl) return;

		audioEl.volume = volume / 100
	}, [volume])

	function checkEmptyAnswers() {
		if (!exam) return;

		const section = exam.sections[sectNum];
		const answerNum = Object.keys(section.answers).length;

		let questionNum = 0;
		// Get question number from all the exercises of the questions of the section
		questionNum = section.questions.reduce((acc, curr) => {
			const total = curr.exercises.reduce((acc, curr) => {
				if ("questions" in curr) {
					// Group of exercises
					return acc + curr.questions.length
				}
				return acc + 1
			}, 0)

			return acc + total
		}, 0)

		return answerNum >= questionNum
	}

	function alertUnanswered() {
		const result = checkEmptyAnswers()


		if (!result) {
			if (!confirm("Hay preguntas sin responder. ¿Desea continuar?")) {
				return false;
			}
		}
		return true
	}

	function getPreviousExerciseNumber(exam:Exam){

		// Get exercise number from previous sections
		return Object.keys(exam.sections).reduce((acc,curr)=>{
			if(parseInt(curr)<sectNum){
				acc+=exam.sections[parseInt(curr)].questions.reduce((acc,curr)=>{
					const total = curr.exercises.reduce((acc,curr)=>{
						if("questions" in curr){
							// Group of exercises
							return acc+curr.questions.length
						}
						return acc+1
					},0)

					return acc+total
				},0)
			}
			return acc
		},0)
	}

	async function handOverExam() {
		if (!exam) return;

		// Put together all the answers separated in sections with format {section:[{questionId:string,answer:number}]}
		const answers = Object.keys(exam.gradingSections).map((section) => {
			const sectionData = exam.gradingSections[section as unknown as number];

			let answers: ExamSectionAnswers["answers"] = Object.keys(sectionData.answers).map((questionId) => {
				if (questionId.includes("-")) {
					// Group of exercises
					return {
						questionId: questionId.split("-")[0],
						type: "extra",
						answer: { [parseInt(questionId.split("-")[1])]: sectionData.answers[questionId] }
					}
				}

				return {
					questionId,
					type: "normal",
					answer: sectionData.answers[questionId]
				}
			})

			// Put together the answers of questions with the same id (group of exercises)
			answers = answers.reduce((acc, curr) => {
				const existingAnswer = acc.find((ans) => ans.questionId === curr.questionId);

				if (existingAnswer) {
					// Solo los grupos pueden tener ids repetidos
					const existingGroupAnswers = existingAnswer.answer as Record<number, number>;
					const currGroupAnswers = curr.answer as Record<number, number>;

					existingAnswer.answer = { ...existingGroupAnswers, ...currGroupAnswers }
					return acc
				}

				return acc.concat(curr)
			}, [] as ExamSectionAnswers["answers"])

			return { section, answers }
		}).flat()

		const response = await questionsAPI.correctExam(answers);

		if (response) {
			// Print grades by section
			const results = gradeExam(exam, response)

			const resultsBySection: Result = {
				level: exam.level,
				strict: settings.strict,
				vocab: {
					points: results.vocab.points,
					exercises: results.vocab.exercises,
					goodExercises: results.vocab.goodExercises,
					questions:results.vocab.questions||[]
				},
				grammar: {
					points: results.grammar.points,
					exercises: results.grammar.exercises,
					goodExercises: results.grammar.goodExercises,
					questions:results.grammar.questions||[]
				},
				reading: {
					points: results.reading.points,
					exercises: results.reading.exercises,
					goodExercises: results.reading.goodExercises,
					questions:results.reading.questions||[]
				},
				listening: {
					points: results.listening.points,
					exercises: results.listening.exercises,
					goodExercises: results.listening.goodExercises,
					questions:results.listening.questions||[]
				}
			}

			addResult(resultsBySection)

			// Navigate to results page
			navigate("/results")
		}
	}

	if (breakForSection) {
		return (
			<Break />
		)
	}

	if(!exam)return <></>

	return (
		<Fragment>
			<ResizablePanelGroup direction="horizontal" className="flex h-screen justify-around bg-gray-50 drop-shadow-md">

				{/* Preguntas */}
				<ResizablePanel minSize={50} defaultSize={65} maxSize={75} className="flex flex-col h-full md:w-[calc(60%-1rem)] xl:w-[calc(70%-1rem)]" style={{ pointerEvents: locked ? "none" : "unset" }}>
					<ul ref={questionsRef} className="flex flex-col gap-4 p-4 overflow-y-auto h-full border-b border-gray-300 border-solid">
						<ExercisePage previousExercises={getPreviousExerciseNumber(exam)} exercises={section.questions[page].exercises} index={page + 1} />
					</ul>
					<div className="flex justify-around text-white items-center py-2">
						<Button variant={(settings.strict&&playing) ? "destructive":"default"} className={twMerge("text-sm", page === 0 ? "invisible" : "visible")} onClick={() => {
							if (playing) {
								if (settings.strict && confirm("El audio no ha terminado, ¿estás seguro?")) {
									setPage(page - 1)
									return
								}
								setPage(page - 1)
								return
							}
							setPage(page - 1)
						}} disabled={page === 0}>Página anterior</Button>
						<Button variant={(settings.strict&&playing) ? "destructive":"default"} className={twMerge("text-sm", page >= section.questions.length - 1 ? "hidden" : "block")} onClick={() => {
							if (playing) {
								if (settings.strict && confirm("El audio no ha terminado, ¿estás seguro?")) {
									setPage(page + 1)
									return
								}
								setPage(page + 1)
								return
							}
							setPage(page + 1)
						}} disabled={page >= section.questions.length - 1}>Página siguiente</Button>

						{(exam && (page >= section.questions.length - 1)) && (Object.keys(exam?.sections).length > sectNum ? (
							<Button variant={checkEmptyAnswers() ? "default" : "destructive"} onClick={() => {
								if (alertUnanswered()) {
									setSectionTime(undefined)
									pause()
									setBreakForSection(sectNum + 1)
									endSection(section.index, section.time - totalSeconds + timeOver)
									setPage(0)
								}
							}
							}>Terminar sección</Button>
						) : (
							<Button variant={checkEmptyAnswers() ? "default" : "destructive"} onClick={() => {
								if (alertUnanswered()) {
									handOverExam()
								}
							}}>Entregar Examen</Button>
						))}
					</div>
				</ResizablePanel>

				<ResizableHandle />

				{/* Respuestas */}
				<ResizablePanel minSize={25} className="w-[calc(40%-1rem)] xl:w-[calc(30%-1rem)] hidden md:flex">
					<ResizablePanelGroup direction="vertical" className="flex flex-col">
						<ResizablePanel maxSize={settings.strict ? 22 : 30} defaultSize={settings.strict ? 22 : 30} className="w-full h-[200px] flex-col gap-2" style={{ boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.2) inset" }}>
							<div className=" flex items-center flex-col justify-evenly py-2 h-full">
								<div className="text-center">
									<p className="text-xl">Sección {section.index}/{Object.keys(exam.sections).length}</p>
									{totalSeconds < 7200 ? (
										<div className="">
											{timeOver > 0 ? (
												<p className="text-sm font-normal text-red-600">Tiempo extra: +{convertSecondsToTime(timeOver)}</p>
											) : (
												<p className="text-sm font-normal">Tiempo restante: {locked ? "XX:XX" : convertSecondsToTime(totalSeconds)}</p>
											)}
										</div>
									) : (
										<p className="text-sm font-normal">Sección sin tiempo límite</p>
									)}
								</div>
								{audio ? (
									<Waveform />
								) : (<div></div>)}
								{audio && (
									<Fragment>
										<audio autoPlay={false}
										onPlay={() => {
											setPlaying(true)
										}}
										onPause={() => {
											setPlaying(false)
										}}
										onEnded={() => {
											setPlaying(false)
										}}
										className={twMerge(settings.strict ? "hidden" : "visible")} controls ref={audioRef}>
										<source src={`${import.meta.env.VITE_API_URL}/media/audios/${audio}`} type="audio/mpeg" />
									</audio>
									{settings.strict && (
										<div className="w-2/3">
											<Slider
										value={[volume]}
										max={100}
										min={0}
										step={1}
										onValueChange={(v)=>{
											setVolume(v[0])
										}}
										/>
										</div>
										)}
									</Fragment>
								)}
								{exam && (Object.keys(exam?.sections).length > sectNum ? (
									<Button variant={checkEmptyAnswers() ? "default" : "destructive"} onClick={() => {
										if (alertUnanswered()) {
											setSectionTime(undefined)
											pause()
											setBreakForSection(sectNum + 1)
											endSection(section.index, section.time - totalSeconds + timeOver)
											setPage(0)
										}
									}
									}>Terminar sección</Button>
								) : (
									<Button variant={checkEmptyAnswers() ? "default" : "destructive"} onClick={() => {
										if (alertUnanswered()) {
											handOverExam()
										}
									}}>Entregar Examen</Button>
								))}
							</div>
						</ResizablePanel>
						<ResizableHandle />
						<ResizablePanel className="overflow-y-auto p-4 bg-rose-50" style={{ pointerEvents: locked ? "none" : "unset" }}>
							<h2>日本語能力試験 回答用紙</h2>
							<p className="text-3xl drop-shadow-lg">{exam?.level}</p>
							<AnswersPage title={section.title} categories={Object.keys(section.questions).map((cat, i) => {
								const questions = section.questions[i].exercises;

								return {
									title: cat,
									questions: questions.map((q) => {
										if ("questions" in q) {
											// q es un grupo de preguntas

											const groupQuestions = q.questions;

											return groupQuestions.map((groupQ) => {
												return {
													index: groupQ.index,
													_id: groupQ._id,
													category: groupQ.category,
													level: groupQ.level,
													answerNumber: groupQ.answers.length
												}
											})
										}

										// Ejercicio normal
										return {
											index: q.index,
											_id: q._id,
											category: q.category,
											level: q.level,
											answerNumber: q.answers.length
										}
									}).flat()
								}
							})} previousExercises={getPreviousExerciseNumber(exam)}/>
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
			</ResizablePanelGroup>
			{locked && (
				<div className="w-full h-screen bg-black z-20 absolute top-0 left-0 flex justify-center items-center flex-col gap-8 transition-opacity" onClick={() => {
					toast({
						title: "¡El examen todavía no ha empezado!"
					})
				}} style={{ opacity: (totalSeconds / 5) }}>
					<h2 className="text-white text-3xl">{section.index === 1 ? "El examen" : "La sección"} empezará en</h2>
					<p className="text-6xl text-white">{convertSecondsToTime(totalSeconds)}</p>
				</div>
			)}
			{configOpen && (
				<div className="w-full h-screen bg-black z-20 absolute top-0 left-0 flex justify-center items-center flex-col gap-8 transition-opacity">
					<div className="bg-white rounded-lg p-4">
						<AudioConfig />
						<Button className="w-full" onClick={() => {
							restart(new Date(Date.now() + 9999999), false)
							setConfigOpen(false)
							const audioEl = audioRef.current;

							if (!audioEl) return;

							audioEl.play();

							return
						}} variant="default">Todo preparado</Button>
					</div>
				</div>
			)}
		</Fragment>
	)
}