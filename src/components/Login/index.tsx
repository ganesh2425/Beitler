import React, {useEffect, useState} from 'react';
import { history } from "../../config/history";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegistrationForm";
import Logo from "../../assets/images/logo.png";
import background from "../../assets/images/login/login-bg.jpg";

const Login = (): JSX.Element => {
    const [login, setLogin] = useState(true);

    useEffect(() => {
        (history.location.pathname === '/register') ? setLogin(false) : setLogin(true)
    }, []);

    return (
        <>
            <div className="justify-content-md-center row">
                <div className="col-sm-4 login-section-wrapper order-1">
                    
                    <div className="login-wrapper my-auto">
                    <div className="brand-wrapper my-5">
                        <img src={Logo} alt="Beitler_Logistics_logo"
                             className="logo img-fluid" />
                    </div>
                        <h1 className="login-title">{login ? 'Log in': 'Register' }</h1>
                        {
                            login ? <LoginForm /> : <RegisterForm />
                        }

                        {/*<a href="#!" className="forgot-password-link text-right w-100 ">Forgot password?</a>*/}
                    </div>
                </div>
                <div className="col-sm-8 px-0 companyBanner">
                    <img src={background} alt="beitler-login" className="login-img" />
                </div>
            </div>
        </>
    )
}
export default Login;