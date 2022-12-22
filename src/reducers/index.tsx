import { combineReducers } from "redux";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import permissionReducer from "./permissionReducer";
import configReducer from "./configReducer";
import eventsReducer from "./eventsReducer";
import customerReducer from "./customerReducer";
import templateReducer from "./templateReducer";
import brokersReducer from "./brokersReducer";
import lookupReducer from "./lookupReducer";
import orderReducer from "./orderReducer";
import deliveryReducer from "./deliveryReducer";
import invoiceReducer from "./invoiceReducer";
import ratesReducer from "./ratesReducer";
import ediQueueReducer from "./ediQueueReducer";
import rulesReducer from "./rulesReducer";

// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
    posts: postReducer,
    auth: authReducer,
    permissions: permissionReducer,
    events: eventsReducer,
    config: configReducer,
    customers: customerReducer,
    brokers: brokersReducer,
    template: templateReducer,
    lookups: lookupReducer,
    orders: orderReducer,
    delivery: deliveryReducer,
    invoice: invoiceReducer,
    rates: ratesReducer,
    ediQueue: ediQueueReducer,
    rules: rulesReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
