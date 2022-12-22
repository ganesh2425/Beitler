import React, { useEffect, useState } from "react";
import * as BS from "react-bootstrap";
import * as Yup from "yup"
import { history } from "../../config/history";
import StorageService from "../../services/Storage.service";
import { API_SERVICE } from "../../services/commonApi";
import { API_URLS } from "../../utilities/api_url_constants";
import { toast } from "react-toastify";
import { SystemUpdateSharp } from "@material-ui/icons";
import { fetchInvoiceRequest, addEdiRequest } from  "../../actions/invoiceActions";
import { getInvoiceDetails, getProcessQueueSuccess } from "../../reducers/invoiceReducer";
import { fetchDeliveryRequest, updateDeliveryRequest } from "../../actions/deliveryAction";
import { getDeliveryList, updateDeliveryList } from "../../reducers/deliveryReducer";
import {
  fetchNotificationTemplateRequest,
} from "../../actions/templateActions";
import {
  getNotificationTemplateDetails,
  getNotificationTemplateFailure,
  getNotificationTemplateSuccess,
} from "../../reducers/templateReducer";
import {
  PageContent,
  commonAzureFileUpload
} from "../../utilities/common";
import {
  getCustomerDetails
} from "../../reducers/customerReducer";
import {
  fetchCustomersRequest
} from "../../actions/customerActions";
import jsPdf from "jspdf";
import page1 from "../../assets/images/page1.jpg";
import page2 from "../../assets/images/page2.jpg";
import page3 from "../../assets/images/page.jpg";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
const EdiPayloads = [] as any
const customerEmails = [] as any
let mpdf =  {} as any
let  notificationList = [] as any
let dList = [] as any
const processDeliveryList =[] as any
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const InvoicePDF = ({goBack} :any): JSX.Element => {
    const dispatch = useDispatch();
    const [frameUrl, setFrameUrl] = useState('');
    const [notificationTemplate, setnotifications] = useState([]);
    const processList = [] as any;
    const style1 = { marginTop: '10px' }
    const style2 = { 
      marginRight: '10px',
      paddingTop: '20px'
    }
    const marginrightBtn = { marginRight: '20px'}
    const downloadpdf = () =>{
      mpdf.save("check.pdf");
    }

    // let customersList: any = useSelector(getCustomerDetails);
    // const invoiceDat: any = useSelector(getInvoiceDetails);
    const invoiceDat = [] as any;
    const pQueue: any = useSelector(getProcessQueueSuccess)
    const deliveryList = useSelector(getDeliveryList);
    // const res: any = useSelector(addEdiRequest({}))
    // console.log(res)
    
    /**
     * Get Notification
     */
    const getNotificationTemplatesHandler = async () => {
      dispatch(await fetchNotificationTemplateRequest({filter: "id=171"}));
      const payload = {
        startdate: '01-01-0001 00:00:00',
        enddate: '01-01-0001 00:00:00'
    }
      dispatch(dispatch(fetchDeliveryRequest(payload)))
    };

    const notificationTemplateList: any = useSelector( getNotificationTemplateDetails );

    //Load invoices
    const  cEmails = [] as any
    useEffect(() => {
      dispatch(addEdiRequest({}))
        getNotificationTemplatesHandler();
        mpdf =  jsPdf("p", "mm", "a4")
        window.scrollTo(0, 0)

        // getInvoiceData(0);
    }, []); 
    
    

    useEffect(() => {
      if (deliveryList && deliveryList.length > 0) {
          const temp: any = [];
          deliveryList.map((delivery: any) => {
              temp.push(delivery.delivery)
          });
          dList = deliveryList
      }
      else if (deliveryList.length === 0)
          dList = deliveryList
  }, [deliveryList]);


    useEffect(() => { if(notificationTemplateList) notificationList = notificationTemplateList}, [notificationTemplateList])
    
    const getCustomerByEntityId = (eid: number, invoiceId:number) => {
      const token = StorageService.getCookies("token");
      return  API_SERVICE.get(
        // API_URLS.BASE_URL + 
        API_URLS.  GET_CUSTOMER + "?Entity_Id="+ eid,
          {
            Entity_Type: 1
          },
          token
        )
          .then((r) => {
            customerEmails.push(JSON.parse(JSON.parse(r.data))[0].corporateoffice)
            const customerData = JSON.parse(JSON.parse(r.data))[0].corporateoffice
            if( parseInt(customerData.isEDI) === 1){
              const payload = {
                "Shipper" : {
                    "Id": 1
                },
                "Carrier" : {
                    "Id": 5
                },
                "IsEDIProcessed": false,
                "EDIProcessedDt": "2021-10-22T16:30:00.000",
                "IsActive": true,
                "CreatedBy": 1,
                "InvoiceId": invoiceId
             }
              
              //dispatch(fetchInvoiceRequest(payload));
            }
          })
          .catch((e) => {
            document.body.classList.remove("api-loading");
            return false
          });
    }
    
    useEffect(() => {
      // console.log(pQueue);
      if (pQueue.invoiceData && pQueue.invoiceData.length > 0 && pQueue.process_queue.invoiceIds  && pQueue.process_queue.invoiceIds.length > 0 ) {
          if (pQueue.process_queue.invoiceIds && pQueue.process_queue.invoiceIds.length >0) {
            const ids = pQueue.process_queue.invoiceIds
            pQueue.invoiceData.forEach( (invoice:any) =>{
                if(ids.includes(invoice.InvoiceHeader.Id)){
                    processList.push(invoice);
                }
            } )
            if(processList.length > 0 &&  pQueue.process_queue.invoiceIds.length > 0)
              getCustomers(processList);
        }
      }

    }, [pQueue.process_queue.invoiceIds])

    const getInvoiceData = (Id: number) => {
      if (history.location.pathname) {
            const payload = {
                Id: 0,
                Type: localStorage.getItem("type") ? localStorage.getItem("type") : 'AR'
            };
            // console.log("calling api for invoices", pQueue)
            dispatch(fetchInvoiceRequest(payload));
        }
    }; 
  
    const getCustomers = async (invoices:any) => {
      invoices.forEach( async (invoice:any) =>{
        getCustomerByEntityId(invoice.InvoiceHeader.Customer_Address[0].Entity_Id, invoice.InvoiceHeader.Id);
        })
        proceedFlow()
    };

    const proceedFlow=()=>{
      processList.forEach((item: any) =>{
          dList.forEach((delivery:any) =>{
            if(parseInt(item.References_Number) === parseInt(delivery.id))
              processDeliveryList.push(delivery)  
          })
      })
      generatePdf(processList)
    }

    const generatePdf = async (invoice:any) =>{
      await setPdfData(invoice);
      setTimeout(async ()=>{
        setFrameUrl(mpdf.output('bloburl')+"#toolbar=0&navpanes=0");
         await uploadPdf(invoice);
      }, 2000)
    }

  const addPage1 = (val:any, pdfObject:any) =>{
    //start
      const emailIds = {} as any;
      const myImage = new Image();
      myImage.src =page1;
      myImage.onload = function(){
     // pdfObject.rect(5,10,400, 700);
          pdfObject.addImage(myImage , 'jpg', 5, 10, 200, 280);
          pdfObject.setFontSize(10);
          pdfObject.text(val.InvoiceHeader.ProNumber, 177, 18);
          pdfObject.text(val.InvoiceHeader.ShipDate.split("T")[0], 110, 30);
          pdfObject.text(val.InvoiceHeader.InvoiceDate.split("T")[0], 110, 45);
          pdfObject.text(val.InvoiceHeader.DeliveryDate.split("T")[0], 155, 30);
          pdfObject.text(val.InvoiceHeader.DueDate.split("T")[0], 155, 45);
          pdfObject.text(val.InvoiceHeader.ShipmentType, 110, 55);
          pdfObject.text(val.InvoiceHeader.TrailerNumber, 140, 55);
          pdfObject.text(val.InvoiceHeader.MilesClass, 170, 55);
          // console.log(val.InvoiceHeader.Customer_Address)
          val.InvoiceHeader.Customer_Address.forEach((cadd:any)=>{
              // if(cadd.IsActive === 1 || cadd.IsActive===0){
                emailIds[cadd.Entity_Id] = '';
                pdfObject.text(val.InvoiceHeader.CustomerName, 110, 68);
                pdfObject.text(cadd.Address1, 110, 72);
                if(cadd.Address2!= undefined)
                {
                  pdfObject.text(cadd.Address2, 110, 77);
                }
                pdfObject.text(cadd.City, 110, 77);
                pdfObject.text(cadd.State+","+cadd.zipcode, 110, 80);
              // }
          })

          val.InvoiceHeader.Consignee_Address.forEach((cadd:any)=>{
            // if(cadd.IsActive === 1 || cadd.IsActive===0){
              pdfObject.text(val.InvoiceHeader.ConsigneeName, 110, 88);
              pdfObject.text(cadd.Address1, 110, 92);
              if(cadd.Address2!= undefined)
              {
                pdfObject.text(cadd.Address2, 110, 96);
              }
              pdfObject.text(cadd.City, 110, 100);
              pdfObject.text(cadd.State+","+cadd.zipcode.toString(), 110, 104);
            // }
          })

          if(val.InvoiceHeader.Pickup_Address != null || val.InvoiceHeader.Pickup_Address!= undefined){
            val.InvoiceHeader.Pickup_Address.forEach((cadd:any)=>{
              // if(cadd.IsActive === 1 || cadd.IsActive===0){
                pdfObject.text(val.InvoiceHeader.PickUpName, 20, 88);
                pdfObject.text(cadd.Address1, 20, 92);
                if(cadd.Address2!= undefined)
                {
                  pdfObject.text(cadd.Address2, 20, 96);
                }
                pdfObject.text(cadd.City, 20, 100);
                pdfObject.text(cadd.State+","+cadd.zipcode.toString(),20, 104);
              // }
            })
          }
      
          if(val.InvoicePickupStops != null || val.InvoicePickupStops!= undefined){
            let y = 115;
            let x = 107;
            val.InvoicePickupStops.forEach((cadd:any)=>{
              // if(cadd.IsActive === 1 || cadd.IsActive===0){
                pdfObject.text(cadd.ExtraSequence.toString()+". ", x, y);
                pdfObject.text(cadd.Address, x+5, y)
                pdfObject.text(cadd.City, x+5, y+4);
                pdfObject.text(cadd.State+","+cadd.ZipCode.toString(),x+20, y+4);
              // }
              x=x
              y=y+10
            })
          }

          pdfObject.text(val.InvoiceHeader.MilesClass, 170, 55);
          let invTotal = 0;
          let y =0;
          if(val.InvoiceCharges != null || val.InvoiceCharges!= undefined){
            val.InvoiceCharges.forEach((cadd:any)=>{
              // if(cadd.IsActive === 1 || cadd.IsActive===0){
                pdfObject.text(cadd.Invoice_Description, 20, 150+y);
                pdfObject.text(cadd.Quantity.toString(), 120, 150+y);
                pdfObject.text(cadd.Charged_Per_Rate.toString(), 140, 150+y);
                pdfObject.text(cadd.Amount.toString(),170, 150+y);
                invTotal = invTotal + parseFloat(cadd.Amount)
              // }
              y = y+5;
            })
          }
          pdfObject.text(invTotal.toString(),172, 244);
          pdfObject.text(val.InvoiceHeader.References_Number,28, 116);
          pdfObject.addPage('a4','p');
    }
    return true
     //end
  }

  const addPage2 = (val:any, pdfObject:any) =>{
    //start
      const myImage = new Image();
      myImage.src =page2;
      myImage.onload = function(){
     // pdfObject.rect(5,10,400, 700);
          pdfObject.addImage(myImage , 'jpg', 5, 10, 200, 280);
          pdfObject.addPage('a4','p');
      //uploadPdf(val);
    }
    return true
     //end
  }
  const setPdfData = async (invoice:any) =>{
    invoice.forEach((val: any, i:number) => {
      //Add page 1
      setTimeout( ()=>{
         addPage1(val, mpdf);
        addPage2(val,mpdf)
      },1000) 
    })
  return
  }

  const createNotificationQueue= async (emailAddress:string, fileUrl: string)=>{
    const payload = {  
      "Event_Id": 171,  
      "Subject": notificationList[0].subject,  
      "Body": notificationList[0].bodyText.replace("~invoiceUrl~", fileUrl),  
      "Recipients": [    
          {      
              "Recipient": emailAddress
          }  ],  
      "Status": 0
    }

    const response = await API_SERVICE.post(
        API_URLS.notification_create,
        payload,      
      );
      return response
  }
  const uploadPdf = async (val:any) =>{
    val.forEach((inv:any, i:number)=> {
      const userPdf =  jsPdf("p", "mm", "a4")
        addPage1(inv, userPdf);
        addPage2(inv, userPdf);
        setTimeout( ()=>{
          // window.open(userPdf.output('bloburl'));//save('invoice.pdf');         
          if(customerEmails.length > 0){
            customerEmails.forEach((cust:any, i: number)=>{
              inv.InvoiceHeader.Customer_Address.forEach((addObj:any)=>{
                  if(addObj.Entity_Id === cust.id){
                    const dat = {} as any
                    dat[inv.InvoiceHeader.Id] = cust.BillTo[0].ContactEmail
                    cEmails.push(dat)
                    if(parseInt(cust.IsEdi) === 1 || cust.IsEdi === true){
                      let pl ={} as any
                      pl = {
                          Shipper : {
                              "Id": 1
                          },
                          Carrier : {
                              Id: 5
                          },
                          IsEDIProcessed: false,
                          EDIProcessedDt: "2021-10-22T16:30:00.000",
                          IsActive: true,
                          CreatedBy: 1,
                          InvoiceId: inv.InvoiceHeader.Id
                      }
                      EdiPayloads.push(pl);
                      
                    }
                    const filePath = uploadToAzure(inv, userPdf) || ''
                    // console.log(window.location.origin + "/download_invoice?key=" +filePath)
                    createNotificationQueue(cust.BillTo[0].ContactEmail, window.location + "/" +filePath)
                  }
              })
              })
          }
          //Uploading File - starts
          return
          
        },2000)
    })
    //toast.success('Invoices uploaded successfully');
    document.body.classList.remove("api-loading");
 }

 const uploadToAzure = (inv:any, userPdf: any):any => {
  const apiUrl = API_URLS.STORE_UPLOAD;
  const fname = inv.InvoiceHeader.InvoiceType + "-" + inv.InvoiceHeader.Id +"-Invoice-" + inv.InvoiceHeader.ProNumber + "-" + Date.now()
  const pdfUploadName = "invoice/" + fname +".pdf"
  const values = {file: {name:pdfUploadName}}

  const filePath = `${API_URLS.AZURE_FILE_UPLOAD_URL}testing/${values.file.name}`;
  const payload = {
    "azureFileURL": filePath,
    "azureAccountKey": "",
    "azureContainerName": "",
    "defaultEndpointsProtocol": "",
    "accountName": "",
    "endpointSuffix": ""
  }

  const blob = new Blob([userPdf.output('blob')], { type: 'application/pdf' });
  const invoiceFile = new File([blob], pdfUploadName,{type: 'application/pdf'});
  // console.log("Uploading...", inv.InvoiceHeader)
  commonAzureFileUpload(values, invoiceFile, apiUrl, payload, true).then((responseData: any) => {
    if (responseData) {
      if (responseData.Message === 'Store uploaded successfully') {
        // toast.success('Data uploaded successfully');
        // document.body.classList.remove("api-loading");
      } else {
        toast.error(<div dangerouslySetInnerHTML={{ __html: responseData.Message }} />, {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    } else {
      toast.error(responseData)
    }
  });

  return fname
  //Upload file - ends
 }
  
  return (
    <>
      {/* <PageContent> */}
        <div id="pdfData">
        <div className="mt-3">
                    
                  <div className="d-flex justify-content-end" style={style2}>
                    <BS.Button 
                          className="float-left"
                          onClick={goBack}
                          style={marginrightBtn}>
                          Back
                      </BS.Button>
                      <BS.Button 
                          className="float-right"
                          onClick={downloadpdf}>
                          Download
                      </BS.Button>
                  </div>
                  </div>
                <div className="checkDetails" id="docwin" style={style1}>
                  <iframe id="doc_frame"  width="100%" height="700" src={frameUrl}></iframe>              
                </div>
        </div>
      {/* </PageContent> */}
    </>

  );
    
};

//export default InvoicePDF;
function mapStateToProps(state: any) {
  return { invoice: state.invoice };
} 

export default connect(mapStateToProps)(InvoicePDF);
