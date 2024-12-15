import '../assets/css/FlagQuiz.scss';
import countries from '../assets/data/Countries.json';
import MultipleChoiceImage from '../assets/components/MultipleChoiceImage';
import { useEffect, useState } from 'react';

const MultipleChoiceQuiz = () => {

  useEffect(() => { newQuestion() }, []);

  const [country1, setCountry1] = useState<string>("");
  const [country2, setCountry2] = useState<string>("");
  const [country3, setCountry3] = useState<string>("");
  const [country4, setCountry4] = useState<string>("");
  const [flagImg,  setFlagImg ] = useState<string>("");
  const [answer,   setAnswer  ] = useState<string>("");

  // 
  const newQuestion = () => {

    const uniqueNumbers: Set<number> = new Set<number>;
    while (uniqueNumbers.size < 4) {
      const randomNumber: number = Math.floor(Math.random() * countries.length);
      uniqueNumbers.add(randomNumber);
    }

    const arr: Array<number> = Array.from(uniqueNumbers);
    setCountry1(countries[arr[0]].name);
    setCountry2(countries[arr[1]].name);
    setCountry3(countries[arr[2]].name);
    setCountry4(countries[arr[3]].name);

    const index: number = Math.floor(Math.random() * 4);
    setAnswer(countries[arr[index]].name);
    setFlagImg(countries[arr[index]].image_url);
  };

  const submit = (guess: string, correct: string, id: string) =>{
    
    console.log("guess:"+guess+" answer:"+correct+" correct?"+(guess == correct));
  }

  return (
    <>
      <MultipleChoiceImage 
        answer  ={answer}
        answer1 ={country1} 
        answer2 ={country2}
        answer3 ={country3}
        answer4 ={country4}
        imageUrl={flagImg}
        next    ={newQuestion}
        submit  ={submit}
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
