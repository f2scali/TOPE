import { Sidebar } from '@/components/sidebar/sidebar';
import { cn } from '@/lib/utils';
import { toggleSidebar } from '@/redux/slices/sidebar/sidebar.slice';
import { AppDispatch, RootState } from '@/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Layout = ({ children }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const sidebar = useSelector((state: RootState) => state.sidebar);
  console.log('sidebar', sidebar);

  if (!sidebar) return null;
  return (
    <>
      <Sidebar />
      <main
        className={cn(
          'min-h-screen bg-background transition-[margin-left] ease-in-out duration-300',
          sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        {children}
      </main>
    </>
  );
};
