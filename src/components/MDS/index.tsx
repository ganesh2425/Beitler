import React, { useState } from "react";
import AccordionLayout from "./Accordion";
import ListingSearch from "../common/Search";
import { PageContent, BoxHead, BoxBody } from "../../utilities/common";
import CustomTableContainer from "../../containers/CommonTableContainer";
import data from "../../services/json/mds.json";
import MDSColumns from "./MDSColumn";

const MDS = (): JSX.Element => {
  const [accordion, setAccordion] = useState(false);

  const showAccordion = () => {
    setAccordion(true);
  };

  const onDownloadData = () => {
    console.log("download");
  };
  const onGetData = () => {
    console.log("download");
  };

  const onDeleteData = () => {
    console.log("download");
  };
  let cols: any = [];
  if (data.length > 0) {
    cols = MDSColumns({
      onDownloadData,
      onGetData,
      onDeleteData,
    });
  }
  return (
    <>
      {!accordion ? (
        <PageContent>
          <BoxHead title={"MDS Listing"} />
          <BoxBody>
            <ListingSearch
              showAccordion={showAccordion}
              title={"MDS"}
              buttonPlus={true}
            />
            <CustomTableContainer
              columns={cols}
              data={Object.keys(data).length != 0 ? data : []}
              options={true}
              downloadFileName={"MDS.csv"}
            />
          </BoxBody>
        </PageContent>
      ) : (
        <AccordionLayout header={"some text"} />
      )}
    </>
  );
};
export default MDS;
