import React, { useState } from "react";
import Navigation from "../navigation/Navigation";
import "./myProfile.css";
import profileImage from "../images/profile-image.png";

function MyProfile() {
    //ovo sa id-em brisati kada spojim backend sa frontendom, trenutno je ovdje samo radi testa
    const id = 1;

    const [userId, setUserId] = useState(1);

    return(
        <>
            <div>
                <Navigation />
            </div>
            <div className="content-admin">
                <article className='profile-info'>
                    <div className='img-container'>
                        <img src={profileImage} alt="Profile image" className='person-img' />
                    </div>
                    <h4 className='user-info'>Username: username</h4>
                    <p className='user-info'>Ime i prezime: ime prezime</p>
                    <p className='user-info'>Email: email</p>
                    <p className="user-info">Rola: iznajmljuje parking prostor</p>
                </article>
                {userId === id && (
                    <div className="container-insert-image">
                        <div className="form-insert-image">
                            <input type="file" accept=".jpg, .png"/>
                            <span>
                                <i className="fas fa-cloud-upload-alt fa-5x"></i>
                                <h1>Postavite vašu profilnu sliku!</h1>
                            </span>
                        </div>
                    </div>
                )}
            </div>    
        </>
    );
}

export default MyProfile;