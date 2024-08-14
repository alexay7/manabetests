import { Result } from "@/types/results";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ResultsStore = {
    addResult:(result:Result)=>void;

    results:Result[];
};

export const useResultsStore = create(persist<ResultsStore>((set) => ({
    addResult:(result)=>{
        set(state=>{
            return {
                ...state,
                results:[...state.results,result]
            }
        })
    },
    results:[]
}),{
    name:"results-storage",
    storage:createJSONStorage(()=>localStorage)
}))