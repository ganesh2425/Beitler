import React, { useState, useEffect } from 'react';
import { history } from "../../config/history";
import { Button } from "react-bootstrap";
import * as BS from "react-bootstrap";
import { Formik, FormikProps } from 'formik';
import * as Yup from "yup";
import {
    PageContent,
    BoxHead,
    BoxBody,
    SearchContent,
    commonAzureFileUpload,
    convertErrorObj
} from '../../utilities/common';
import InterlineColumn from "./InterlineColumn";
import FuelSurchargesColumn from "./FuelsurchargesColumn";
import CustomTableContainer from "../../containers/CommonTableContainer";
import PerfectScrollbar from "react-perfect-scrollbar";
import { API_SERVICE } from "../../services/commonApi";
import { API_URLS } from "../../utilities/api_url_constants";
import { toast } from "react-toastify";
// import {ExportToExcel} from "../common/ExportToExcel";
import { downloadTemplateFile } from "../../config/azureBlob";


const Interline = (): JSX.Element => {
    const [showModal, setShowModal] = useState(false);

    // current file to upload into container
    const [fileSelected, setFileSelected] = useState<any>(null);

    // UI/form management
    const [pathName, setPathName] = useState('');
    const [text, setText] = useState('');
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [fuelData, setFuelData] = useState([]);
    const schema = Yup.object().shape({
        file: Yup.mixed().required('A file is required')
    })


    useEffect(() => {
        if (history.location) {
            const pathNameReplace = history.location.pathname.replace(/\\|\//g, "");
            setPathName(pathNameReplace);
            setText(pathNameReplace === 'interline' ? 'Interline (D83)' : 'Fuel Surcharges');
            getList(pathNameReplace);
        }
    }, []);

    const onFileChange = (event: any) => {
        // capture file into state
        setFileSelected(event.target.files[0]);
    };

    const onFileUpload = async (values: any, _resetForm: () => void) => {
        const apiUrl = pathName === 'fuel_surcharge' ? API_URLS.FUEL_SURCHARGE_UPLOAD : API_URLS.INTERLINE_UPLOAD;

        if (values.file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            // prepare UI
            const filePath = `${API_URLS.AZURE_FILE_UPLOAD_URL}testing/${values.file.name}`;
            const payload = {
                "azureFileURL": filePath,
                "azureAccountKey": "",
                "azureContainerName": "",
                "defaultEndpointsProtocol": "",
                "accountName": "",
                "endpointSuffix": "",
                "doE_Fuel_From": values.doE_Fuel_Index_From
            }
            commonAzureFileUpload(values, fileSelected, apiUrl, payload).then((responseData: any) => {
                //debugger;
                if (responseData) {
                    if (responseData.Message && (responseData.Message === 'Fuel Surcharge Data uploaded successfully' || responseData.Message === 'Interline Data uploaded successfully')) {
                        toast.success('Data uploaded successfully');
                        setSuccess(true);
                        setShowModal(false)
                        _resetForm();
                        // return
                    } else {
                        let stringVal: any = ''
                        if (responseData.errors && responseData.errors.length > 0) {
                            const errors = convertErrorObj(responseData.errors);
                            for (const [key, value] of Object.entries(errors)) {
                                if (key === 'undefined') {
                                    stringVal = stringVal + value + '\n'
                                    stringVal += '</br>'
                                }
                                else {
                                    stringVal = stringVal + '\n Row '+ key + ': ' + value + '\n '
                                    stringVal += '</br>'
                                }
                            }

                        } else {
                            stringVal = responseData.errors;
                        }
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        toast.error(<div className={'toastErrors'} dangerouslySetInnerHTML={{ __html: stringVal }} />, {
                            position: "top-right",
                            autoClose: false,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: 0,
                        })
                        setShowModal(false)
                    }
                } else {
                    toast.error(responseData), {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: 0,
                    }
                }
            })

            // reset state/form
            setFileSelected(null);
        } else {
            toast.error('Please upload .xlsx format file', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
            });
            _resetForm();

        }
    };

    useEffect(() => {
        if (success) {
            getList();
            setSuccess(false)
        }

    }, [success]);

    const getList = (val = '') => {
        const apiUrl = !val ? pathName === 'fuel_surcharge' ? API_URLS.FUEL_SURCHARGE_LIST : API_URLS.INTERLINE_LIST
            : val === 'fuel_surcharge' ? API_URLS.FUEL_SURCHARGE_LIST : API_URLS.INTERLINE_LIST;
        API_SERVICE.get(
            apiUrl,
            {},
            ''
        )
            .then((r) => {
                setData(JSON.parse(r.data))
            })
    }

    useEffect(() => {
        if (pathName === 'interline') {
            data.length > 0 && data.map((v: any) => {
                Object.assign(v,
                    {
                        percentage: v.percent ? `${v.percent}%` : '',
                        minSplit: v.minimumSplit ? `$${v.minimumSplit}` : '',
                    })
            });
            setTableData(data)
        } else if (pathName === 'fuel_surcharge') {
            // const tempData: any = [];
            data.length > 0 && data.map((v: any) => {
                Object.assign(v,
                    {
                        doE_Fuel_From: v.doE_Fuel_Index_From ? `${v.doE_Fuel_Index_From}` : '',
                        doE_Fuel_To: v.doE_Fuel_Index_To ? `${v.doE_Fuel_Index_To}` : '',
                        percentage: v.fscPercent ? `${v.fscPercent}%` : '',
                        fas_per_mile: v.fsC_PerMile ? `$${v.fsC_PerMile}` : '',
                    });
                // tempData.push(v)
            });
            setFuelData(data)
        }
    }, [data]);

    const onShowModal = () => {
        setShowModal(true)
    }

    const downloadTemplate = () => {
        const fileName = pathName === 'interline' ? 'interlineData.xlsx' : 'FSC_Data.xlsx'
        downloadTemplateFile(fileName)
    }

    // display form
    const DisplayForm = () => (
        <div>
            <Button
                className="btn-md-w mr-2"
                variant="secondary"
                onClick={downloadTemplate}
            >
                Download Template
            </Button>
            {/*<ExportToExcel*/}
            {/*    apiData={pathName === 'interline' ? interlineData : fscData}*/}
            {/*    fileName={pathName === 'interline' ? 'InterlineD83_Template' : 'FSC_Template'}*/}
            {/*/>*/}
            <Button
                onClick={onShowModal}
                className={'btn-md-w'}
                variant="primary"
            >
                Upload
            </Button>
        </div>
    );

    const onUploadData = () => {
        console.log('')
    }

    let cols: any = [];
    if (data.length > 0) {
        cols = InterlineColumn({
            onUploadData
        });
    }
    if (pathName === 'fuel_surcharge') {
        cols = FuelSurchargesColumn({ onUploadData });
    }


    return (
        <>
            <PageContent>
                <BoxHead
                    title={text}
                />
                <BoxBody>
                    <SearchContent>
                        {DisplayForm()}
                    </SearchContent>
                    <PerfectScrollbar>
                        <CustomTableContainer
                            columns={cols}
                            data={pathName === 'fuel_surcharge' ? fuelData : tableData}
                            options={true}
                            downloadFileName={pathName === 'fuel_surcharge' ? 'FuelSurcharge.csv' : "InterlineD83.csv"}
                        />
                    </PerfectScrollbar>
                </BoxBody>
            </PageContent>
            <BS.Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                dialogClassName="modal-40w"
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <BS.Modal.Header closeButton>
                    <BS.Modal.Title id="example-modal-sizes-title-lg">
                        {`${text} File upload`}
                    </BS.Modal.Title>
                </BS.Modal.Header>
                <BS.Modal.Body>
                    <Formik
                        validationSchema={schema}
                        initialValues={{ file: null }}
                        onSubmit={(values: any, actions) => {
                            onFileUpload(values, actions.resetForm);
                        }}
                    >
                        {(props: FormikProps<any>) => {
                            const {
                                values,
                                touched,
                                errors,
                                setFieldValue,
                                isValid,
                                dirty,
                                handleSubmit
                            } = props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <BS.Form.Group controlId="formFileSm" className="mb-3">
                                        {/*<BS.Form.Label>Choose the file from your local</BS.Form.Label>*/}
                                        <input
                                            type="file"
                                            name="file"
                                            onChange={(event: any) => {
                                                setFieldValue("file", event.currentTarget.files[0]);
                                                onFileChange(event)
                                            }}
                                            className={
                                                errors.file && touched.file
                                                    ? 'form-control is-invalid'
                                                    : 'form-control'
                                            }
                                            accept=".xlsx"
                                        />
                                    </BS.Form.Group>
                                    <div className="listing crp-table mt-3">
                                        <div className="add-lease d-flex justify-content-end mb-2 BS.Color-highlight">
                                            <BS.Button
                                                // onClick={onFileUpload}
                                                disabled={!(dirty && isValid)}
                                                className={'btn-md-w'}
                                                variant="primary"
                                                type="submit"
                                            > Upload
                                            </BS.Button>
                                        </div>
                                    </div>
                                </form>
                            );
                        }}

                    </Formik>
                </BS.Modal.Body>
            </BS.Modal>
        </>
    );
}

export default Interline;