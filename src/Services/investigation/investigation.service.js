// import { axiosWrapper } from "../../helper";
import axios from "axios";
// import { format } from "../../helper/dateFormater";

const BASE_URL = process.env.REACT_APP_API_BASE_URL_INVESTIGATION || "https://api.unitedplatform.org";

export const updateInvestigationStatus = async (id, reqestBody) => {
    try {
        const response = await axios.patch(`${BASE_URL}/inv/api/v1/investigation/${id}/review`, reqestBody);
        return response.data;
    } catch (error) {
        console.error(error.message, "Error message");
    }
};

export const createEntity = async (id, reqestBody) => {
    try {
        const response = await axios.post(`${BASE_URL}/inv/api/v1/entity?investigationId=${id}`, reqestBody);
        return response.data;
    } catch (error) {
        console.error(error.message, "Error message");
    }
};

export const deleteEntity = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/inv/api/v1/entity/${id}`);
        return response.data;
    } catch (error) {
        console.error(error.message, "Error message");
    }
};

export const createRelation = async (reqestBody) => {
    try {
        // const { year, day, month, hours, minutes } = format(new Date());
        // const startDate = reqestBody.startDate
        //     ? reqestBody.startDate
        //     : `${year}-${month}-${day} ${hours}:${minutes}`;
        // const endDate = reqestBody.startDate
        //     ? reqestBody.startDate
        //     : `${year}-${month}-${day} ${hours}:${minutes}`;
        const reqestObject = { type: reqestBody.type };
        const response = await axios.post(`${BASE_URL}/inv/api/v1/entity/relation`, reqestObject);
        return response.data;
    } catch (error) {
        console.error(error.message, "Error message");
    }
};

export const createRelationShip = async ({ sourceEntityID, targetEntityId, relationShipId, type }) => {
    try {
        const reqestBody = { relationShipId, type };
        const response = await axios.post(
            `${BASE_URL}/inv/api/v1/entity/relation/from/${sourceEntityID}/to/${targetEntityId}`,
            reqestBody
        );
        return response.data;
    } catch (error) {
        console.error(error.message, "Error message");
    }
};
