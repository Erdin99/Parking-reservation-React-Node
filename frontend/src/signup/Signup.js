import React, { useState } from "react";
import "./signup.css";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Signup() {

    const [msg, setMsg] = useState("");
    const [passwordMsg, setPasswordMsg] = useState("");

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role_id, setRoleId] = useState("1");

    const [fieldUsername, setFieldUsername] = useState(false);
    const [fieldMail, setFieldMail] = useState(false);
    const [fieldPassword, setFieldPassword] = useState(false);

    const navigate = useNavigate();
    
    const handleSignUp = async (e) => {
        e.preventDefault();

        if(username === "") {
            setFieldUsername(true);
        }
        else {
            setFieldUsername(false);
        }
        
        if(email === "") {
            setFieldMail(true);
        }
        else {
            setFieldMail(false);
        }

        if(password === "") {
            setFieldPassword(true);
        }
        else {
            setFieldPassword(false);
        }

        if(password.length < 8) {
            setPasswordMsg('Šifra mora imati minimalno 8 karaktera!');
        }

        if(username !== "" && email !== "" && password !== "" && password.length >= 8) {
            const user = {
                first_name: first_name,
                last_name: last_name,
                username: username,
                email: email,
                password: password,
                role_id: parseInt(role_id)
            }

            axios.post('http://localhost:5000/users/signup', user).then(res => {
                if(res.status === 201){
                    alert('Uspješno ste se registrovali!');
                    navigate("/login");
                }
                else {
                    Promise.reject();
                }
            })
            .catch(error => setMsg(error.response.data.message));
            
            
        }
    }

    return (
        <div className="full-screen bg-home">
            <div className="form-space">
                <div className="form">
                    <form onSubmit={handleSignUp}>
                        <div className="title-signup">Dobro došli!</div>
                        <div className="subtitle">Kreirajte Vaš korisnički račun!</div>
                        {msg.length === 0 && passwordMsg.length > 0 ? <p className="main-info">{passwordMsg}</p>: ""}
                        {msg.length === 0 ? "" : <p className="main-info">{msg}</p>}
                        <div className="input-container ic1">
                            <input id="firstname" className="input" name="firstName" value={first_name} type="text" placeholder=" " onChange={e => setFirstName(e.target.value)} />
                            <div className="cut"></div>
                            <label hmtlFor="firstname" className="placeholder">Vaše ime</label>
                        </div>
                        <div className="input-container ic2">
                            <input id="lastname" className="input" name="lastName" value={last_name} type="text" placeholder=" " onChange={e => setLastName(e.target.value)} />
                            <div className="cut"></div>
                            <label htmlFor="lastname" className="placeholder">Vaše prezime</label>
                        </div>
                        <div className="input-container ic2">
                            <input id="username" className="input" name="username" value={username} type="text" placeholder=" " onChange={e => setUsername(e.target.value)}  />
                            <div className="cut"></div>
                            <label htmlFor="username" className="placeholder">Vaš username</label>
                        </div>
                        {fieldUsername && <p className="info">Neophodno je unijeti username prilikom registracije!</p>}
                        <div className="input-container ic2">
                            <input id="email" className="input" name="email" value={email} type="text" placeholder=" " onChange={e => setEmail(e.target.value)} />
                            <div className="cut cut-short"></div>
                            <label htmlFor="email" className="placeholder">Vaš email</label>
                        </div>
                        {fieldMail && <p className="info">Neophodno je unijeti email prilikom registracije!</p>}
                        <div className="input-container ic2">
                            <input id="password" className="input" name="password" value={password} type="password" placeholder=" " onChange={e => setPassword(e.target.value)} />
                            <div className="cut cut-short"></div>
                            <label htmlFor="password" className="placeholder">Vaša šifra</label>
                        </div>
                        {fieldPassword && <p className="info">Neophodno je unijeti šifru prilikom registracije!</p>}
                        <div className="input-container ic3">
                            <form>
                                <label className="role-label">Izaberite rolu na sistemu:</label>
                                <select name="roles" className="roles" onChange={e => setRoleId(e.target.value)}>
                                    <option value="1">Postavljam parking na rezervaciju</option>
                                    <option value="2">Rezervišem parking prostor</option>
                                </select>
                            </form>
                        </div>
                        <button type="submit" className="submit">Sign up</button>
                    </form>
                </div>
            </div>    
        </div>
    );
};

export default Signup;