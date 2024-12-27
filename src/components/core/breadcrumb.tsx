import { useBreadCrumbs } from '@/hooks/use-bread-crumbs';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { Fragment } from 'react';

export function BreadCrumbComponent({ path }: any) {
  const breadcrumbs = useBreadCrumbs(path);
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbs.map(({ label }, index) => (
          <Fragment key={index}>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>{label}</BreadcrumbPage>
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
