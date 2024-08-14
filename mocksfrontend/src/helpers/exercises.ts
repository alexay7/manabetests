import { Exam, ExamCategoryQuestions, ExamSectionCorrected} from "../types/exam";
import { Exercise, ExerciseGroup } from "../types/exercises";

export const levelData = {
	kanji:{
		"name":"漢字読み",
		"spanish_name":"Lectura de kanjis",
		"description":"_____の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。",
		"title":{
			"preN3":"言語知識（文字・語彙）",
			"postN3":"言語知識（文字・語彙・文法）・読解"
		}
	},
	ortografia:{
		"name":"表記",
		"spanish_name":"Ortografía",
		"description":"問題＿＿＿の言葉を漢字で書くとき、最もよいものを１・２・３・４から一つ選びなさい。",
		"title":{
			"preN3":"言語知識（文字・語彙）",
			"postN3":"言語知識（文字・語彙・文法）・読解"
		}
	},
	formacion:{
		"name":"語形成",
		"spanish_name":"Formación de palabras",
		"description":"問題（　　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
		"title":{
			"preN3":"言語知識（文字・語彙）",
			"postN3":"言語知識（文字・語彙・文法）・読解"
		}
	},
	contexto:{
		"name":"文脈規定",
		"spanish_name":"Contexto",
		"description":"_____に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
		"title":{
			"preN3":"言語知識（文字・語彙）",
			"postN3":"言語知識（文字・語彙・文法）・読解"
		}
	},
	parafrases:{
		"name":"言い換え類義",
		"spanish_name":"Parafrases",
		"description":"_____の言葉に意味が最も近ものを、１・２・３・４から一つ選びなさい。",
		"title":{
			"preN3":"言語知識（文字・語彙）",
			"postN3":"言語知識（文字・語彙・文法）・読解"
		}
	},
	uso:{
		"name":"用法",
		"spanish_name":"Uso de palabras",
		"description":"次の言葉の使い方として最もよいものを、１・２・３・４から一つ選びなさい。",
		"title":{
			"preN3":"言語知識（文字・語彙）",
			"postN3":"言語知識（文字・語彙・文法）・読解"
		}
	},
	gramaticafrases:{
		"name":"文法形式の判断",
		"spanish_name":"Formas Gramaticales",
		"description":"次の文の_____に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
		"title":{
			"preN3":"言語知識（文法）・読解",
			"postN3":"言語知識（文字・語彙・文法）・読解"
		}
	},
	ordenar:{
		"name":"文の組み立て",
		"spanish_name":"Orden de frases",
		"description":"次の文の＿★＿に入れる最も良いものを、１・２・３・４から一つ選びなさい。",
		"title":{
			"preN3":"言語知識（文法）・読解",
			"postN3":"言語知識（文字・語彙・文法）・読解"
		}
	},
	gramaticatexto:{
		"name":"文章の文法",
		"spanish_name":"Gramática textual",
		"description":"次の文章を読んで、文章全体の趣旨を踏まえて、41から入る最もよいものを、1・2・3・4から一つ選びなさい。",
		"title":{
			"preN3":"言語知識（文法）・読解",
			"postN3":"言語知識（文字・語彙・文法）・読解"
		}
	},
	textoscortos:{
		name:"内容理解（短文)",
		spanish_name:"Comprensión de textos cortos",
		description:"次の文章を読んで、 後の問いに対する答えとして、 最もよいものを1・2・3・4 から一つ 選びなさい。",
		title:{
			preN3:"言語知識（文法）・読解",
			postN3:"言語知識（文字・語彙・文法）・読解"
		}
	},
	textosmedios:{
		name:"内容理解（中文)",
		spanish_name:"Comprensión de textos medianos",
		description:"次の文章を読んで、 後の問いに対する答えとして、 最もよいものを 1・2・3・4 から一つ 選びなさい。",
		title:{
			preN3:"言語知識（文法）・読解",
			postN3:"言語知識（文字・語彙・文法）・読解"
		}
	},
	textoslargos:{
		name:"内容理解（長文)",
		spanish_name:"Comprensión de textos largos",
		description:"次の文章を読んで、後の問いに対する答えとして、最もよいものを、1・2・3・4 から一つ選びなさい。",
		title:{
			preN3:"言語知識（文法）・読解",
			postN3:"言語知識（文字・語彙・文法）・読解"
		}
	},
	textosintegrados:{
		name:"統合理解",
		spanish_name:"Comprensión integrada",
		description:"次のAとBの意見文を読んで、 後の問いに対する答えとして最もよいものを、1・2・3・4 から一つ選びなさい。",
		title:{
			preN3:"言語知識（文法）・読解",
			postN3:"言語知識（文字・語彙・文法）・読解"
		}
	},
	textostematicos:{
		name:"主張理解",
		spanish_name:"Comprensión de textos temáticos",
		description:"次の文章を読んで、後の問いに対する答えとして、最もよいものを、1• 2 • 3 • 4 から一つ選びなさい。",
		title:{
			preN3:"言語知識（文法）・読解",
			postN3:"言語知識（文字・語彙・文法）・読解"
		}
	},
	textosinformacion:{
		name:"情報検索",
		spanish_name:"Búsqueda de información",
		description:"のページは、ある____である。下の問いに 対する答えとして最もよいものを、1・2・3・4 から一つ選びなさい。",
		title:{
			preN3:"言語知識（文法）・読解",
			postN3:"言語知識（文字・語彙・文法）・読解"
		}
	},
	tareas:{
		name:"課題理解",
		spanish_name:"Comprensión de tareas",
		description:"まず質問を聞いてください。それから話を聞いて、問題用紙の1 から 4 の中から、最もよいものを一つ選んでください。",
		title:{
			preN3:"聴解",
			postN3:"聴解"
		},
	},
	puntosclave:{
		name:"ポイント理解",
		spanish_name:"Comprensión de puntos clave",
		description:"まず質問を聞いてください。そのあと、問題用紙のせんたくしを読んでください。読む時間があります。それから話を聞いて、問題用紙の 1から 4 の中から、最もよいものを一つ選んでください。",
		title:{
			preN3:"聴解",
			postN3:"聴解"
		}
	},
	comprensiongeneral:{
		name:"概要理解",
		spanish_name:"Comprensión general",
		description:"問題用紙に何も印刷されていません。この問題は、 全体としてどんな内容かを聞く問題です。話の前に質問はありません。まず話を聞いてください。それから、質問とせんたくしを聞いて、1 から 4 の中から、最もよいものを一つ選んでください。",
		title:{
			preN3:"聴解",
			postN3:"聴解"
		}
	},
	expresiones:{
		name:"発話表現",
		spanish_name:"Expresiones",
		description:"えを見ながら質問を聞いてください。 やじるし(→)の人は何と言いますか。 1から3 の中から、最もよいものを一つえらんでください。",
		title:{
			preN3:"聴解",
			postN3:"聴解"
		}
	},
	respuestarapida:{
		name:"即時応答",
		spanish_name:"Respuesta rápida",
		description:"問題用紙に何もいんさつされていません。 まず文を聞いてください。それから、それに対する返事を聞いて、1 から 3 の中から、最もよいものを一つ選んでください。",
		title:{
			preN3:"聴解",
			postN3:"聴解"
		}
	},
	comprensionintegrada:{
		name:"統合理解",
		spanish_name:"Comprensión integrada",
		description:"長めの話を聞きます。この問題には練習はありません。 メモをとってもかまいません。 1 番、2 番 問題用紙に何もいんさつされていません。まず話を聞いてください。それか ら、質問とせんたくしを聞いて、1 から 4 の中から、最もよいものを一つ選 んでください。",
		title:{
			preN3:"聴解",
			postN3:"聴解"
		}
	}
};

