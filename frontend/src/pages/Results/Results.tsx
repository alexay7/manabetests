import React from "react";

import {Link} from "react-router-dom";

import {ReactComponent as BatsuIcon} from "../../assets/icons/batsu.svg";
import {ReactComponent as HomeIcon} from "../../assets/icons/home.svg";
import {ReactComponent as MaruIcon} from "../../assets/icons/maru.svg";
import {ReactComponent as QuestionIcon} from "../../assets/icons/question.svg";
import PageContainer from "../../components/PageContainer/PageContainer";
import {useTest} from "../../contexts/TestContext";

function Results():React.ReactElement {
    const {answered} = useTest();

    return (
        <PageContainer>
            <div className="w-full py-3 flex justify-center">
                <Link to="/">
                    <HomeIcon className="text-blue-500 w-12 bg-white border-blue-600 border-2 rounded-full p-2 hover:text-white hover:bg-blue-500 hover:border-white"/>
                </Link>
            </div>
            <div className="text-white text-center text-4xl my-4 font-semibold">結果発表</div>
            <div className="bg-white rounded-lg p-4 flex items-center gap-2 flex-wrap w-5/6 mx-auto justify-around">
                {answered.map((q, i)=>{
                    switch (q) {
                        case 1:
                            return (<MaruIcon className="text-green-500 w-1/12" key={i}/>);
                        case 2:
                            return (<BatsuIcon className="text-red-500 w-1/12" key={i}/>);
                        default:
                            return (<QuestionIcon className="text-gray-500 w-1/12" key={i}/>);
                    }
                })}
            </div>
            <div className="flex justify-center w-full">
                <h4 className="text-white text-xl font-semibold my-2">{answered.filter((x)=>x === 1).length}/{answered.length}</h4>
            </div>
            <div className="flex justify-center my-4">
                <Link to="/quiz" className="bg-white text-xl font-semibold text-blue-500 border-blue-500 border-2 rounded-lg hover:bg-blue-500 hover:border-white hover:text-white px-4 py-2">もう一回</Link>
            </div>
            <div className="flex justify-center my-4">
                <Link to="/" className="bg-white text-xl w-1/3 text-center font-semibold text-blue-700 border-blue-700 border-2 rounded-lg hover:bg-blue-700 hover:border-white hover:text-white px-4 py-2">戻る</Link>
            </div>
        </PageContainer>
    );
}

export default Results;