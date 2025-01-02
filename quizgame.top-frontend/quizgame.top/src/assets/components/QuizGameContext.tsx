import { useState, useContext, createContext, Dispatch, SetStateAction} from 'react';

/**
 * Context interface for QuizGame.top  
 * This interface is used so only a single context provider is needed for all desired state across QuizGame.top.
 * This makes it easy to add additional state to the context in future.
 */
interface QuizGameContextType {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  jwt: string;
  setJwt: Dispatch<SetStateAction<string>>;
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

export const QuizGameContextProvider = ({ children }: ProviderProps) => {
  const [username, setUsername] = useState<string>('');
  const [jwt, setJwt] = useState<string>('');

  const context: QuizGameContextType = {
    username,
    setUsername,
    jwt,
    setJwt,
  };

  return (
    <QuizGameContext.Provider value={context}>
      {children}
    </QuizGameContext.Provider>
  );
};