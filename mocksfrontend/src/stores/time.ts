import { create } from "zustand";

type TimerStore = {
	timeLeft:number;
    setTimeLeft:(timeLeft:number)=>void;

    on:boolean;
    start:(seconds:number)=>void;
    stop:()=>void;
    
    extraTime:number;
    setExtraTime:(extraTime:number)=>void;

    resetStopWatch:()=>void;
    startStopWatch:()=>void;
    stopStopWatch:()=>void;
};

export const useTimerStore = create<TimerStore>((set) => ({
	timeLeft:0,
	setTimeLeft:(timeLeft)=>{
		set({timeLeft})
	},
	on:false,
	start:(seconds)=>{
		set({timeLeft:seconds,on:true})
	},
	stop:()=>{
		set({on:false})
	},
	extraTime:0,
	setExtraTime:(extraTime)=>{
		set({extraTime})
	},
	resetStopWatch:()=>{
		set({timeLeft:0})
	},
	startStopWatch:()=>{
		set({on:true})
	},
	stopStopWatch:()=>{
		set({on:false})
	}
}));
