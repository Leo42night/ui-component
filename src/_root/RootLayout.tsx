import Nav from "@/components/myComponent/Nav";
import { Navigate, Outlet } from "react-router-dom";
import { IUser } from "@/type";


interface RootLayoutProps {
  isAuthenticated: boolean; // Define the props interface
  user: IUser | null;
}

const RootLayout = ({ isAuthenticated, user }: RootLayoutProps) => {
  return (
    <>
      {!isAuthenticated && !user ? (
        <Navigate to="/sign-up" />
      ) : (
        <div className="h-screen">
          <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Nav user={user} />
          </header>
          <main className="flex h-full w-full justify-center items-center container">
            <Outlet />
          </main>
        </div>
      )}
    </>
  )
}

export default RootLayout