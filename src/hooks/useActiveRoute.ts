import { usePathname } from 'next/navigation';

const useActiveRoute = (url: string): boolean => {
    const pathname = usePathname();
    const cleanUrl = url.split('/').filter(Boolean);
    const cleanPath = pathname.split('/').filter(Boolean);

    cleanUrl.splice(2, cleanUrl.length - 2);
    cleanPath.splice(2, cleanPath.length - 2);

    return cleanPath.join('') === cleanUrl.join('');
};

export default useActiveRoute;
