export const removeEmptyKeys = (obj) => {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.filter((item) => removeEmptyKeys(item));
    }

    return Object.keys(obj).reduce(
        (acc, key) => {
            const value = removeEmptyKeys(obj[key]);
            if (value !== undefined && value !== null && value !== "") {
                acc[key] = value;
            }
            return acc;
        },
        Array.isArray(obj) ? [] : {}
    );
};

export const removeEmptyKeysWithArray = (obj) => {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        const filteredArray = obj.map((item) => removeEmptyKeys(item));
        return filteredArray.filter((item) => {
            // Remove both empty objects and empty arrays
            return !(
                (Array.isArray(item) && item.length === 0) ||
                (typeof item === "object" && Object.keys(item).length === 0)
            );
        });
    }

    return Object.keys(obj).reduce(
        (acc, key) => {
            const value = removeEmptyKeys(obj[key]);
            if (
                value !== undefined &&
                value !== null &&
                value !== "" &&
                !(Array.isArray(value) && value.length === 0)
            ) {
                acc[key] = value;
            }
            return acc;
        },
        Array.isArray(obj) ? [] : {}
    );
};


export const checkKeyHasValue = (obj, key) => {
    const cleanObj = removeEmptyKeys(obj);
    // Check if the object exists and has the key
    if (cleanObj && Object.prototype.hasOwnProperty.call(cleanObj, key)) {
        const value = cleanObj[key];
        // Check if the value of the key is not null, undefined, [], or {}
        return value !== null && value !== undefined && !isEmpty(value);
    }
    return false;
};

export const isEmpty = (value) => {
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    if (typeof value === "object" && value !== null && value !== undefined) {
        return Object.keys(value).length === 0;
    }
    return false;
};
