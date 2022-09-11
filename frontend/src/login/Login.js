import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function Login() {

    const [msg, setMsg] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [fieldMailLogin, setFieldMailLogin] = useState(false);
    const [fieldPasswordLogin, setFieldPasswordLogin] = useState(false);

    const navigate = useNavigate();

    const onHandleLogin = async (e) => {
        e.preventDefault();

        if(email === "") {
            setFieldMailLogin(true);
        }
        else {
            setFieldMailLogin(false);
        }

        if(password === "") {
            setFieldPasswordLogin(true);
        }
        else {
            setFieldPasswordLogin(false);
        }


        if(email !== "" && password !== "") {

            const user = {
                email: email,
                password: password,
            }
            // axios.post('http://localhost:5000/users/login', user).then(res => {
            //     if(res.data.user.role.role_id === 1) {
            //         navigate("/users/admin");
            //     }
            //     else {
            //         navigate("/users/user");
            //     }
            // })
            // .catch(error => setMsg(true));

            axios({
                method: "post",
                url: 'http://localhost:5000/users/login',
                data: user,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            }).then(res => {
                localStorage.setItem('user', JSON.stringify(res.data.user.token));
                localStorage.setItem('userMail', JSON.stringify(email));
                localStorage.setItem('userRole', JSON.stringify(res.data.user.role.role_id))
                //console.log("res token -> ", res.data.user.token);
                if(res.data.user.role.role_id === 1) {
                    navigate("/users/admin");
                    window.location.reload();
                }
                else {
                   navigate("/users/user");
                }
            }).catch(error => { 
                setMsg(true);
                console.log(error);
            });

        }
    } 

    return (
        <div className="full-screen bg-home">
            <div className="form-space">
                <div className="form-login">
                    <form onSubmit={onHandleLogin}>
                        <div className="title-login">Dobro došli opet!</div>
                        <div className="subtitle">Unesite neophodne podatke za prijavu na sistem!</div>
                        {msg && <p className="login-info">Neispravan unos email-a ili šifre</p>}
                        <div className="input-container ic2">
                            <input id="email" className="input" name="email" value={email} type="text" placeholder=" " onChange={e => setEmail(e.target.value)} />
                            <div className="cut cut-short"></div>
                            <label htmlFor="email" className="placeholder">Vaš email</label>
                        </div>
                        {fieldMailLogin && <p className="info">Neophodno je unijeti email prilikom prijave!</p>}
                        <div className="input-container ic2">
                            <input id="password" className="input" name="password" value={password} type="password" placeholder=" " onChange={e => setPassword(e.target.value)} />
                            <div className="cut cut-short"></div>
                            <label htmlFor="password" className="placeholder">Vaša šifra</label>
                        </div>
                        {fieldPasswordLogin && <p className="info">Neophodno je unijeti šifru prilikom prijave!</p>}
                        <button type="text" className="submit">Login</button>
                    </form>
                </div>
            </div>    
        </div>
    );
};

export default Login;