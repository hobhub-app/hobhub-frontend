import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      this is a test layout howdy
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
