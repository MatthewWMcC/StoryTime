import React, { Component } from 'react';
import Home from './Home';
import StartScreen from './StartScreen'
import PublicPage from './PublicPage'
import { navigate, Router } from '@reach/router';


class App extends Component {
  constructor() {
    super();
    this.state = {
      pageId: ''
    }
    this.setId = this.setId.bind(this);
  }

  setId(id) {
    this.setState({
      pageId: id
    })
    navigate('/home')
  }

  Logout() {
    navigate('/')
  }

  newNavPage(pageName) {
    if (pageName === 'Home') {
      navigate('/home')
    } else if (pageName === 'Public') {
      navigate('/public')
    }
  }

  render() {
    return (

      <div className="App">
        <Router>
          <StartScreen path="/" className=""
            setId={this.setId} />
          <Home path="/home" className=""
            pageId={this.state.pageId}
            Logout={this.Logout}
            newNavPage={this.newNavPage}
          />
          <PublicPage path="/public"
            pageId={this.state.pageId}
            Logout={this.Logout}
            newNavPage={this.newNavPage}
          />
        </Router >
      </div>
    );
  }
}


export default App;