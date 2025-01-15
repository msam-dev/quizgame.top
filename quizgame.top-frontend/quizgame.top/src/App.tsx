import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import countryList from '../src/assets/data/Countries.json'

import Layout       from './assets/components/Layout'
import Home         from './pages/Home';
import Login        from './pages/Login';
import Signup       from './pages/Signup';
// import Test         from './pages/Test';
import FlagQuiz     from './pages/FlagQuiz';
import About        from './pages/About';
// import Achievements from './pages/Achievements';      
import Leaderboards from './pages/Leaderboards';      
import QuizList     from './pages/QuizList';  
 
const App = () => {
  //TODO: maybe there is a better way of doing this
  const worldQuiz        = <FlagQuiz quizTitle='Flags of the world'     region='World'        countries={countryList}/>;
  const asiaQuiz         = <FlagQuiz quizTitle='Flags of Asia'          region='Asia'         countries={countryList.filter((country) => country.continent == 'Asia')}/>;
  const africaQuiz       = <FlagQuiz quizTitle='Flags of Africa'        region='Africa'       countries={countryList.filter((country) => country.continent == 'Africa')}/>;
  const europeQuiz       = <FlagQuiz quizTitle='Flags of Europe'        region='Europe'       countries={countryList.filter((country) => country.continent == 'Europe')}/>;
  const australasiaQuiz  = <FlagQuiz quizTitle='Flags of Australasia'   region='Australasia'  countries={countryList.filter((country) => country.continent == 'Australasia')}/>;
  const northAmericaQuiz = <FlagQuiz quizTitle='Flags of North America' region='NorthAmerica' countries={countryList.filter((country) => country.continent == 'NorthAmerica')}/>;
  const southAmericaQuiz = <FlagQuiz quizTitle='Flags of South America' region='SouthAmerica' countries={countryList.filter((country) => country.continent == 'SouthAmerica')}/>;
  const americasQuiz     = <FlagQuiz quizTitle='Flags of the Americas'  region='Americas'     countries={countryList.filter((country) => country.continent == 'NorthAmerica' || country.continent == 'SouthAmerica' )}/>;

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index                               element = {<Home         />}/>
          <Route path = '/Login'                     element = {<Login        />}/>
          <Route path = '/Signup'                    element = {<Signup       />}/>
          {/* <Route path = '/Test'                      element = {<Test         />}/> */}
          <Route path = '/About'                     element = {<About        />}/>
          {/* <Route path = '/Achievements'              element = {<Achievements />}/> */}
          <Route path = '/Leaderboards'              element = {<Leaderboards />}/>
          <Route path = '/Quiz-List'                 element = {<QuizList     />}/>
          <Route path = '/World-Flag-Quiz-MC'        element = {worldQuiz       }/>
          <Route path = '/Asia-Flag-Quiz-MC'         element = {asiaQuiz        }/> 
          <Route path = '/Africa-Flag-Quiz-MC'       element = {africaQuiz      }/> 
          <Route path = '/Europe-Flag-Quiz-MC'       element = {europeQuiz      }/>
          <Route path = '/Australasia-Flag-Quiz-MC'  element = {australasiaQuiz }/>
          <Route path = '/NorthAmerica-Flag-Quiz-MC' element = {northAmericaQuiz}/>
          <Route path = '/SouthAmerica-Flag-Quiz-MC' element = {southAmericaQuiz}/>
          <Route path = '/Americas-Flag-Quiz-MC'     element = {americasQuiz    }/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;