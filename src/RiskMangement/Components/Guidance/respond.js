import React from 'react'
import respondImge from "../../../Assests/Img/respond.png"


const Respond = () => {
  return (
    <div className="carosole-comp">
    <h2>
    Respond
    </h2>
    <div className="modal-img">
    <img src={respondImge} alt=""/>
    </div> 
    <div className="model-content">
      <p>
      4.1 Ensure response plans are tested – It’s even more important to test response plans to make sure each person knows their responsibilities in executing the plan. The better prepared your organization is, the more effective the response is likely to be.
      </p>
      <p>
4.2 Ensure response plans are updated – Testing the plan (and execution during an incident) inevitably will reveal needed improvements. Be sure to update response plans with lessons learned.
      </p>
      <p>
4.3 Coordinate with internal and external stakeholders – It’s important to make sure that your enterprise’s response plans and updates include all key stakeholders and external service providers. They can contribute to improvements in planning and execution.
      </p>
      </div>
      <h3 className='page-number'>4</h3>
    </div>
  )
}

export default Respond