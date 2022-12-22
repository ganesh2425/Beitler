import React from 'react';
import { Router , Switch } from "react-router-dom";
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { history } from './history';
import Error from "../components/Error/Error";
import LoginContainer from "../containers/LoginContainer";
import HomeContainer from "../containers/HomeContainer";
import DashboardContainer from "../containers/DashboardContainer";
import CustomerContainer from "../containers/CustomerContainer";
import TemplatePage from "../containers/TemplateContainer";
import InvoiceContainer from "../containers/InvoiceContainer";
import PermissionContainer from "../containers/PermissionContainer";
import PermissionGroupContainer from "../containers/PermissionGroupContainer";
import EventsContainer from "../containers/EventsContainer";
import UserInvite from "../components/Users";
import CheckPDF from "../components/Invoice/CheckPDF";
import InvoicePDF from "../components/Invoice/InvoicePDF";
import DownloadInvoice from "../components/Invoice/DownloadInvoice"
// import CarrierContainer from "../containers/CarrierContainer";
// import BrokerContainer from "../components/Broker";
import StoresContainer from "../containers/StoresContainer";
// import PoolContainer from "../containers/PoolContainer";
import DeliveryContainer from "../containers/DeliveryContainer";
import RatesContainer from "../containers/RatesContainer";
import EDIContainer from "../containers/EDIContainer";
import NotificationQueueContainer from "../containers/NotificationQueueContainer";
import FAQContainer from "../containers/FAQContainer";
import TicketContainer from "../containers/TicketContainer";
import ClaimsContainer from "../containers/ClaimsContainer";
import RemittanceContainer from "../containers/RemittanceContainer";
import OrderContainer from "../containers/OrderContainer";
import InboundContainer from "../containers/InboundContainer";
import InboundProjectionContainer from "../containers/InboundProjectionContainer";
import MDSContainer from "../containers/MDSContainer";
import MdsDetailsContainer from "../containers/MdsDetailsContainer";
import CheckAuthorization from '../components/Users/CheckAuthorization';
import InterlineContainer from "../containers/InterlineContainer";
import RulesContainer from "../containers/RulesContainer";

const Routes = ():JSX.Element => (
    <Router  history={history}>
        <GuardProvider error={Error}>
            <Switch>
                <GuardedRoute
                    path="/login"
                    exact component={LoginContainer}
                    meta={{ auth: false }}
                />
                <GuardedRoute path="/register" exact component={LoginContainer} meta={{ auth: false }}/>
                <GuardedRoute path="/authorization" exact component={CheckAuthorization} meta={{ auth: false }} />
                <GuardedRoute path="/test" exact component={HomeContainer} meta={{ auth: true }} />
                <GuardedRoute path={["/dashboard", "/"]} exact component={DashboardContainer} meta={{ auth: true }} />
                <GuardedRoute path={["/customers", "/brokers", "/carriers", "/pool_provider", "/corporate_bls", "/stores"]} exact component={CustomerContainer} meta={{ auth: false }} />
                <GuardedRoute path="/template" exact component={TemplatePage} meta={{ auth: true }} />
                <GuardedRoute path="/stores_test" exact component={StoresContainer} meta={{ auth: true }} />
                <GuardedRoute path="/accounts_payable" exact component={InvoiceContainer} meta={{ auth: true }} />
                <GuardedRoute path="/accounts_receivables" exact component={InvoiceContainer} meta={{ auth: true }} />
                <GuardedRoute path="/Permissions" exact component={PermissionContainer} meta={{ auth: true }} />
                <GuardedRoute path="/permissions_group" exact component={PermissionGroupContainer} meta={{ auth: true }} />
                <GuardedRoute path="/Events" exact component={EventsContainer} meta={{ auth: true }} />
                <GuardedRoute path="/user_invitation" exact component={UserInvite} meta={{ auth: true }} />
                <GuardedRoute path="/check_pdf" exact component={CheckPDF} meta={{ auth: true }} />
                <GuardedRoute path="/invoice_pdf" exact component={InvoicePDF} meta={{ auth: true }} />
                <GuardedRoute path="/download_invoice/" exact component={DownloadInvoice} meta={{ auth: false }} />
                <GuardedRoute path="/download_invoice/:fkey" exact component={DownloadInvoice} meta={{ auth: false }} />
                {/*<GuardedRoute path="/delivery_listing" exact component={DeliveryContainer} meta={{ auth: true }} />*/}
                <GuardedRoute path="/rate_master" exact component={RatesContainer} meta={{ auth: true }} />
                <GuardedRoute path="/edi_queue" exact component={EDIContainer} meta={{ auth: true }} />
                <GuardedRoute path="/queue" exact component={NotificationQueueContainer} meta={{ auth: true }} />
                <GuardedRoute path="/faq" exact component={FAQContainer} meta={{ auth: true }} />
                <GuardedRoute path="/ticketing" exact component={TicketContainer} meta={{ auth: true }} />
                <GuardedRoute path="/claims" exact component={ClaimsContainer} meta={{ auth: true }} />
                <GuardedRoute path="/Remittance" exact component={RemittanceContainer} meta={{ auth: true }} />
                <GuardedRoute path={["/order_outbound_listing", "/delivery_listing"]} exact component={OrderContainer} meta={{ auth: true }} />
                <GuardedRoute path="/inbound_listing" exact component={InboundContainer} meta={{ auth: true }} />
                <GuardedRoute path="/inbound_entry_upload" exact component={InboundContainer} meta={{ auth: true }} />
                <GuardedRoute path="/projection_entry_upload" exact component={InboundProjectionContainer} meta={{ auth: true }} />
                <GuardedRoute path="/projection_listing" exact component={InboundProjectionContainer} meta={{ auth: true }} />
                <GuardedRoute path="/listing" exact component={MDSContainer} meta={{ auth: true }} />
                <GuardedRoute path="/entry_upload" exact component={MdsDetailsContainer} meta={{ auth: true }} />
                <GuardedRoute path={["/interline", "/fuel_surcharge"]} exact component={InterlineContainer} meta={{ auth: true }} />
                <GuardedRoute path="/rules" exact component={RulesContainer} meta={{ auth: true }} />
                

                <GuardedRoute path="*" component={Error} />
            </Switch>
        </GuardProvider>
    </Router >
);

export default Routes;