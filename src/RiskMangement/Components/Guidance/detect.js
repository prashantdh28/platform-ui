import React from 'react'
import detectImg from "../../../Assests/Img/detect.png"

const Detect = () => {
  return (
    <div className="carosole-comp">
    <h2>
    Detect
    </h2>
    <div className="modal-img">
    <img src={detectImg} alt=""/>
    </div> 
    <div className="model-content">
      <p>
      3.1 Test and update detection processes – Develop and test processes and procedures for detecting unauthorized entities and actions on the networks and in the physical environment, including personnel activity. 
      </p>
      <p>
3.2 Maintain and monitor logs – Logs are crucial in order to identify anomalies in your enterprise’s computers and applications.
      </p>
      <p>
3.3 Know the expected data flows for your enterprise – If you know what and how data is expected to be used for your enterprise, you are much more likely to notice when the unexpected happens – and unexpected is never a good thing when it comes to cybersecurity. 
      </p>
      <p>
3.4 Understand the impact of cybersecurity events – If a cybersecurity event is detected, your enterprise should work quickly and thoroughly to understand the breadth and depth of the impact.
      </p>
      </div>
      <h3 className='page-number'>3</h3>
    </div>
  )
}

export default Detect