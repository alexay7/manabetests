import { FormEvent, useEffect, useState } from 'react'
import { questionsAPI } from './api/questions'
import './App.css'
import { Exercise, ExerciseGroup } from './types/exercises'
import { divideCategoriesBySections } from './helpers/exercises'
import { useExamStore } from './stores/exam'
import { useNavigate } from 'react-router-dom'
import { ExamCategoryQuestions } from './types/exam'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useUserStore } from '@/stores/user'

import DiscordIcon from "@/assets/discord.svg?react";
import ManabeIcon from "@/assets/manabe.svg?react";

export default function App() {
	const navigate = useNavigate()

	const { setExam, setSection, setSettings, resetExam } = useExamStore()
	const {username,setUsername,setLastLevel,setLastStrict,lastLevel,lastStrict}=useUserStore()

	const [level, setLevel] = useState<Exercise["level"]>(lastLevel||"N5")
	const [strict, setStrict] = useState(lastStrict||false)

	useEffect(() => {
		resetExam()
	}, [resetExam])

	async function createExam(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const res = await questionsAPI.getExercises(level);

		const all: (Exercise | ExerciseGroup)[] = [...res.exercises, ...res.extraExercises]

		let exerciseIndex = 0;

		const exercisesByType = all
			.sort((a, b) => {
				// Ordenar por tipo en este orden de prioridad:
				const typeOrder = ["kanji", "ortografia", "formacion", "contexto", "parafrases", "uso", "gramaticafrases", "ordenar", "gramaticatexto", "textoscortos", "textosmedios", "textoslargos",
					"textosintegrados", "textostematicos", "textosinformacion", "tareas", "puntosclave", "comprensiongeneral", "expresiones", "respuestarapida", "comprensionintegrada"] as Exercise["type"][]

				return typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type)
			})
			// Asignar un número a cada pregunta
			.map((ex) => {
				if ("questions" in ex) {
					ex.questions = ex.questions.map((q, i) => {
						q._id = ex._id + "-" + i
						q.index = exerciseIndex
						q.level = level
						q.type = ex.type
						q.category = ex.category
						exerciseIndex++
						return q
					})
				} else {
					ex.index = exerciseIndex
					exerciseIndex++
				}
				ex.level = level
				return ex
			})
			// Agruparlas por tipo
			.reduce((acc: Record<string, (Exercise | ExerciseGroup)[]>, exercise) => {
				if (!acc[exercise.type]) {
					acc[exercise.type] = []
				}

				acc[exercise.type].push(exercise)
				return acc
			}, {})

		// Convertir a array donde la clave pasa a ser el tipo de ejercicio
		const exercisesByTypeArray: ExamCategoryQuestions[] = Object.keys(exercisesByType).map((key) => ({
			type: key as Exercise["type"],
			category: exercisesByType[key][0].category,
			exercises: exercisesByType[key]
		}))

		const { sections, gradingSections } = divideCategoriesBySections(level, exercisesByTypeArray)

		setExam({ sections, gradingSections, level: level })
		setSection(1)
		setSettings({ strict })

		setLastLevel(level)
		setLastStrict(strict)

		navigate("/test")
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="flex flex-col gap-2 w-1/3">
			<form className="flex flex-col gap-4 bg-dark mx-auto bg-gray-100 p-4 rounded-lg select-none" onSubmit={createExam}>
				<p className='text-xl font-semibold'>Generar examen JLPT</p>

				<div className="flex flex-col gap-1">
				<label className='text-left'>Nombre del solicitante</label>
				<input value={username} onChange={(e)=>{
					setUsername(e.target.value)
				}} type="text" className="py-2 px-3 text-sm border border-gray-200 border-solid h-10 rounded-md" placeholder="Nombre" />
				</div>

				<div className="flex gap-1 flex-col">
					<label className='text-left'>Selecciona el nivel del examen</label>
					<Select value={level} onValueChange={(v) => {
						setLevel(v as Exercise["level"])
					}}>
						<SelectTrigger>
							<SelectValue placeholder="Selecciona un nivel" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Niveles JLPT</SelectLabel>
								<SelectItem value="N5">N5</SelectItem>
								<SelectItem value="N4">N4</SelectItem>
								<SelectItem value="N3">N3</SelectItem>
								<SelectItem value="N2">N2</SelectItem>
								<SelectItem value="N1">N1</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className="flex flex-col gap-1">
				<div className="flex items-center space-x-2">
					<Checkbox id="terms" checked={strict} onCheckedChange={(c)=>{
						setStrict(c as boolean)
					}}/>
					<label
						htmlFor="terms"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Modo estricto
					</label>
				</div>
				<p className='text-sm text-left text-gray-600'>Al acabarse el tiempo, la sección acabará automáticamente y guardará las respuestas que tengas marcadas. Los audios en la última sección se reproduciran automáticamente, no se podrán pausar y no se podrán repetir.</p>
				</div>

				<Button>Generar</Button>
			</form>
			<div className="flex justify-end gap-4">
			<a href="https://manabe.es/" className="flex justify-center items-center">
				<ManabeIcon className='text-[#636ef6]' width={50} height={50}/>
			</a>
			<a href="https://discord.gg/y8P7mpDTcB" className="flex justify-center items-center">
				<DiscordIcon className='text-[#636ef6]' width={50} height={50}/>
			</a>
			</div>
			</div>
		</div>
	)
}
