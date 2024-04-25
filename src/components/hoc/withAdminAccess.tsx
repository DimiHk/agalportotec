import { useAuthentication } from "@/providers/authenticationProvider";
import { useRouter } from "next/router";
import { ComponentType } from "react";

export const withAdminAccess = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();

    const { session } = useAuthentication();

    if (session?.userType.toLocaleLowerCase() !== "administrator") {
      router.push("/dashboard/clients");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};
