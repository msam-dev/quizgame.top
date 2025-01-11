import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import countryList from '../src/assets/data/Countries.json'

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

  const worldQuiz  = <FlagQuiz quizTitle='Flags of the world' region='World'  countries={countryList}/>;
  const asiaQuiz   = <FlagQuiz quizTitle='Flags of Asia'      region='Asia'   countries={countryList.filter((country) => country.continent == 'Asia')}/>;
  const africaQuiz = <FlagQuiz quizTitle='Flags of Africa'    region='Africa' countries={countryList.filter((country) => country.continent == 'Africa')}/>;
  const europeQuiz = <FlagQuiz quizTitle='Flags of Europe'    region='Europe' countries={countryList.filter((country) => country.continent == 'Europe')}/>;

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index                         element = {<Home        />} />
          <Route path = '/Login'               element = {<Login       />} />
          <Route path = '/Signup'              element = {<Signup      />} />
          <Route path = '/Test'                element = {<Test        />} />
          <Route path = '/About'               element = {<About       />} />
          <Route path = '/Achievements'        element = {<Achievements/>} />
          <Route path = '/Leaderboards'        element = {<Leaderboards/>} />
          <Route path = '/Quiz-List'           element = {<QuizList    />} />
          <Route path = '/World-Flag-Quiz-MC'  element = {worldQuiz}       />
          <Route path = '/Asia-Flag-Quiz-MC'   element = {asiaQuiz}        /> 
          <Route path = '/Africa-Flag-Quiz-MC' element = {africaQuiz}      /> 
          <Route path = '/Europe-Flag-Quiz-MC' element = {europeQuiz}      />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;