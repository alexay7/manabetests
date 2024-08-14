export function getLevelQuestions(level: string, questionNum: number) {
  const response = {
    kanji: 0,
    parafrases: 0,
    ortografia: 0,
    ordenar: 0,
    uso: 0,
    gramaticafrases: 0,
    formacion: 0,
    contexto: 0,
    total: 0,
  };

  switch (level) {
    case 'N1': {
      response.total = 42;
      response.kanji = Math.round((6 * questionNum) / response.total);
      response.contexto = Math.round((7 * questionNum) / response.total);
      response.parafrases = Math.round((6 * questionNum) / response.total);
      response.uso = Math.round((6 * questionNum) / response.total);
      response.gramaticafrases = Math.round(
        (12 * questionNum) / response.total,
      );
      response.ordenar = Math.round((5 * questionNum) / response.total);
      break;
    }
    case 'N2': {
      response.total = 49;
      response.kanji = Math.round((5 * questionNum) / response.total);
      response.ortografia = Math.round((5 * questionNum) / response.total);
      response.formacion = Math.round((5 * questionNum) / response.total);
      response.contexto = Math.round((7 * questionNum) / response.total);
      response.parafrases = Math.round((5 * questionNum) / response.total);
      response.uso = Math.round((5 * questionNum) / response.total);
      response.gramaticafrases = Math.round(
        (12 * questionNum) / response.total,
      );
      response.ordenar = Math.round((5 * questionNum) / response.total);
      break;
    }
    case 'N3': {
      response.total = 50;
      response.kanji = Math.round((8 * questionNum) / response.total);
      response.ortografia = Math.round((6 * questionNum) / response.total);
      response.contexto = Math.round((9 * questionNum) / response.total);
      response.parafrases = Math.round((5 * questionNum) / response.total);
      response.uso = Math.round((5 * questionNum) / response.total);
      response.gramaticafrases = Math.round(
        (12 * questionNum) / response.total,
      );
      response.ordenar = Math.round((5 * questionNum) / response.total);
      break;
    }
    case 'N4': {
      response.total = 51;
      response.kanji = Math.round((9 * questionNum) / response.total);
      response.ortografia = Math.round((6 * questionNum) / response.total);
      response.contexto = Math.round((9 * questionNum) / response.total);
      response.parafrases = Math.round((5 * questionNum) / response.total);
      response.uso = Math.round((5 * questionNum) / response.total);
      response.gramaticafrases = Math.round(
        (12 * questionNum) / response.total,
      );
      response.ordenar = Math.round((5 * questionNum) / response.total);
      break;
    }
    case 'N5': {
      response.total = 50;
      response.kanji = Math.round((10 * questionNum) / response.total);
      response.ortografia = Math.round((8 * questionNum) / response.total);
      response.contexto = Math.round((10 * questionNum) / response.total);
      response.parafrases = Math.round((5 * questionNum) / response.total);
      response.gramaticafrases = Math.round(
        (12 * questionNum) / response.total,
      );
      response.ordenar = Math.round((5 * questionNum) / response.total);
      break;
    }
  }
  const totalQuestions =
    response.kanji +
    response.contexto +
    response.formacion +
    response.gramaticafrases +
    response.ordenar +
    response.ortografia +
    response.parafrases +
    response.uso;

  delete response.total;
  const keys = Object.keys(response).filter((x) => {
    switch (level) {
      case 'N1': {
        return !['formacion', 'ortografia'].includes(x);
      }
      case 'N3':
        return x !== 'formacion';

      case 'N4':
        return x !== 'formacion';

      case 'N5':
        return !['formacion', 'uso'].includes(x);
      default:
        return true;
    }
  });
  const choosen = keys[Math.floor(Math.random() * keys.length)];
  response[choosen] += questionNum - totalQuestions;

  return response;
}

export function getRealExamQuestionNum(level:string){
  const response ={
    kanji:0,
    ortografia:0,
    formacion:0,
    contexto:0,
    parafrases:0,
    uso:0,
    gramaticafrases:0,
    ordenar:0,
    gramaticatexto:0,
    textoscortos:0,
		textosmedios:0,
		textoslargos:0,
		textosintegrados:0,
		textostematicos:0,
		textosinformacion:0,
		tareas:0,
		puntosclave:0,
		comprensiongeneral:0,
		expresiones:0,
		respuestarapida:0,
		comprensionintegrada:0
  }

  switch(level){
    case "N1":
      response.kanji = 6;
      response.contexto = 7;
      response.parafrases = 6;
      response.uso = 6;
      response.gramaticafrases = 10;
      response.ordenar = 5;
      response.gramaticatexto = 1;
      response.textoscortos = 4;
      response.textosmedios = 3;
      response.textoslargos = 1;
      response.textosintegrados = 1;
      response.textostematicos = 1;
      response.textosinformacion = 1;
      response.tareas = 1;
      response.puntosclave = 1;
      response.comprensiongeneral = 1;
      response.respuestarapida = 1;
      response.comprensionintegrada = 1;
      break;
    case "N2":
      response.kanji = 5;
      response.ortografia = 5;
      response.formacion = 5;
      response.contexto = 7;
      response.parafrases = 5;
      response.uso = 5;
      response.gramaticafrases = 12;
      response.ordenar = 5;
      response.gramaticatexto = 1;
      response.textoscortos = 5;
      response.textosmedios = 3;
      response.textosintegrados = 1;
      response.textostematicos = 1;
      response.textosinformacion = 1;
      response.tareas = 1;
      response.puntosclave = 1;
      response.comprensiongeneral = 1;
      response.respuestarapida = 1;
      response.comprensionintegrada = 1;
      break;
    case "N3":
      response.kanji = 8;
      response.ortografia = 6;
      response.contexto = 11;
      response.parafrases = 5;
      response.uso = 5;
      response.gramaticafrases = 13;
      response.ordenar = 5;
      response.gramaticatexto = 1;
      response.textoscortos = 4;
      response.textosmedios = 2;
      response.textoslargos = 1;
      response.textosinformacion = 1;
      response.tareas = 1;
      response.puntosclave = 1;
      response.comprensiongeneral = 1;
      response.expresiones = 1;
      response.respuestarapida = 1;
      break;
    case "N4":
      response.kanji = 9;
      response.ortografia = 6;
      response.contexto = 10;
      response.parafrases = 5;
      response.uso = 5;
      response.gramaticafrases = 15;
      response.ordenar = 5;
      response.gramaticatexto = 1;
      response.textoscortos = 4;
      response.textosmedios = 1;
      response.textosinformacion = 1;
      response.tareas = 1;
      response.puntosclave = 1;
      response.expresiones = 1;
      response.respuestarapida = 1;
      break;
    case "N5":
      response.kanji = 12;
      response.ortografia = 8;
      response.contexto = 10;
      response.parafrases = 5;
      response.gramaticafrases = 16;
      response.ordenar = 5;
      response.gramaticatexto = 1;
      response.textoscortos = 3;
      response.textosmedios = 1;
      response.textosinformacion = 1;
      response.tareas = 1;
      response.puntosclave = 1;
      response.expresiones = 1;
      response.respuestarapida = 1;
      break;
  }

  return response;
}