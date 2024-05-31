import React from 'react'
import identifyImg from "../../../Assests/Img/identify.png"


const Identify = () => {
  return (
      <div className="carosole-comp">
          <h2>
    Identify
    </h2>
    <div className="modal-img">
    <img src={identifyImg} alt=""/>
    </div> 
    <div className="model-content">
      <p>
      1.1 Identify critical enterprise processes and assets – What are your enterprise’s activities that absolutely must continue in order to be viable?
      </p>
      <p>
1.2 Document information flows – It’s important to not only understand what type of information your enterprise collects and uses
      </p>
      <p>
1.3 Maintain hardware and software inventory – It’s important to have an understanding of the computers and software in your enterprise because these are frequently the entry points of malicious actors.
      </p>
      <p>
1.4 Establish policies for cybersecurity that include roles and responsibilities – These policies and procedures should clearly describe your expectations for how cybersecurity activities will protect your information and systems, and how they support critical enterprise processes. 
      </p>
      <p>
1.5 Identify threats, vulnerabilities, and risk to assets – Ensure risk management processes are established and managed to ensure internal and external threats are identified, assessed, and documented in risk registers.
      </p>
      </div>
      <h3 className='page-number'>1</h3>
    </div>  )
}

export default Identify