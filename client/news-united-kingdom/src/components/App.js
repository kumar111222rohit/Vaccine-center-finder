import React, {Fragment} from 'react';
import config from '../config'
import './App.css'

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            keyword: 'technology', // loading technology news by default
            newsData: [],
            error: false,
        };
    }

    componentDidMount() {
        this.handleNewsSearch(this.state.keyword)
    }

    handleInputChange = (e) => {
        this.setState({
            keyword: e.target.value
        });
    };
    handleClick = (url) => { // handle click of each news card
        window.location.href = url
    }
    handleSubmitClick = (e) => {  // handle submit of keyword search
        this.handleNewsSearch(this.state.keyword)
    }
    handleNewsSearch = (keyword) => {
        if (keyword) {
            fetch(config.NEWS_END_POINT + keyword+config.SORT_PARAMS+"publishedAt", function () {
            })
                .then((res1) => {
                    if (res1.ok) {
                        return (res1.json());
                    }
                    throw Error(res1.statusText);
                })
                .then((data) => {
                    if (data.Response.status === "ok") {
                        this.setState({
                            newsData: data.Response.articles,
                            error: false
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.setState({
                        error: true,
                        newsData: null
                    })
                })
        }
    }

    render() {
        return (
            <Fragment>
                <div className="header-section">
                    <h1 className="page-heading">UK News Bulletin</h1>
                    <div className="search-wrapper">
                        <input className="input" onChange={this.handleInputChange} value={this.state.value}
                               placeholder="Enter news keyword"/>
                        <button className="input" onClick={this.handleSubmitClick}>Search</button>
                    </div>
                </div>

                <div className="main-wrapper">
                    {(this.state.newsData !== null ?
                        this.state.newsData.map((item, index) => {
                            return <div onClick={() => this.handleClick(item.url)} key={index}
                                        className="news-container"
                                        style={{backgroundImage: `url(${(item.urlToImage)}`}}>
                                <div className="text-wrapper">
                                    <h3 className="text header">{item.title}</h3>
                                    <h4 className="text author">{item.author !== null ? "- " + item.author : ''}</h4>
                                    <div className="text content">{item.description}</div>
                                    <div className="text link"> Read more....</div>
                                </div>

                            </div>
                        })
                        : '')}

                </div>
            </Fragment>
        )
    }
}


export default App;
