import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../api";
import Moment from "moment";
import AuthService from "../services/auth.service";


const PostDetail = (props) => {
    
    const [data, setData] = useState("")


    const [cdata, setCdata] = useState([])

    const [content, setContent] = useState("")
    const [username, setUsername] = useState("")
    const [postId, setPostId] = useState("")


    const receivedData = async () =>{
        await api.getPostById(props.location.state).then((res)=>{
            const data = res.data.data
            setData(data)
        })
    }

    const receivedComments = async () =>{
        await api.getComments(props.location.state).then((res)=>{
            const data = res.data.data;
            setCdata(data);
        })
    }
   
    const handleChangeInputContent = async (event) => {
        const content = event.target.value;
        setContent( content );
      };

    const handleNewComment = async () => {
        const payload = { content, username ,postId};
    
        await api.newComment(payload).then(() => {
            setContent("")
            receivedComments()
        })
      };

    
    useEffect(()=>{
        receivedData();
        receivedComments();

        const user = AuthService.getCurrentUser();
    
        if (user) {
          setUsername(user.data.username);
          setPostId(props.location.state);
        }

    }, [])

    return (
        <>
         <div className="container-fluid">
        <main className="tm-main">
            <div className="row tm-row">
                <div className="col-12">
                    <form method="GET" className="form-inline tm-mb-80 tm-search-form">                
                        <input className="form-control tm-search-input" name="query" type="text" placeholder="Search..." aria-label="Search"/>
                        <button className="tm-search-button" type="submit">
                            <i className="fas fa-search tm-search-icon" aria-hidden="true"></i>
                        </button>                                
                    </form>
                </div>                
            </div>            
            <div className="row tm-row">
                <div className="col-12">
                    <hr className="tm-hr-primary tm-mb-55"/>
                   
                    <img src={data.imgLocation} alt="Image" className="img-fluid" />						  
                        
                </div>
            </div>
            <div className="row tm-row">
                <div className="col-lg-8 tm-post-col">
                    <div className="tm-post-full">                    
                        <div className="mb-4">
                            <h2 className="pt-2 tm-color-primary tm-post-title">{data.title}</h2>
                            <p className="tm-mb-40">{Moment(Moment(data.created_at).toString()).format(
                      "DD-MM-YYYY"
                    )} posted by <Link to={`/user/${data.username}`}>{data.username}</Link> 
                    </p>
                            <p>
                                {data.content}
                            </p>
                            <span className="d-block text-right tm-color-primary">Creative . Design . Business</span>
                        </div>
                        
                               
                                {/* Commentsssss */}

                        
                            <div>
                            <h2 className="tm-color-primary tm-post-title">Comments</h2>
                            <hr className="tm-hr-primary tm-mb-45"/>
                           
                            {cdata.map((comment) => (
                            <div className="tm-comment tm-mb-45">
                                <figure className="tm-comment-figure">
                                    <img src="img/comment-1.jpg" alt="Image" className="mb-2 rounded-circle img-thumbnail"/>
                                    <figcaption className="tm-color-primary text-center">{comment.username}</figcaption>
                                </figure>
                                <div>
                                    <p>
                                        {comment.content}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <span className="tm-color-primary">June 14, 2020</span>
                                    </div>                                                 
                                </div>                                
                            </div>
                                ))}     

                        <div className="mb-5 tm-comment-form">
                                <h2 className="tm-color-primary tm-post-title mb-4">Your comment</h2>
                                <div className="mb-4">
                                    <textarea className="form-control" name="content" rows="2" value={content} onChange={handleChangeInputContent}></textarea>
                                </div>
                                <div className="text-right">
                                    <button onClick={handleNewComment} className="tm-btn tm-btn-primary tm-btn-small">Submit</button>                        
                                </div>                                
                            </div>                          
                        </div>
                        


                    </div>
                </div>
                <aside className="col-lg-4 tm-aside-col">
                    <div className="tm-post-sidebar">
                        <hr className="mb-3 tm-hr-primary"/>
                        <h2 className="mb-4 tm-post-title tm-color-primary">Categories</h2>
                        <ul className="tm-mb-75 pl-5 tm-category-list">
                            <li><a href="#" className="tm-color-primary">Visual Designs</a></li>
                            <li><a href="#" className="tm-color-primary">Travel Events</a></li>
                            <li><a href="#" className="tm-color-primary">Web Development</a></li>
                            <li><a href="#" className="tm-color-primary">Video and Audio</a></li>
                            <li><a href="#" className="tm-color-primary">Etiam auctor ac arcu</a></li>
                            <li><a href="#" className="tm-color-primary">Sed im justo diam</a></li>
                        </ul>
                        <hr className="mb-3 tm-hr-primary"/>
                        <h2 className="tm-mb-40 tm-post-title tm-color-primary">Related Posts</h2>
                        <a href="#" className="d-block tm-mb-40">
                            <figure>
                                <img src="img/img-02.jpg" alt="Image" className="mb-3 img-fluid"/>
                                <figcaption className="tm-color-primary">Duis mollis diam nec ex viverra scelerisque a sit</figcaption>
                            </figure>
                        </a>
                        <a href="#" className="d-block tm-mb-40">
                            <figure>
                                <img src="img/img-05.jpg" alt="Image" className="mb-3 img-fluid"/>
                                <figcaption className="tm-color-primary">Integer quis lectus eget justo ullamcorper ullamcorper</figcaption>
                            </figure>
                        </a>
                        <a href="#" className="d-block tm-mb-40">
                            <figure>
                                <img src="img/img-06.jpg" alt="Image" className="mb-3 img-fluid"/>
                                <figcaption className="tm-color-primary">Nam lobortis nunc sed faucibus commodo</figcaption>
                            </figure>
                        </a>
                    </div>                    
                </aside>
            </div>
           
        </main>
        
    </div>
        </>
    )
}

export default PostDetail;