import { useEffect } from 'react'

export const Page = ({title, children}) => {
  useEffect(() => {
    document.title = title || ""
  }, [title]);

  return children;
};
