import React, { HTMLAttributes } from "react";

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
    children:React.ReactNode
}

function PageContainer(props:PageContainerProps):React.ReactElement {
    const {children, ...divProps} = props;

    return (
        <div className="w-full min-h-screen h-full bg-gradient-to-t from-main-dark to-main max-w-lg m-auto lg:border-x-4 lg:border-black pb-8" {...divProps}>
            {children}
        </div>
    );
}

export default PageContainer;