import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const insertPost = (payload) => api.post(`/post`, payload);
export const getAllPosts = () => api.get(`/posts`);
export const updatePostById = (id, payload) => api.put(`/post/${id}`, payload);
export const deletePostById = (id) => api.delete(`/post/${id}`);
export const getPostById = (id) => api.get(`/post/${id}`);
export const getPostByName = (name) => api.get(`/posts/${name}`);

export const newComment = (payload) => api.post(`/comment`, payload);
export const getComments = (id) => api.get(`/comment/${id}`);

const apis = {
  insertPost,
  getAllPosts,
  updatePostById,
  deletePostById,
  getPostById,
  getPostByName,
  getComments,
  newComment
};

export default apis;
