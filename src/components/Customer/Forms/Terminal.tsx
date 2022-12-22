import React from "react";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { terminalIProps } from "../../../interfaces/customerTypes";

class TerminalForm extends React.Component<terminalIProps, any> {
    render(): JSX.Element {
        const { values, handleChange, handleBlur, errors, touched, edit, years } = this.props;
        return (
            <div>
                <Row className="mb-3 d-block-sm">
                    <Form.Group as={Col} controlId="LegalName">
                        <Form.Label>Pool Location# <span className="required">*</span></Form.Label>
                        <Form.Control type="text" placeholder="Pool Location#"
                                      name='pool_PoolLocationNumber'
                                      value={values.pool_PoolLocationNumber}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                        />
                        <div className={!!(errors.pool_PoolLocationNumber &&  touched.pool_PoolLocationNumber) || (errors.pool_PoolLocationNumber && edit)? 'error-span show' : 'error-span'}>
                            {
                                (errors.pool_PoolLocationNumber &&  touched.pool_PoolLocationNumber) || (errors.pool_PoolLocationNumber && edit)
                                    ? errors.pool_PoolLocationNumber
                                    : 'Enter pool location number'
                            }</div>
                    </Form.Group>
                    <Form.Group as={Col} controlId="address">
                        <Form.Label>Address(Street#,name)</Form.Label>
                        <Form.Control type="text" placeholder="Address"
                                      name='pool_address'
                                      value={values.pool_address}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                        />
                        <div className={!!(errors.pool_address &&  touched.pool_address) || (errors.pool_address && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.pool_address &&  touched.pool_address) || (errors.pool_address && edit)
                                    ? errors.pool_address
                                    : 'Enter address'
                            }</div>
                    </Form.Group>
                    <Form.Group as={Col} controlId="buildingFloor">
                        <Form.Label>Address(Building,#Floor)</Form.Label>
                        <Form.Control type="text" placeholder="Enter building floor"
                                      name='pool_address2'
                                      value={values.pool_address2}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                        />
                        <div className={!!(errors.pool_address2 &&  touched.pool_address2) || (errors.pool_address2 && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.pool_address2 &&  touched.pool_address2) || (errors.pool_address2 && edit)
                                    ? errors.pool_address2
                                    : 'Enter address2'
                            }</div>
                    </Form.Group>
                    <Form.Group as={Col} controlId="City">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="City"
                                      name='pool_city'
                                      value={values.pool_city}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                        />
                        <div className={!!(errors.pool_city &&  touched.pool_city) || (errors.pool_city && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.pool_city &&  touched.pool_city) || (errors.pool_city && edit)
                                    ? errors.pool_city
                                    : 'Enter city'
                            }</div>
                    </Form.Group>
                    <Form.Group as={Col} controlId="State">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" placeholder="State"
                                      name='pool_state'
                                      value={values.pool_state}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                        />
                        <div className={!!(errors.pool_state &&  touched.pool_state) || (errors.pool_state && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.pool_state &&  touched.pool_state) || (errors.pool_state && edit)
                                    ? errors.pool_state
                                    : 'Enter state'
                            }</div>
                    </Form.Group>
                </Row>
                <Row className="mb-3 d-block-sm">
                    <Form.Group as={Col} controlId="Zip Code">
                        <Form.Label>Zip Code <span className="required">*</span></Form.Label>
                        <Form.Control type="text" placeholder="Enter Zip Code"
                                      name='pool_zipCode'
                                      value={values.pool_zipCode}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                        />
                        <div className={!!(errors.pool_zipCode &&  touched.pool_zipCode) || (errors.pool_zipCode && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.pool_zipCode &&  touched.pool_zipCode) || (errors.pool_zipCode && edit)
                                    ? errors.pool_zipCode
                                    : 'Enter zipcode'
                            }</div>
                    </Form.Group>
                    <Form.Group as={Col} controlId="Phone Number">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter Phone Number"
                                      name='pool_phone'
                                      value={values.pool_phone}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                        />
                        <div className={!!(errors.pool_phone &&  touched.pool_phone) || (errors.pool_phone && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.pool_phone &&  touched.pool_phone) || (errors.pool_phone && edit)
                                    ? errors.pool_phone
                                    : 'Enter the phone number'
                            }</div>
                    </Form.Group>
                    <Form.Group as={Col} controlId="TaxId">
                        <Form.Label>Federal Tax ID#</Form.Label>
                        <Form.Control type="text" placeholder="TaxId"
                                      name='pool_Federal_Tax_ID'
                                      value={values.pool_Federal_Tax_ID}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                        />
                        <div className={!!(errors.pool_Federal_Tax_ID &&  touched.pool_Federal_Tax_ID) || (errors.pool_Federal_Tax_ID && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.pool_Federal_Tax_ID &&  touched.pool_Federal_Tax_ID) || (errors.pool_Federal_Tax_ID && edit)
                                    ? errors.pool_Federal_Tax_ID
                                    : 'Enter federal tax ID'
                            }</div>
                    </Form.Group>
                    <Form.Group as={Col} controlId="DUNS#">
                        <Form.Label>DUNS#</Form.Label>
                        <Form.Control type="text" placeholder="DUNS#"
                                      name='pool_DUNS_Number'
                                      value={values.pool_DUNS_Number}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                        />
                        <div className={!!(errors.pool_DUNS_Number &&  touched.pool_DUNS_Number) || (errors.pool_DUNS_Number && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.pool_DUNS_Number &&  touched.pool_DUNS_Number) || (errors.pool_DUNS_Number && edit)
                                    ? errors.pool_DUNS_Number
                                    : 'Enter DUNS'
                            }</div>
                    </Form.Group>
                    <Form.Group as={Col} controlId="SCAC">
                        <Form.Label>System ID (SCAC)</Form.Label>
                        <Form.Control type="text" placeholder="SCAC"
                                      name='pool_SystemID'
                                      value={values.pool_SystemID}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                        />
                        <div className={!!(errors.pool_SystemID &&  touched.pool_SystemID) || (errors.pool_SystemID && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.pool_SystemID &&  touched.pool_SystemID) || (errors.pool_SystemID && edit)
                                    ? errors.pool_SystemID
                                    : 'Enter systemID'
                            }</div>
                    </Form.Group>

                </Row>
                <Form.Group as={Row} controlId="Facility" className="w-sm-100 mb-3 d-block-sm" >
                    <Form.Label column sm={4}>Is this a new/Existing Facility</Form.Label>
                    <Col sm={2}>
                        <Form.Control as="select" className="select-option"
                                      name='pool_IsNewOrExisting'
                                      value={values.pool_IsNewOrExisting}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                        >
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </Form.Control>
                    </Col>
                    <div className={!!(errors.pool_IsNewOrExisting &&  touched.pool_IsNewOrExisting) || (errors.pool_IsNewOrExisting && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.pool_IsNewOrExisting &&  touched.pool_IsNewOrExisting) || (errors.pool_IsNewOrExisting && edit)
                                ? errors.pool_IsNewOrExisting
                                : 'Please select new/existing facility'
                        }</div>
                    <Form.Label column sm={4}>Is Existing, how many years in Operation?</Form.Label>
                    <Col sm={2}>
                        <Form.Control as="select" className="select-option"
                                      name='pool_YearsOfOperation'
                                      value={values.pool_YearsOfOperation}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                        >
                            <option key={0} value={""}>
                                {"Select"}
                            </option>
                            {
                                years && years.length > 0 &&
                                years.map((p: any, i: number) => {
                                    return (
                                        <option key={i} value={p.displayText}>
                                            {p.displayText}
                                        </option>
                                    );
                                })
                            }
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="DUNS#" className={'mb-3 d-block-sm'}>
                    <Form.Label column sm={4}>Scanning Platform?</Form.Label>
                    <Col sm={2}>
                        <Form.Control as="select"  className="select-option"
                                      name='pool_IsPCS'
                                      value={values.pool_IsPCS}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                        >
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </Form.Control>
                    </Col>
                    <div className={!!(errors.pool_IsPCS &&  touched.pool_IsPCS) || (errors.pool_IsPCS && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.pool_IsPCS &&  touched.pool_IsPCS) || (errors.pool_IsPCS && edit)
                                ? errors.pool_IsPCS
                                : 'Enter the scanning platform'
                        }</div>
                    <Form.Label column sm={2}>If Other:</Form.Label>
                    <Col sm={4}>
                        <Form.Control type="text" placeholder="Other"
                                      name='pool_OtherSystems'
                                      value={values.pool_OtherSystems}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                        />
                    </Col>
                </Form.Group>


                <FloatingLabel controlId="floatingTextarea2" label="Scanning Capabilities" className="mb-3">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                        name={'pool_ScanningComments'}
                        value={values.pool_ScanningComments}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </FloatingLabel>
                <Row className="bg-lgray align-items-center my-3 py-2 d-block-sm">
                    <Form.Group as={Col} xs={2} className="mb-2 w-sm-100">
                        <Form.Label htmlFor="inlineFormInputGroup" >Dock size (ft<sup>2</sup>&nbsp;or m<sup>2</sup>)</Form.Label>
                        <InputGroup className="mb-2">
                            {/* <FormControl id="inlineFormInputGroup" placeholder="Dock size" /> */}
                            <Form.Control type="text" placeholder="Dock size"
                                          name='pool_DockSize'
                                          value={values.pool_DockSize}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                            />
                            <InputGroup.Text><span>ft<sup>2</sup></span></InputGroup.Text>
                        </InputGroup>
                        <div className={!!(errors.pool_DockSize &&  touched.pool_DockSize) || (errors.pool_DockSize && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.pool_DockSize &&  touched.pool_DockSize) || (errors.pool_DockSize && edit)
                                    ? errors.pool_DockSize
                                    : 'Enter the dock size'
                            }</div>
                    </Form.Group>
                    <Form.Group as={Col} controlId="No of Dock Doors" xs={2} className="mb-2 w-sm-100">
                        <Form.Label>No of Dock Doors</Form.Label>
                        <Form.Control type="text" placeholder="No of Dock Doors"
                                      name='pool_DockDoorNumbers'
                                      value={values.pool_DockDoorNumbers}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                        />
                        <div className={!!(errors.pool_DockDoorNumbers &&  touched.pool_DockDoorNumbers) || (errors.pool_DockDoorNumbers && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.pool_DockDoorNumbers &&  touched.pool_DockDoorNumbers) || (errors.pool_DockDoorNumbers && edit)
                                    ? errors.pool_DockDoorNumbers
                                    : 'Enter the no of doors'
                            }</div>
                    </Form.Group>
                    <Form.Group as={Col} controlId="SecuritySystem" xs={2} className="mb-2 w-sm-100">
                        <Form.Label>Security System</Form.Label>
                        <Form.Control as="select" className="select-option"
                                      name='pool_HasSecuritySystem'
                                      value={values.pool_HasSecuritySystem}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                        >
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </Form.Control>
                        <div className={!!(errors.pool_HasSecuritySystem &&  touched.pool_HasSecuritySystem) || (errors.pool_HasSecuritySystem && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.pool_HasSecuritySystem &&  touched.pool_HasSecuritySystem) || (errors.pool_HasSecuritySystem && edit)
                                    ? errors.pool_HasSecuritySystem
                                    : 'Enter the security system'
                            }</div>
                    </Form.Group>
                    <FloatingLabel controlId="floatingTextarea2" label="Comments" className="mb-2">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            name={'pool_SecuritySys_Comments'}
                            value={values.pool_SecuritySys_Comments}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FloatingLabel>
                </Row>
                <Row className="bg-lgray align-items-center my-3 py-2 d-block-sm">
                    <Form.Group as={Col} controlId="Fencedyard" xs={2} className="mb-2 w-sm-100">
                        <Form.Label>Fenced Yard?</Form.Label>
                        <Form.Control as="select" className="select-option"
                                      name='pool_IsFencedYard'
                                      value={values.pool_IsFencedYard}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                        >
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </Form.Control>
                        <div className={!!(errors.pool_IsFencedYard &&  touched.pool_IsFencedYard) || (errors.pool_IsFencedYard && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.pool_IsFencedYard &&  touched.pool_IsFencedYard) || (errors.pool_IsFencedYard && edit)
                                    ? errors.pool_IsFencedYard
                                    : 'Please select the fence yard'
                            }</div>
                    </Form.Group>
                    <Form.Group as={Col} controlId="24/7 Receiving?" xs={2} className="mb-2 w-sm-100">
                        <Form.Label>24/7 Receiving?</Form.Label>
                        <Form.Control
                            as="select"
                            className="select-option"
                            name='pool_IsAllDayReceiving'
                            value={values.pool_IsAllDayReceiving}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </Form.Control>
                        <div className={!!(errors.pool_IsAllDayReceiving &&  touched.pool_IsAllDayReceiving) || (errors.pool_IsAllDayReceiving && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.pool_IsAllDayReceiving &&  touched.pool_IsAllDayReceiving) || (errors.pool_IsAllDayReceiving && edit)
                                    ? errors.pool_IsAllDayReceiving
                                    : 'Please select 24/7 receiving?'
                            }</div>
                    </Form.Group>
                    <Form.Group as={Col} controlId="Is yard On/ Off Site?" xs={2} className="mb-2 w-sm-100">
                        <Form.Label>Is yard On/ Off Site?</Form.Label>
                        <Form.Control as="select" className="select-option"
                                      name='pool_IsYardOnOrOffsite'
                                      value={values.pool_IsYardOnOrOffsite}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                        >
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </Form.Control>
                        <div className={!!(errors.pool_IsYardOnOrOffsite &&  touched.pool_IsYardOnOrOffsite) || (errors.pool_IsYardOnOrOffsite && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.pool_IsYardOnOrOffsite &&  touched.pool_IsYardOnOrOffsite) || (errors.pool_IsYardOnOrOffsite && edit)
                                    ? errors.pool_IsYardOnOrOffsite
                                    : 'Please select the yard on/off site'
                            }</div>
                    </Form.Group>
                    <FloatingLabel controlId="floatingTextarea2" label="Comments" className="mb-2">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            name={'pool_Yard_Comments'}
                            value={values.pool_Yard_Comments}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FloatingLabel>
                </Row>
                <Row className="bg-lgray align-items-center my-3 py-2 d-block-sm">
                    <Col xs={3} className="w-sm-100">
                        <Form.Group as={Col} controlId="Equipment owned or Leased?" className="mb-2 w-sm-100">
                            <Form.Label>Equipment owned or Leased?</Form.Label>
                            <Form.Control as="select" className="select-option"
                                          name='pool_IsEquipmentOwned'
                                          value={values.pool_IsEquipmentOwned}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                            >
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </Form.Control>
                            <div className={!!(errors.pool_IsEquipmentOwned &&  touched.pool_IsEquipmentOwned) || (errors.pool_IsEquipmentOwned && edit) ? 'error-span show' : 'error-span'}>
                                {
                                    (errors.pool_IsEquipmentOwned &&  touched.pool_IsEquipmentOwned) || (errors.pool_IsEquipmentOwned && edit)
                                        ? errors.pool_IsEquipmentOwned
                                        : 'Enter the equipment owned'
                                }</div>
                        </Form.Group>
                        <Form.Group as={Col} controlId="Driver Designation?" className="mb-2 w-sm-100">
                            <Form.Label>Driver Designation?</Form.Label>
                            <Form.Control type="text" placeholder="Driver Designation"
                                          name='pool_DriverDesignation'
                                          value={values.pool_DriverDesignation}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                            />
                            <div className={!!(errors.pool_DriverDesignation &&  touched.pool_DriverDesignation) ? 'error-span show' : 'error-span'}>
                                {
                                    errors.pool_DriverDesignation &&  touched.pool_DriverDesignation
                                        ? errors.pool_DriverDesignation
                                        : 'Enter the driver destination'
                                }</div>
                        </Form.Group>
                    </Col>
                    <Col>
                        <FloatingLabel controlId="floatingTextarea2" label="Comments" className="mb-2 w-sm-100">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '120px' }}
                                name={'pool_Equipment_Comments'}
                                value={values.pool_Equipment_Comments}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </FloatingLabel>
                    </Col>


                </Row>
                <Row className="bg-lgray align-items-center my-3 py-3 d-block-sm">
                    <FloatingLabel controlId="floatingTextarea2" label="Mode(S) of communication between Driver and Terminal" className="mb-2">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            name={'pool_ModesOfComm'}
                            value={values.pool_ModesOfComm}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FloatingLabel>
                </Row>
                <Row className="bg-lgray align-items-center my-3 py-2 d-block-sm">
                    <Col xs={3} className="w-sm-100">
                        <Form.Group as={Col} controlId="GPS Installed in trucks?" className="mb-2 w-sm-100">
                            <Form.Label>GPS Installed in trucks?</Form.Label>
                            <Form.Control as="select" className="select-option"
                                          name='pool_IsGPS'
                                          value={values.pool_IsGPS}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                            >
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </Form.Control>
                            <div className={!!(errors.pool_IsGPS &&  touched.pool_IsGPS) || (errors.pool_IsGPS && edit) ? 'error-span show' : 'error-span'}>
                                {
                                    (errors.pool_IsGPS &&  touched.pool_IsGPS) || (errors.pool_IsGPS && edit)
                                        ? errors.pool_IsGPS
                                        : 'Please select the option'
                                }</div>
                        </Form.Group>
                        <Form.Group as={Col} controlId="GPS Installed in trailers?" className="mb-2 w-sm-100">
                            <Form.Label>GPS Installed in trailers?</Form.Label>
                            <Form.Control as="select" className="select-option"
                                          name='pool_IsTrailerGPS'
                                          value={values.pool_IsTrailerGPS}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                            >
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </Form.Control>
                            <div className={!!(errors.pool_IsTrailerGPS &&  touched.pool_IsTrailerGPS) || (errors.pool_IsTrailerGPS && edit) ? 'error-span show' : 'error-span'}>
                                {
                                    (errors.pool_IsTrailerGPS &&  touched.pool_IsTrailerGPS) || (errors.pool_IsTrailerGPS && edit)
                                        ? errors.pool_IsTrailerGPS
                                        : 'Please select the option'
                                }</div>
                        </Form.Group>
                    </Col>
                    <Col>
                        <FloatingLabel controlId="floatingTextarea2" label="Comments" className="mb-2 w-sm-100">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '120px' }}
                                name={'pool_GPS_Comments'}
                                value={values.pool_GPS_Comments}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="bg-lgray align-items-center my-3 py-2 d-block-sm">
                    <Col xs={3} className="w-sm-100">
                        <Form.Group as={Col} controlId="Are all trailers hard sided?" className="mb-2 w-sm-100">
                            <Form.Label>Are all trailers hard sided?</Form.Label>
                            <Form.Control as="select" className="select-option"
                                          name='pool_IsTrailerHardSided'
                                          value={values.pool_IsTrailerHardSided}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                            >
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </Form.Control>
                            <div className={!!(errors.pool_IsTrailerHardSided &&  touched.pool_IsTrailerHardSided) || (errors.pool_IsTrailerHardSided && edit) ? 'error-span show' : 'error-span'}>
                                {
                                    (errors.pool_IsTrailerHardSided &&  touched.pool_IsTrailerHardSided) || (errors.pool_IsTrailerHardSided && edit)
                                        ? errors.pool_IsTrailerHardSided
                                        : 'Please select the option'
                                }</div>
                        </Form.Group>
                        <Form.Group as={Col} controlId="Is Equipment less than 5 years old?" className="mb-2 w-sm-100">
                            <Form.Label>Is Equipment less than 5 years old?</Form.Label>
                            <Form.Control as="select" className="select-option"
                                          name='pool_IsEquipls5yrs'
                                          value={values.pool_IsEquipls5yrs}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                            >
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </Form.Control>
                            <div className={!!(errors.pool_IsEquipls5yrs &&  touched.pool_IsEquipls5yrs) || (errors.pool_IsEquipls5yrs && edit) ? 'error-span show' : 'error-span'}>
                                {
                                    (errors.pool_IsEquipls5yrs &&  touched.pool_IsEquipls5yrs) || (errors.pool_IsEquipls5yrs && edit)
                                        ? errors.pool_IsEquipls5yrs
                                        : 'Please select the option'
                                }</div>
                        </Form.Group>

                    </Col>
                    <Col>
                        <FloatingLabel controlId="floatingTextarea2" label="Comments" className="mb-2">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '120px' }}
                                name={'pool_Trailer_Comments'}
                                value={values.pool_Trailer_Comments}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default TerminalForm;