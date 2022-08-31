import axios from "axios";
import React, {useState} from "react";

const baseURL = "http://localhost:3000/auth/jwt/";

export interface ILoginProps {
    setLoginToken: (token: string) => void;
    email: string;
    password: string;
}

const initLogin = {"email": "", "password": ""};

function Login(props: ILoginProps) {
    const [formValue, setFormValue] = useState(initLogin);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormValue({...formValue, [name]: value});
    };

    function onLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios.post(baseURL + 'sign', {
            "email": `${formValue.email}`, "password": `${formValue.password}`
        }).then((response) => {
            console.log(response);
            let token = response.data.token;
            props.setLoginToken(token);
        }).catch(err => {
            console.log(err);
            alert("Your credentials are incorrect! \nPlease try again.")
        });
        e.preventDefault();
    }

    return (
        <div className="login">
            <div className="container m-3 align-content-center">
                <h4 className="mb-3">Login</h4>
                <div>
                    <form className="form-floating w-50" onSubmit={onLogin}>
                        <input
                            required
                            className="form-control"
                            type="email"
                            placeholder="Please enter your Email"
                            name="email"
                            id="floatingInputEMail"
                            value={formValue.email}
                            onChange={onInputChange}

                        />
                        <label htmlFor="floatingInputEMail">E-Mail</label>
                        <br/>
                    </form>
                    <form className="form-floating w-50" onSubmit={onLogin}>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Please enter your Password"
                            name="password"
                            id="floatingInputPassword"
                            value={formValue.password}
                            onChange={onInputChange}
                            required
                        />
                        <label htmlFor="floatingInputPassword">Password</label>
                        <br/>
                        <button className="btn btn-outline-secondary bi bi-box-arrow-in-right"> Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login