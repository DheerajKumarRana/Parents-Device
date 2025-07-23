"use client";
import withAuth from "@/components/withAuth";
import { Bell, User, LifeBuoy, LogOut, ChevronLeft, Phone, Mail, AlertTriangle } from 'lucide-react';
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";


function Support() {
  const router = useRouter();
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
              <a href="/notifications" className="flex items-center p-2 my-2 text-gray-500 hover:text-navy hover:bg-gray-200 rounded-lg">
                  <Bell size={24} />
                  <span className="hidden ml-4 md:block">Notifications</span>
              </a>
              <a href="/profile" className="flex items-center p-2 my-2 text-gray-500 hover:text-navy hover:bg-gray-200 rounded-lg">
                  <User size={24} />
                  <span className="hidden ml-4 md:block">Profile</span>
              </a>
              <a href="/support" className="flex items-center p-2 my-2 text-yellow-dark md:text-navy md:bg-yellow-light md:rounded-lg">
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
            <h1 className="text-2xl font-bold text-center">Support</h1>
        </header>
        <main className="flex-1 p-4 pb-20 md:pb-4">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-xl font-bold text-navy">Contact Us</h2>
                <div className="space-y-4">
                    <a
                    href="tel:123-456-7890"
                    className="flex items-center justify-center w-full px-4 py-3 font-bold text-white transition-colors rounded-lg bg-navy hover:bg-navy-light"
                    >
                        <Phone className="mr-2" size={20} />
                        Call Transport
                    </a>
                    <a
                    href="mailto:support@school.com"
                    className="flex items-center justify-center w-full px-4 py-3 font-bold text-white transition-colors rounded-lg bg-yellow-dark hover:bg-yellow"
                    >
                        <Mail className="mr-2" size={20} />
                        Email Support
                    </a>
                    <a
                    href="/report-issue"
                    className="flex items-center justify-center w-full px-4 py-3 font-bold text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
                    >
                        <AlertTriangle className="mr-2" size={20} />
                        Report an Issue
                    </a>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}

export default withAuth(Support);
