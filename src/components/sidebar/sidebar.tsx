import { cn } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store/store';
import { toggleSidebar } from '@/redux/slices/sidebar/sidebar.slice';
import { SidebarToggle } from './sidebarToggle';
import { Menu } from './menu';
import LogoutButton from './logoutButton';

export function Sidebar() {
  const sidebar = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch<AppDispatch>();
  if (!sidebar) return null;

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };
  return (
    <aside
      className={cn(
        'fixed top-0 lef-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/60 shadow duration-300',
        sidebar?.isOpen === false ? 'w-[90px]' : 'w-72'
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={handleToggleSidebar} />
      <div className="relative h-full flex flex-col px-3 py-4 no-scrollbar overflow-y-auto shadow-md dak:shadow-zinc-800">
        <figure className="flex items-center gap-2">
          {/* <Image src={Logo} alt="logo" width={40} height={40} priority={true} /> */}
          <h1
            className={cn(
              'transition-transform ease-in-out duration-300 mb-1',
              sidebar?.isOpen === false
                ? 'text-lg font-bold'
                : 'translate-x-0 opacity-100 text-3xl font-bold'
            )}
          >
            TOPE
          </h1>
        </figure>

        <Menu isOpen={sidebar?.isOpen} />

        <LogoutButton />
      </div>
    </aside>
  );
}
