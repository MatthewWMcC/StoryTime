import React, { Component } from 'react';
import '../css/App.css';
import Book from './Book.js'

class DisplayBooks extends Component {

    //class to render the library
    render() {
        return (
            <div className="card bg-dark mb-5 mt-4">
                <div className="card-header">
                    <h4>Book Shelf</h4>
                </div>
                {this.props.bookshelf.length > 0 ?
                    <div className="container card-body">
                        <div className="row">

                            {this.props.bookshelf.map((book, i) => (
                                <Book
                                    book={book}
                                    key={i}
                                    addEntry={this.props.addEntry}
                                    removeBook={this.props.removeBook}
                                    switch={this.props.switch}
                                />

                            ))}
                        </div>
                    </div> : <h5 className="align-self-center p-4">You dont have any books on your shelf yet! Click Add New Book Entry to start your personal library!</h5>


                }


            </div>
        );
    }

}




export default DisplayBooks