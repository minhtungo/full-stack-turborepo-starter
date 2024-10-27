import Google from '@/components/icons/Google';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const GoogleSignInButton = () => {
  return (
    <a
      href={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/google`}
      className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
    >
      <Google className='size-4 sm:size-5' /> <span>Sign in with Google</span>
    </a>
  );
};

export default GoogleSignInButton;