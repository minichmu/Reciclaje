import React from 'react'
import { createRoot } from 'react-dom/client';

import Layout from './components/layout'
import 'leaflet/dist/leaflet.css';
import './stylesheets/index.scss'

document.body.innerHTML = '<div id="root"></div>';
const root = createRoot(document.getElementById('root'));
root.render(<Layout />);

