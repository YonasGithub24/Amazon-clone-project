import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DataProvider } from './Components/DataProvider/DataProvider';
import {intialState,reducer} from './Utility/Reducer'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataProvider reducer={reducer} intialState={intialState}>
      <App />
    </DataProvider>
  </React.StrictMode>
);


