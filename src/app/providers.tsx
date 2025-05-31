'use client';
 
import { ProgressProvider } from '@bprogress/next/app';
import { usePathname } from 'next/navigation';

const Providers = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        <ProgressProvider
            options={{ showSpinner: false }}
            disableStyle
            shallowRouting
            disableAnchorClick={pathname.includes('/payment')}
    >
        {children}
    </ProgressProvider>
  );
};
 
export default Providers;