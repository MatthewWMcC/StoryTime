import React, { Component } from 'react';
import '../css/App.css';
import DisplayBooks from './DisplayBooks.js'
import AddBooks from './AddBooks.js'
import AddEntry from './AddEntry.js'
import Profile from './Profile.js'
import { without } from 'lodash';
import Header from './Header'

import axios from 'axios';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toggleMain: true,
      pageId: this.props.pageId || '',
      newEntryBook: '',
      profileBook: '',
      toggleAdditional: false,
      toggleProfile: false,
      bookshelf: [],
      nickname: '',
      LogedIn: false
    }

    this.addBook = this.addBook.bind(this);
    this.changeBookLog = this.changeBookLog.bind(this);
    this.removeBook = this.removeBook.bind(this);
    this.postNewShelf = this.postNewShelf.bind(this);
    this.switch = this.switch.bind(this);
  }

  componentDidMount() {
    if (this.state.pageId === '') {
      window.location = '/'
    }

    axios.get(`http://storytime-matt.herokuapp.com/home/${this.state.pageId}`) //retrieves account data before load
      .then(res => {
        this.setState({
          bookshelf: res.data.Shelf,
          nickname: res.data.nickname,
          LogedIn: true
        })
      }).catch((error) => {
        console.log(error);
      })

  }

  addBook(Book) {
    let tempShelf = this.state.bookshelf;
    tempShelf.unshift(Book);
    this.setState({
      bookshelf: tempShelf
    })
    this.postNewShelf(tempShelf);
  }

  changeBookLog(ogBook, newBook) {
    let tempShelf = this.state.bookshelf;
    tempShelf = without(tempShelf, ogBook);
    tempShelf.unshift(newBook);
    this.setState({
      bookshelf: tempShelf
    })
    this.postNewShelf(tempShelf);
  }

  removeBook(book) {
    let tempShelf = this.state.bookshelf;
    tempShelf = without(tempShelf, book);
    this.setState({
      bookshelf: tempShelf
    })
    this.postNewShelf(tempShelf);
  }

  switch(homeState, info) { //handles the 3 different home screen components
    if (this.state.toggleMain === false) {
      this.setState({
        toggleMain: true,
        toggleAdditional: false,
        toggleProfile: false
      })
    } else if (homeState === 'profile') {
      this.setState({
        toggleMain: false,
        toggleProfile: true,
        profileBook: info
      })
    } else (
      this.setState({
        toggleMain: false,
        toggleAdditional: true,
        newEntryBook: info
      })
    )
  }

  postNewShelf(shelf) {
    axios.put(`http://storytime-matt.herokuapp.com/home/change/${this.state.pageId}`, shelf)
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
  }
  render() {
    return (
      <div>
        <Header
          LogedIn={this.state.LogedIn}
          nickname={this.state.nickname}
          Logout={this.props.Logout}
          pageName={"Home"}
          newNavPage={this.props.newNavPage}
        />

        <main className="bg-dark text-light base" >

          <div className="container">
            <div className="row">
              <div className="col">
                {!this.state.LogedIn ?
                  <div>
                    <br></br>
                    <br></br>
                    <h1 className="text-dark">Loading...</h1>
                  </div>
                  :
                  <div className="container">
                    <div>

                      {this.state.toggleAdditional ? <AddEntry
                        book={this.state.newEntryBook}
                        changeBookLog={this.changeBookLog}
                        switch={this.switch}
                        nickname={this.state.nickname}
                      /> : ''}

                    </div>
                    <div>
                      {this.state.toggleProfile ?
                        <Profile
                          book={this.state.profileBook}
                          switch={this.switch}
                        /> :
                        ''}
                    </div>
                    <div className={this.state.toggleMain ? '' : 'd-none'}>
                      <AddBooks
                        addBook={this.addBook}
                        nickname={this.state.nickname}
                      />
                      <DisplayBooks
                        bookshelf={this.state.bookshelf}
                        removeBook={this.removeBook}
                        switch={this.switch}

                      />

                    </div>
                  </div>}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Home;
