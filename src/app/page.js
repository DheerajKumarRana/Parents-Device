"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import withAuth from "@/components/withAuth";
import dynamic from "next/dynamic";
import { Bell, User, LifeBuoy, LogOut } from 'lucide-react';

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full"><p>Loading map...</p></div>,
});

function Home() {
  const [user, loading] = useAuthState(auth);
  const [student, setStudent] = useState(null);
  const [bus, setBus] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const studentDoc = await getDoc(doc(db, "students", user.email));
          if (studentDoc.exists()) {
            const studentData = studentDoc.data();
            setStudent(studentData);
            const busDoc = await getDoc(doc(db, "buses", studentData.busId));
            if (busDoc.exists()) {
              setBus(busDoc.data());
            } else {
              setError("Bus data not found.");
            }
          } else {
            setError("Student data not found.");
          }
        } catch (err) {
          setError("Failed to fetch data. Please check your connection or try again later.");
          console.error(err);
        }
      }
    };
    fetchData();
  }, [user]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  if (loading || (!student && !error)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-navy-light">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for desktop, Bottom Nav for mobile */}
      <aside className="fixed bottom-0 left-0 z-10 w-full bg-white shadow-lg-dark md:relative md:w-64 md:flex-shrink-0 md:flex md:flex-col">
          <div className="flex justify-around h-16 md:flex-col md:h-full md:justify-start md:py-6 md:px-4">
              <a href="/" className="flex items-center p-2 my-2 text-yellow-dark md:text-navy md:bg-yellow-light md:rounded-lg">
                  <User size={24} />
                  <span className="hidden ml-4 md:block">Dashboard</span>
              </a>
              <a href="/notifications" className="flex items-center p-2 my-2 text-gray-500 hover:text-navy hover:bg-gray-200 rounded-lg">
                  <Bell size={24} />
                  <span className="hidden ml-4 md:block">Notifications</span>
              </a>
              <a href="/profile" className="flex items-center p-2 my-2 text-gray-500 hover:text-navy hover:bg-gray-200 rounded-lg">
                  <User size={24} />
                  <span className="hidden ml-4 md:block">Profile</span>
              </a>
              <a href="/support" className="flex items-center p-2 my-2 text-gray-500 hover:text-navy hover:bg-gray-200 rounded-lg">
                  <LifeBuoy size={24} />
                  <span className="hidden ml-4 md:block">Support</span>
              </a>
              <button onClick={handleLogout} className="flex items-center p-2 my-2 text-gray-500 hover:text-navy hover:bg-gray-200 rounded-lg md:mt-auto">
                  <LogOut size={24} />
                  <span className="hidden ml-4 md:block">Logout</span>
              </button>
          </div>
      </aside>

      <div className="flex flex-col flex-1">
        <header className="p-4 text-white bg-navy-light shadow-md md:hidden">
            <h1 className="text-2xl font-bold text-center">Dashboard</h1>
        </header>
        <main className="flex-1 p-4 pb-20 md:pb-4">
          {error && <p className="p-4 text-red-700 bg-red-100 rounded-lg">{error}</p>}

          {student && (
            <div className="p-6 mb-4 bg-white rounded-lg shadow-md">
              <div className="flex items-center space-x-4">
                <img src={student.photo} alt="Student" className="w-20 h-20 rounded-full md:w-24 md:h-24" />
                <div>
                  <h2 className="text-xl font-bold md:text-2xl text-navy">Welcome, {student.name}</h2>
                  <p className="text-gray-600">Class: {student.class}</p>
                </div>
              </div>
            </div>
          )}

          <div className="h-64 md:h-96 rounded-lg shadow-md overflow-hidden">
            {bus ? (
              <Map lat={bus.lat} lng={bus.lng} driverName={bus.driverName} />
            ) : (
              !error && <div className="flex items-center justify-center h-full bg-gray-200"><p>Fetching bus location...</p></div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default withAuth(Home);