export function getExerciseQuestion(type:Exercise["type"]):string{
	return levelData[type].description;
}

export function getCategoryTitle(type:Exercise["type"],level:Exercise["level"]):string{
	const levelNum = parseInt(level[1]);

	if(levelNum>=3){
		return levelData[type].title.preN3;
	}

	return levelData[type].title.postN3;
}

export function divideCategoriesBySections(level:Exercise["level"],categories:ExamCategoryQuestions[]){
	const sections:Exam["sections"] = {};
	const gradingSections:Exam["gradingSections"]={};

	const times = getExamTimes(level);

	gradingSections[1]={
		answers:{},
		time:0
	}
	gradingSections[2]={
		answers:{},
		time:0
	}
	gradingSections[3]={
		answers:{},
		time:0
	}
	gradingSections[4]={
		answers:{},
		time:0
	}

	switch(level){
	case "N1":
	case "N2":
		// First section has all exercises until listening
		sections[1] = {
			index:1,
			title:getCategoryTitle("kanji",level),
			questions:categories.filter(cat=>cat.category!=="listening"),
			answers:{},
			time:times[0]
		}

		// Second section has listening exercises
		sections[2] = {
			index:2,
			title:getCategoryTitle("tareas",level),
			questions:categories.filter(cat=>cat.category==="listening"),
			answers:{},
			time:times[1]
		}

		break;
	case "N3":
	case "N4":
	case "N5":
		// First section has all vocabulary
		sections[1] = {
			index:1,
			title:getCategoryTitle("kanji",level),
			questions:categories.filter(cat=>cat.category==="vocabulario"),
			answers:{},
			time:times[0]
		};

		// Second section has grammar and reading
		sections[2] = {
			index:2,
			title:getCategoryTitle("gramaticafrases",level),
			questions:categories.filter(cat=>["gramatica","reading"].includes(cat.category)),
			answers:{},
			time:times[1]
		}

		// Third section has listening exercises
		sections[3] = {
			index:3,
			title:getCategoryTitle("tareas",level),
			questions:categories.filter(cat=>cat.category==="listening"),
			answers:{},
			time:times[2]
		}
		break;
	}

	return {sections,gradingSections};
}

