import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function useLogin() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return { darkMode, setDarkMode };
}
