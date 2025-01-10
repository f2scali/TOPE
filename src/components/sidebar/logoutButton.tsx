import { thunks } from '@/redux/slices/auth/thunks';
import { AppDispatch, RootState } from '@/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { IoIosExit } from 'react-icons/io';
import { ButtonLoading } from '../ui/button-loading';
const LogoutButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);
  const sidebar = useSelector((state: RootState) => state.sidebar);
  const handleLogout = async () => {
    const result = await dispatch(thunks.logout());
    if (thunks.logout.fulfilled.match(result)) {
      navigate('/login');
    }
  };
  return loading ? (
    <ButtonLoading />
  ) : (
    <Button onClick={handleLogout}>
      {sidebar?.isOpen === false ? (
        <>
          <IoIosExit />
          <span style={{ marginLeft: '8px' }}>Cerrar sesión</span>
        </>
      ) : (
        <IoIosExit />
      )}
    </Button>
  );
};

export default LogoutButton;
