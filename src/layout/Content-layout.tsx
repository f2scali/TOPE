import { Navbar } from '@/components/core/navbar';

interface ContentLayoutProps {
  children: React.ReactNode;
  title: string;
}
export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <>
      <Navbar title={title} />
      <div className="container-xl min-h-screen pt-8 pb-8 px-4 sm:px-8">
        {children}
      </div>
    </>
  );
}
