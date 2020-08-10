import React, { Component } from 'react';
import '../css/App.css';
import { FaTimes } from 'react-icons/fa'
import Moment from 'react-moment';

class Profile extends Component {
    render() {
        return (
            <div>
                <br></br>
                <div className="row m-2">
                    <div className="col-11">
                        <h3 className="text-center">{this.props.book.title} Profile Page</h3>
                    </div>
                    <div className="col-1">
                        <div className="float-right">
                            <button className="btn btn-danger"
                                onClick={this.props.switch}
                            ><FaTimes /></button>
                        </div>
                    </div>
                </div>
                <br></br>
                {this.props.book.bookNotes.map((entry, key) => (
                    <div className="row" key={key}>
                        {!entry.note ? '' :
                            <div className="col m-3">
                                <div className="card bg-dark profile">
                                    <div className="card-header">
                                        <label>On
                                    <b><Moment
                                                date={entry.date}
                                                parse="YYYY-MM-DD hh:mma"
                                                format='[ ]MMM. D, YYYY [at] h:mm A z[ ]'
                                            /></b>
                                     you posted after reading <b>{entry.end - entry.start}</b> pages of <b>{this.props.book.title}</b></label>
                                    </div>
                                    <div className="card-body profile_body">
                                        <div className="row">
                                            <label className="float-left mx-3">{entry.note}</label>
                                        </div>

                                        <div className="row mt-5">
                                            <div className="col-4">
                                                <label className="">Read for <b>{entry.timeRead}</b> {entry.timeRead === 1 ? "minute" : "minutes"}</label>
                                            </div>
                                            <div className="vl"></div>
                                            <div className="col-4">
                                                <label>From <b>{entry.start === 0 ? "The Beginning" : "Page " + entry.start}</b></label>
                                            </div>
                                            <div className="vl"></div>
                                            <div className="col-4 align-items-end">
                                                <label>To <b>Page {entry.end}</b></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>}
                    </div>
                ))
                }
            </div>
        )
    }
}

export default Profile;