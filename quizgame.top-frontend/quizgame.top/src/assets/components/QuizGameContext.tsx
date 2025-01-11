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
  setUser: (username: string) => void;
  logOut: () => void;
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
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  const setUser = (username: string) => {
    setLoggedIn(true);
    setUsername(username);
    localStorage.setItem('username', username);
  };

  const logOut = () => {
    fetch(constants.logOutEndPoint, {
      method: 'POST',
      credentials: 'include',
    }).then(() => {
      setLoggedIn(false);
      setUsername('');      
      localStorage.removeItem('username');
      message.info('You have been logged out');
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
        throw new Error("logged out");
      });
    })
    .then((data) => {
      setUser(data.username);
    })
    .catch((err: Error) => {
      logOut();
    });
  };

  /**
   * Checks user authentication on mount and the every 5 mins after that
   */
  useEffect(() => {
    const user = localStorage.getItem('username');
    if(!user) {
      setLoggedIn(false);
      setUsername('');  
    } else {
      setLoggedIn(true);
      setUsername(user);  
    }

    checkAuthStatus();
    const interval = setInterval(checkAuthStatus, 300000);
    return () => clearInterval(interval);
  }, []);

  const context: QuizGameContextType = {
    loggedIn,
    username,
    setUser,
    logOut
  };

  return (
    <QuizGameContext.Provider value={context}>
      {children}
    </QuizGameContext.Provider>
  );
};