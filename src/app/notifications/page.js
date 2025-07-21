"use client";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import withAuth from "@/components/withAuth";

function Notifications() {
  const [user] = useAuthState(auth);
  const [settings, setSettings] = useState({
    busLeftSchool: false,
    childBoarded: false,
    fiveMinutesAway: false,
  });

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

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 text-white bg-navy">
        <div className="container flex items-center justify-between mx-auto">
          <h1 className="text-2xl font-bold">Notification Settings</h1>
        </div>
      </header>
      <main className="container p-4 mx-auto">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="busLeftSchool" className="text-lg text-navy">
                Bus has left school
              </label>
              <input
                type="checkbox"
                id="busLeftSchool"
                name="busLeftSchool"
                checked={settings.busLeftSchool}
                onChange={handleSettingChange}
                className="w-6 h-6 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="childBoarded" className="text-lg text-navy">
                Child has boarded the bus
              </label>
              <input
                type="checkbox"
                id="childBoarded"
                name="childBoarded"
                checked={settings.childBoarded}
                onChange={handleSettingChange}
                className="w-6 h-6 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="fiveMinutesAway" className="text-lg text-navy">
                Bus is 5 minutes away
              </label>
              <input
                type="checkbox"
                id="fiveMinutesAway"
                name="fiveMinutesAway"
                checked={settings.fiveMinutesAway}
                onChange={handleSettingChange}
                className="w-6 h-6 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withAuth(Notifications);
