import React from 'react';
import {hydrateRoot} from 'react-dom/client';
import {App} from './App';
hydrateRoot(document.getElementById('root'),<App {...JSON.parse(document.getElementById('page-data').textContent)}/>);
