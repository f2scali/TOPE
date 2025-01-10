import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Button } from '../ui/button';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { Link } from 'react-router-dom';
import {
  FaCreativeCommonsNc,
  FaPaintbrush,
  FaPersonCirclePlus,
  FaPersonRays,
} from 'react-icons/fa6';
import { CollapseMenuButton } from './collapse-menu-button';
import { adminMenu, MenuType, vendedorMenu } from '@/lib/menuConfig';
import { useEffect, useState } from 'react';

interface MenuProps {
  isOpen: boolean | undefined;
}

export const iconMap = {
  ListaPreciosIcon: FaCreativeCommonsNc,
  ClientesIcon: FaPersonRays,
  AdminItemsIcon: FaPaintbrush,
  UserIcon: FaPersonCirclePlus,
};
export function Menu({ isOpen }: MenuProps) {
  const { loading, error } = useSelector((state: RootState) => state.rutas);

  const rolId = localStorage.getItem('rolId');

  const [menuItems, setMenuItems] = useState<MenuType[]>([]);

  const getMenu = () => {
    if (rolId === '1') {
      setMenuItems(adminMenu);
    } else {
      setMenuItems(vendedorMenu);
    }
  };

  useEffect(() => {
    getMenu();
  }, [rolId]);

  console.log(menuItems);
  if (!menuItems) return <p>Sin acceso</p>;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <nav className="mt-8 h-full w-full">
      <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
        {menuItems.map(
          ({ id, descripcion, path, icon, subrutas, iconColor }) => {
            const Icon = iconMap[icon as keyof typeof iconMap];

            return subrutas.length === 0 ? (
              <li className="w-full" key={id}>
                <TooltipProvider disableHoverableContent>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-10 mb-1"
                        asChild
                      >
                        <Link to={path}>
                          <span className={cn(isOpen === false ? '' : 'mr-4')}>
                            {Icon ? (
                              <Icon color="hsl(225.9 70.7% 40.2%)" />
                            ) : null}{' '}
                            {/* Renderiza dinámicamente el ícono */}
                          </span>

                          <p
                            className={cn(
                              'max-w-[200px] truncate',
                              isOpen === false
                                ? 'translate-x-96 opacity-0'
                                : 'translate-x-0 opacity-100'
                            )}
                          >
                            {descripcion}
                          </p>
                        </Link>
                      </Button>
                    </TooltipTrigger>

                    {isOpen === false && (
                      <TooltipContent side="right">
                        {descripcion}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </li>
            ) : (
              <div className="w-full" key={id}>
                <CollapseMenuButton
                  id={id}
                  descripcion={descripcion}
                  path={path}
                  subrutas={subrutas}
                  isOpen={isOpen}
                  icon={icon}
                  iconColor={iconColor}
                />
              </div>
            );
          }
        )}
      </ul>
    </nav>
  );
}
