import React, { LiHTMLAttributes } from "react";

interface AnswerButtonProps extends LiHTMLAttributes<HTMLLIElement> {
    text:string;
    correct?:boolean
    incorrect?:boolean;
    disabled?:boolean;
}

function AnswerButton(props:AnswerButtonProps):React.ReactElement {
    const {text, correct, incorrect, disabled, ...liProps} = props;

    let buttonColor = "bg-white border-blue-500 hover:bg-blue-500 hover:text-white duration-200";

    if (disabled) {
        buttonColor = "bg-gray-200 border-bg-gray-300 cursor-default";
    }

    if (correct) {
        buttonColor = "bg-green-500 border-green-600 text-white font-semibold";
    }

    if (incorrect) {
        buttonColor = "bg-red-500 border-red-600 text-white font-semibold";
    }

    return (
        <li className={`${buttonColor} border-2 rounded-full w-full px-4 py-2 cursor-pointer text-lg text-center`} {...liProps}>
            {text}
        </li>
    );
}

export default AnswerButton;