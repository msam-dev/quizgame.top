import * as constants from '../../Constants';
import { App } from 'antd';
import { useState, useContext, createContext, useEffect} from 'react';

/**
 * Context interface for QuizGame.top  
 * This is used so only a single context provider is needed for all desired state across QuizGame.top.
 * This makes it easy to add additional state to the context in future.
 */
interface QuizGameContextType {
  loggedIn: boolean;
  username: string;
  score: number;
  totalAnswers: number;
  totalCorrect: number;
  accuracy: string;
  creationDate: string;
  addAnswer: (correct: boolean) => void;
  setUser: (username: string, totalAnswers: number, totalCorrect: number, creationDate: string) => void;
  logOut: (showMessage: boolean) => void;
}

const QuizGameContext = createContext<QuizGameContextType | undefined>(undefined);

export const useQuizGameContext = () => {
  const context = useContext(QuizGameContext);
  if (context == undefined) throw new Error('useQuizGameContext must be used within a provider');
  return context;
};

interface ProviderProps { children: React.ReactNode; }

export const QuizGameContextProvider = ({ children }: ProviderProps) => {
  const { message } = App.useApp();

  const [loggedIn, setLoggedIn]         = useState<boolean>(false);
  const [username, setUsername]         = useState<string>('');
  const [score, setScore]               = useState<number>(0);
  const [totalAnswers, setTotalAnswers] = useState<number>(0);
  const [totalCorrect, setTotalCorrect] = useState<number>(0);
  const [accuracy, setAccuracy]         = useState<string>('-');
  const [creationDate, setCreationDate] = useState<string>('-');

  const addAnswer = (correct: boolean) => { 
    // local variables are necessary. See: react.dev/reference/react/useState#:~:text=and%20update%20the-,UI.,-Pitfall
    const totalCount = totalAnswers+1;
    let correctCount = totalCorrect;
    if(correct) correctCount++;
    
    setTotalAnswers(totalCount);
    localStorage.setItem('totalAnswers', totalCount.toString());
    setTotalCorrect(correctCount);
    localStorage.setItem('totalCorrect', correctCount.toString());

    setAccuracy((correctCount==0 ? 0 : ((correctCount/totalCount)*100).toFixed(2))+'%')
    setScore(correctCount - (totalCount - correctCount));
  };

  const setUser = (username: string, totalAnswers: number, totalCorrect: number, creationDate: string) => {
    setLoggedIn(true);

    setUsername(username);
    localStorage.setItem('username', username);
    setCreationDate(creationDate);
    localStorage.setItem('creationDate', creationDate);
    setTotalAnswers(totalAnswers);
    localStorage.setItem('totalAnswers', totalAnswers.toString());
    setTotalCorrect(totalCorrect);
    localStorage.setItem('totalCorrect', totalCorrect.toString());

    setAccuracy((totalCorrect==0 || totalAnswers==0 ? 0 : ((totalCorrect/totalAnswers)*100).toFixed(2))+'%');
    setScore(totalCorrect - (totalAnswers - totalCorrect));
  };

  const logOut = (showMessage: boolean) => {
    setLoggedIn(false);
    setUsername('');      
    setTotalAnswers(0);
    setTotalCorrect(0);
    setScore(0);
    setAccuracy('');
    setCreationDate('');
    localStorage.removeItem('username');
    localStorage.removeItem('totalAnswers');
    localStorage.removeItem('totalCorrect');
    localStorage.removeItem('creationDate');
    if(showMessage) message.info('You have been logged out');
    
    fetch(constants.logOutEndPoint, {
      method: 'POST',
      credentials: 'include',
    });
  };

  /**
   * Contacts API to verify user is logged in or not and handles it accordingly
   */
  const checkAuthStatus = async () => {
    if(!loggedIn) return;

    fetch( constants.loggedInEndpoint, {
      method: 'GET',
      credentials: 'include',
    })
    .then((response) => {
      if (response.ok) return response.json(); 

      return response.json().then(() => {
        throw new Error('logged out');
      });
    })
    .then((data) => {
      setUser(data.username, data.answerCount, data.correctCount, data.createdAt);
    })
    .catch((err: Error) => {
      logOut(true);
      err;
    });
  };

  /**
   * Checks user authentication on mount and the every 5 mins after that
   */
  useEffect(() => {
    const user = localStorage.getItem('username');
    const answerCount = localStorage.getItem('totalAnswers');
    const correctCount = localStorage.getItem('totalCorrect');
    const creation = localStorage.getItem('creationDate');
    if(!loggedIn || !user || !answerCount || !correctCount || !creation) {
      logOut(false);
    } else {
      setUser(user, parseInt(answerCount), parseInt(correctCount), creation);
    }

    checkAuthStatus();
    const interval = setInterval(checkAuthStatus, 300000);
    return () => clearInterval(interval);
  }, []);

  const context: QuizGameContextType = {
    loggedIn,
    username,
    score,
    totalAnswers,
    totalCorrect,
    accuracy,
    creationDate,
    addAnswer,
    setUser,
    logOut
  };

  return (
    <QuizGameContext.Provider value={context}>
      {children}
    </QuizGameContext.Provider>
  );
};