import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout   from './assets/components/Layout'
import Home     from './pages/Home';
import Test     from './pages/Test';
import Settings from './pages/Settings';
import FlagQuiz from './pages/FlagQuiz';
 
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index                        element = {<Home />} />
          <Route path = '/Test'               element = {<Test />} />
          <Route path = '/Settings'           element = {<Settings />} />
          <Route path = '/world-flag-quiz-mc' element = {<FlagQuiz />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;