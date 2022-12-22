import React, { useEffect, useState } from "react";
import * as BS from "react-bootstrap";
import * as Yup from "yup"
import { history } from "../../config/history";
import StorageService from "../../services/Storage.service";
import { API_SERVICE } from "../../services/commonApi";
import { API_URLS } from "../../utilities/api_url_constants";
import { toast } from "react-toastify";
import { SystemUpdateSharp } from "@material-ui/icons";
import {
  PageContent,
  BoxHead,
  BoxBody,
  entityTypes,
  pageTitle,
  commonAzureFileUpload
} from "../../utilities/common";
import {
  fetchNotificationTemplateRequest,
} from "../../actions/templateActions";
import {
  getNotificationTemplateDetails,
  getNotificationTemplateFailure,
  getNotificationTemplateSuccess,
} from "../../reducers/templateReducer";
import { ToWords } from 'to-words';
import jsPdf from "jspdf";
import checkImage from "../../assets/images/check_1.png";
import { getInvoiceDetails, getProcessQueueSuccess } from "../../reducers/invoiceReducer";
import { connect, useDispatch, useSelector } from "react-redux";
import { keys } from "highcharts";
const properties = { header: "Acme" };

let mpdf =  {} as any
let userPdf =  {} as any

const toWords = new ToWords({
  localeCode: 'en-US',
  converterOptions: {
    currency: false,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
  }
});


