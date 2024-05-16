import React from "react";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children:React.ReactNode
}

function PageContainer(props:PageContainerProps):React.ReactElement {
    const {children, ...divProps} = props;

    return (
        <div className="w-full min-h-screen h-full bg-gradient-to-t from-blue-900 to-blue-400 max-w-lg m-auto lg:border-x-4 lg:border-black pb-8" {...divProps}>
            {children}
        </div>
    );
}

export default PageContainer;