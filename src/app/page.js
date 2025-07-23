"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import withAuth from "@/components/withAuth";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
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
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 text-white bg-navy">
        <div className="container flex items-center justify-between mx-auto">
          <h1 className="text-2xl font-bold">Track My Child’s Bus</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 font-bold text-navy bg-yellow rounded hover:bg-yellow-600"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="container p-4 mx-auto">
        {error && <p className="text-red-500">{error}</p>}
        {student && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <img src={student.photo} alt="Student photo" className="w-24 h-24 rounded-full" />
              <div>
                <h2 className="text-xl font-bold text-navy">Welcome, {student.name}</h2>
                <p className="text-gray-600">Class: {student.class}</p>
              </div>
            </div>
          </div>
        )}
        <div className="mt-4">
          {bus ? (
            <Map lat={bus.lat} lng={bus.lng} driverName={bus.driverName} />
          ) : (
            !error && <p>Fetching bus location...</p>
          )}
        </div>
        <div className="flex justify-around p-4 mt-4 bg-white rounded-lg shadow-md">
            <a href="/notifications" className="text-navy hover:underline">
              Notifications
            </a>
            <a href="/profile" className="text-navy hover:underline">
              Profile
            </a>
            <a href="/support" className="text-navy hover:underline">
              Support
            </a>
        </div>
      </main>
    </div>
  );
}

export default withAuth(Home);
