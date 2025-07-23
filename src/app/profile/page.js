"use client";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import withAuth from "@/components/withAuth";
import { Bell, User, LifeBuoy, LogOut, ChevronLeft, Calendar, Clock, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";


function Profile() {
  const [user] = useAuthState(auth);
  const [student, setStudent] = useState(null);
  const [trips, setTrips] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const studentDoc = await getDoc(doc(db, "students", user.email));
        if (studentDoc.exists()) {
          setStudent(studentDoc.data());
        }

        const q = query(
          collection(db, "trips"),
          where("studentId", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        const tripsData = [];
        querySnapshot.forEach((doc) => {
          tripsData.push({ id: doc.id, ...doc.data() });
        });
        setTrips(tripsData);
      }
    };
    fetchData();
  }, [user]);

    const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };


  if (!student) {
    return <div className="flex items-center justify-center min-h-screen bg-navy-light"><div className="text-white">Loading...</div></div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
        <aside className="fixed bottom-0 left-0 z-10 w-full bg-white shadow-lg-dark md:relative md:w-64 md:flex-shrink-0 md:flex md:flex-col">
          <div className="flex justify-around h-16 md:flex-col md:h-full md:justify-start md:py-6 md:px-4">
              <a href="/" className="flex items-center p-2 my-2 text-gray-500 hover:text-navy hover:bg-gray-200 rounded-lg">
                  <User size={24} />
                  <span className="hidden ml-4 md:block">Dashboard</span>
              </a>
              <a href="/notifications" className="flex items-center p-2 my-2 text-gray-500 hover:text-navy hover:bg-gray-200 rounded-lg">
                  <Bell size={24} />
                  <span className="hidden ml-4 md:block">Notifications</span>
              </a>
              <a href="/profile" className="flex items-center p-2 my-2 text-yellow-dark md:text-navy md:bg-yellow-light md:rounded-lg">
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
        <header className="flex items-center p-4 text-white bg-navy-light shadow-md md:hidden">
            <button onClick={() => router.back()} className="mr-4">
                <ChevronLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-center">Profile</h1>
        </header>
        <main className="flex-1 p-4 pb-20 md:pb-4">
            <div className="p-6 mb-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                    <img src={student.photo} alt="Student" className="w-24 h-24 rounded-full" />
                    <div>
                        <h2 className="text-2xl font-bold text-navy">{student.name}</h2>
                        <p className="text-gray-600">Class: {student.class}</p>
                        <p className="text-gray-600">Roll Number: {student.rollNumber}</p>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="mb-4 text-xl font-bold text-navy">Trip History</h3>
                <div className="space-y-4">
                {trips.map((trip) => (
                    <div key={trip.id} className="p-4 bg-white rounded-lg shadow-md">
                        <div className="flex items-center mb-2">
                            <Calendar className="mr-2 text-navy" size={20} />
                            <p className="font-bold text-gray-800">{trip.date}</p>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <Clock className="mr-2 text-green-500" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500">Pickup</p>
                                    <p>{trip.pickupTime}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Clock className="mr-2 text-red-500" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500">Drop</p>
                                    <p>{trip.dropTime}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="mr-2 text-blue-500" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <p>{trip.status}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}

export default withAuth(Profile);
