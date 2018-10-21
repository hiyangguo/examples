import React, { Component } from 'react';
import { Button } from 'rsuite';

import logo from './logo.svg';
import 'rsuite/styles/index.less';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>
          <img src={logo} style={{ width: 100 }} />
        </p>
        <Button appearance="primary"> Hello world </Button>
      </div>
    );
  }
}

export default App;
