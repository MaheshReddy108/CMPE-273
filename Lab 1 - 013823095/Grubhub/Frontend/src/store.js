import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./state";
import thunkMiddleware from "redux-thunk";
import { logger } from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(logger, thunkMiddleware)));
