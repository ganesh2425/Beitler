import { all, fork } from "redux-saga/effects";
// import watchAuth from "./watcher";
import postsSaga from "./postsSaga";
import loginSaga from "./authSaga";
import permissionSaga from "./permissionsSaga";
import eventsSaga from "./eventsSaga";
import customerSaga from "./customerSaga";
import templateSaga from "./templateSaga";
import brokerSaga from "./brokerSaga";
import lookupSaga from "./lookupSaga";
import orderSaga from "./orderSaga";
import deliverySaga from "./deliverySaga";
import rateSaga from "./rateSaga";
import invoiceSaga from "./invoiceSaga";
import ediQueueSaga from "./ediQueueSaga";
import rulesSaga from "./rulesSaga";

export default function* startForman(): Generator<never> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        yield all([
                fork(postsSaga),
                fork(loginSaga),
                fork(permissionSaga),
                fork(eventsSaga),
                fork(customerSaga),
                fork(brokerSaga),
                fork(templateSaga),
                fork(lookupSaga),
                fork(orderSaga),
                fork(deliverySaga),
                fork(rateSaga),
                fork(invoiceSaga),
                fork(ediQueueSaga),
                fork(rulesSaga),
        ]);
}
