import MarkdownEditor from "@uiw/react-markdown-editor";
import React, { useState } from "react";

const CustomMarkdownEditor = ({ defaultValue = "", onChange, height,styleSx, ...rest }) => {
    const [markdown, setMarkdown] = useState(defaultValue || "");

    return (
        <div className="wmde-markdown-var">
            <MarkdownEditor
                className="custom-comment-editor"
                value={markdown}
                onChange={(value) => {
                    setMarkdown(value);
                    onChange(value);
                }}
                height={height}
                enablePreview={false}
                enableScroll={true}
                toolbars={["bold", "italic", "underline", "olist", "ulist", "code", "image"]}
                theme={"dark"}
                style={styleSx}
                {...rest}
            />
        </div>
    );
};

export default CustomMarkdownEditor;
