import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout       from './assets/components/Layout'
import Home         from './pages/Home';
import Login        from './pages/Login';
import Signup       from './pages/Signup';
import Test         from './pages/Test';
import FlagQuiz     from './pages/FlagQuiz';
import About        from './pages/About';
import Achievements from './pages/Achievements';      
import Leaderboards from './pages/Leaderboards';      
import QuizList     from './pages/QuizList';  
 
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index                        element = {<Home        />} />
          <Route path = '/Login'              element = {<Login       />} />
          <Route path = '/Signup'             element = {<Signup      />} />
          <Route path = '/Test'               element = {<Test        />} />
          <Route path = '/World-Flag-Quiz-MC' element = {<FlagQuiz    />} />
          <Route path = '/About'              element = {<About       />} />
          <Route path = '/Achievements'       element = {<Achievements/>} />
          <Route path = '/Leaderboards'       element = {<Leaderboards/>} />
          <Route path = '/Quiz-List'          element = {<QuizList    />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;