import React, { useState } from "react";
import Navigation from "../navigation/Navigation";
import './commonWall.css';
import profileImage from "../images/profile-image.png";

function CommonWall() {

    const id = 1;
    const drugi_id = 2; //poslije izbrisati ovo, stavljeno je samo radi testa
    const [userId, setUserId] = useState(1);

    return (
        <>
            <div>
                <Navigation />
            </div>
            <div className="content-admin">
            <section className="post">
                <form className="post-form">
                    <div className="form-control">
                        <label>O čemu razmišljate?</label>
                        <textarea type="text" id="postText" rows="5"></textarea>
                        <button className="post-button">Postavi</button>
                    </div>
                </form>
            </section>

            <div className="created-post">
                <div className="post-username-info">
                    <img className="post-profile-image" src={profileImage}></img>
                    <h3 className="post-username">Neki username</h3>
                    <p className="time-posted">16:23 31.8.2022.</p>
                </div>
                <hr />
                <div className="posted-post">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
                {userId === id &&
                    <div className="delete-post">
                        <button className="delete-button">Izbriši</button>
                    </div>
                }
            </div>

            <div className="created-post">
                <div className="post-username-info">
                    <img className="post-profile-image" src={profileImage}></img>
                    <h3 className="post-username">Neki username</h3>
                    <p className="time-posted">16:23 31.8.2022.</p>
                </div>
                <hr />
                <div className="posted-post">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
                {userId === drugi_id &&
                    <div className="delete-post">
                        <button className="delete-button">Izbriši</button>
                    </div>
                }
            </div>        
            </div>
        </>
    );
}

export default CommonWall;