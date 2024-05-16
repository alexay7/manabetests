import {levelData} from "../types/data";

export function getSections(level:string, category?:string):string[] {
    switch (level) {
        case "N1":{
            if (category) {
                if (category === "vocabulario") {
                    return ["kanji", "contexto", "parafrases", "uso"];
                }
                return ["gramaticafrases", "ordenar"];
            }
            return ["kanji", "contexto", "parafrases", "uso", "gramaticafrases", "ordenar"];
        }
        case "N2":{
            if (category) {
                if (category === "vocabulario") {
                    return ["kanji", "ortografia", "formacion", "contexto", "parafrases", "uso"];
                }
                return ["gramaticafrases", "ordenar"];
            }
            return ["kanji", "ortografia", "formacion", "contexto", "parafrases", "uso", "gramaticafrases", "ordenar"];
        }
        case "N3":{
            if (category) {
                if (category === "vocabulario") {
                    return ["kanji", "ortografia", "contexto", "parafrases", "uso"];
                }
                return ["gramaticafrases", "ordenar"];
            }
            return ["kanji", "ortografia", "contexto", "parafrases", "uso", "gramaticafrases", "ordenar"];
        }
        case "N4":{
            if (category) {
                if (category === "vocabulario") {
                    return ["kanji", "ortografia", "contexto", "parafrases", "uso"];
                }
                return ["gramaticafrases", "ordenar"];
            }
            return ["kanji", "ortografia", "contexto", "parafrases", "uso", "gramaticafrases", "ordenar"];
        }
        default:{
            if (category) {
                if (category === "vocabulario") {
                    return ["kanji", "ortografia", "contexto", "parafrases"];
                }
                return ["gramaticafrases", "ordenar"];
            }
            return ["kanji", "ortografia", "contexto", "parafrases", "gramaticafrases", "ordenar"];
        }
    }
}

export function getJapaneseName(section:string):string {
    const key = section as (keyof typeof levelData);

    return levelData[key].name;
}