const boxStyle = {
  border: "1px solid #000",
  height: "250px",
  width: "auto",
  backgroundImage: `url(${checkImage})`,
  display: "none",
};
let  notificationList = [] as any
const adjustmentFactorX = 10;
const adjustmentFactorY = 10;
const customerEmails = [] as any
const processList = [] as any
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const CheckPDF = ( {goBack } :any): JSX.Element => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [frameUrl, setFrameUrl] = useState('');
  const sums = [] as any;
  const dispatch = useDispatch()
  const pQueue: any = useSelector(getProcessQueueSuccess)
  const marginrightBtn = { marginRight: '20px'}

  /* const setPdfData = async (sums:any) =>{
    sums.forEach((val: any, i:number) => {
      const myImage = new Image();
      myImage.src =checkImage;
      myImage.onload = function(){
        mpdf.rect(5,30,200, 80);
        mpdf.addImage(myImage , 'png', 5, 30, 200, 80);
        mpdf.setFontSize(10);
        mpdf.text(val.name, 40 - adjustmentFactorX, 65);
        const formattedAmt = parseFloat(val.total)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        mpdf.text(formattedAmt, 170, 66.5);

        const splitTitle = mpdf.splitTextToSize(toWords.convert( parseFloat(val.total)), 90);
        mpdf.text(120, 80, splitTitle);

        // mpdf.text(toWords.convert( parseFloat(val.total)), 140, 80);
        if(i <= (sums.length-1)){
          mpdf.addPage('a4','p');
        }
        
      };
    })
    return
  } */


  const style1 = {
    marginTop: '10px'
  }

  const style2 = {
    marginRight: '10px',
    paddingTop: '20px'
  }

  const notificationTemplateList: any = useSelector( getNotificationTemplateDetails );
  const  cEmails = [] as any

  useEffect(() => {
    getNotificationTemplatesHandler();
    window.scrollTo(0, 0)
    mpdf =  jsPdf("p", "mm", "a4")
    userPdf =  jsPdf("p", "mm", "a4")
  }, []); 

  const getNotificationTemplatesHandler = async () => {
    dispatch(await fetchNotificationTemplateRequest({filter: "id=172"}));
  };
  
  useEffect(() => { if(notificationTemplateList) notificationList = notificationTemplateList}, [notificationTemplateList])
  
  useEffect(() => {
    if (pQueue.process_queue.invoiceAmounts) {
      const invoiceDetails = JSON.parse(
        pQueue.process_queue.invoiceAmounts || "[]"
      );
      const conNames = [] as any;
      invoiceDetails.forEach((ele: any) => {
        conNames.push(Object.keys(ele)[0]);
      });

      
      const uniqueNames = Array.from(new Set(conNames));
      let iDetails = {} as any
      uniqueNames.forEach((element: any) => {
        let sum = 0;
        invoiceDetails.forEach((element2: any) => {
          if (element2[element] != undefined) {
            sum += element2[element].amt
            iDetails = element2[element].invoiceInfo
          }
        });
        
        sums.push({ name: element, total: sum.toString(), invoiceDetail: iDetails }); // = sum;
      });

      setInvoiceData(sums);
    }
    generatePdf(sums);    
    // console.log("pqueue is: ", pQueue)
  }, [pQueue.process_queue.invoiceAmounts]);

  useEffect(() => {
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

  const getCustomers = async (invoices:any) => {
    invoices.forEach( async (invoice:any) =>{
      getCustomerByEntityId(invoice.InvoiceHeader.Customer_Address[0].Entity_Id, invoice.InvoiceHeader.Id);
      })
      // proceedFlow()
  };

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
        })
        .catch((e) => {
          document.body.classList.remove("api-loading");
          return false
        });
  }

  const generatePdf = async (sums:any) =>{
    await setPdfData(sums, mpdf);
    setTimeout(()=>{
      // mpdf.save("oye.pdf");
      setFrameUrl(mpdf.output('bloburl'));
     
          uploadPdf(sums)
    }, 2000)
  }

  const setPdfData = async (sums:any, pdfObject:any) =>{
    if( sums.length > 0)
    sums.forEach((val: any, i:number) => {
      const myImage = new Image();
      myImage.src =checkImage;
      myImage.onload = function(){
        pdfObject.rect(5,30,200, 80);
        pdfObject.addImage(myImage , 'png', 5, 30, 200, 80);
        pdfObject.setFontSize(10);
        pdfObject.text(val.name, 40 - adjustmentFactorX, 65);
        const formattedAmt = parseFloat(val.total)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        pdfObject.text(formattedAmt, 170, 66.5);

        const splitTitle = mpdf.splitTextToSize(toWords.convert( parseFloat(val.total)), 90);
        pdfObject.text(120, 80, splitTitle);

        // mpdf.text(toWords.convert( parseFloat(val.total)), 140, 80);
        if(i <= (sums.length-1)){
          pdfObject.addPage('a4','p');
        }
        
      };
    })
    return
  }

  // Upload check


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
  // console.log("uploadPdf function ", val)
  val.forEach((inv:any, i:number)=> {
    
    const userPdf =  jsPdf("p", "mm", "a4")
    const sumData = [] as any
    sumData.push(inv);
    // console.log("inv ", inv)
    // console.log("pushing in sumdata", inv)
      setPdfData(inv, userPdf);
      // console.log("customerEmails", customerEmails);
      // console.log("processList", processList);
      setTimeout( ()=>{
        if(customerEmails.length > 0){
          customerEmails.forEach((cust:any, i: number)=>{
            // console.log(inv)
            // console.log(inv.invoiceDetail)
            inv.invoiceDetail.InvoiceHeader.Customer_Address.forEach((addObj:any)=>{
                if(addObj.Entity_Id === cust.id){
                  const dat = {} as any
                  dat[inv.invoiceDetail.InvoiceHeader.Id] = cust.BillTo[0].ContactEmail                  
                  const filePath = uploadToAzure(inv.invoiceDetail, userPdf) || ''
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
const fname = inv.InvoiceHeader.InvoiceType + "-" + inv.InvoiceHeader.Id +"-Check-" + inv.InvoiceHeader.ProNumber + "-" + Date.now()
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
const downloadpdf = () =>{
  mpdf.save("check.pdf");
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
                  <iframe id="doc_frame" src={frameUrl+"#toolbar=0&navpanes=0"} width="100%" height="700"></iframe>              
                </div>
        </div>
      {/* </PageContent> */}
    </>

  );
    
};

export default CheckPDF;
