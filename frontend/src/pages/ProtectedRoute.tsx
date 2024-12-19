import { JSX, memo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { isLoggedIn } from '@/services/AuthService';
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setAuthenticated } from "@/redux/features/authSlice";
import { setBalance } from '@/redux/features/accountSlice';
import { setUser } from '@/redux/features/userSlice';

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  console.log("hello");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { loggedIn, balance, response } = await isLoggedIn();
        if (!loggedIn) {
          navigate("/sign-in")
          return
        }
        dispatch(setAuthenticated(loggedIn));
        if (response && balance) {
          dispatch(setUser(response.data.user))
          dispatch(setBalance(balance));
        }
      } catch (error) {
        console.error('Failed to check authentication', error);
        dispatch(setAuthenticated(false));
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return element;
};

export default memo(ProtectedRoute);