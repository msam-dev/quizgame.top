import '../assets/css/Home.scss';

const Home = () => {
  return (
    <div className='home-container'>
      <div className="home-welcome-card">
          Games:
        <a href='/world-flag-quiz-mc'>Flags Of The World (Multiple Choice)</a>
        <a href='/test'>API testing</a>
    
      </div> 
    </div> 
  );
}

export default Home;