import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistReducer, persistStore, PERSIST } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use local storage for persisting data
import { stompMiddleware } from "../Middleware/stomp-middleware";
import { rootReducer } from "./rootReducer";

const persistConfig = {
    key: "root",
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: { ignoreActions: [PERSIST] } }).concat(
            logger,
            stompMiddleware
        ),
});

export const persistor = persistStore(store);
