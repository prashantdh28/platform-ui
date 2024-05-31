import React, { useRef, useEffect } from "react";
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";
import "@syncfusion/ej2-react-richtexteditor/styles/material.css";
// import "src\TID\Components\TIDTables\CoaTable\TableModals\RichTextModal.css" "
import "../../TID/Components/TIDTables/CoaTable/TableModals/RichTextModal.css"  
// D:\Development\platform-ui\src\RiskMangement\Components\GenerateReport\generateReport.css
import "../../RiskMangement/Components/GenerateReport/generateReport.css"

const RichTextEditor = ({
  height,
  value,
  onChange,
  onClick,
  style,
  className,
  id,
  open,
}) => {
  const rteRef = useRef(null);

  useEffect(() => {
    if (rteRef.current) {
      rteRef.current.value = value;
    }
  }, [value]);


  return (
      <RichTextEditorComponent
          ref={rteRef}
          height={height}
          change={(e) => onChange && onChange(e.value)}
          onClick={onClick}
          style={style}
          className={className}
          id={id}
          open={open}
      >
          <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
      </RichTextEditorComponent>
  );
};

export default RichTextEditor;
