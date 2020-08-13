import React, { Component } from 'react';
import '../css/App.css';
import axios from 'axios';
import Header from './Header'
import { FaArrowRight } from 'react-icons/fa';

class StartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SEmail: '',
            SPassword: '',
            SNick: '',
            LEmail: '',
            LPassword: '',
            LogedIn: false,
            errors: {}
        }
        this.submitNew = this.submitNew.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    submitNew(e) {
        e.preventDefault();
        this.setState({
            errors: {}
        })
        let userData = {
            nickname: this.state.SNick,
            email: this.state.SEmail,
            password: this.state.SPassword

        }
        axios.post('http://storytime-matt.herokuapp.com/home/signup', userData)
            .then((res) => {
                console.log(res.data);
                if (res.data.errors) {
                    this.setState({
                        errors: res.data.errors
                    })
                    return
                }
            }).catch((error) => {
                console.log(error);
            })
        this.setState({
            SEmail: '',
            SPassword: '',
            SNick: ''
        })
    }
    submitLogin(e) {
        e.preventDefault();
        this.setState({
            errors: {}
        })
        let checkUser = {
            email: this.state.LEmail,
            password: this.state.LPassword
        }

        axios.post('http://storytime-matt.herokuapp.com/home/login', checkUser)
            .then((res) => {
                console.log(res.data);
                if (res.data.errors) {
                    this.setState({
                        errors: res.data.errors
                    })
                    return
                }
                this.props.setId(res.data.token)
            })
            .catch((error) => {
                console.log(error);
            })

    }
    render() {
        return (
            <div>
                <Header LogedIn={this.state.LogedIn} />

                <div className="container">
                    <br></br>
                    <div className="login_line row">

                        <div className="offset-0 col-5">
                            <h2 className="text-center">New User</h2>
                            <form onSubmit={(e) => this.submitNew(e)}>
                                <div className="row my-5">
                                    <label className="col-4 justify-self-right">Email:</label>
                                    <br></br>
                                    <input
                                        placeholder="..."
                                        className="col-6"
                                        value={this.state.SEmail}
                                        onChange={e => {
                                            this.setState({
                                                SEmail: e.target.value
                                            })
                                        }}
                                    ></input>
                                </div>
                                <div className="row my-5">
                                    <label className="col-4 justify-self-right">Password:</label>
                                    <br></br>
                                    <input
                                        placeholder="..."
                                        className="col-6"
                                        value={this.state.SPassword}
                                        onChange={e => {
                                            this.setState({
                                                SPassword: e.target.value
                                            })
                                        }}
                                    ></input>
                                </div>
                                <div className="row my-5">
                                    <label className="col-4 justify-self-right">nickname:</label>
                                    <input
                                        placeholder="What should we call you?"
                                        className="col-6"
                                        value={this.state.SNick}
                                        onChange={e => {
                                            this.setState({
                                                SNick: e.target.value
                                            })
                                        }}
                                    ></input>
                                </div>
                                <div className="row justify-content-center">
                                    <button className="btn btn-dark" type="submit">
                                        <span>Sign Up</span>
                                    </button>
                                </div>


                            </form>
                        </div>
                        <div className="col-2">
                            <h2><FaArrowRight /></h2>
                        </div>
                        <div className="col-5">
                            <h2 className="">Login</h2>
                            <form onSubmit={this.submitLogin}>
                                <div className="row my-5">
                                    <label className="col-4 justify-self-right">Email:</label>
                                    <br></br>
                                    <input
                                        placeholder="..."
                                        className="col-6"
                                        value={this.state.LEmail}
                                        onChange={e => {
                                            this.setState({
                                                LEmail: e.target.value
                                            })
                                        }}
                                    ></input>
                                </div>
                                <div className="row my-5">
                                    <label className="col-4 justify-self-right">Password:</label>
                                    <br></br>
                                    <input
                                        placeholder="..."
                                        className="col-6"
                                        value={this.state.LPassword}
                                        onChange={e => {
                                            this.setState({
                                                LPassword: e.target.value
                                            })
                                        }}
                                    ></input>
                                </div>
                                <div className="row justify-content-center">
                                    <button className="btn btn-dark" type="submit">
                                        <span>Login</span>
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                    <div className="my-3">
                        <label>{this.state.errors.email ? this.state.errors.email : ''}</label>
                    </div><div>
                        <label>{this.state.errors.password ? this.state.errors.password : ''}</label>
                    </div><div>
                        <label>{this.state.errors.nickname ? this.state.errors.nickname : ''}</label>
                    </div>
                </div >
            </div>

        )
    }
}

export default StartScreen;