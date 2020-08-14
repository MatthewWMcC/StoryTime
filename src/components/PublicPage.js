import React, { Component } from 'react';
import '../css/App.css';
import Header from './Header'
import axios from 'axios'
import { FaTrash } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa'
import { FaArrowUp } from 'react-icons/fa'
import { without } from 'lodash'
import Comments from './Comments'

export default class PublicPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            pageId: this.props.pageId || '',
            LogedIn: false,
            postLog: [],
            searchPhrase: '',
            searchBy: 'title'
        }
        this.onLike = this.onLike.bind(this);
        this.removePost = this.removePost.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }
    componentDidMount() {
        if (this.state.pageId === '') {
            window.location = '/'
        }
        axios.get(`http://storytime-matt.herokuapp.com/home/${this.state.pageId}`)
            .then(res => {
                this.setState({
                    nickname: res.data.nickname,
                    LogedIn: true
                })
            }).catch((error) => {
                console.log(error);
            })
        axios.get('http://storytime-matt.herokuapp.com/home/posts')
            .then(res => {
                this.setState({
                    postLog: res.data.reverse()
                })
            }).catch(err => {
                console.log(err)
            });


    }

    removePost(post) {
        console.log(post._id)
        axios.post(`http://storytime-matt.herokuapp.com/home/posts/delete/${post._id}`)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            });

        let templog = without(this.state.postLog, post);

        this.setState({
            postLog: templog
        })
    }
    onLike(post) {
        if (!post.likes.includes(this.state.nickname)) {
            post.likes.push(this.state.nickname)
        }
        else {
            const index = post.likes.indexOf(this.state.nickname);
            post.likes.splice(index, 1)
        }
        console.log(post._id)
        axios.put(`http://storytime-matt.herokuapp.com/home/posts/update/likes/${post._id}`, post.likes)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            });
        this.forceUpdate()
    }
    onSearchChange(e) {
        let target = e.target
        let value = target.value
        this.setState({
            searchPhrase: value
        })
    }
    setSearch(searchBy) {
        this.setState({
            searchBy: searchBy
        })
    }
    render() {
        // console.log(this.state.postLog)
        let filteredPosts = this.state.postLog;

        filteredPosts = filteredPosts.filter(post => {
            if (this.state.searchBy === 'all') {
                console.log(post.title);
                return (post['title'].toLowerCase().includes(this.state.searchPhrase.toLowerCase()) ||
                    post['author'].toLowerCase().includes(this.state.searchPhrase.toLowerCase()) ||
                    post['nickname'].toLowerCase().includes(this.state.searchPhrase.toLowerCase()) ||
                    post['note'].toLowerCase().includes(this.state.searchPhrase.toLowerCase()))
            }
            return post[this.state.searchBy].toLowerCase().includes(this.state.searchPhrase.toLowerCase())
        })

        return (
            <div>
                <Header
                    LogedIn={this.state.LogedIn}
                    nickname={this.state.nickname}
                    Logout={this.props.Logout}
                    pageName={"Public"}
                    newNavPage={this.props.newNavPage}
                />

                <main className="bg-dark base">
                    <div className="container">
                        <div className="row">
                            {!this.state.LogedIn ?
                                <div className="col">
                                    <br></br>
                                    <br></br>
                                    <h1>Loading...</h1>
                                </div> :
                                <div className="col">
                                    <h5 className="text-light my-3">Look around to see others thoughts about what they are reading but be weary of spoilers!</h5>
                                    <div className="row">
                                        <div className="col">
                                            <div className="input-group justify-content-center">
                                                <input
                                                    className="col-6 form-control"
                                                    placeholder="Search by keyphrase"
                                                    value={this.state.SearchPhrase}
                                                    onChange={this.onSearchChange}
                                                    type="text"
                                                    aria-label="Search Posts"
                                                />
                                                <div className="input-group-append">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary dropdown-toggle"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >Search By: </button>
                                                    <div className="dropdown-menu">
                                                        <button className={"dropdown-item " + (this.state.searchBy === 'title' ? "active" : '')}
                                                            onClick={(e) => this.setSearch('title')}
                                                        >
                                                            Title
                                                        </button>
                                                        <button className={"dropdown-item " + (this.state.searchBy === 'author' ? "active" : '')}
                                                            onClick={(e) => this.setSearch('author')}
                                                        >
                                                            Author
                                                        </button>
                                                        <button className={"dropdown-item " + (this.state.searchBy === 'nickname' ? "active" : '')}
                                                            onClick={(e) => this.setSearch('nickname')}
                                                        >
                                                            Nickname
                                                        </button>
                                                        <button className={"dropdown-item " + (this.state.searchBy === 'note' ? "active" : '')}
                                                            onClick={(e) => this.setSearch('note')}
                                                        >
                                                            Post
                                                        </button>
                                                        <button className={"dropdown-item " + (this.state.searchBy === 'all' ? "active" : '')}
                                                            onClick={(e) => this.setSearch('all')}
                                                        >
                                                            All
                                                        </button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    {filteredPosts.map((post, key) => {

                                        return <div className="row" key={key}>
                                            <div className="col-10 offset-1">
                                                <div className="card bg-dark my-3">
                                                    <div className="card-header text-light">
                                                        <label className="float-left"><b>{post.nickname}</b> posted after reading <b>{post.title}</b> by <b>{post.author}</b></label>
                                                        <h6 className="float-right">{post.dateOfPost}</h6>
                                                    </div>
                                                    <div style={{ background: `rgb(${post.rgb.r},${post.rgb.g},${post.rgb.b})` }} className="card-body">
                                                        <div className="row">
                                                            <label className="float-left text-dark">{post.note}</label>
                                                        </div>
                                                        <div>
                                                            <div className="row mt-5">
                                                                <div className="col-3">
                                                                    <label className="">Rating: <b>{post.rating}/10</b></label>
                                                                </div>
                                                                <div className="vl"></div>
                                                                <div className="col-3">
                                                                    <label>From page <b>{post.start}</b></label>
                                                                </div>
                                                                <div className="vl"></div>

                                                                <div className="col-3">
                                                                    <label>To page <b>{post.end}</b></label>
                                                                </div>
                                                                <div className="vl"></div>

                                                                <div className="col-3">
                                                                    <button className="btn buttonsecondary"
                                                                        onClick={() => {
                                                                            (post.show === true) ? post.show = false : post.show = true
                                                                            this.forceUpdate();
                                                                        }}
                                                                    >Comments {post.show ? <FaArrowUp /> : <FaArrowDown />}</button>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    {!post.show ?
                                                        ''
                                                        :

                                                        <div style={{ background: `rgb(${post.rgb.r - 50},${post.rgb.g - 50},${post.rgb.b - 50})` }} className="card-body">
                                                            <Comments
                                                                post={post}
                                                                nickname={this.state.nickname}
                                                            />
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-1">
                                                <button className={'btn text-white my-4 ' +
                                                    (post.likes.includes(this.state.nickname) ? 'bg-dark' : 'buttonsecondary')}
                                                    onClick={() => {
                                                        this.onLike(post)
                                                    }}
                                                ><FaHeart /> {post.likes.length}</button>
                                                {post.nickname === this.state.nickname ? <button className="btn btn-danger mt-3 mb-2"
                                                    onClick={() => this.removePost(post)}
                                                ><FaTrash /></button> : ''}
                                            </div>


                                        </div>
                                    })}
                                </div>}
                        </div>

                    </div>
                </main>
            </div>
        )
    }
}

