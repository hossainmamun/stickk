import { useState } from 'react';
import { useAuthContext } from './useAuthContext.jsx';

export const useSignUp = () => {
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(null);
   const { dispatch } = useAuthContext();

   const signUp = async (
      userName,
      mobile,
      email,
      password,
      about,
   ) => {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
         `${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`,
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               userName,
               mobile,
               email,
               password,
               about,
            }),
         }
      );
      const json = await response.json();

      if (!response.ok) {
         setIsLoading(false);
         setError(json.error);
      }
      if (response.ok) {
         // save the user to local storage
         localStorage.setItem('user', JSON.stringify(json));

         // update the auth context
         dispatch({ type: 'LOGIN', payload: json });

         // update loading state
         setIsLoading(false);
      }
   };

   return { signUp, isLoading, error };
};
