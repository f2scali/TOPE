import LogoutButton from '../sidebar/logoutButton';
import { SheetMenu } from '../sidebar/sheet-menu';
import { ModeToggle } from './mode-toggle';

interface NavbarProps {
  title: string;
}
export function Navbar({ title }: NavbarProps) {
  return (
    <div>
      <header className="sticky top-0 z-10 w-full bg-secondary/95 shadow backdrop-blur supports-[backdrop-filter]:bg-secondary/60">
        <div className="mx-4 sm:mx-8 flex h-14 items-center">
          <div className="flex items-center space-x-4 lg:space-x-0 ">
            <SheetMenu />
            <h1 className="font-bold">{title}</h1>
          </div>

          <div className="flex gap-3 flex-1 items-center justify-end">
            <LogoutButton />
            <ModeToggle />
          </div>
        </div>
      </header>
    </div>
  );
}
