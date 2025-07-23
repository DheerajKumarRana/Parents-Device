"use client";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import withAuth from "@/components/withAuth";
import { Bell, User, LifeBuoy, LogOut, ChevronLeft } from 'lucide-react';
import { useRouter } from "next/navigation";

function Notifications() {
  const [user] = useAuthState(auth);
  const [settings, setSettings] = useState({
    busLeftSchool: false,
    childBoarded: false,
    fiveMinutesAway: false,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchSettings = async () => {
      if (user) {
        const settingsDoc = await getDoc(
          doc(db, "notificationSettings", user.email)
        );
        if (settingsDoc.exists()) {
          setSettings(settingsDoc.data());
        }
      }
    };
    fetchSettings();
  }, [user]);

  const handleSettingChange = async (e) => {
    const { name, checked } = e.target;
    const newSettings = { ...settings, [name]: checked };
    setSettings(newSettings);
    await setDoc(doc(db, "notificationSettings", user.email), newSettings);
  };

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="fixed bottom-0 left-0 z-10 w-full bg-white shadow-lg-dark md:relative md:w-64 md:flex-shrink-0 md:flex md:flex-col">
          <div className="flex justify-around h-16 md:flex-col md:h-full md:justify-start md:py-6 md:px-4">
              <a href="/" className="flex items-center p-2 my-2 text-gray-500 hover:text-navy hover:bg-gray-200 rounded-lg">
                  <User size={24} />
                  <span className="hidden ml-4 md:block">Dashboard</span>
              </a>
              <a href="/notifications" className="flex items-center p-2 my-2 text-yellow-dark md:text-navy md:bg-yellow-light md:rounded-lg">
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
        <header className="flex items-center p-4 text-white bg-navy-light shadow-md md:hidden">
            <button onClick={() => router.back()} className="mr-4">
                <ChevronLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-center">Notifications</h1>
        </header>
        <main className="flex-1 p-4 pb-20 md:pb-4">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-bold text-navy">Manage your alerts</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <label htmlFor="busLeftSchool" className="text-lg text-navy">
                  Bus has left school
                </label>
                <input
                  type="checkbox"
                  id="busLeftSchool"
                  name="busLeftSchool"
                  checked={settings.busLeftSchool}
                  onChange={handleSettingChange}
                  className="w-6 h-6 rounded-md text-yellow-dark focus:ring-yellow-dark"
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <label htmlFor="childBoarded" className="text-lg text-navy">
                  Child has boarded the bus
                </label>
                <input
                  type="checkbox"
                  id="childBoarded"
                  name="childBoarded"
                  checked={settings.childBoarded}
                  onChange={handleSettingChange}
                  className="w-6 h-6 rounded-md text-yellow-dark focus:ring-yellow-dark"
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <label htmlFor="fiveMinutesAway" className="text-lg text-navy">
                  Bus is 5 minutes away
                </label>
                <input
                  type="checkbox"
                  id="fiveMinutesAway"
                  name="fiveMinutesAway"
                  checked={settings.fiveMinutesAway}
                  onChange={handleSettingChange}
                  className="w-6 h-6 rounded-md text-yellow-dark focus:ring-yellow-dark"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default withAuth(Notifications);
