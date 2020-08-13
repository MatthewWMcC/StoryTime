import React, { Component } from 'react';
import '../css/App.css';
import { FaTimes } from 'react-icons/fa'
import moment from 'moment'
import { isEmpty } from 'lodash';
import TimeFormatSub from './TimeFormat'
import { sendPost } from './sendPost'

class AddEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagesRead: '',
            rating: this.props.book.rating,
            note: '',
            startPage: this.props.book.pagesRead,
            sTime: '',
            eTime: '',
            errors: [],
            publicPost: false
        }
        this.doChange = this.doChange.bind(this);
        this.changeBookLog = this.changeBookLog.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }



    changeBookLog(e) {
        e.preventDefault();
        let dateNow = moment().format('YYYY-MM-DD hh:mma').toString()
        let timeForReading = TimeFormatSub(this.state.sTime, this.state.eTime);
        let tempNote = [...this.props.book.bookNotes];
        tempNote.unshift({
            "note": this.state.bookNotes,
            "date": dateNow,
            "start": this.state.startPage,
            "end": parseInt(this.state.pagesRead) + parseInt(this.state.startPage),
            "timeRead": timeForReading
        });
        let Book = {
            title: this.props.book.title,
            author: this.props.book.author,
            pagesRead: parseInt(this.props.book.pagesRead) + parseInt(this.state.pagesRead),
            pagesTotal: this.props.book.pagesTotal,
            bookNotes: tempNote,
            numEntries: this.props.book.numEntries + 1,
            rating: this.state.rating + this.props.book.rating,
            totTime: this.props.book.totTime + timeForReading
        };
        const { errors, isValid } = errorCatch(Book, this.state.sTime, this.state.eTime);

        if (!isValid) {
            this.setState({
                errors: errors
            })
            return;
        }

        if (this.state.publicPost) {
            let post = {
                title: this.props.book.title,
                author: this.props.book.author,
                note: this.state.bookNotes,
                start: this.state.startPage,
                end: parseInt(this.props.book.pagesRead) + parseInt(this.state.pagesRead),
                rating: parseInt(this.state.rating),
                nickname: this.props.nickname,
                dateOfPost: dateNow
            }
            sendPost(post);
        }
        this.props.changeBookLog(this.props.book, Book);
        this.setState({
            pagesRead: '',
            rating: '',
            bookNotes: '',
            startPage: '',
            sTime: '',
            eTime: ''
        });
        this.props.switch();
        document.getElementById('publicCheck').checked = false

    }

    doChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }
    toggleCheckbox() {
        this.setState({
            publicPost: !this.state.publicPost
        })

    }

    render() {
        const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        return (
            <div className="card bg-dark mt-4">
                <div className="card-header buttonsecondary">
                    <div className="form-row">
                        <h5 className="text-light col-11">Reading Entry for {this.props.book.title} </h5>
                        <button className="btn btn-danger col-1" onClick={() => { this.props.switch() }}><FaTimes /></button>
                    </div>

                </div>
                <div className={'card-body'}>
                    <form id="aptForm" noValidate onSubmit={this.changeBookLog}>
                        <div className="form-row py-2">

                            <label className="col-2 text-white-50 align-self-center">Book Title:</label>
                            <label><b>{this.props.book.title}</b></label>

                        </div>
                        <div className="form-row py-2">

                            <label className="col-2 text-white">Author:</label>
                            <label><b>{this.props.book.author}</b></label>
                        </div>
                        <div className="form-row py-2">

                            <label className="col-2 text-white">Start Time:</label>
                            <input
                                type="time"
                                className="col-3 form-control"
                                name="sTime"
                                value={this.state.sTime}
                                onChange={this.doChange}
                            >

                            </input>
                            <label className="col-2 offset-2 text-white">End Time:</label>
                            <input
                                type="time"
                                className="col-3 form-control"
                                name="eTime"
                                value={this.state.eTime}
                                onChange={this.doChange}
                            >

                            </input>

                        </div>
                        <div className="form-row py-2">

                            <label className="col-2 text-white">Pages Read:</label>
                            <input
                                type="text"
                                className="col-3 form-control"
                                name="pagesRead"
                                placeholder="Pages Read"
                                value={this.state.pagesRead}
                                onChange={this.doChange}
                            >

                            </input>
                            <label className="col-2 offset-2 text-white">Pages Total:</label>
                            <label>{this.props.book.pagesTotal}</label>

                        </div>
                        <div className="row py-2">
                            <div className="col-2">
                                <label className="text-white">Rate what you read:</label>

                            </div>

                            {elements.map((element, i) => (
                                <span className="col-1" key={i}>
                                    <button className={"btn buttonsecondary text-light btn-block d-block ml-auto rating"} type="button"
                                        onClick={(e) => this.setState({
                                            rating: element
                                        })}
                                    >{element}</button>
                                </span>
                            ))}

                        </div>
                        <div className="row py-2">
                            <div className="col-2">
                                <label className="text-white">Notes:</label>
                            </div>
                            <div className="col-10">
                                <textarea
                                    className="form-control"
                                    name="bookNotes"
                                    placeholder="This is the place to put any and all thoughts you have about what you just read. Favourite line? Worst character? Most shocking plot twist? Your notes will end up on the novels profile page!"
                                    cols="60"
                                    rows="3"
                                    value={this.state.bookNotes}
                                    onChange={this.doChange}
                                >

                                </textarea>


                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {this.state.errors.map((error, key) => {
                                    return (
                                        <div className="row" key={key}>
                                            <label className="text-danger">{error}</label>
                                        </div>
                                    )
                                })}
                                <div className="d-flex align-items-center">
                                    <input className="offset-8"
                                        type="checkbox"
                                        id="publicCheck"
                                        onChange={this.toggleCheckbox}
                                    ></input>
                                    <label className="mx-2 my-2">Make Post Public</label>
                                    <button className="btn btn-danger offset-1" type="submit">Submit</button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div >
        )
    }
}

function errorCatch(Book, sTime, eTime) {
    let errors = [];

    if (Book.pagesRead === '') {
        errors.push('Pages Read field is required')
    } else if (isNaN(parseInt(Book.pagesRead))) {
        errors.push('Pages Read field must be a Number')
    }
    if (sTime === '') {
        errors.push('Start Time field is required')
    }
    if (eTime === '') {
        errors.push('End Time field is required')
    }
    if (Book.pagesRead > Book.pagesTotal) {
        errors.push('Cannot have read more pages than in the book total')
    }

    let isValid = isEmpty(errors);
    return {
        errors,
        isValid
    }

}

export default AddEntry;