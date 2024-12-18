'use client';

// import { useTheme } from 'next-themes';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Button } from '../ui/button';
// import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

export function ModeToggle() {
  //   const { setTheme, theme } = useTheme();

  return (
    // <TooltipProvider disableHoverableContent>
    //   <Tooltip delayDuration={70}>
    //     <TooltipTrigger asChild>
    //       <Button
    //         variant="outline"
    //         size="icon"
    //         className="rounded-full size-8 bg-background mr-2"
    //         onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    //       >
    //         <SunIcon className="size-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
    //         <MoonIcon className="absolute size-[1.2rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" />
    //         <span className="sr-only">Switch Theme</span>
    //       </Button>
    //     </TooltipTrigger>

    //     <TooltipContent>Switch Theme</TooltipContent>
    //   </Tooltip>
    // </TooltipProvider>
    <div>
      <h1>use theme</h1>
    </div>
  );
}
