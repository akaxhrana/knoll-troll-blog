import React, { Component } from "react";
import AuthService from "../services/auth.service";
import Links from "../components/Links"
import NavBar from "../components/NavBar"
import "../styles/css/Index.css"

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = { username: "" };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({ username: user.data.username });
    }
  }
  render() {
    return (
    <div>
      <header className="tm-header" id="tm-header">
        <div className="tm-header-wrapper">
            <button className="navbar-toggler" type="button" aria-label="Toggle navigation">
                <i className="fas fa-bars"></i>
            </button>
            <div className="tm-site-header">
                <div className="mb-3 mx-auto tm-site-logo"><i className="fas fa-times fa-2x"></i></div>            
                <h1 className="text-center">Knoll Troll</h1>
            </div>
            <nav className="tm-nav" id="tm-nav">            
                <ul>
                    <li className="tm-nav-item active"><a href="index.html" className="tm-nav-link">
                        <i className="fas fa-home"></i>
                        Blog Home
                    </a></li>
                    <li className="tm-nav-item"><a href="post.html" className="tm-nav-link">
                        <i className="fas fa-pen"></i>
                        Single Post
                    </a></li>
                    <li className="tm-nav-item"><a href="about.html" className="tm-nav-link">
                        <i className="fas fa-users"></i>
                        About Xtra
                    </a></li>
                    <li className="tm-nav-item"><a href="contact.html" className="tm-nav-link">
                        <i className="far fa-comments"></i>
                        Contact Us
                    </a></li>
                </ul>
            </nav>
            <div className="tm-mb-20">
                <a rel="nofollow" href="https://fb.com/templatemo" className="tm-social-link">
                    <i className="fab fa-facebook tm-social-icon"></i>
                </a>
                <a href="https://twitter.com" className="tm-social-link">
                    <i className="fab fa-twitter tm-social-icon"></i>
                </a>
                <a href="https://instagram.com" className="tm-social-link">
                    <i className="fab fa-instagram tm-social-icon"></i>
                </a>
                <a href="https://linkedin.com" className="tm-social-link">
                    <i className="fab fa-linkedin tm-social-icon"></i>
                </a>
            </div>
            <p className="text-center text-white">
              Developed by Rana with ❤️    
            </p>
        </div>
    </header>
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
                
                
                
                <article className="col-12 col-md-6 tm-post">
                    <hr className="tm-hr-primary"/>
                    <a href="post.html" className="effect-lily tm-post-link tm-pt-20">
                        <div className="tm-post-link-inner">
                            <img src="img/img-04.jpg" alt="Image" className="img-fluid"/>
                        </div>
                        <h2 className="tm-pt-30 tm-color-primary tm-post-title">A little restriction to apply</h2>
                    </a>                    
                    <p className="tm-pt-30">
                        You are <u>not allowed</u> to re-distribute this template as a downloadable ZIP file on any template collection
                        website. This is strongly prohibited as we worked hard for this template. Please contact TemplateMo for more information.
                    </p>
                    <div className="d-flex justify-content-between tm-pt-45">
                        <span className="tm-color-primary">Artworks . Design</span>
                        <span className="tm-color-primary">June 4, 2020</span>
                    </div>
                    <hr/>
                    <div className="d-flex justify-content-between">
                        <span>72 comments</span>
                        <span>by Admin Sam</span>
                    </div>
                </article>
                <article className="col-12 col-md-6 tm-post">
                    <hr className="tm-hr-primary"/>
                    <a href="post.html" className="effect-lily tm-post-link tm-pt-20">
                        <div className="tm-post-link-inner">
                            <img src="img/img-05.jpg" alt="Image" className="img-fluid"/>
                        </div>
                        <h2 className="tm-pt-30 tm-color-primary tm-post-title">Color hexa values of Xtra Blog</h2>
                    </a>                    
                    <p className="tm-pt-30">
                        If you wish to kindly support us, please contact us or contribute a small PayPal amount to info [at] templatemo.com that is helpful for us.
                        <br/>
                        Title #099 New #0CC <br/>
                        <span className="tm-color-primary">Text #999 Line #CCC Next #0CC Prev #F0F0F0</span>
                    </p>
                    <div className="d-flex justify-content-between tm-pt-45">
                        <span className="tm-color-primary">Creative . Video . Audio</span>
                        <span className="tm-color-primary">May 31, 2020</span>
                    </div>
                    <hr/>
                    <div className="d-flex justify-content-between">
                        <span>84 comments</span>
                        <span>by Admin Sam</span>
                    </div>
                </article>
                
            </div>
            <div className="row tm-row tm-mt-100 tm-mb-75">
                <div className="tm-prev-next-wrapper">
                    <a href="#" className="mb-2 tm-btn tm-btn-primary tm-prev-next disabled tm-mr-20">Prev</a>
                    <a href="#" className="mb-2 tm-btn tm-btn-primary tm-prev-next">Next</a>
                </div>
                <div className="tm-paging-wrapper">
                    <span className="d-inline-block mr-3">Page</span>
                    <nav className="tm-paging-nav d-inline-block">
                        <ul>
                            <li className="tm-paging-item active">
                                <a href="#" className="mb-2 tm-btn tm-paging-link">1</a>
                            </li>
                            <li className="tm-paging-item">
                                <a href="#" className="mb-2 tm-btn tm-paging-link">2</a>
                            </li>
                            <li className="tm-paging-item">
                                <a href="#" className="mb-2 tm-btn tm-paging-link">3</a>
                            </li>
                            <li className="tm-paging-item">
                                <a href="#" className="mb-2 tm-btn tm-paging-link">4</a>
                            </li>
                        </ul>
                    </nav>
                </div>                
            </div>            
            <footer className="row tm-row">
                <hr className="col-12"/>
                <div className="col-md-6 col-12 tm-color-gray">
                    Design: <a rel="nofollow" target="_parent" href="https://templatemo.com" className="tm-external-link">TemplateMo</a>
                </div>
                <div className="col-md-6 col-12 tm-color-gray tm-copyright">
                    Copyright 2020 Xtra Blog Company Co. Ltd.
                </div>
            </footer>
        </main>
    </div>
      </div>
    
   );
  }
}
