import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function CustomMarkdownTag({ content, readMoreChars, customClassNames, containerClass, colorForMarkDown }) {
    const [expanded, setExpanded] = useState(false);
    const [charsToShow] = useState(readMoreChars);
    // const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
    const TextColor = useSelector((state) => state.theme.TextColor);

    useEffect(() => {
        setExpanded(false);
    }, [content]);

    const toggleContent = () => {
        setExpanded(!expanded);
    };

    // const parseMarkdown = (text) => {
    //   if (typeof text !== "string") {
    //     return "";
    //   }

    //   return text
    //     .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    //     .replace(/\*(.*?)\*/g, "<em>$1</em>")
    //     .replace(/\[(.*?)\]\((.*?)\)/g, (match, text, url) => {
    //       return `<a href="${url}" target="_blank" style="color: ${TextColor}; color: ${BackgroundColor};">${text}</a>`;
    //     })
    //     .replace(
    //       /!\[(.*?)\]\((.*?)\)/g,
    //       '<img alt="$1" src="$2" target="_blank"/>'
    //     );
    // };

    const parseMarkdown = (text) => {
        if (typeof text !== "string") {
            return "";
        }

        return text
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/\[(.*?)\]\((.*?)\)/g, (match, text, url) => {
                return `<a href="${url}" target="_blank" style="color: ${TextColor}; color: rgb(32, 164, 39);">${text}</a>`;
            })
            .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" target="_blank"/>')
            .replace(
                /`(.*?)`/g,
                '<span style="background-color: #FFFF00;color: black; padding: 0.125rem 0.25rem; border-radius: 2px;">$1</span>'
            )
            .replace(/\n/g, "<br/>");
    };
    // .replace(/(\r\n|\r|\n|\t)/g, "<br>");

    const renderMarkdown = () => {
        if (typeof content !== "string") {
            return null;
        }

        const readMoreLessText = expanded ? "Show less..." : "  ...Read more";
        const displayedText = expanded
            ? parseMarkdown(content)
            : parseMarkdown(content?.slice(0, charsToShow));

        return (
            <div className={`${customClassNames}`} style={{ color: "rgba(142, 151, 164, 1)" }}>
                <span dangerouslySetInnerHTML={{ __html: displayedText }} />
                {content?.length > charsToShow && (
                    <span
                        onClick={toggleContent}
                        className="read-more"
                        style={{ color: "Green", cursor: "pointer" }}
                    >
                        {readMoreLessText}
                    </span>
                )}
            </div>
        );
    };

    return <div className={containerClass}>{renderMarkdown()}</div>;
}

export default CustomMarkdownTag;
