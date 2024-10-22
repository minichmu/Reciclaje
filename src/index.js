import React from 'react'
import { createRoot } from 'react-dom/client';

import Layout from './components/layout'

import './stylesheets/index.scss'

document.body.innerHTML = '<div id="root"></div>';
const root = createRoot(document.getElementById('root'));
root.render(<Layout />);

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
  integrity="sha384-XQoYMqMTK8lvTzK9rA2Q5YZ3j5kuMbYT6sju76HohjRa2eytPy13nZrsmMdlKjt4"
  crossorigin=""
/>
