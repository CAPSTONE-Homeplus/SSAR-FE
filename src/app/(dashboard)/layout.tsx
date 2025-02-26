import LayoutIndex from "./_components/layout-index";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <LayoutIndex>{children}</LayoutIndex>;
};

export default DashboardLayout;
