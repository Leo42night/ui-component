import { Route, Routes } from 'react-router-dom'


import Form from './_auth/form/SigninForm';
import { Home, Edu } from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { useEffect, useState } from 'react';
import { account } from './lib/appwrite/config';

import './App.css';
import { Progress } from './components/ui/progress';
import { IUser } from './type';
import KategoriAset from './_root/pages/KategoriAset';
import { AsetKritis } from './_root/pages/AsetKritis';
import { KomponenAset } from './_root/pages/KomponenAset';
import { KebutuhanKeamanan } from './_root/pages/KebutuhanKeamanan';
import { PraktikKeamanan } from './_root/pages/PraktikKeamanan';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null); // Manage user state
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(13);

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

    // Simulate progress bar
    const timer = setTimeout(() => setProgress(progress * 1.5), 300); // Progress bar advances after 500ms
    return () => clearTimeout(timer); // Clear timeout on unmount
  });

  // Show a loading screen while checking authentication
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center px-10">
        <Progress value={progress} className="w-[60%]" />
      </div>
    )
  }

  return (
    <>
      <Routes>
        {/* public route */}
        <Route element={<AuthLayout isAuthenticated={isAuthenticated} />}>
          <Route path='/sign-up' element={ <Form /> } />
        </Route>

        {/* pivate route */}
        <Route element={<RootLayout isAuthenticated={isAuthenticated} user={user} />}>
          <Route index element={<Home user={user} />} />
          <Route path='/kategori-aset' element={<KategoriAset/>} />
          <Route path='/aset-kritis' element={<AsetKritis/>} />
          <Route path='/komponen-aset' element={<KomponenAset/>} />
          <Route path='/kebutuhan-keamanan' element={<KebutuhanKeamanan/>} />
          <Route path='/praktik-keamanan' element={<PraktikKeamanan/>} />
          <Route path='/edu' element={<Edu/>} />
        </Route>
      </Routes>
    </>
  )
}


