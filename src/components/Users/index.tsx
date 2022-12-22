import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import UserInviteForm from "./UserInivite";
import { connect } from "react-redux";
import { history } from "../../config/history";
import { API_SERVICE } from "../../services/commonApi";
import StorageService from "../../services/Storage.service";
import { getAllDepartments, getAllEntities } from "../../utilities/common";
import { API_URLS } from "../../utilities/api_url_constants";
import { toast } from "react-toastify";

class UserInvitePage extends Component {
  readonly state = {
    show: true,
    departments: [],
    token: "",
    entities: [],
    notification_events: [],
    template_events: [],
  };

  componentDidMount() {
    const authToken = StorageService.getCookies("token");
    this.setState({ token: authToken }, () => {
      this.getEntities();
    });
  }

  getDepartments = async (value: number): Promise<void> => {
    const { token } = this.state;
    getAllDepartments(value, token)
      .then((departments: any) => {
        this.setState({ departments });
      })
      .catch((e) => console.log(e + "departments api error"));
  };

  getEntities = async (): Promise<void> => {
    const { token, entities } = this.state;
    if (token) {
      getAllEntities(token)
        .then((r: any) => {
          if (r && r.length > 0 && entities.length === 0) {
            const sortedValues = r.length > 0 && r.sort(function(a: any, b: any) {
              return a.value.localeCompare(b.value);
            });
            this.setState({ entities: sortedValues }, () => {
              this.getDepartments(r[0].id);
            });
          }
          // this.setState({ entities: sortedValues }, () => {
          //   this.getDepartments(r[0].id);
          // });
        })
        .catch((e) => {
          console.log(e + "entities api error");
        });
    } else if (token === undefined) {
      window.location.assign("/login");
    }
  };

  returnPage = async (): Promise<void> => {
    window.location.replace("/dashboard");
  };

  onFormSubmit = async (values: any): Promise<void> => {
    const { token } = this.state;
    const response = await API_SERVICE.get(
      API_URLS.notification_event,
      {},
      token
    );
    const notificationResponse = JSON.parse(response.data);
    if (notificationResponse.length > 0) {
      const templateResponse = await API_SERVICE.get(
        API_URLS.notification_template,
        {},
        token
      );
      this.checkTemplate(JSON.parse(templateResponse.data), values);
      this.setState({
        notification_events: JSON.parse(notificationResponse),
        template_events: JSON.parse(templateResponse.data),
      });
    }
  };

  checkTemplate = async (data: any, values: any) => {
    const { token } = this.state;
    //Get user registration template with Id 1
    const templateData = data.find((e: { id: any }) => e.id === 1);
    const payload = {
      Event_Id: 1,
      Subject: templateData.subject
        .replace("/~/g", "")
        .replace("~Username~", values.name),
      Body: templateData.bodyText.replaceAll("~UserName~", values.name),
      Recipients: [
        {
          Recipient: values.email,
        },
      ],
      Status: 0,
      Entity_Type: values.type,
    };
    const response = await API_SERVICE.post(
      API_URLS.notification_create,
      payload,
      token
    );
    if (response.status === 200) {
      this.setState({ show: false });
      toast.success("User invite has been successfully sent!");
      history.push("/dashboard");
    }
  };

  render(): JSX.Element {
    const { show, departments, entities } = this.state;
    return (
      <div className={"static-page"}>
        <Modal
          size="lg"
          show={show}
          onHide={() => {
            history.push("/dashboard");
          }}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>User Invite Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserInviteForm
              departments={departments}
              entities={entities}
              onSubmit={this.onFormSubmit}
              onSelectValue={this.getDepartments}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  ...state,
});

export default connect(mapStateToProps)(UserInvitePage);
