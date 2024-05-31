import React from 'react'
import recoverImg from "../../../Assests/Img/recover.png"

const Recover = () => {
  return (
    <div className="carosole-comp">
    <h2>
    Recover
    </h2>
    <div className="modal-img">
    <img src={recoverImg} alt=""/>
    </div> 
    <div className="model-content">
      <p>
      5.1 Communicate with internal and external stakeholders – Part of recovery depends upon effective communication. Your recovery plans need to carefully account for what, how, and when information will be shared with various stakeholders so that all interested parties receive the information they need but no inappropriate information is shared.
      </p>
      <p>
5.2 Ensure recovery plans are updated – As with response plans, testing execution will improve employee and partner awareness and highlight areas for improvement. Be sure to update Recovery plans with lessons learned.
      </p>
      <p>
5.3 Manage public relations and company reputation – One of the key aspects of recovery is managing the enterprise’s reputation. When developing a recovery plan, consider how you will manage public relations so that your information sharing is accurate, complete, and timely – and not reactionary.      
      </p>
    </div>
    <h3 className='page-number'>5</h3>
    </div>

  )
}

export default Recover