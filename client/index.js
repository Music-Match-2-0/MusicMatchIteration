import { createRoot } from "react-dom/client";
import App from './Components/App.jsx'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.querySelector("#root"));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);