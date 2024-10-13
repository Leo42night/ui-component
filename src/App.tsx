import { Route, Routes } from 'react-router-dom'

import './App.css';

import Form from './_auth/form/SigninForm';
import { Home } from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { useEffect, useState } from 'react';
import { account } from './lib/appwrite/config';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null); // Manage user state

  // Define getUser to check if the user is authenticated
  async function getUser() {
    try {
      const fetchedUser = await account.get(); // Fetch the user from the Appwrite account
      setUser(fetchedUser); // Set user state
      setIsAuthenticated(true); // Set authentication state to true
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false); // Set authentication state to false if error occurs
    } finally {
      setLoading(false); // Stop loading
    }
  }

  // Use useEffect to run getUser when the app loads
  useEffect(() => {
    getUser();
  });

  // Show a loading screen while checking authentication
  if (loading) {
    return <div className='flex h-screen items-center justify-center'>Loading...</div>;
  }

  return (
    <main className='flex h-screen items-center justify-center'>
      <Routes>
        {/* public route */}
        <Route element={<AuthLayout isAuthenticated={isAuthenticated} />}>
          <Route path='/sign-up' element={ <Form /> } />
        </Route>

        {/* pivate route */}
        <Route element={<RootLayout isAuthenticated={isAuthenticated} />}>
          <Route index element={<Home user={user} />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
