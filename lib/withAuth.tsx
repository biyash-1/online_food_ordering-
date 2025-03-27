import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "../app/stores/authStore"; // adjust the import path as needed

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthenticatedComponent = (props: any) => {
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
