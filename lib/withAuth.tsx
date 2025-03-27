import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "../app/stores/authStore"; // adjust the import path as needed

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    useEffect(() => {
      if (!isLoggedIn) {
        // Redirect to login page if not authenticated
        router.push("/login");
      }
    }, [isLoggedIn, router]);

    // Optionally, show a loading indicator while checking authentication
    if (!isLoggedIn) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
