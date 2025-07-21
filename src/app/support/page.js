"use client";
import withAuth from "@/components/withAuth";

function Support() {
  return (
    <div className="min-h-screen bg-gray-100">
        <header className="p-4 text-white bg-navy">
            <div className="container flex items-center justify-between mx-auto">
                <h1 className="text-2xl font-bold">Support</h1>
            </div>
        </header>
        <main className="container p-4 mx-auto">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="space-y-4">
                    <a
                    href="tel:123-456-7890"
                    className="block w-full px-4 py-3 text-center text-white bg-yellow rounded-lg hover:bg-yellow-600"
                    >
                    Call Transport
                    </a>
                    <a
                    href="mailto:support@school.com"
                    className="block w-full px-4 py-3 text-center text-white bg-navy rounded-lg hover:bg-navy-700"
                    >
                    Email Support
                    </a>
                    <a
                    href="/report-issue"
                    className="block w-full px-4 py-3 text-center text-white bg-red-500 rounded-lg hover:bg-red-700"
                    >
                    Report an Issue
                    </a>
                </div>
            </div>
        </main>
    </div>
  );
}

export default withAuth(Support);
