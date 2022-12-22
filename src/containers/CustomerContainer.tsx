import React, {createContext, useEffect, useState} from "react";
import Customer from "../components/Customer";
import requireAuthentication from "../utilities/requireAuth";
import { toast } from "react-toastify";
import StorageService from "../services/Storage.service";
import { getAllDepartments } from "../utilities/common";
import {useDispatch} from "react-redux";
import {fetchLookupRequest} from "../actions/lookupDataActions";
import {withRouter} from "react-router-dom";
const authToken = StorageService.getCookies('token');

export const DepartmentContext = createContext([]);
const CustomerContainer = (): JSX.Element => {
    const dispatch = useDispatch();
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        getLookups();
        getDepartments(1);
        // eslint-disable-next-line
    }, []);

    const getLookups = () => {
        dispatch(fetchLookupRequest({token: authToken}));
    }

    const getDepartments = async (value: any): Promise<any> => {
        console.log('departments')
        getAllDepartments(1, authToken)
            .then((departments: any) => {
                setDepartments(departments)
            })
            .catch(e => {
                toast.error(e + ' departments api error')
                return false
            });
    }

    return (
        <div>
            <DepartmentContext.Provider value={departments}>
                <Customer />
            </DepartmentContext.Provider>
        </div>
    );
}
export default requireAuthentication(withRouter(CustomerContainer))
// export default CustomerContainer;
