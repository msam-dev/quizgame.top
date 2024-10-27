import '../assets/css/MultipleChoiceQuiz.scss';

const MultipleChoiceQuiz = () => {
  return (
    <div className='multiple-choice-outer-container'>
      <div className='multiple-choice-inner-container'>
        <div className='multiple-choice-title'>
          Multiple Choice Quiz: World Flags
        </div>
        <div className='multiple-choice-image-outer-container'>
          <div className='multiple-choice-image-inner-container'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg' className='multiple-choice-flag-image'/>
            {/* <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Qatar.svg/1024px-Flag_of_Qatar.svg.png' className='multiple-choice-flag-image'/> */}
            {/* <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Flag_of_Switzerland_%28Pantone%29.svg/768px-Flag_of_Switzerland_%28Pantone%29.svg.png' className='multiple-choice-flag-image'/> */}
            {/* <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Flag_of_Afghanistan_%282013%E2%80%932021%29.svg/640px-Flag_of_Afghanistan_%282013%E2%80%932021%29.svg.png' className='multiple-choice-flag-image'/> */}
          </div>
        </div>
        <div className='multiple-choice-question'>
          
        </div>
        <div className='multiple-choice-answer-container'>
          <div className='multiple-choice-button'>
            Germany
          </div> 
          <div className='multiple-choice-button'>
            England
          </div> 
          <div className='multiple-choice-button'>
            Democratic Republic of Congo
          </div> 
          <div className='multiple-choice-button'>
            China
          </div> 
        </div>
      </div>
    </div> 
  );
}

export default MultipleChoiceQuiz;

