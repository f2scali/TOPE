import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
// import Link from 'next/link';
import { Menu } from './menu';
// import Image from 'next/image';
import { FaBars } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <FaBars size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent
        aria-describedby="sheet-menu-description"
        className="sm:w-72 px-3 h-full flex flex-col"
        side="left"
      >
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link to="/" className="flex items-center gap-2">
              {/* <Image
                src={Logo}
                alt="logo"
                width={40}
                height={40}
                priority={true}
              /> */}

              <SheetTitle className="font-bold text-lg">TOPE</SheetTitle>
            </Link>
          </Button>

          <SheetDescription className="sr-only">TOPE</SheetDescription>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
