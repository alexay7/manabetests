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
    }
  });
  const choosen = keys[Math.floor(Math.random() * keys.length)];
  response[choosen] += questionNum - totalQuestions;

  return response;
}
