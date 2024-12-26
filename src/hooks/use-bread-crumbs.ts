export function useBreadCrumbs(customPath: string) {
  const pathSplitted = customPath.split('/').filter(Boolean);

  return pathSplitted.map((path, index) => {
    const href = `/${pathSplitted.slice(0, index + 1).join('/')}`;
    const isLast = index === pathSplitted.length - 1;

    return {
      href,
      label: path.charAt(0).toUpperCase() + path.slice(1),
      isLast,
    };
  });
}
