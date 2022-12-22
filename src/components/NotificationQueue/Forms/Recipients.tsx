import React from "react";
import { Table } from "react-bootstrap";

class RecipientsForm extends React.Component {
    render(): JSX.Element {
        return (
            <div>
                <Table className="table" bordered hover>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Email ID</th>
                            <th scope="col">Is Sent</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ID 1</td>
                            <td>True</td>
                        </tr>
                        <tr>
                            <td>ID 2</td>
                            <td>False</td>
                        </tr>
                        <tr>
                            <td>ID 3</td>
                            <td>True</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default RecipientsForm;