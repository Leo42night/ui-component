import { Navigate, Outlet } from "react-router-dom";

interface RootLayoutProps {
  isAuthenticated: boolean; // Define the props interface
}

const RootLayout = ({ isAuthenticated } : RootLayoutProps) => {
  return (
    <>
      {!isAuthenticated ? (
      <Navigate to="/sign-up" />
      ) : (
        <section className="">
          <Outlet />
        </section>
      )}
    </>
  )
}

export default RootLayout