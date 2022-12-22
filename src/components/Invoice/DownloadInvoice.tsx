import React, { useEffect, useState } from "react";
import { downloadfile } from "../../utilities/common";
// import "../../styles/pages/_blankLyout.scss"

let keyval = ''
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const DownloadInvoice = (props:any): JSX.Element => {
    const [theStatus, setStatus] = useState(true)
      useEffect(() => {
        let queryString = props.location.search
        if(queryString === '' || queryString === undefined || queryString === null || queryString.search("key") < 0){
          setStatus(false)
        }
        else{
          queryString = queryString.replace("?","")
          queryString = queryString.split("&")
            queryString.forEach( (param:any) =>{
                if(param.search("key") >= 0){
                  const key = param.search("=")
                  if(key > 0){
                    keyval = param.substr(key+1,(param.length-key))
                  }
                }
            })
          downloadfile(keyval+'.pdf', 'testing/invoice')
      }
      }, [])

      return(

        <div>
          {
            theStatus === false 
            ?
            <h3>Invalid Request</h3>
            :
            <h3>Processing Request</h3>
          }
          </div>

      );
};

export default DownloadInvoice;