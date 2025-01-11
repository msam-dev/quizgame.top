import { Link } from 'react-router-dom';
import '../assets/css/QuizList.scss';

const QuizList = () => {
  return (
    <div className='quizlist-container'>
      <div className='quizlist-inner-container'>
        <div className='quizlist-title'>All Games:</div>
        <div className='quizlist-links'>
          <div className='quizlist-link-container'> • <Link to='/World-Flag-Quiz-MC'        className='quizlist-link'>Flags of the World, Multiple Choice, Endless Mode</Link></div>
          <div className='quizlist-link-container'> • <Link to='/Africa-Flag-Quiz-MC'       className='quizlist-link'>Flags of Africa, Multiple Choice, Endless Mode</Link></div>
          <div className='quizlist-link-container'> • <Link to='/Asia-Flag-Quiz-MC'         className='quizlist-link'>Flags of Asia, Multiple Choice, Endless Mode</Link></div>
          <div className='quizlist-link-container'> • <Link to='/Australasia-Flag-Quiz-MC'  className='quizlist-link'>Flags of Australasia, Multiple Choice, Endless Mode</Link></div>
          <div className='quizlist-link-container'> • <Link to='/Europe-Flag-Quiz-MC'       className='quizlist-link'>Flags of Europe, Multiple Choice, Endless Mode</Link></div>
          <div className='quizlist-link-container'> • <Link to='/NorthAmerica-Flag-Quiz-MC' className='quizlist-link'>Flags of North America, Multiple Choice, Endless Mode</Link></div>
          <div className='quizlist-link-container'> • <Link to='/SouthAmerica-Flag-Quiz-MC' className='quizlist-link'>Flags of South America, Multiple Choice, Endless Mode</Link></div>

          
          
        
        </div>
      </div>
    </div> 
  );
}

export default QuizList;