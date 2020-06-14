import React from 'react';
import logo from './logo.svg';
import './App.css';
// import {Form, TextArea} from 'semantic-ui-react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <label htmlFor="story">Tell us your story:</label>

        <textarea id="story" name="story"
                  rows="5" cols="33">
It was a dark and stormy night...
</textarea>


        <p>
          Hi.
        </p>

      </header>
    </div>
  );
}

export default App;
