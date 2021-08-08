// https://github.com/react-ga/react-ga/issues/301#issuecomment-668640362

import { useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga'

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
};

export default usePageTracking;