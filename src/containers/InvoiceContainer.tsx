import React, { useEffect, useState } from "react";
// import { fetchLookupRequest } from "../actions/lookupDataActions";
import { useDispatch } from "react-redux";
import Invoice from "../components/Invoice";
import { fetchCustomersRequest } from "../actions/customerActions";
import { customerDetails } from "../services/customerApi";
import requireAuthentication from "../utilities/requireAuth";

const InvoiceContainer = (): JSX.Element => {
    const dispatch = useDispatch();
    const [carriers, setCarriers] = useState<any>([]);
    const [stores, setStores] = useState([]);

    useEffect(() => {
        getCustomers();
        getListData(2);
        getListData(3);
        getListData(5);
    }, []);

    const getCustomers = () => {
        dispatch(fetchCustomersRequest({ entity_type: 1 }));
    }

    const getListData = async (type: any) => {
        const data = {
            payload: {
                entity_type: type
            }
        }
        const getLists = await customerDetails(data);
        const getData = JSON.parse(JSON.parse(getLists.data))
        const tempData: any = [];
        if (getData) {
            getData.length > 0 && getData.map((carrier: any) => {
                tempData.push(carrier.corporateoffice);
            });
            if (type === 2 || type === 3)
                setCarriers([...carriers,...tempData])
            else
                setStores(tempData);
            // carriers = type === 2 || type === 3 ? [...carriers,...tempData] : setStores(tempData);
        }
    }

    return (
        <Invoice text="Invoice" carriers={carriers} stores={stores} />
    )
}

export default requireAuthentication(InvoiceContainer);