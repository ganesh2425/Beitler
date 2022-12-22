import React from "react";
import StorageService from "../services/Storage.service";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function requireAuthentication(Component: any) {
    return class AuthenticatedComponent extends React.Component {

        componentDidMount() {
            console.log(this.props)
        }

        isAuthenticated(): any {
            return StorageService.getCookies('token');
        }

        gotoLogin = (): any => {
            window.location.replace('/login')
        }

        /**
         * Render
         */
        render() {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return (
                <div>
                    { this.isAuthenticated() ? <Component {...this.props} /> : this.gotoLogin() }
                </div>
            );
        }
    };
}

export default requireAuthentication;