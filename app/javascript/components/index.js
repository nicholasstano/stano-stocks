import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import App from './App';


export default function index() {
    return (
        <div>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </div>
    )
}