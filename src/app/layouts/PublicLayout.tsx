import { ReactNode } from "react";

type PublicLayoutProps = {
  children: ReactNode;
};

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return <div>{children}</div>;
};

export default PublicLayout;
