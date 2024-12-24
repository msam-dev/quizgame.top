import '../css/MultipleChoiceImage.scss';

interface MultipleChoiceImageProps {
  option1:   string; 
  option2:   string;
  option3:   string;
  option4:   string;
  class1:    string;
  class2:    string;
  class3:    string;
  class4:    string;
  imageUrl:  string;
  submit:    (guess: string) => void;
}

const MultipleChoiceImage = ({ option1, option2, option3, option4, class1, class2, class3, class4, imageUrl, submit }: MultipleChoiceImageProps) => {
  return (
    <>
      <div className='multiple-choice-container'>  
        <div className='multiple-choice-image-outer-container'>
          <div className='multiple-choice-image-inner-container'>
            <img src={imageUrl} className='multiple-choice-flag-image'/>
          </div>
        </div>
        <div className='multiple-choice-answer-container'>
          <div className={`multiple-choice-button ${class1}`} onClick={() => submit(option1)}>
            {option1}
          </div> 
          <div className={`multiple-choice-button ${class2}`} onClick={() => submit(option2)}>
            {option2}
          </div> 
          <div className={`multiple-choice-button ${class3}`} onClick={() => submit(option3)}>
            {option3}
          </div> 
          <div className={`multiple-choice-button ${class4}`} onClick={() => submit(option4)}>
            {option4}
          </div> 
        </div>
      </div>
    </> 
  );
}

export default MultipleChoiceImage;
