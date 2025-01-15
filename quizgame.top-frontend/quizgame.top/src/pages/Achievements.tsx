import '../assets/css/Achievements.scss';
import { useQuizGameContext } from '../assets/components/QuizGameContext';
import { FaMedal } from "react-icons/fa";
//import { Modal } from 'antd';

const Achievements = () => {
  // TODO: this needs be improved so that it generates all the achievements dynamically 
  // from a json file so thats its easy to add new achievements
  const context = useQuizGameContext();
  context;
  return (
    <div className='achievements-container'>
      <div className='achievements-inner-container'>
        <div className='achievements-medal-container'>
          <div className='achievements-icon-container'><FaMedal className='achievements-icon'/></div>
          <div className='achievements-medal-title'>Title</div>
        </div>
        <div className='achievements-medal-container'>
          <div className='achievements-icon-container'><FaMedal className='achievements-icon'/></div>
          <div className='achievements-medal-title'>title</div>
        </div>
        <div className='achievements-medal-container'>
          <div className='achievements-icon-container'><FaMedal className='achievements-icon'/></div>
          <div className='achievements-medal-title'>title</div>
        </div>
        <div className='achievements-medal-container'>
          <div className='achievements-icon-container'><FaMedal className='achievements-icon'/></div>
          <div className='achievements-medal-title'>title</div>
        </div>
        <div className='achievements-medal-container'>
          <div className='achievements-icon-container'><FaMedal className='achievements-icon'/></div>
          <div className='achievements-medal-title'>title</div>
        </div>
        <div className='achievements-medal-container'>
          <div className='achievements-icon-container'><FaMedal className='achievements-icon'/></div>
          <div className='achievements-medal-title'>title</div>
        </div>
        <div className='achievements-medal-container'>
          <div className='achievements-icon-container'><FaMedal className='achievements-icon'/></div>
          <div className='achievements-medal-title'>title</div>
        </div>
        <div className='achievements-medal-container'>
          <div className='achievements-icon-container'><FaMedal className='achievements-icon'/></div>
          <div className='achievements-medal-title'>title</div>
        </div>
        <div className='achievements-medal-container'>
          <div className='achievements-icon-container'><FaMedal className='achievements-icon'/></div>
          <div className='achievements-medal-title'>title</div>
        </div>
        <div className='achievements-medal-container'>
          <div className='achievements-icon-container'><FaMedal className='achievements-icon'/></div>
          <div className='achievements-medal-title'>title</div>
        </div>
      </div>
    </div> 
  );
}

export default Achievements;