import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import CustomerList from './components/CustomerList'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <CustomerList onLogout={() => setIsLoggedIn(false)} />
        
      ) : (
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
