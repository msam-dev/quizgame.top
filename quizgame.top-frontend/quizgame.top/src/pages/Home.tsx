import '../assets/css/Home.scss';
import NavBar from '../assets/components/NavBar';

const Home = () => {
  return (
    <div className='home-container'>
      <NavBar/>
      <div className="home-welcome-card">
        Hello : )
        <a href='/test'>Test</a>
      </div>
    </div> 
  );
}

export default Home;


