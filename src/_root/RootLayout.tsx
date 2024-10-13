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
        <section className="flex flex-col p-10 border-2 border-white rounded">
          <Outlet />
        </section>
      )}
    </>
  )
}

export default RootLayout