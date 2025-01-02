import { createContext, useContext, useState, ReactNode } from 'react';

interface User{
  email: string,
  name: string, 
  phone_number: string,
  birthdate: string,
  address: string
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    email: '',
    name: '',
    phone_number: '',
    birthdate: '',
    address: ''
  });



  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
