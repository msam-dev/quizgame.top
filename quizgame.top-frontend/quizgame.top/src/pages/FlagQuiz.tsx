import '../assets/css/FlagQuiz.scss';
import MultipleChoiceImage from '../assets/components/MultipleChoiceImage';
import { useState } from 'react';

const MultipleChoiceQuiz = () => {

  const [country1, setCountry1] = useState(String);
  const [country2, setCountry2] = useState(String);
  const [country3, setCountry3] = useState(String);
  const [country4, setCountry4] = useState(String);
  const [flagImg,  setFlagImg]  = useState(String);
  
  const newQuestion = () => {
    
    const uniqueNumbers: Set<number> = new Set<number>;

    while (uniqueNumbers.size < 4) {
      const randomNumber: number = Math.floor(Math.random() * 207) + 1;
      uniqueNumbers.add(randomNumber);
    }

    const arr: Array<number> = Array.from(uniqueNumbers);
    setCountry1(arr[0].toString());
    setCountry2(arr[1].toString());
    setCountry3(arr[2].toString());
    setCountry4(arr[3].toString());

    const answer: number = Math.floor(Math.random() * 4) + 1;
    

  };

  return (
    <>
      <MultipleChoiceImage 
        answer1 ={country1} 
        answer2 ={country2}
        answer3 ={country3}
        answer4 ={country4}
        imageUrl={flagImg}
        next    ={newQuestion}
      />
    </>
  );
}


// answer1="Germany" 
// answer2="England" 
// answer3="Democratic Republic of Congo" 
// answer4="China" 
// imageUrl="https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg"
export default MultipleChoiceQuiz;

