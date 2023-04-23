import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext({
  loginUsername: '',
  setLoginUsername: () => {},
  
});

const AppContextProvider = (props) => {
  const [loginUsername, setLoginUsername] = useState(() => {
    const storedUsername = sessionStorage.getItem('loginUsername');
    return storedUsername ? storedUsername : '';
  });

  const updateLoginUsername = (username) => {
    sessionStorage.setItem('loginUsername', username);
    setLoginUsername(username);
  };

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('loginUsername');
    if (storedUsername !== loginUsername) {
      setLoginUsername(storedUsername);
    }
  }, []);

  const contextValue = {
    loginUsername: loginUsername,
    setLoginUsername: updateLoginUsername,
  };

  return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
