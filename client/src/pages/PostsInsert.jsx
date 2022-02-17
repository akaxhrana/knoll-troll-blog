import React, { Component, useEffect } from "react";
import api from "../api";
import AuthService from "../services/auth.service";
import axios from 'axios';
import { useState } from "react";

const PostsInsert = () => {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [usernameId, setUsernameID] = useState("");
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");

 
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

    const saveFile = async (e) => {

        setFilename(e.target.files[0].name)
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
       setFile(base64);
       
       
      };
 

  useEffect(() => {
    document.title = "Create Post";
    const user = AuthService.getCurrentUser();

    if (user) {
      setUsername(user.data.username);
      setUsernameID(user.data._id);
    }

  })

  const handleChangeInputTitle = async (event) => {
    const title = event.target.value;
    setTitle( title );
  };

  const handleChangeInputDescription = async (event) => {
    const description = event.target.value;
    setDescription( description );
  };

  const handleChangeInputContent = async (event) => {
    const content = event.target.value;
    setContent( content );
  };

  const handleIncludePost = async () => {
    // const { title, description, content, username, file, fileName } = state;
    const payload = { title, description, content, username,usernameId, file, filename };

    await api.insertPost(payload).then((res) => {
      window.alert(`Post inserted successfully`);
      
    });
  };

  return( 
    
      <div className="no-gutters">
        <div className="row justify-content-center">
          <div className="col col-md-6">
            <div className="text-center">
              <h1>Create Post as {username}</h1>
            </div>
            <div className="mb-3">
              <label className="w-100 m-2">Title: </label>
              <input
                type="text"
                className="form-control w-50 m-1"
                value={title}
                onChange={handleChangeInputTitle}
              />

              <label className="w-100 m-2">Description: </label>
              <input
                type="text"
                className="form-control w-75 m-1"
                value={description}
                onChange={handleChangeInputDescription}
              />

              <label className="w-100 m-2">Content: </label>
              <textarea
                type="text"
                rows="3"
                className="form-control ml-1"
                value={content}
                onChange={handleChangeInputContent}
              />
            </div>

            <input type="file" onChange={(e) => {saveFile(e)}} />
            {/* <button onClick={uploadFile}>Upload</button> */}


            <button
              className="btn btn-primary m-1"
              onClick={handleIncludePost}
            >
              Add Post
            </button>
            <button className="btn btn-danger m-1" href={"/posts/list"}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    
  
  )}

export default PostsInsert;
