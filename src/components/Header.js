import React, { Component } from 'react';
import { FaBars } from 'react-icons/fa'



class Header extends Component {
    render() {
        return (
            <header className="container text-dark">
                <div className="row">
                    {this.props.LogedIn ?
                        <div className="col-3">
                            <button
                                className="navbutt mt-5 mx-3 btn btn-dark float-left"
                                onClick={() => openBar()}
                            ><FaBars /></button>
                            <ul id="mySidebar" className="navbar">
                                <button
                                    onClick={() => closeBar()}
                                    className="mt-5 btn btn-dark"
                                ><FaBars /></button>
                                <li>
                                    <label onClick={() => {
                                        this.props.pageName === 'Home' ? closeBar() : this.props.newNavPage('Home')
                                    }}> Home </label>
                                </li>
                                <li>
                                    <label onClick={() => {
                                        this.props.pageName === 'Public' ? closeBar() : this.props.newNavPage('Public')
                                    }}> Public </label>
                                </li>
                            </ul>
                        </div> : ''}
                    <div className={'col-6 py-3' + (this.props.LogedIn ? '' : ' text-left')} >
                        <h1>StoryTime</h1>
                        <h5>Read. Learn. Grow.</h5>
                    </div>
                    {this.props.LogedIn ?
                        <div className="col-3 pt-5">
                            <div className="">
                                <label className="mx-2 font-weight-bold">Welcome {this.props.nickname}!</label>
                                <button className="btn btn-dark mx-2" onClick={this.props.Logout}>Logout</button>
                            </div>

                        </div> : ''

                    }

                </div>


            </header>
        )
    }
}

function closeBar() {
    document.getElementById("mySidebar").style.display = "none";
}
function openBar() {
    document.getElementById("mySidebar").style.display = "table-row";
}


export default Header