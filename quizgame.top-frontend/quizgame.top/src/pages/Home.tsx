import '../assets/css/Home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home-container'>
      <div className="home-welcome-card">
          Games:
        <Link to='/world-flag-quiz-mc'>Flags Of The World (Multiple Choice)</Link>
        <Link to='/test'>API testing</Link>
        <Link to='/login'>Log in</Link>
        <Link to='/signup'>Sign up</Link>
      </div> 
    </div> 
  );
}

export default Home;