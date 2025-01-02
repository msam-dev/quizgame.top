import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout   from './assets/components/Layout'
import Home     from './pages/Home';
import Login    from './pages/Login';
import Signup   from './pages/Signup';
import Test     from './pages/Test';
import FlagQuiz from './pages/FlagQuiz';
 
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index                        element = {<Home     />} />
          <Route path = '/Login'              element = {<Login    />} />
          <Route path = '/Signup'             element = {<Signup   />} />
          <Route path = '/Test'               element = {<Test     />} />
          <Route path = '/world-flag-quiz-mc' element = {<FlagQuiz />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;