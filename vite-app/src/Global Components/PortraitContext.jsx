// contexts/PortraitContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const OrientationContext = createContext();

export function OrientationProvider({ children }) {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  return (
    <OrientationContext.Provider value={{ isPortrait }}>
      {children}
    </OrientationContext.Provider>
  );
}

export function useOrientation() {
  return useContext(OrientationContext);
}