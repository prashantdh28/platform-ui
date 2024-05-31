import { useSelector } from "react-redux";

export const useImageDisplay = () => {
    const EntityImage = useSelector((state) => state.entity.allEntityimg);

    const getImage = (nodeType) => {
        let nodeImage = "";
        if (EntityImage && EntityImage.length > 0) {
            for (let i = 0; i < EntityImage.length; i++) {
                const Entity = EntityImage[i];
                const image =
                    Entity.images &&
                    Entity.images.length > 0 &&
                    Entity.images.filter((image) => {
                        // console.log(image?.data?.nodeType === nodeType, "image?.data?.nodeType === nodeType");
                        return image?.data?.nodeType === nodeType;
                    });
                if (image[0]) {
                    nodeImage = image[0];
                }
            }
        }
        return nodeImage;
    };
    return [getImage];
};
