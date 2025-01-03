import './assets/css/index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { App as AntdApp } from "antd";
import { QuizGameContextProvider } from './assets/components/QuizGameContext.tsx';

// <App> is wrapped in <AntdApp> so that AntDesign messages persists across pages
// for more details see: https://ant.design/components/message
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AntdApp> 
      <QuizGameContextProvider>
        <App />
      </QuizGameContextProvider>
    </AntdApp>
  </React.StrictMode>
);
