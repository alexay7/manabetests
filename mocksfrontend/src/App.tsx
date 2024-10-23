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
import KonamiCode from '@/components/KonamiCode'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { Tooltip, TooltipContent } from '@/components/ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'

export default function App() {
	const navigate = useNavigate()

	const { setExam, setSection, modifySetting, resetExam } = useExamStore()
	const {username,setUsername,setLastLevel,setLastStrict,lastLevel,lastStrict}=useUserStore()
	const {toast} = useToast()

	const [level, setLevel] = useState<Exercise["level"]>(lastLevel||"N5")
	const [strict, setStrict] = useState(lastStrict||false)
	const [examCode, setExamCode] = useState("")
	const [showCode,setShowCode] = useState(false);
	const [examDialog,setExamDialog]=useState(false)

	useEffect(() => {
		modifySetting("expertMode", false)
		resetExam()
	}, [resetExam])

	function b64EncodeUnicode(str:string):string {
		return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(_, p1) {
			return String.fromCharCode(parseInt(p1, 16))
		}))
	}

	function b64DecodeUnicode(str:string):string {
		return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
		}).join(''))
	}

	async function createExam():Promise<string>{
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
		modifySetting("strict",strict)

		setLastLevel(level)
		setLastStrict(strict)

		return b64EncodeUnicode(JSON.stringify({sections,gradingSections,level,strict}))
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const code = await createExam();

		if(!showCode){
			navigate("/test");
			return
		}else{
			setExamCode(code);
			setExamDialog(true);
		}
	}

	async function genExamFromCode(){
		if(!examCode.length) {
			toast({
				title:"Error al crear el examen",
				description: "Código de examen inválido",
				variant:"destructive"
			})
			return;
		}

		const data = b64DecodeUnicode(examCode)

		const exam = JSON.parse(data) as {sections: Record<number, {
			title: string;
			index: number;
			questions: ExamCategoryQuestions[];
			answers: Record<string, number>;
			time: number;
		}>, 
		gradingSections: Record<number, {
			title: string;
			index: number;
			questions: ExamCategoryQuestions[];
			answers: Record<string, number>;
			time: number;
		}>, level: Exercise["level"], strict: boolean}

		setExam({
			sections: exam.sections,
			gradingSections: exam.gradingSections,
			level: exam.level
		})
		setSection(1)
		modifySetting("strict",exam.strict)

		setLastLevel(exam.level)
		setLastStrict(exam.strict)

		navigate("/test")
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<Dialog open={examDialog} onOpenChange={setExamDialog}>
				<DialogContent>
			<DialogHeader>
					<DialogTitle>Este es el código generado para tu examen</DialogTitle>
					<DialogDescription>Puedes guardar este código para poder hacer este examen de nuevo en el futuro o compartirlo con más personas para que puedan realizar el mismo examen que tú</DialogDescription>
					</DialogHeader>
					<div className="flex w-full">
						<Tooltip delayDuration={200}>
							<TooltipTrigger className='w-full'>
							<textarea readOnly value={examCode} className='border border-black rounded-md w-full p-2 text-xs cursor-pointer' rows={5}
						onClick={(e)=>{
							// Select all text on click
							e.currentTarget.select()

							// Copy to clipboard
							navigator.clipboard.writeText(examCode)

							toast({
								title:"Código copiado on éxito",
								description: "El código de examen ha sido copiado al portapapeles"
							})
						}}/>
							</TooltipTrigger>
							<TooltipContent>
								Haz click para copiar el código al portapapeles
							</TooltipContent>
						</Tooltip>
					</div>
					<DialogFooter>
					<DialogClose asChild>
					<Button type='button' variant="destructive" onClick={()=>setExamCode("")}>Cerrar</Button>
					</DialogClose>
						<Button type='button' onClick={()=>{
							navigate("/test")
						}}>Empezar examen</Button>
					</DialogFooter>
					</DialogContent>
			</Dialog>
			<div className="flex flex-col gap-2 w-[90%] md:w-1/3">
			<form className="flex flex-col gap-4 bg-dark mx-auto bg-gray-100 p-4 rounded-lg select-none" onSubmit={handleSubmit}>
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
				<div className="flex flex-col gap-1">
				<div className="flex items-center space-x-2">
					<Checkbox id="code" checked={showCode} onCheckedChange={(c)=>{
						setShowCode(c as boolean)
					}}/>
					<label
						htmlFor="code"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Generar código de examen
					</label>
				</div>
				<p className='text-sm text-left text-gray-600'>Antes de empezar el examen se te mostrará un código que podrás almacenar o compartir con otros usuarios para poder realizar el mismo examen de nuevo.</p>
				</div>
				

				<div className="flex w-full justify-between flex-col md:flex-row gap-2">
					<Button>Generar examen</Button>
					<Dialog>
				<DialogTrigger style={{borderColor:"black"}}>Pegar código de examen</DialogTrigger>
				<DialogContent>
					<DialogHeader>
					<DialogTitle>Introduce el código de examen</DialogTitle>
					<DialogDescription>Aquí podrás examinarte de un examen que haya sido generado anteriormente. Puedes usar este modo para hacer exámenes en grupo o repetir pruebas que hayas hecho anteriormente.</DialogDescription>
					</DialogHeader>
					<div className="flex">
						<textarea value={examCode} onChange={(e)=>setExamCode(e.target.value)} className='border border-black rounded-md w-full p-2 text-xs' placeholder='Pega aquí el código del examen'
						rows={5}/>
					</div>
					<DialogFooter>
					<DialogClose asChild>
					<Button type='button' variant="destructive">Cerrar</Button>
					</DialogClose>
						<Button type='button' onClick={genExamFromCode}>Empezar examen</Button>
					</DialogFooter>
				</DialogContent>
				</Dialog>
				</div>
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
			<KonamiCode/>
		</div>
	)
}