export const pointsPerExercise = {
	"N1":{
		kanji:6,
		ortografia:-1,
		formacion:-1,
		contexto:7,
		parafrases:6,
		uso:11,
		gramaticafrases:10,
		ordenar:10,
		gramaticatexto:10,
		textoscortos:8,
		textosmedios:18,
		textoslargos:12,
		textosintegrados:4,
		textostematicos:12,
		textosinformacion:6,
		tareas:11,
		puntosclave:7,
		comprensiongeneral:12,
		expresiones:-1,
		respuestarapida:14,
		comprensionintegrada:16
	},
	"N2":{
		kanji:5,
		ortografia:5,
		formacion:5,
		contexto:7,
		parafrases:5,
		uso:10,
		gramaticafrases:12,
		ordenar:6,
		gramaticatexto:5,
		textoscortos:10,
		textosmedios:27,
		textoslargos:-1,
		textosintegrados:6,
		textostematicos:9,
		textosinformacion:8,
		tareas:10,
		puntosclave:12,
		comprensiongeneral:10,
		expresiones:-1,
		respuestarapida:12,
		comprensionintegrada:16
	},
	"N3":{
		kanji:8,
		ortografia:6,
		formacion:-1,
		contexto:11,
		parafrases:5,
		uso:6,
		gramaticafrases:13,
		ordenar:6,
		gramaticatexto:5,
		textoscortos:12,
		textosmedios:24,
		textoslargos:16,
		textosintegrados:-1,
		textostematicos:-1,
		textosinformacion:8,
		tareas:18,
		puntosclave:12,
		comprensiongeneral:9,
		expresiones:12,
		respuestarapida:9,
		comprensionintegrada:-1
	},
	"N4":{
		kanji:9,
		ortografia:6,
		formacion:-1,
		contexto:10,
		parafrases:5,
		uso:10,
		gramaticafrases:15,
		ordenar:10,
		gramaticatexto:10,
		textoscortos:13,
		textosmedios:20,
		textoslargos:-1,
		textosintegrados:-1,
		textostematicos:-1,
		textosinformacion:12,
		tareas:23,
		puntosclave:14,
		comprensiongeneral:-1,
		expresiones:15,
		respuestarapida:8,
		comprensionintegrada:-1
	},
	"N5":{
		kanji:12,
		ortografia:8,
		formacion:-1,
		contexto:10,
		parafrases:10,
		uso:-1,
		gramaticafrases:16,
		ordenar:10,
		gramaticatexto:10,
		textoscortos:20,
		textosmedios:16,
		textoslargos:-1,
		textosintegrados:-1,
		textostematicos:-1,
		textosinformacion:8,
		tareas:21,
		puntosclave:18,
		comprensiongeneral:-1,
		expresiones:15,
		respuestarapida:6,
		comprensionintegrada:-1
	}
}

export function groupExercisesByType(exercises:(Exercise|ExerciseGroup)[]){
	const groupedExercises:Record<string,(Exercise|ExerciseGroup)[]> = {};

	exercises.forEach(exercise=>{
		if(!groupedExercises[exercise.type]){
			groupedExercises[exercise.type] = [];
		}

		groupedExercises[exercise.type].push(exercise);
	});

	return groupedExercises;
}

