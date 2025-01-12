import '../assets/css/Home.scss';
import { Link } from 'react-router-dom';
import { ImInfo, ImListNumbered } from 'react-icons/im';
import { GrAchievement } from 'react-icons/gr';
import { useQuizGameContext } from '../assets/components/QuizGameContext';

const Home = () => {
  const context = useQuizGameContext();
  const loggedIn: boolean = context.username != '';

  return (
    <div className='home-outer-container'>
      <div className='home-inner-container'>
        <div className={`home-greeting ${loggedIn}`}>Welcome: {context.username}!</div>
        <div className='home-games-title'>Popular Quizzes</div>
        <div className='home-popular-games-container'>
          <Link to='/world-flag-quiz-mc' className={`home-popular-game index-1`} >
            <div className='home-icon'>🗺️</div>
            <div className='home-popular-game-text'>
              <div className='home-popular-game-title'>Flags of the World</div> 
              <div className='home-popular-game-description'>Multiple choice answer, endless mode</div> 
            </div>
          </Link> 
          <Link to='/africa-flag-quiz-mc' className={`home-popular-game index-3`}>
            <div className='home-icon'>🌍</div>
            <div className='home-popular-game-text'>
              <div className='home-popular-game-title'>Flags of Africa</div> 
              <div className='home-popular-game-description'>Multiple Choice, endless mode</div>
            </div>
          </Link>
          <Link to='/asia-flag-quiz-mc' className={`home-popular-game index-2`}>
            <div className='home-icon'>🌏</div>
            <div className='home-popular-game-text'>
              <div className='home-popular-game-title'>Flags of Asia</div> 
              <div className='home-popular-game-description'>Multiple choice answer, endless mode</div>
            </div>
          </Link>
          <Link to='/Americas-Flag-Quiz-MC'  className={`home-popular-game index-4`}>
            <div className='home-icon'>🌎</div>
            <div className='home-popular-game-text'>
              <div className='home-popular-game-title'>Flags of the Americas</div> 
              <div className='home-popular-game-description'>Multiple Choice, endless mode</div>
            </div>
          </Link>
        </div>
        <Link to='/quiz-list' className='home-list-link'>View Full List of Quizzes</Link>
        <div className='home-links'>
          <Link to='/achievements' className='home-achievements-container'>
            <GrAchievement className='home-achievements-icon' />
            <div className='home-achievements-text'>Achievements</div>
          </Link>
          <a href='https://github.com/msam-dev/quizgame.top/blob/main/ProjectDetails.md' className='home-about-container' target='_blank'>
            <ImInfo className='home-about-icon' />
            <div className='home-about-text'>About</div>
          </a>
          <Link to='/leaderboards' className='home-leaderboard-container'>
            <ImListNumbered className='home-leaderboard-icon'/>     
            <div className='home-leaderboard-text'>Leaderboards</div>
          </Link>
        </div>
        <div className={`home-greeting ${!loggedIn}`}>
          <div>Make an account to save your scores and join the leaderboard.</div> 
          <div className={`home-user-auth`}>
              <Link to='/login' className='home-login'>Log in</Link> 
              <Link to='/signup' className='home-signup'>Sign up</Link> 
          </div>        
        </div>
      </div> 
    </div> 
  );
}

export default Home;