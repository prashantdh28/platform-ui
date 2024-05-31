import { Dialog, DialogContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./customComponent.css";

function CustomMarkDownDailogueBox({
  content,
  readMoreChars,
  customClassNames,
  headerName,
  dailogContet,
  color,
  classForDailogueContent,
  classForDailogueBox,
  textForOpenModal,
  ShowDes,
  addDailogueContent,
}) {
  const [expanded, setExpanded] = useState(false);
  const [charsToShow] = useState(readMoreChars);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [content]);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const parseMarkdown = (text) => {
    if (typeof text !== "string") {
      return "";
    }

    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\[(.*?)\]\((.*?)\)/g, (match, text, url) => {
        return `<a href="${url}" target="_blank" style="color: rgb(32, 164, 39);">${text}</a>`;
      })
      .replace(
        /!\[(.*?)\]\((.*?)\)/g,
        '<img alt="$1" src="$2" target="_blank"/>'
      )
      .replace(
        /`(.*?)`/g,
        '<span style="background-color: var(--TID-ThreatCoverage-Subheaders); color:var(--name-email); padding: 0.0em 0.9em; border-radius: 1.3rem; fontSize:85%;">$1</span>'
      )
      .replace(/\n/g, "<br/>");
    // .replace(/(\r\n|\r|\n|\t)/g, "<br>");
  };

  const renderMarkdown = () => {
    if (typeof content !== "string") {
      return null;
    }

    // const readMoreLessText = expanded ? "Show less..." : "...read more";
    const displayedText = expanded
      ? parseMarkdown(content)
      : parseMarkdown(content?.slice(0, charsToShow));

    return (
        <div className={`${customClassNames}`}>
            {content && (
                <>
                    {charsToShow && content.length > charsToShow ? (
                        <>
                            {ShowDes ? (
                                <span
                                    dangerouslySetInnerHTML={{ __html: displayedText }}
                                    style={{ color: color ? color : "white" }}
                                />
                            ) : (
                                ""
                            )}
                            <span
                                onClick={openDialog}
                                className=""
                                style={{ color: "rgb(32, 164, 39)", cursor: "pointer" }}
                            >
                                {textForOpenModal}
                            </span>
                        </>
                    ) : (
                        <span
                            style={{ color: color ? color : "white", cursor: "pointer" }}
                            onClick={openDialog}
                        >
                            <span>{content}</span>
                        </span>
                    )}

                    <Dialog
                        open={dialogOpen}
                        onClose={closeDialog}
                        className="Dailogue-container-Box"
                        disablePortal
                        sx={{
                            "& .MuiPaper-root": {
                                maxWidth: "55rem",
                            },
                        }}
                    >
                        <div className={classForDailogueBox}>
                            <div className="dailogue-header">
                                <span className="">
                                    <h3>{headerName}</h3>
                                </span>
                                <span className="" style={{ cursor: "pointer" }}>
                                    <AiOutlineClose onClick={closeDialog} />
                                </span>
                            </div>
                            <DialogContent
                                style={{ paddingLeft: "20px" }}
                                className={classForDailogueContent}
                            >
                                {addDailogueContent && addDailogueContent ? (
                                    addDailogueContent
                                ) : (
                                    <span
                                        // id={"TID-DialogeContent-Markdown"}
                                        dangerouslySetInnerHTML={{
                                            __html: parseMarkdown(dailogContet ? dailogContet : content),
                                        }}
                                    />
                                )}
                            </DialogContent>
                        </div>
                    </Dialog>
                </>
            )}
        </div>
    );
  };

  return <div>{renderMarkdown()}</div>;
}

export default CustomMarkDownDailogueBox;
