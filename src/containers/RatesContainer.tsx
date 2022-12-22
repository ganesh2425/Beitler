import React, {useEffect} from "react";
import Rates from "../components/Rates";
import {fetchLookupRequest} from "../actions/lookupDataActions";
import {useDispatch} from "react-redux";
import {fetchCustomersRequest} from "../actions/customerActions";
import {fetchRatesRequest} from "../actions/rateActions";
import requireAuthentication from "../utilities/requireAuth";

const RatesContainer = (): JSX.Element  => {
    const dispatch = useDispatch();
    useEffect(() => {
        getLookups();
        getCustomers();
        getRatesDetails();
    }, []);

    const getLookups = () => {
        dispatch(fetchLookupRequest({}));
    }

    const getCustomers = () => {
        dispatch(
            fetchCustomersRequest({ entity_type: 1 })
        );
    }

    const getRatesDetails = () => {
        dispatch(fetchRatesRequest({token: ''}))
    }

  return(
      <div>
          <Rates />
      </div>
  )
}

export default requireAuthentication(RatesContainer)