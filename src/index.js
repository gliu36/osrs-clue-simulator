import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './components/Main.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Main />, document.getElementById('root'));
serviceWorker.unregister();