export function getSectionGradingSection(level:Exercise["level"],section:number){
	if(level==="N1"||level==="N2"||level==="N3"){
		if(section===1){
			return 1;
		}

		if(section===2){
			return 2;
		}

		return 3;
	}else{
		if(section<3){
			return 1;
		}

		return 2;
	}
}

export function getQuestionSection(category:Exercise["category"]){
	if(category==="vocabulario"){
		return 1;
	}

	if(category==="gramatica"){
		return 2;
	}

	if(category==="reading"){
		return 3;
	}

	return 4;
}

export function gradeExam(exam:Exam,correctedExam:ExamSectionCorrected[]){
	// Check section number

	// Get all exercises of the exam
	const allExercises = Object.values(exam.sections).reduce((acc: (Exercise|ExerciseGroup)[],section)=>{
		section.questions.forEach(category=>{
			category.exercises.forEach(exercise=>{
				if("questions" in exercise){
					exercise.questions.forEach(q=>{
						acc.push(q);
					})
				}else{
					acc.push(exercise);
				}
			})
		})
		return acc;
	},[]);

	const groupedExercises = groupExercisesByType(allExercises);

	const vocab = correctedExam.find(section=>section.section==="1");
		const grammar = correctedExam.find(section=>section.section==="2");
		const read = correctedExam.find(section=>section.section==="3");
		const listen = correctedExam.find(section=>section.section==="4");

		const totalVocabExercises = allExercises.filter(exercise=>exercise.category==="vocabulario");
		const totalGrammarExercises = allExercises.filter(exercise=>exercise.category==="gramatica");
		const totalReadExercises = allExercises.filter(exercise=>exercise.category==="reading");
		const totalListenExercises = allExercises.filter(exercise=>exercise.category==="listening");

	if(!vocab || !grammar || !read || !listen)return {
		vocab:{
			points:0,
			goodExercises:0,
			exercises:totalVocabExercises.length
		},
		grammar:{
			points:0,
			goodExercises:0,
			exercises:totalGrammarExercises.length
		},
		reading:{
			points:0,
			goodExercises:0,
			exercises:totalReadExercises.length
		},
		listening:{
			points:0,
			goodExercises:0,
			exercises:totalListenExercises.length
		}
	}

	const vocabPoints = vocab.corrections.reduce((acc,question)=>{
		if(question.correct){

			return (pointsPerExercise[exam.level][question.type]/groupedExercises[question.type].length)+acc;
		}
		return acc;
	},0);

	const grammarPoints = grammar.corrections.reduce((acc,question)=>{
		if(question.correct){

			return (pointsPerExercise[exam.level][question.type]/groupedExercises[question.type].length)+acc;
		}
		return acc;
	},0);

	const readPoints = read.corrections.reduce((acc,question)=>{
		if(question.correct){

			return (pointsPerExercise[exam.level][question.type]/groupedExercises[question.type].length)+acc;
		}
		return acc;
	},0);

	const listenPoints = listen.corrections.reduce((acc,question)=>{
		if(question.correct){

			return (pointsPerExercise[exam.level][question.type]/groupedExercises[question.type].length)+acc;
		}
		return acc;
	},0);

	return {
		vocab:{
			points:vocabPoints,
			goodExercises:vocab.corrections.reduce((acc,question)=>question.correct?acc+1:acc,0),
			exercises:totalVocabExercises.length
		},
		grammar:{
			points:grammarPoints,
			goodExercises:grammar.corrections.reduce((acc,question)=>question.correct?acc+1:acc,0),
			exercises:totalGrammarExercises.length
		},
		reading:{
			points:readPoints,
			goodExercises:read.corrections.reduce((acc,question)=>question.correct?acc+1:acc,0),
			exercises:totalReadExercises.length
		},
		listening:{
			points:listenPoints,
			goodExercises:listen.corrections.reduce((acc,question)=>question.correct?acc+1:acc,0),
			exercises:totalListenExercises.length
		}
	}
}

export function getExamTimes(level:Exercise["level"]){
	switch(level){
	case "N1":return[110*60,55*60]
	case "N2":return [105*60,50*60]
	case "N3":return [30*60,70*60,40*60]
	case "N4":return [25*60,55*60,35*60]
	case "N5":return [20*60,40*60,30*60]
	}
}