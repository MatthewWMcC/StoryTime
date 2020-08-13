import React, { Component } from 'react';
import '../css/App.css';
import { FaPlus } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa'

class Book extends Component {

    //class to render each book object in the library

    render() {
        // const title = this.props.book.title
        // console.log(this.props.book)

        const { title, author, pagesRead, pagesTotal, rating, numEntries } = this.props.book;

        return (
            <div className="col-md-4 mb-4">
                <div className="card bg-dark">
                    <div className="th1 form-row align-items-center justify-content-center">
                        <h4 className="text-center">{title}</h4>
                    </div>

                    <div className="form-row">
                        <label className="col-md-6 text-md-right">Author :</label>
                        <label className="col-md-6 text-md-center">{author}</label>
                    </div>
                    <div className="form-row">
                        <label className="col-md-6 text-md-right">Pages Read:</label>
                        <label className="col-md-6">{pagesRead}</label>
                        <label className="col-md-6 text-md-right">Pages Total:</label>
                        <label className="col-md-6">{pagesTotal}</label>

                    </div>
                    <div className="form-row">
                        <label className="col-md-6 text-md-right">User Rating:</label>
                        <label className="col-md-6">{decimals(rating / numEntries)}</label>
                    </div>
                    <div className="form-row">
                        <div className="col text-md-center font-weight-bold">
                            {pagesTotal > pagesRead && pagesRead > pagesTotal / 2 ?
                                <label className="text-info">Only {pagesTotal - pagesRead} pages left</label> :
                                pagesTotal > pagesRead ?
                                    <label className="text-info">{pagesTotal - pagesRead} pages left</label> :
                                    <label className="text-success">This book is complete!</label>}
                        </div>
                    </div>
                    <div className="form-group form-row mb-1">
                        <div className="offset-md-1 col-md-5">
                            <button
                                type="submit"
                                className="btn buttonsecondary text-light btn-block d-block ml-auto"
                                onClick={() => { this.props.switch("profile", this.props.book) }}
                            >
                                Profile
                            </button>
                        </div>
                        <div className="offset-md-0 col-md-2">
                            <button
                                type="button"
                                className="btn buttonsecondary text-light btn-block d-block ml-auto"
                                onClick={() => { this.props.switch("entry", this.props.book) }}
                            >
                                <FaPlus />
                            </button>
                        </div>
                        <div className="offset-md-1 col-md-2">
                            <button
                                type="button"
                                className="btn btn-danger btn-block d-block ml-auto"
                                onClick={() => { this.props.removeBook(this.props.book) }}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

function decimals(num) {
    let stringN = num.toString()
    return (stringN.includes('.') ? num.toFixed(1) : num)
}

export default Book
