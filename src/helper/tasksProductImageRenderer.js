import ciscoLogo from "../Assests/Img/task-products/cisco-umbrella-logo.png";
import ciscoAnnyconnectLogo from "../Assests/Img/task-products/cisco-annyconnect.png";
import cloud from "../Assests/Img/task-products/cloudflare-logo.png";
import azureActive from "../Assests/Img/task-products/azure-active-directory-logo.png";
import cloudflare from "../Assests/Img/task-products/cloudflare-logo.png";
import emailAuthentication from "../Assests/Img/task-products/email-authentication-logo.png";
import microsoftDefender from "../Assests/Img/task-products/microsoft-defender-logo.png";
import microsoftIntune from "../Assests/Img/task-products/microsoft-intune-logo.png";
import office365 from "../Assests/Img/task-products/office-365.jpg";
import office365Logo from "../Assests/Img/task-products/office365-logo.png";
import oktaLogo from "../Assests/Img/task-products/okta-logo.png";
import policy from "../Assests/Img/task-products/policy.png";
import sentialone from "../Assests/Img/task-products/sentialone-logo.png";

export const renderTaskProduct = (logo) => {
    switch (logo) {
        case "cisco-umbrella-logo.png":
            return ciscoLogo;
        case "cisco-annyconnect.png":
            return ciscoAnnyconnectLogo;
        case "cloud-flare.jpg":
            return cloud;
        case "azure-active-directory-logo.png":
            return azureActive;
        case "cloudflare-logo.png":
            return cloudflare;
        case "email-authentication-logo.png":
            return emailAuthentication;
        case "microsoft-defender-logo.png":
            return microsoftDefender;
        case "office365-logo.png":
            return office365Logo;
        case "office-365.jpg":
            return office365;
        case "microsoft-intune-logo.png":
            return microsoftIntune;
        case "okta-logo.png":
            return oktaLogo;
        case "policy.png":
            return policy;
        case "sentialone-logo.png":
            return sentialone;
        default:
            return null;
    }
};
