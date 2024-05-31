import React from 'react'
import protectImg from "../../../Assests/Img/protect.png"


const Protect = () => {
  return (
    <div className="carosole-comp">
    <h2>
    Protect
    </h2>
    <div className="modal-img">
    <img src={protectImg} alt=""/>
    </div> 
    <div className="model-content">
      <p>
      2.1 Manage access to assets and information – Create unique accounts for each employee and ensure that users only have access to information, computers, and applications that are needed for their jobs.
      </p>
      <p>
      2.2 Protect sensitive data – If your enterprise stores or transmits sensitive data, make sure that this data is protected by encryption both while it’s stored on computers as well as when it’s transmitted to other parties.
      </p>
      <p>
      2.3 Conduct regular backups – Many operating systems have built-in backup capabilities; software and cloud solutions are also available that can automate the backup process.
      </p>
      <p>
      2.4 Protect your devices – Consider installing hostbased firewalls and other protections such as endpoint security products. 
      </p>
      <p>
      2.5 Manage device vulnerabilities – Regularly update both the operating system and applications that are installed on your computers and other devices to protect them from attack. 
      </p>
      <p>
2.6 Train users – Regularly train and retrain all users to be sure that they are aware of enterprise cybersecurity policies and procedures and their specific roles and responsibilities as a condition of employment.
      </p>
    </div>
    <h3 className='page-number'>2</h3>
    </div>

  )
}

export default Protect