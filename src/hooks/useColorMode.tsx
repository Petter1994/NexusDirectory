import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

  useEffect(() => {
    const bodyClass = window.document.documentElement.classList;

    if( colorMode === "dark"){
      bodyClass.add('dark')
    }
    else{
      bodyClass.remove('dark');
    }
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
