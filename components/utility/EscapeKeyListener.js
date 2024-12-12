import { useEffect } from "react";


const EscapeKeyListener = ({ onEscape }) => {
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
          onEscape();
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [onEscape]);
  
    return null; // No UI component; just listens for key events
  };
export default EscapeKeyListener;