import { ExamSectionAnswers, ExamSectionCorrected } from "../types/exam"
import { Exercise, ExerciseGroup } from "../types/exercises"
import { api } from "./requests"

export const questionsAPI = {
	getExtraExercises: async () => {
		return api.get<ExerciseGroup[]>("extraexercises")
	},
	getExercises: async (level:Exercise["level"]) => {

		return api.get<{
			exercises:Exercise[],
			extraExercises:ExerciseGroup[]
		}>(`exam/${level}`)
	},
	correctExam: async (sectionAnswers:ExamSectionAnswers[]
	) => {
		const body = {
			sectionAnswers
		}

		return api.post<{sectionAnswers:ExamSectionAnswers[]},ExamSectionCorrected[]>("exam/correct",body)
	}
}
