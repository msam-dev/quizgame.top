import countries from '../assets/data/Countries.json';
import MultipleChoiceImage from '../assets/components/MultipleChoiceImage';
import { useEffect, useState } from 'react';

const MultipleChoiceQuiz = () => {

  useEffect(() => { newQuestion() }, []);

  const [country1, setCountry1]   = useState<string>("");
  const [country2, setCountry2]   = useState<string>(""); 
  const [country3, setCountry3]   = useState<string>("");
  const [country4, setCountry4]   = useState<string>("");
  const [class1,   setClass1]     = useState<string>("");
  const [class2,   setClass2]     = useState<string>(""); 
  const [class3,   setClass3]     = useState<string>("");
  const [class4,   setClass4]     = useState<string>("");
  const [flagImg,  setFlagImg ]   = useState<string>("");
  const [answer,   setAnswer  ]   = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [nextQuestionClass, setNextClass] = useState<string>("hide");

  /**
   * Handles the logic when a user proceeds to the next question
   * TODO: update this to have better randomisation i.e. keep track of what is shown, try put tricky flags together
   */
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
    setClass1('default');
    setClass2('default');
    setClass3('default');
    setClass4('default');

    // let i: number = 0;
    // countries.forEach(element => {
    //   console.log(i++ + ": "+ element.name);
    // });

    const index: number = Math.floor(Math.random() * 4);
    setAnswer(countries[arr[index]].name);
    setFlagImg(countries[arr[index]].image_url);
    if(index == 2) setFlagImg(countries[179].image_url);
    if(index == 3) setFlagImg(countries[179].image_url);

    
    setSubmitted(false);
    setNextClass('hide');
    console.log('newQuestion');
  };

  /**
   * Handles the logic when a user submits a guess
   */ 
  const submit = (guess: string) => {
    console.log('submit');

    if(submitted) return;

    switch(answer) {
      case country1:
        setClass1('correct');
        break;
      case country2:
        setClass2('correct');
        break;
      case country3:
        setClass3('correct');
        break;
      case country4:
        setClass4('correct');
        break;     
    }

    if(guess != answer) {
      switch(guess) {
        case country1:
          setClass1('incorrect');
          break;
        case country2:
          setClass2('incorrect');
          break;
        case country3:
          setClass3('incorrect');
          break;
        case country4:
          setClass4('incorrect');
          break;     
      }
    }

    setNextClass('show');
    setSubmitted(true);
  }

  return (
    <>
      <MultipleChoiceImage 
        option1   = {country1} 
        option2   = {country2}
        option3   = {country3}
        option4   = {country4}
        class1    = {class1} 
        class2    = {class2}
        class3    = {class3}
        class4    = {class4}
        nextClass = {nextQuestionClass}
        imageUrl  = {flagImg}
        next      = {newQuestion}
        submit    = {submit}
      />
    </>
  );
}

export default MultipleChoiceQuiz;
