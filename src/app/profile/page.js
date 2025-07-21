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

function Profile() {
  const [user] = useAuthState(auth);
  const [student, setStudent] = useState(null);
  const [trips, setTrips] = useState([]);

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

  if (!student) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
        <header className="p-4 text-white bg-navy">
            <div className="container flex items-center justify-between mx-auto">
                <h1 className="text-2xl font-bold">Profile</h1>
            </div>
        </header>
        <main className="container p-4 mx-auto">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                    <img src={student.photo} alt="Student photo" className="w-24 h-24 rounded-full" />
                    <div>
                        <h2 className="text-xl font-bold text-navy">{student.name}</h2>
                        <p className="text-gray-600">Class: {student.class}</p>
                        <p className="text-gray-600">Roll Number: {student.rollNumber}</p>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-bold text-navy">Trip History</h2>
                <div className="mt-2 space-y-2">
                {trips.map((trip) => (
                    <div key={trip.id} className="p-4 bg-white rounded-lg shadow-md">
                        <p className="text-gray-600">Date: {trip.date}</p>
                        <p className="text-gray-600">Pickup: {trip.pickupTime}</p>
                        <p className="text-gray-600">Drop: {trip.dropTime}</p>
                        <p className="text-gray-600">Status: {trip.status}</p>
                    </div>
                ))}
                </div>
            </div>
        </main>
    </div>
  );
}

export default withAuth(Profile);
