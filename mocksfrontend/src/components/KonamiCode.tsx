import { useToast } from "@/components/ui/use-toast";
import { useExamStore } from "@/stores/exam";
import React, { useEffect } from "react";

export default function KonamiCode():React.ReactElement{
    const {toast}=useToast()
const {modifySetting}=useExamStore()

    // Detect if the user has pressed the Konami Code
    useEffect(() => {
        const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
        let index = 0;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === konamiCode[index]) {
                index++;
            } else {
                index = 0;
            }

            if (index === konamiCode.length) {
                modifySetting("expertMode", true);
                toast({
					title: "Modo experto activado 🤓",
				})
                index = 0;
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return <></>
}