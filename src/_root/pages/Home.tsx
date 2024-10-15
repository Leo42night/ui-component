import { Button } from "@/components/ui/button";
import { account } from "@/lib/appwrite/config";
import { useState } from "react";

// Define the User interface or type
interface User {
  name: string;
  email: string;
}

// Adjust the Home component to accept User | null
interface HomeProps {
  user: User | null; // Allow for null
}

export const Home: React.FC<HomeProps> = ({ user }) => {
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error messages

  async function handleLogout() {
    setLoading(true); // Set loading state to true
    setError(null); // Clear any previous errors

    try {
      await account.deleteSession("current");
    } catch (err) {
      console.error(err);
      setError("Logout failed. Please try again."); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 h-screen">
      {" "}
      {/* Center items vertically and horizontally */}
      {user ? (
        <>
          <div className="text-center">Selamat Datang, {user.name}! 😁</div>
          <div className="text-center">Email: {user.email} 📧</div>
          <Button
            onClick={handleLogout}
            className="bg-red text-black text-lg font-bold hover:border-double hover:border-4 hover:border-white rounded" // Use 'font-bold' for consistency
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging out..." : "Logout"}
          </Button>
        </>
      ) : (
        <div className="text-center">Please log in to see your profile.</div> // Centered fallback message
      )}
      {error && <div className="text-red-600 text-center">{error}</div>}{" "}
      {/* Center error message */}
    </div>
  );
};

export default Home;
