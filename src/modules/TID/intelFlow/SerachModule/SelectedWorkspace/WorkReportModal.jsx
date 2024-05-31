import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import React, { useState } from "react";
import "../searchModule.css";

const WorkReportModal = ({ children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div onClick={handleOpen}>{children}</div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        id="report-workspace-container"
        maxWidth={"xl"}
      >
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            alignrows: "center",
            padding: "1.2rem",
            color: "white",
            fontWeight: "400",
          }}
        >
          <div> Mandiant annual threat report 2024</div>

          <div style={{ cursor: "pointer" }} onClick={handleClose}>
            <CloseIcon sx={{ color: "white" }} />
          </div>
        </DialogTitle>
        <Divider
          sx={{
            background: "#1E2B40",
            borderWidth: "2px",
            margin: "-0.9rem 1.2rem",
          }}
        />
        <DialogContent>
          <div>
            <div style={{ color: "#8E97A4" }}>
              This is the full report for Mandiant annual threat report 2024
            </div>
            <div className="work-report-dsc">
              To hunt for the given TTP (Tactics, Techniques, and Procedures)
              associated with MITRE Technique T1112, which is exploited by
              malware like Black Basta, we will focus on detecting unusual
              modifications in the Windows Registry. This includes enabling
              Registry Auditing for Event ID 4657, monitoring for suspicious
              changes in Registry entries that could indicate malware execution,
              and looking for the use of tools or methods to conceal Registry
              keys such as Reghide.Given the relevant data sources, we will
              construct a query that looks for:1. Creation, modification, or
              deletion of Windows Registry keys.2. Processes and command-line
              arguments indicative of Registry modification or interaction with
              the Windows API for Registry access.3. Use of system management
              tools like PowerShell or WMI for Registry modification, which
              might be indicative of malicious activity.Here's a sample fql
              (Flexible Query Language) query that incorporates these elements.
              Note that this is a conceptual representation and might require
              adjustments based on the specific schema and capabilities of your
              security tools or SIEM platform.```fql// Hunt for suspicious
              Registry modifications related to
              T1112SELECTprocess.name,process.command_line,registry.key_path,registry.action,event.id,process.creation_timeFROMprocess_eventsJOINregistry_events
              ON process.pid = registry.pidWHERE(// Look for Event ID 4657 - A
              registry value was modifiedevent.id = '4657'// Monitor for
              suspicious Registry key modificationsAND registry.key_path LIKE
              '%\CurrentVersion\Run%'OR registry.key_path LIKE
              '%\CurrentVersion\RunOnce%'OR registry.key_path LIKE
              '%\Services%'// Look for modifications that could enable malware
              persistence or execution in safe modeOR registry.key_path LIKE
              '%\SafeBoot%')AND (// Command-line arguments that might indicate
              direct Registry manipulation or use of tools for hiding
              keysprocess.command_line LIKE '%reg add%'OR process.command_line
              LIKE '%reg delete%'OR process.command_line LIKE '%regedit%'OR
              process.command_line LIKE '%powershell%' AND process.command_line
              LIKE '%Set-ItemProperty%'OR process.command_line LIKE '%wmic%'//
              Detecting use of specific tools or methodsOR process.command_line
              LIKE '%reghide%'OR process.command_line LIKE '%RegDelNull%')ORDER
              BYprocess.creation_time DESC;```This query looks for processes
              that are creating, modifying, or deleting Registry keys,
              especially focusing on keys that are commonly used for persistence
              or execution control. It also looks for command-line patterns that
              suggest direct manipulation of the Registry or the use of tools
              and methods known for hiding Registry keys.Remember, the
              effectiveness of this query depends on the logging and monitoring
              capabilities enabled in your environment, such as Registry
              Auditing and command-line logging. Adjustments may be necessary to
              align with the specific data available in your environment.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkReportModal;
