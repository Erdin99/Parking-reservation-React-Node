import React, { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";
import './commonWall.css';
import profileImage from "../images/profile-image.png";
import axios from "axios";
import moment from "moment";
import {useNavigate} from "react-router-dom";

function CommonWall() {

    const userMail = JSON.parse(localStorage.getItem('userMail'));

    const [posts, setPosts] = useState([]);
    const [postText, setPostText] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("user") === null) {
            navigate('/login');
        }
        else {
            getPosts();
        }
    }, [posts]);

    function createPost(e) {
        e.preventDefault();

        const data = {
            post: postText
        }
        
        axios({
            method: "post",
            url: `http://localhost:5000/create/post`,
            data: data,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: JSON.parse(localStorage.getItem("user"))
            },
            body: JSON.stringify(data),
        }).then(res => {
            navigate(`/common/wall`)
            setPostText("");
        }).catch(error => {
            console.log(error)
        });
    }

    function getPosts() {
        axios({
            method: "get",
            url: `http://localhost:5000/commonWall/list`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: JSON.parse(localStorage.getItem("user"))
            }
        }).then(res => {
            setPosts(res.data.allPosts);
        }).catch(err => console.log(err))
    }

    function deletePost(id) {
        axios({
            method: "delete",
            url: `http://localhost:5000/delete/post/${id}`,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: JSON.parse(localStorage.getItem("user"))
            }
        }).then(res => {
            navigate(`/common/wall`)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <>
            <div>
                <Navigation />
            </div>
            <div className="content-admin">
                <section className="post">
                    <form className="post-form" onSubmit={createPost}>
                        <div className="form-control">
                            <label>O čemu razmišljate?</label>
                            <textarea type="text" id="postText" rows="5" value={postText} onChange={e => setPostText(e.target.value)} required></textarea>
                            <button className="post-button" type="submit">Postavi</button>
                        </div>
                    </form>
                </section>
                {posts.map((post) => {
                    return (
                        <div className="created-post">
                            <div className="post-username-info">
                                <img className="post-profile-image" src={profileImage}></img>
                                <h3 className="post-username">{post.created_post_by_username}</h3>
                                <p className="time-posted">{moment(post.created_at).add(2, 'hours').utc().format('YYYY-MM-DD, h:mm:ss a')}</p>
                            </div>
                            <hr />
                            <div className="posted-post">
                                <p>{post.post}</p>
                            </div>
                            {post.created_post_by_email === userMail &&
                                <div className="delete-post">
                                    <button className="delete-button" onClick={() => deletePost(post.id)}>Izbriši</button>
                                </div>
                            }
                        </div>  
                    )
                })} 
            </div>
        </>
    );
}

export default CommonWall;