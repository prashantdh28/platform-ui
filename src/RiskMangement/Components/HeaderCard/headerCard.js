import { useSelector } from 'react-redux';
import ButtonComponent from "../../../Components/Button/ButtonBox";
import './headerCard.css';

const HeaderCard = ({setStatus}) => {
    const { riskProfileData, activeTab } = useSelector((state) => state.risk);

    const capitalizeFirstLetter = (inputString) => {
        // Make the first letter uppercase and the rest lowercase
        return inputString?.charAt(0)?.toUpperCase() + inputString?.slice(1)?.toLowerCase();
    }

    return (
        <div className="e-card card-main-container">
            <div className="card-leftside-container">
                <div className="card-leftside">
                    <p className='header-title'>Create a New Risk Profile</p>
                    <p className="header-content">Creating a Risk Profile provides an Organisation the ability to define their Business Objectives and map those Business Objectives to Security Controls in order to understand the Impact of a Security Incident on the assets and also the ways to mitigate the Risk.</p>
                </div>
                {activeTab !== 0 &&
                    <div className="header-profile-section">
                        <p className="header-profile-name"> {riskProfileData?.name}</p>
                        <p className="header-profile-description"> {riskProfileData?.description}</p>
                        <div className="header-deparment-div">
                            <div className="header-profile-department"> {riskProfileData?.department_name}</div>
                            {riskProfileData?.profile_type && <div className="header-profile-department"> {capitalizeFirstLetter(riskProfileData?.profile_type)} Profile</div>}
                        </div>
                    </div>}
            </div>
            <div className='card-rightside'>
                <p className='profile-create-title'>Guidance on how to create a Risk Profile</p>
                <ButtonComponent label="Open" 
                onClick={()=> setStatus(true)}
                />
            </div>
        </div>
    )
}

export default HeaderCard