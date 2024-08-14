import { Exercise } from "@/types/exercises";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserStore = {
    username:string|undefined;
    setUsername:(username:string)=>void;

	volume:number;
	setVolume:(volume:number)=>void;

    lastLevel:Exercise["level"];
    setLastLevel:(lastLevel:Exercise["level"])=>void;

    lastStrict:boolean;
    setLastStrict:(lastStrict:boolean)=>void;
};

export const useUserStore = create(persist<UserStore>((set) => ({
    username:undefined,
    setUsername:(username)=>{
        set({username})
    },
	volume:100,
	setVolume:(volume)=>{
		set({volume})
	},
    lastLevel:"N5",
    setLastLevel:(lastLevel)=>{
        set({lastLevel})
    },
    lastStrict:false,
    setLastStrict:(lastStrict)=>{
        set({lastStrict})
    }
}),{
    name:"user-storage",
    storage:createJSONStorage(()=>localStorage)
}))