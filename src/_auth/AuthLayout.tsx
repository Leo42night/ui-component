import { Outlet, Navigate } from "react-router-dom"
interface AuthLayoutProps {
  isAuthenticated: boolean; // Define the props interface
}

const AuthLayout = ({ isAuthenticated }: AuthLayoutProps) => {
  

  return (
    <>
      {isAuthenticated ? (
        <Navigate to ="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <img src="/assets/images/side-ilustration.svg" alt="logo" 
            className="hidden xl:block h-screen w-1/2 object-cover bg-white"
          />
        </>
      )} 
    </>
  )
}

export default AuthLayout