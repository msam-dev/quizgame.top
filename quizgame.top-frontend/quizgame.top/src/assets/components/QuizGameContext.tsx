import { useState, useContext, createContext, Dispatch, SetStateAction, useEffect} from 'react';

/**
 * Context interface for QuizGame.top  
 * This interface is used so only a single context provider is needed for all desired state across QuizGame.top.
 * This makes it easy to add additional state to the context in future.
 */
interface QuizGameContextType {
  username: string;
  token: string;
  setUser: (username: string, token: string) => void;
  clearUser: () => void;

}

interface ProviderProps {
  children: React.ReactNode;
}

const QuizGameContext = createContext<QuizGameContextType | undefined>(undefined);

/**
 * Provides common access to certain state across all components in QuizGame.top
 */
export const useQuizGameContext = () => {
  const context = useContext(QuizGameContext);

  if (context == undefined) throw new Error('useUserContext must be used within a UserProvider');

  return context;
};
///////TODO: implement local storage

export const QuizGameContextProvider = ({ children }: ProviderProps) => {
  const [username, setUsername] = useState<string>('');
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    // load from storage on mount
    const storedUsername = localStorage.getItem('username');
    const storedToken = localStorage.getItem('token');
    if (storedUsername && storedToken) {
      setUsername(storedUsername);
      setToken(storedToken);
    }
  }, []);
  
  const setUser = (username: string, token: string) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
  };

  const clearUser = () => {
    setUsername('');
    setToken('');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  const context: QuizGameContextType = {
    username,
    token,
    setUser,
    clearUser
  };

  return (
    <QuizGameContext.Provider value={context}>
      {children}
    </QuizGameContext.Provider>
  );
};