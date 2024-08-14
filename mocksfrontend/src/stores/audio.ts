import { create } from "zustand";

type AudioStore = {
	audio: string |undefined;
	setAudio:(audio:string|undefined)=>void;

    playing: boolean;
    setPlaying:(playing:boolean)=>void;

    previousAudios:string[];
    addToPreviousAudios:(audio:string)=>void;
};

export const useAudioStore = create<AudioStore>((set) => ({
	audio: undefined,
	setAudio:(audio)=>{
		set({audio})
	},
	playing: false,
	setPlaying:(playing)=>{
		set({playing})
	},
	previousAudios:[],
	addToPreviousAudios:(audio)=>{
		set((state)=>({
			previousAudios:[audio,...state.previousAudios]
		}))
	}
}));