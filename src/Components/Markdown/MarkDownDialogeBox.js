import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dialog, DialogContent } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import "../../TID/Components/TIDTables/CoaTable/TableModals/RichTextModal.css";

function MarkDownDialogeBox({
  content,
  readMoreChars,
  customClassNames,
  headerName,
  dailogContet,
}) {
  const [expanded, setExpanded] = useState(false);
  const [charsToShow] = useState(readMoreChars);
  const [dialogOpen, setDialogOpen] = useState(false);
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  const TextColor = useSelector((state) => state.theme.TextColor);

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
        return `<a href="${url}" target="_blank" style="color: ${TextColor}; color: ${BackgroundColor};">${text}</a>`;
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

    const readMoreLessText = expanded ? "Show less..." : "...Read more";
    const displayedText = expanded
      ? parseMarkdown(content)
      : parseMarkdown(content?.slice(0, charsToShow));

    return (
      <div className={`${customClassNames}`}>
        {content && (
          <>
            {charsToShow && content.length > charsToShow ? (
              <>
                <span dangerouslySetInnerHTML={{ __html: displayedText }} />
                <span
                  onClick={openDialog}
                  className="read-more"
                  style={{ color: BackgroundColor, cursor: "pointer" }}
                >
                  {readMoreLessText}
                </span>
              </>
            ) : (
              <span style={{ cursor: "pointer" }} onClick={openDialog}>
                <u>{content}</u>
              </span>
            )}

            <Dialog open={dialogOpen} onClose={closeDialog}>
              <div style={{ padding: "0.5rem" }}>
                <span className="TID-sub-control-close-icon">
                  <span className="header-span">
                    <h3
                      style={{ color: BackgroundColor }}
                      id="Dialogebox-header-TID"
                    >
                      {headerName}
                    </h3>
                  </span>
                  <span className="TID-close-icon">
                    <AiOutlineClose onClick={closeDialog} />
                  </span>
                </span>
                <DialogContent style={{ paddingLeft: "20px" }}>
                  <span
                    id="TID-DialogeContent-Markdown"
                    dangerouslySetInnerHTML={{
                      __html: parseMarkdown(
                        dailogContet ? dailogContet : content
                      ),
                    }}
                  />
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

export default MarkDownDialogeBox;
