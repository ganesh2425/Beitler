import React, { useCallback, useEffect, useState } from 'react';
import ListingSearch from "../common/Search";
import { useDispatch, useSelector } from "react-redux";
import {
    createPermissionGroupRequest,
    fetchPermissionGroupRequest,
    updatePermissionGroupRequest
} from "../../actions/permissionActions";
import { BoxBody, BoxHead, PageContent } from '../../utilities/common';
import * as BS from 'react-bootstrap';
import { Col, Modal } from 'react-bootstrap';
import * as Yup from "yup";
import { Form, Formik, FormikProps } from "formik";
import { addPermissionGroupFormData } from "../../interfaces/forms";
import CustomTableContainer from "../../containers/CommonTableContainer";
import PermissionGroupTableColumn from "./Columns/PermissionGroupTableColumn";
import { getPermissionDetails, getPermissionGroupDetails, getPermissionSuccess } from "../../reducers/permissionReducer";
import { toast } from "react-toastify";
import DeleteModal from "../common/DeleteModal";
import PerfectScrollbar from 'react-perfect-scrollbar';

const PermissionGroup = (): JSX.Element => {
    //////////
    const dispatch = useDispatch();
    const [data, setData] = useState<any>({});
    const [showModal, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [mappedData, setMappedData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [removeId, setRemoveId] = useState(0);
    const [deleteModal, setDeleteModal] = useState(false);
    const [localInitialValues, setLocalInitialValues] = useState<addPermissionGroupFormData>({
        id: 0, name: '',
        description: '',
        parent: 0,
        mapped: [],
        master: []
    });
    const [checkedValue, setCheckedValue] = useState([]);
    const [success, setSuccess] = useState('');

    const onFormSubmit = (values: addPermissionGroupFormData, _resetForm: () => void) => {
        wrapperFunction(values)
    }

    const validationShape = {
        name: Yup.string().required('Please enter name'),
        // description: Yup.string().required('Please enter the description')
    };
    //////////


    const getAllPermissionsGroup = useSelector(getPermissionGroupDetails);
    const permission_success = useSelector(getPermissionSuccess);

    useEffect(() => {
        getPermissionGroup();
    }, []);


    const getPermissionGroup = () => {
        dispatch(fetchPermissionGroupRequest({}));
    }

    useEffect(() => {
        console.log(getAllPermissionsGroup)
        if (typeof getAllPermissionsGroup === 'object') {
            setData(getAllPermissionsGroup)
        }
    }, [getAllPermissionsGroup])

    useEffect(() => {
        if (permission_success && permission_success.Message === 'Success' && removeId === 0 && success != '') {
            toast.success(`${success} Successfully`);
        } else if (permission_success && permission_success.Message === 'Success' && removeId != 0 && success != '') {
            toast.success(`${success} Successfully`);
        }
        getPermissionGroup();
    }, [permission_success])

    //For edit
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    const onGetData = (id: number): void => {
        const permissionGroupData = data && data.Permission_group.length > 0 && data.Permission_group.find((v: any) => v.Id === id);
        console.log(permissionGroupData)
        if (permissionGroupData) {
            // setData(newValue);
            setLocalInitialValues({
                id: permissionGroupData.Id,
                name: permissionGroupData.Name,
                description: permissionGroupData.Description,
                parent: 0,
                mapped: permissionGroupData.Mapped,
                master: permissionGroupData.Master
            });
            const tempIds: any = [];
            permissionGroupData.Mapped && permissionGroupData.Mapped.length > 0 && permissionGroupData.Mapped.map((v: any) => tempIds.push(v.Id))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setCheckedValue([...new Set(tempIds)])
        }
        setEdit(true)
        handleShow();
    }

    const onDeleteData = (id: number): void => {
        setDeleteModal(true);
        setRemoveId(id);
    }

    const onDeletePermissionGroup = async (id: number) => {
        const values = data && data.Permission_group.length > 0 && data.Permission_group.find((v: any) => v.Id === id);
        const updatePermissionGroup = {
            "Id": values.Id,
            "Name": values.Name,
            "Description": values.Description,
            "IsActive": true,
            "IsDeleted": true,
            "IsParentSet": values.IsParentSet != 0,
            "ParentSet_Id": values.ParentSet_Id,
            "Mapped": []
        }
        setSuccess('Deleted')
        await dispatch(updatePermissionGroupRequest({ updatePermissionGroup }));
        await getPermissionGroup();
        //hot fix
        // setTimeout(() => {
        //     window.location.replace('/permissions_group')
        // }, 1500);
    }

    //////

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowAccordion = () => {
        setLocalInitialValues({
            id: 0,
            name: '',
            description: '',
            parent: 0,
            mapped: [],
            master: []
        })
        setShow(true)
        setEdit(false)
        setCheckedValue([])
    };


    const wrapperFunction = async (values: any) => {
        handleClose();
        const mappedId: any = []
        let removeDuplicates: any = []
        if (checkedValue.length > 0)
            removeDuplicates = [...new Set(checkedValue)]
        removeDuplicates.length > 0 && removeDuplicates.map((v: any) => {
            mappedId.push({ Permission_Id: v });
        });
        if (values.id !== undefined && values.id != 0) {
            const updatePermissionGroup = {
                'Id': values.id,
                'Name': values.name,
                'Description': values.description,
                'IsActive': true,
                'IsParentSet': false,
                'ParentSetId': values.parent,
                'IsDeleted': false,
                'Mapped': mappedId
            }
            setSuccess('Updated')
            await dispatch(updatePermissionGroupRequest({ updatePermissionGroup }));
        } else {
            const addPermissionGroup = {
                'Name': values.name,
                'Description': values.description,
                'IsActive': true,
                'IsParentSet': false,
                'ParentSetId': values.parent,
                'IsDeleted': false,
                'Mapped': mappedId
            }
            setSuccess('Added')
            await dispatch(createPermissionGroupRequest({ addPermissionGroup }));
        }
        setRemoveId(0)
        await getPermissionGroup();
        //hot fix
        // setTimeout(() => {
        //     window.location.replace('/permissions_group')
        // }, 1500);
    }

    const onGetMappedData = (values: any) => {
        setShowPopup(true);
        setMappedData(values);
    }

    let permissionGroupTableCols: any = [];
    permissionGroupTableCols = PermissionGroupTableColumn({
        onGetData,
        onDeleteData,
        onGetMappedData
    });

    const modalShowClose = () => { setDeleteModal(false) }
    const onDeleteRecord = useCallback(() => { onDeletePermissionGroup(removeId); }, [onDeletePermissionGroup, removeId])

    const onSelectChangeVal = (e: React.FormEvent, isParent = false) => {
        const target = e.target as HTMLSelectElement;
        const intVal: number = parseInt(target.value);
        if (isParent) {
            const localMappedValues = localInitialValues.mapped;
            localInitialValues.master && localInitialValues.master.length > 0 && localInitialValues.master.map((v: any) => {
                if (v.Id === intVal) {
                    //check if it present in the Array
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    if (checkedValue.includes(intVal)) {
                        const localChildObj: any = []
                        let tempCheckValues = checkedValue;
                        localInitialValues.master.map((child: any) => {
                            if (child.ParentSetId === intVal) {
                                localChildObj.push(child.Id)
                                tempCheckValues = arrayRemove(tempCheckValues, child.Id)
                            }
                        });
                        //remove duplicates from an array start

                        const uniqueArray = localMappedValues.filter((ele: any, ind) => ind === localMappedValues.findIndex((elem: any) => elem.Id === ele.Id))
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        localInitialValues.mapped = [...uniqueArray];
                        setLocalInitialValues(localInitialValues)

                        // remove duplicates from an array end

                        // child remove
                        localChildObj.map((cid: any) => {
                            const index = uniqueArray.findIndex(function (o: any) {
                                return o.Id === cid;
                            })
                            if (index !== -1) uniqueArray.splice(index, 1);
                        })

                        //
                        // only for parent remove
                        //
                        uniqueArray.splice(uniqueArray.findIndex((a: any) => a.Id === intVal), 1);
                        //

                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        localInitialValues.mapped = [...uniqueArray];
                        setLocalInitialValues(localInitialValues)
                        const parentId = arrayRemove(tempCheckValues, intVal);
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        setCheckedValue([...new Set(parentId)])
                    } else {
                        const childArray: any = []
                        const localChildObj: any = []
                        localInitialValues.master.map((child: any) => {
                            if (child.ParentSetId === intVal) {
                                childArray.push(child.Id)
                                localChildObj.push(child)
                            }
                        });
                        if (!childArray.includes(intVal)) childArray.push(intVal)

                        //parent Node checks  if not checked the Parent
                        const parentNode: any = [];
                        localInitialValues.master.map((child: any) => {
                            if (child.Id === intVal)
                                parentNode.push(child)
                        })
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        localInitialValues.mapped = localMappedValues ? [...localMappedValues, ...localChildObj, ...parentNode] : [...localChildObj, ...parentNode];
                        setLocalInitialValues(localInitialValues)
                        const newCheckmated: any = [...checkedValue, ...childArray]
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        setCheckedValue([...new Set(newCheckmated)])
                    }
                }
            })
        }
        else {
            const localMappedValues = localInitialValues.mapped;
            // 
            // console.log(intVal, checkedValue)
            const removeObjects: any = []
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (checkedValue.includes(intVal)) {
                // console.log("In Checkbox and Check box id is " + intVal + "\n")
                removeObjects.push(intVal)
                const removedCurrentValue = arrayRemove(checkedValue, intVal);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setCheckedValue([...new Set(removedCurrentValue)])

                //parent Node checks  if not checked the Parent
                let parentId: any = null;
                localInitialValues.master.map((child: any) => {
                    if (child.Id === intVal)
                        parentId = child.ParentSetId
                })

                const remainIds: any = []
                let totalCount: any = 0
                if (parentId) {
                    localInitialValues.master.map((child: any) => {
                        if (child.ParentSetId === parentId)
                            totalCount++;
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        if (child.ParentSetId === parentId && !(child.Id === intVal) && !checkedValue.includes(child.Id)) {
                            //To remove the parent node if no child select
                            remainIds.push(child.Id)
                        }
                    });

                    // console.log(remainIds,intVal, parentId)
                    if (totalCount === remainIds.length + 1) {
                        removeObjects.push(parentId)
                    }
                }

                let checkboxValues = checkedValue
                removeObjects.map((removeObj: any) => {
                    localMappedValues.splice(localMappedValues.findIndex((a: any) => a.Id === removeObj), 1);
                    const result = arrayRemove(checkboxValues, removeObj);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    checkboxValues = [...new Set(result)]
                })
                if (checkboxValues.length === 0) {
                    localInitialValues.mapped = [];
                }

                // console.log(localMappedValues, checkboxValues, removeObjects)
                // console.log("In Checkbox end \n")
                localInitialValues.mapped = [...localMappedValues];
                setLocalInitialValues(localInitialValues)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setCheckedValue([...new Set(checkboxValues)])
            } else {
                // console.log("Not in the Checkbox and Check box id is " + intVal + "\n")
                const singleChild: any = [];
                let parentId: any = null
                localInitialValues.master.map((child: any) => {
                    if (child.Id === intVal) {
                        singleChild.push(child)
                        parentId = child.ParentSetId
                    }
                })
                // if (!parentArray.includes(intVal)) parentArray.push(intVal)

                //parent Node checks  if not checked the Parent
                const parentNode: any = [];
                localInitialValues.master.map((child: any) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    if (child.Id === parentId && !checkedValue.includes(parentId))
                        parentNode.push(child)
                })
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                localInitialValues.mapped = localMappedValues ? [...localMappedValues, ...singleChild, ...parentNode] : [...singleChild, ...parentNode];
                setLocalInitialValues(localInitialValues)
                const tempArry: any = [...checkedValue, intVal, parentId];
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setCheckedValue([...new Set(tempArry)])
                // console.log(localInitialValues.mapped, [...new Set(tempArry)])
                // console.log("Not in the Checkbox End === \n")
            }
        }
    };

    function arrayRemove(arr: any, value: any) {
        return arr.filter((item: any) => item !== value)

    }

    //////
    return (
        <div>
            <PageContent>
                <BoxHead
                    title={'Permission Groups'}
                />
                <BoxBody>
                    <ListingSearch
                        title={'Permission Group'}
                        showAccordion={handleShowAccordion}
                    />
                    <CustomTableContainer
                        columns={permissionGroupTableCols}
                        data={Object.keys(data).length != 0 && Object.keys(data.Permission_group).length != 0 ? data.Permission_group : []}
                        options={true}
                        downloadFileName={"PermissionGroup.csv"}
                    />
                </BoxBody>
            </PageContent>
            {
                showModal && (
                    <Modal
                        id="event"
                        size="lg"
                        show={showModal}
                        onHide={() => setShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                {edit ? 'Update ' : 'Add '} Permissions Groups
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Formik
                                enableReinitialize
                                initialValues={localInitialValues}
                                onSubmit={(values: addPermissionGroupFormData, actions) => {
                                    onFormSubmit(values, actions.resetForm)
                                    setTimeout(() => {
                                        actions.setSubmitting(false)
                                    }, 500)
                                }}
                                validationSchema={Yup.object().shape(validationShape)}
                            >
                                {(props: FormikProps<addPermissionGroupFormData>) => {
                                    const {
                                        values,
                                        touched,
                                        errors,
                                        handleBlur,
                                        handleChange,
                                        isValid,
                                        dirty
                                    } = props
                                    return (

                                        <Form autoComplete="off">
                                            <BS.Row className="d-block-sm">
                                                <BS.Form.Group as={Col} className="mb-3" controlId="name">
                                                    <BS.Form.Label column sm="4">Name <span className="required">*</span></BS.Form.Label>
                                                    {/* <Col sm="12"> */}
                                                    <BS.Form.Control
                                                        type="text"
                                                        placeholder="name"
                                                        //onChange={e => setName(e.target.value)}
                                                        name='name'
                                                        value={values.name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <div className={!!(errors.name && touched.name) ? 'error-span show' : 'error-span'}>
                                                        {errors.name && touched.name
                                                            ? errors.name
                                                            : 'Enter name'}</div>
                                                    {/* </Col> */}
                                                </BS.Form.Group>

                                                <BS.Form.Group as={Col} className="mb-3" controlId="description">
                                                    <BS.Form.Label column sm="3">Description</BS.Form.Label>
                                                    {/* <Col sm="12"> */}
                                                    <BS.Form.Control
                                                        type="text"
                                                        placeholder="description"
                                                        //onChange={e => setDesc(e.target.value)}
                                                        name='description'
                                                        value={values.description}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <div className={!!(errors.description && touched.description) ? 'error-span show' : 'error-span'}>
                                                        {errors.description && touched.description
                                                            ? errors.description
                                                            : 'Enter description'}
                                                    </div>
                                                    {/* </Col> */}
                                                </BS.Form.Group>

                                            </BS.Row>
                                            <BS.Row className="d-block-sm">
                                                <BS.Form.Group as={Col} className="mb-3" controlId="parent">
                                                    <BS.Form.Label column sm="3">{localInitialValues.master.length > 0 ? 'Permissions' : ''}</BS.Form.Label>
                                                    <PerfectScrollbar options={{ suppressScrollX: false }}>
                                                        <table className="table table-bordered text-center mb-0">
                                                            {/* update-permission */}
                                                            {
                                                                localInitialValues.master.length > 0 ?
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Name</th>
                                                                        </tr>
                                                                    </thead>
                                                                    : null
                                                            }
                                                            <tbody>
                                                                {
                                                                    localInitialValues.master && localInitialValues.master.filter((f: any) => f.ParentSetId == 0).map((p: any, i: number) => {
                                                                        const checkValue = localInitialValues.mapped && localInitialValues.mapped.length > 0 && localInitialValues.mapped.find((v: any) => v.Id === p.Id)
                                                                        return (
                                                                            <tr key={i}>
                                                                                <td key={i}>
                                                                                    <table className="table table-bordered text-center">
                                                                                        <tr key={i}>
                                                                                            <th>
                                                                                                <input
                                                                                                    type="checkbox"
                                                                                                    className="form-check-input"
                                                                                                    id={p.Id}
                                                                                                    name={"p_" + p.Id.toString()}
                                                                                                    value={p.Id}
                                                                                                    onChange={(e) => onSelectChangeVal(e, true)}
                                                                                                    checked={checkValue ?? false}
                                                                                                />
                                                                                                &nbsp;&nbsp;{p.Name}
                                                                                            </th>
                                                                                        </tr>
                                                                                        {
                                                                                            localInitialValues.master && localInitialValues.master.filter((f1: any) => f1.ParentSetId == p.Id).map((value: any, index: number) => {
                                                                                                const checkValue = localInitialValues.mapped && localInitialValues.mapped.length > 0 && localInitialValues.mapped.find((v: any) => v.Id === value.Id)
                                                                                                if (value.ParentSetId === 0) {
                                                                                                    return <tr key={index}>
                                                                                                        <th>{value.Name}</th>
                                                                                                    </tr>
                                                                                                } else {
                                                                                                    return <tr key={index}>
                                                                                                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                                                            <input
                                                                                                                type="checkbox"
                                                                                                                id={value.Id}
                                                                                                                name={"p_" + value.Id.toString()}
                                                                                                                value={value.Id}
                                                                                                                onChange={(e) => onSelectChangeVal(e, false)}
                                                                                                                className="form-check-input"
                                                                                                                checked={checkValue ?? false}
                                                                                                            />&nbsp;&nbsp;{value.Name}
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </PerfectScrollbar>
                                                </BS.Form.Group>
                                            </BS.Row>
                                            <div className="listing crp-table mt-3">
                                                <div className="add-lease d-flex justify-content-end BS.Color-highlight">
                                                    <BS.Row>
                                                        <BS.Form.Group as={Col} className="mb-0" controlId="parent">
                                                            <BS.Button className="btn-md-w" variant="secondary" onClick={() => setShow(false)}>
                                                                Cancel
                                                            </BS.Button> &nbsp;
                                                            <BS.Button
                                                                className="btn-md-w"
                                                                variant="primary"
                                                                type="submit"
                                                                disabled={edit ? false : !(dirty && isValid)}
                                                            >
                                                                {edit ? 'Update' : 'Save'}
                                                            </BS.Button>
                                                        </BS.Form.Group>
                                                    </BS.Row>
                                                </div>
                                            </div>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </Modal.Body>
                    </Modal>
                )
            }

            <Modal
                show={showPopup}
                onHide={() => setShowPopup(false)}
                dialogClassName="modal-70w"
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Mapped Permissions
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-bordered text-center">
                        {/* <thead>
                                <tr>
                                    <th>Name</th>
                                </tr>
                            </thead> */}
                        <tbody>
                            <tr>
                                {
                                    mappedData && mappedData.filter((f: any) => f.ParentSetId == 0).map((p: any, i: number) => {
                                        return <td key={i}>
                                            <table className="table table-bordered text-center">
                                                <tr key={i}>
                                                    <th>{p.Name}</th>
                                                </tr>
                                                {
                                                    mappedData && mappedData.filter((f1: any) => f1.ParentSetId == p.Id).map((value: any, index: number) => {
                                                        if (value.ParentSetId === 0) {
                                                            return <tr key={index}>
                                                                <th>{value.Name}</th>
                                                            </tr>
                                                        } else {
                                                            return <tr key={index}>
                                                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{value.Name}</td>
                                                            </tr>
                                                        }
                                                    })
                                                }
                                            </table>
                                        </td>
                                    })
                                }
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
            {
                deleteModal && removeId &&
                <DeleteModal
                    show={deleteModal}
                    handleClose={modalShowClose}
                    onDeleteData={onDeleteRecord}
                />
            }
        </div>
    );
}
export default PermissionGroup;