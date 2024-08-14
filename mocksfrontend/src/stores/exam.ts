import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { Exam } from "../types/exam";
import { Exercise } from "../types/exercises";
import { getQuestionSection } from "../helpers/exercises";

export type ExamSettings={
	strict:boolean
}

type ExamStore = {
    exam: Exam|undefined;
	setExam:(exam:Exam|undefined)=>void;

    answerQuestion: (section:number,question:Pick<Exercise,"_id"|"level"|"category">,answer:number) => void;
	endSection: (section:number,time:number) => void;

	page:number;
	setPage:(page:number)=>void;

	section:number,
	setSection:(section:number)=>void;

	breakForSection:number|undefined;
	setBreakForSection:(breakForSection:number|undefined)=>void;

	settings:ExamSettings;
	setSettings:(settings:ExamSettings)=>void;

	sectionTime:Date|undefined;
	setSectionTime:(sectionTime:Date|undefined)=>void;

	resetExam:()=>void;
};

export const useExamStore = create(persist<ExamStore>((set,get) => ({
	exam: undefined,
	setExam:(exam)=>{
		set({exam})
	},
	answerQuestion: (section,question,answer)=>{
		const {exam} = get()

		if(!exam)return;

		const sectionData=exam.sections[section]
		sectionData.answers[question._id]=answer

		const gradingSection = getQuestionSection(question.category)

		const gradingSectionData = exam.gradingSections[gradingSection]
		gradingSectionData.answers[question._id]=answer

		set(()=>({
			exam:{
				...exam,
				sections:{
					...exam.sections,
					[section]:sectionData
				},
				gradingSections:{
					...exam.gradingSections,
					[gradingSection]:gradingSectionData
				}
			}
		})
		)
	},
	endSection:(section,time)=>{
		const {exam} = get()

		if(!exam)return;

		const gradingSectionData = exam.gradingSections[section]
		gradingSectionData.time=time

		set(()=>({
			exam:{
				...exam,
				gradingSections:{
					...exam.gradingSections,
					[section]:gradingSectionData
				}
			}
		})
		)
	},
	page:0,
	setPage:(page)=>{
		set({page})
	},
	section:1,
	setSection: (section)=>{
		set({section})

		// Search all the inputs and reset them
		const inputs = document.querySelectorAll("input[type='radio']") as NodeListOf<HTMLInputElement>;

		inputs.forEach((input)=>{
			input.checked=false
		})

		// Reset page
		set({page:0})
	},
	breakForSection:undefined,
	setBreakForSection:(breakForSection)=>{
		set({breakForSection})
	},
	settings:{
		strict:false
	},
	setSettings:(settings)=>{
		set({settings})
	},
	sectionTime:undefined,
	setSectionTime:(sectionTime)=>{
		set({sectionTime})
	},
	resetExam:()=>{
		set({
			exam:undefined,
			page:0,
			section:1,
			breakForSection:undefined,
			sectionTime:undefined
		})
	}
}),{
	name:"exam-store",
	storage:createJSONStorage<ExamStore>(()=>localStorage)
}
));