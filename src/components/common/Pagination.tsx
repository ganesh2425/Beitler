import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const active = 1;
const items: any[] = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>
  );
}

// type IProps = {
//   totalRecordCount: any;
//   showRecordsCallBack: any;
// };

// const PaginateFun = ({
//   totalRecordCount,
//   showRecordsCallBack,
// }: IProps): JSX.Element => {
//   const [totalRecordsCount, setTotalRecordsCount] = useState(totalRecordCount);
//   return (
//     <div className="d-md-flex justify-content-md-between align-items-center">
//       <div className="select-entries">
//         <div className="">
//           Show&nbsp;
//           <select className="custom-select custom-select-sm">
//             <option>10</option>
//             <option>20</option>
//             <option>30</option>
//           </select>
//           <span>&nbsp;entries</span>
//         </div>
//       </div>
//       <div className="show-entries">
//         <p className="mb-0">Showing 1 to 3 of {totalRecordsCount} entries</p>
//       </div>
//       <div className="page-nav">
//         <Pagination size="sm">{items}</Pagination>
//       </div>
//     </div>
//   );
// };
// export default PaginateFun;

class Paginate extends React.Component {
  render(): JSX.Element {
    return (
      <div className="d-md-flex justify-content-md-between align-items-center">
        <div className="select-entries">
          <div className="">
            Show&nbsp;
            <select className="custom-select custom-select-sm">
              <option>10</option>
              <option>20</option>
              <option>30</option>
            </select>
            <span>&nbsp;entries</span>
          </div>
        </div>
        <div className="show-entries">
          <p className="mb-0">Showing 1 to 3 of 3 entries</p>
        </div>
        <div className="page-nav">
          <Pagination size="sm">{items}</Pagination>
        </div>
      </div>
    );
  }
}

export default Paginate;
