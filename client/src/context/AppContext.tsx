import React, { createContext, useState } from 'react';

interface User {
  isLoggedin: boolean;
  data: {
    _id: string,
    name: string,
    email: string,
    profilePic: string
  }
}


interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AppContext.Provider value={ { user, setUser } }>
      { children }
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
}
