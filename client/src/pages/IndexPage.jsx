import React, { Component } from "react";
import AuthService from "../services/auth.service";
import "../styles/css/Index.css"
import ReactPaginate from "react-paginate";
import api from "../api";
import Moment from "moment";
import { Link, withRouter } from "react-router-dom";

export class Index extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        offset: 0,
        perPage: 6,
        currentPage: 0,
        img:[]
      };
      this.handlePageClick = this.handlePageClick.bind(this);
    }


    fetchImage = async (e) => {
      const res = await fetch(imageUrl);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
    };
  
    receivedData = async () => {
      await api.getAllPosts().then((res) => {
        const data = res.data.data;
  
        const slice = data.slice(
          this.state.offset,
          this.state.offset + this.state.perPage
        );
  
        //mapping 'sliced data' to the react fragment
  
        const postData = slice.map((pd) => (
          
          <div className="col-12 col-md-6 tm-post" key={pd.created_at}>
     {/* <div className="row">
              <div
                key={pd._id}
                className="rounded shadow bg-light col-md-6 card offset-md-3 mt-5 p-2 border-0"
              >
                <div className="card-body">
                  <h1 className="card-title">{pd.title}</h1>
                  <p>
                    Posted at:&nbsp;
                    {Moment(Moment(pd.created_at).toString()).format(
                      "DD-MM-YYYY hh:mm A"
                    )}
                  </p>
                  <p>
                    Posted By:&nbsp;
                    <a className="text-decoration-none text-secondary">
                      <Link to={`/user/${pd.username}`} query={{ name: "query" }}>
                        {" "}
                        {pd.username}
                      </Link>
                    </a>
                  </p>
                  <hr />
                  <p className="card-text">{pd.description}</p>
                </div>
              </div>
            </div> */}
          {/* <article className="col-12 col-md-6 tm-post"> */}
                    <hr className="tm-hr-primary"/>
                    <a href="post.html" className="effect-lily tm-post-link tm-pt-10">
                        <div className="tm-post-link-inner">
                            <img src={pd.imgLocation} alt="Image" className="img-fluid" style={{height:"320px"}}/>
                        </div>
                        <h2 className="tm-pt-20 tm-color-primary tm-post-title">{pd.title}</h2>
                    </a>                    
                    <p className="tm-pt-20">
                    {pd.description}
                    </p>
                    <div className="d-flex justify-content-between tm-pt-30">
                        <span className="tm-color-primary">Posted at:</span>
                        <span className="tm-color-primary">{Moment(Moment(pd.created_at).toString()).format(
                      "DD-MM-YYYY hh:mm A"
                    )}
                    </span>
                    </div>
                    <hr/>
                    <div className="d-flex justify-content-between">
                        <span>72 comments</span>
                        <span>
                      <Link to={`/user/${pd.username}`} query={{ name: "query" }}>
                        {" "}
                        {pd.username}
                      </Link>
                    </span>
                    </div>
                {/* </article> */}
                </div>
            
        ));
  
        this.setState({
          pageCount: Math.ceil(data.length/this.state.perPage),
          postData,
        });
      });
    };
  
    handlePageClick = (e) => {
      const selectedPage = e.selected;
      const offset = selectedPage * this.state.perPage;
  
      this.setState(
        {
          currentPage: selectedPage,
          offset: offset,
        },
        () => {
          this.receivedData();
        }
      );
    };
  
    //waiting for component to load and render data
  
    componentDidMount() {
      this.receivedData();
    }
  
    render() {
      return (
        <>
        <div className="container-fluid">
         <main className="tm-main">
            <div className="row tm-row">
                 <div className="col-12">
                     <form method="GET" className="form-inline tm-mb-40 tm-search-form">                
                         <input className="form-control tm-search-input" name="query" type="text" placeholder="Search..." aria-label="Search"/>
                         <button className="tm-search-button" type="submit">
                             <i className="fas fa-search tm-search-icon" aria-hidden="true"></i>
                         </button>                                
                     </form>
                 </div>                
             </div>            
             <div className="row tm-row">

            {this.state.postData} 

          </div>
  </main></div>
          {this.state.pageCount > 1 && (
            <div>
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={5}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination justify-content-center mt-5 "}
                subContainerClassName={"pages pagination "}
                previousLinkClassName={"previous_page"}
                nextLinkClassName={"next_page"}
                pageLinkClassName={"p-2 "}
                disabledClassName={"disabled"}
                activeClassName={"active"}
              />
            </div>
          )}

        </>
      );
    }
  }

  

// export default class Index extends Component {
//   constructor(props) {
//     super(props);

