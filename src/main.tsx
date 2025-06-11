import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'
import ReduxStoreProvider from './redux/ReduxStoreProvider';
import { Toaster } from './components/ui/sonner';
import { SocketProvider } from './context/SocketContext';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <ReduxStoreProvider>
          <App />
          <Toaster />
        </ReduxStoreProvider>
      </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>
);
