import React from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

const CustomMarkdownPreview = ({ source, ...rest }) => {
    return (
        <>
            <MarkdownPreview
                source={source}
                className="generated-detail-box"
                wrapperElement={{
                    "data-color-mode": "dark",
                }}
                {...rest}
            />
        </>
    );
};

export default CustomMarkdownPreview;