//     this.state = { username: "" };
//   }
//   componentDidMount() {
//     const user = AuthService.getCurrentUser();
//     if (user) {
//       this.setState({ username: user.data.username });
//     }
//   }
//   render() {
//     return (
//     <div>
//     <div className="container-fluid">
//         <main className="tm-main">
//             <div className="row tm-row">
//                 <div className="col-12">
//                     <form method="GET" className="form-inline tm-mb-80 tm-search-form">                
//                         <input className="form-control tm-search-input" name="query" type="text" placeholder="Search..." aria-label="Search"/>
//                         <button className="tm-search-button" type="submit">
//                             <i className="fas fa-search tm-search-icon" aria-hidden="true"></i>
//                         </button>                                
//                     </form>
//                 </div>                
//             </div>            
//             <div className="row tm-row">
                
                
                
//                 <article className="col-12 col-md-6 tm-post">
//                     <hr className="tm-hr-primary"/>
//                     <a href="post.html" className="effect-lily tm-post-link tm-pt-20">
//                         <div className="tm-post-link-inner">
//                             <img src="img/img-04.jpg" alt="Image" className="img-fluid"/>
//                         </div>
//                         <h2 className="tm-pt-30 tm-color-primary tm-post-title">A little restriction to apply</h2>
//                     </a>                    
//                     <p className="tm-pt-30">
//                         You are <u>not allowed</u> to re-distribute this template as a downloadable ZIP file on any template collection
//                         website. This is strongly prohibited as we worked hard for this template. Please contact TemplateMo for more information.
//                     </p>
//                     <div className="d-flex justify-content-between tm-pt-45">
//                         <span className="tm-color-primary">Artworks . Design</span>
//                         <span className="tm-color-primary">June 4, 2020</span>
//                     </div>
//                     <hr/>
//                     <div className="d-flex justify-content-between">
//                         <span>72 comments</span>
//                         <span>by Admin Sam</span>
//                     </div>
//                 </article>
//                 <article className="col-12 col-md-6 tm-post">
//                     <hr className="tm-hr-primary"/>
//                     <a href="post.html" className="effect-lily tm-post-link tm-pt-20">
//                         <div className="tm-post-link-inner">
//                             <img src="img/img-05.jpg" alt="Image" className="img-fluid"/>
//                         </div>
//                         <h2 className="tm-pt-30 tm-color-primary tm-post-title">Color hexa values of Xtra Blog</h2>
//                     </a>                    
//                     <p className="tm-pt-30">
//                         If you wish to kindly support us, please contact us or contribute a small PayPal amount to info [at] templatemo.com that is helpful for us.
//                         <br/>
//                         Title #099 New #0CC <br/>
//                         <span className="tm-color-primary">Text #999 Line #CCC Next #0CC Prev #F0F0F0</span>
//                     </p>
//                     <div className="d-flex justify-content-between tm-pt-45">
//                         <span className="tm-color-primary">Creative . Video . Audio</span>
//                         <span className="tm-color-primary">May 31, 2020</span>
//                     </div>
//                     <hr/>
//                     <div className="d-flex justify-content-between">
//                         <span>84 comments</span>
//                         <span>by Admin Sam</span>
//                     </div>
//                 </article>
                
//             </div>
//             <div className="row tm-row tm-mt-100 tm-mb-75">
//                 <div className="tm-prev-next-wrapper">
//                     <a href="#" className="mb-2 tm-btn tm-btn-primary tm-prev-next disabled tm-mr-20">Prev</a>
//                     <a href="#" className="mb-2 tm-btn tm-btn-primary tm-prev-next">Next</a>
//                 </div>
//                 <div className="tm-paging-wrapper">
//                     <span className="d-inline-block mr-3">Page</span>
//                     <nav className="tm-paging-nav d-inline-block">
//                         <ul>
//                             <li className="tm-paging-item active">
//                                 <a href="#" className="mb-2 tm-btn tm-paging-link">1</a>
//                             </li>
//                             <li className="tm-paging-item">
//                                 <a href="#" className="mb-2 tm-btn tm-paging-link">2</a>
//                             </li>
//                             <li className="tm-paging-item">
//                                 <a href="#" className="mb-2 tm-btn tm-paging-link">3</a>
//                             </li>
//                             <li className="tm-paging-item">
//                                 <a href="#" className="mb-2 tm-btn tm-paging-link">4</a>
//                             </li>
//                         </ul>
//                     </nav>
//                 </div>                
//             </div>            
           
//         </main>
//     </div>
//       </div>
    
//    );
//   }
// }

export default withRouter(Index);

