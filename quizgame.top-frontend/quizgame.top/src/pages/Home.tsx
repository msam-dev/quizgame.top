import '../assets/css/Home.scss';
import { Link } from 'react-router-dom';
import { TbFlagQuestion } from "react-icons/tb";
import { FcGlobe } from "react-icons/fc";
import { useQuizGameContext } from '../assets/components/QuizGameContext';

const Home = () => {

  const context = useQuizGameContext();
  const loggedIn: boolean = context.username != '';

  return (
    <div className='home-outer-container'>
      <div className="home-inner-container">
        <div className={`home-greeting ${loggedIn}`}>Welcome: {context.username}!</div>
        <div className='home-games-title'>Popular Quizzes</div>

        <div className='home-popular-games-container'>
          <Link to='/world-flag-quiz-mc' className={`home-popular-game index-1`} >
            <FcGlobe className='home-icon'></FcGlobe>
            <div className='home-popular-game-text'>
              <div className='home-popular-game-title'>Flags of the World (MC)</div> 
              <div className='home-popular-game-description'>Multiple choice answer, endless mode</div> 
            </div>
          </Link> 
          <Link to='/world-flag-quiz-mc' className={`home-popular-game index-2`}>
            <FcGlobe className='home-icon'/>
            <div className='home-popular-game-text'>
              <div className='home-popular-game-title'>Flags of the world (DD)</div> 
              <div className='home-popular-game-description'>Drop down answer, endless mode</div>
            </div>
          </Link>
          <Link to='/world-flag-quiz-mc' className={`home-popular-game index-3`}>
            <FcGlobe className='home-icon'/>
            <div className='home-popular-game-text'>
              <div className='home-popular-game-title'>Flags of Africa</div> 
              <div className='home-popular-game-description'>Multiple Choice, endless mode</div>
            </div>
          </Link>
          <Link to='/world-flag-quiz-mc' className={`home-popular-game index-4`}>
            <FcGlobe className='home-icon'/>
            <div className='home-popular-game-text'>
              <div className='home-popular-game-title'>Flags of Europe</div> 
              <div className='home-popular-game-description'>Multiple Choice, endless mode</div>
            </div>
          </Link>
        </div>
        <Link to="/" className='home-list-link'>View Full List of Quizzes</Link>
      </div> 
    </div> 
  );
}

export default Home;