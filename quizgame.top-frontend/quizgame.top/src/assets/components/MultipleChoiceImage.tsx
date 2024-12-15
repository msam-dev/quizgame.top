import '../css/MultipleChoiceImage.scss';

interface MultipleChoiceImageProps {
  answer:  string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  imageUrl: string;
  next: () => void; 
  submit: (index: string, answer: string) => void;
}

const MultipleChoiceImage = ({ answer, answer1, answer2, answer3, answer4, imageUrl, next, submit }: MultipleChoiceImageProps) => {
  return (
    <div className='multiple-choice-outer-container'>
      <div className='multiple-choice-inner-container'>  
        <div className='multiple-choice-image-outer-container'>
          <div className='multiple-choice-image-inner-container'>
            <img src={imageUrl} className='multiple-choice-flag-image'/>
          </div>
        </div>
        <div className='multiple-choice-answer-container'>
          <div className='multiple-choice-button' onClick={() => submit(answer1, answer)}>
            {answer1}
          </div> 
          <div className='multiple-choice-button' onClick={() => submit(answer2, answer)}>
            {answer2}
          </div> 
          <div className='multiple-choice-button' onClick={() => submit(answer3, answer)}>
            {answer3}
          </div> 
          <div className='multiple-choice-button' onClick={() => submit(answer4, answer)}>
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

