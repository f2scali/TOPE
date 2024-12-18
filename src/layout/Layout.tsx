import { Sidebar } from '@/components/sidebar/sidebar';
import { cn } from '@/lib/utils';
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';

export const Layout = ({ children }: any) => {
  const sidebar = useSelector((state: RootState) => state.sidebar);

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
