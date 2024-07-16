import { useLocation } from "react-router-dom";

const useIsSublinkActive = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const checkIsLinkActive = (basePath) => {
    const exactMatch = basePath === location.pathname;

    return exactMatch;
  };

  return { checkIsLinkActive, pathname };
};

export default useIsSublinkActive;
