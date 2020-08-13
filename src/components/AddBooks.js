import React, { Component } from 'react';
import '../css/App.css';
import { FaPlus } from 'react-icons/fa';
import moment from 'moment';
import TimeFormatSub from './TimeFormat';
import { isEmpty } from 'lodash';
import { sendPost } from './sendPost';


class AddBooks extends Component {
    constructor() {
        super();
        this.state = {
            showForm: false,
            title: '',
            author: '',
            pagesRead: '',
            pagesTotal: '',
            bookNotes: '',
            sTime: '',
            eTime: '',
            rating: 5,
            numEntries: 1,
            errors: [],
            publicPost: false
        }
        this.doChange = this.doChange.bind(this);
        this.addBook = this.addBook.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);

    }

    addBook(e) {
        e.preventDefault();
        let dateNow = moment().format('YYYY-MM-DD hh:mma').toString()
        let timeForReading = TimeFormatSub(this.state.sTime, this.state.eTime);
        let Book = {
            title: this.state.title,
            author: this.state.author,
            pagesRead: parseInt(this.state.pagesRead),
            pagesTotal: parseInt(this.state.pagesTotal),
            bookNotes: [{
                "note": this.state.bookNotes,
                "date": dateNow,
                "start": 0,
                "end": this.state.pagesRead,
                "timeRead": timeForReading
            }],
            rating: parseInt(this.state.rating),
            numEntries: 1,
            totTime: timeForReading
        }

        const { errors, isValid } = errorCatch(Book, this.state.sTime, this.state.eTime);
        //book is invalid, return the error messages
        if (!isValid) {
            this.setState({
                errors: errors
            })
            return;
        }
        //user wants post to be public, send it to the post function
        if (this.state.publicPost) {
            let post = {
                title: this.state.title,
                author: this.state.author,
                note: this.state.bookNotes,
                start: 0,
                end: parseInt(this.state.pagesRead),
                rating: parseInt(this.state.rating),
                nickname: this.props.nickname,
                dateOfPost: moment().format('YYYY-MM-DD hh:mma').toString()
            }
            sendPost(post);
        }
        this.props.addBook(Book)
        //clear all form fields
        this.setState({
            showForm: false,
            title: '',
            author: '',
            pagesRead: '',
            pagesTotal: '',
            bookNotes: '',
            eTime: '',
            sTime: '',
            rating: 5,
            errors: [],
            publicPost: false
        });
        document.getElementById('publicCheck').checked = false;
    }

    doChange(e) {
        //update state with field change
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
                <div className="card-header buttonsecondary"
                    onClick={(e) => this.setState({
                        showForm: !this.state.showForm
                    })}
                >
                    <h5 className="text-light">Add New Book <FaPlus /> </h5>
                </div>
                <div className={'card-body' + (this.state.showForm ? '' : ' d-none')}>
                    <form id="aptForm" noValidate onSubmit={this.addBook}>
                        <div className="form-row py-2">

                            <label className="col-2 text-white-50 align-self-center">Book Title:</label>
                            <input
                                type="text"
                                className="col-10 form-control"
                                name="title"
                                placeholder="Book Title"
                                value={this.state.title}
                                onChange={this.doChange}
                            >

                            </input>

                        </div>
                        <div className="form-row py-2">

                            <label className="col-2 text-white">Author:</label>
                            <input
                                type="text"
                                className="col-10 form-control"
                                name="author"
                                placeholder="Author Name"
                                value={this.state.author}
                                onChange={this.doChange}
                            >

                            </input>
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
                            <input
                                type="text"
                                className="col-3 form-control"
                                name="pagesTotal"
                                placeholder="Pages Total"
                                value={this.state.pagesTotal}
                                onChange={this.doChange}
                            >

                            </input>

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

                            {/* <ButtonLine /> */}

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
                                        <div className="form-row justify-content-center" key={key}>
                                            <label className="text-danger text-center">{error}</label>
                                        </div>
                                    )
                                })}

                                <div className="d-flex align-items-center">
                                    <input className="offset-8"
                                        type="checkbox"
                                        id="publicCheck"
                                        onChange={this.toggleCheckbox}
                                    // onChange={this.doChange}
                                    ></input>
                                    <label className="mx-2 my-2">Make Post Public</label>
                                    <button className="btn btn-danger offset-1" type="submit">Submit</button>
                                </div>
                            </div>

                        </div>

                    </form>
                </div>
            </div >
        );
    }
}

function errorCatch(Book, sTime, eTime) {
    let errors = [];

    if (Book.title === '') {
        errors.push('title field is required');
    }
    if (Book.author === '') {
        errors.push('author field is required')
    }
    if (Book.pagesRead === '') {
        errors.push('Pages Read field is required')
    } else if (isNaN(parseInt(Book.pagesRead))) {
        errors.push('Pages Read field must be a Number')
    }
    if (Book.pagesTotal === '') {
        errors.push('Pages Total field is required')
    } else if (isNaN(parseInt(Book.pagesTotal))) {
        errors.push('Pages Total field must be a Number')
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


export default AddBooks