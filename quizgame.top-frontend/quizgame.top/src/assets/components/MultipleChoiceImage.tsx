import '../css/MultipleChoiceImage.scss';

interface MultipleChoiceImageProps {
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  imageUrl: string;
  next: () => void; 
}

const MultipleChoiceImage = ({ answer1, answer2, answer3, answer4, imageUrl, next }: MultipleChoiceImageProps) => {
  return (
    <div className='multiple-choice-outer-container'>
      <div className='multiple-choice-inner-container'>  
        <div className='multiple-choice-image-outer-container'>
          <div className='multiple-choice-image-inner-container'>
            <img src={imageUrl} className='multiple-choice-flag-image'/>
          </div>
        </div>
        <div className='multiple-choice-answer-container'>
          <div className='multiple-choice-button'>
            {answer1}
          </div> 
          <div className='multiple-choice-button'>
            {answer2}
          </div> 
          <div className='multiple-choice-button'>
            {answer3}
          </div> 
          <div className='multiple-choice-button'>
            {answer4}
          </div> 
        </div>

        <div className='multiple-choice-next-button' onClick={next}>
          Next Question
        </div>
      </div>
    </div> 
  );
}

export default MultipleChoiceImage;

