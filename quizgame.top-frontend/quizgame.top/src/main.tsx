import './assets/css/index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QuizGameContextProvider } from './assets/components/QuizGameContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QuizGameContextProvider>
      <App />
    </QuizGameContextProvider>
  </React.StrictMode>,
)
