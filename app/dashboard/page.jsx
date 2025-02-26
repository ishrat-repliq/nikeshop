"use client"; // Mark this as a Client Component

import { useEffect, useState } from "react";
import { User, Package, MapPin, CreditCard, LogOut } from "lucide-react";
import ProfileSection from "../components/dashboard/ProfileSection";
import OrderHistory from "../components/dashboard/OrderHistory";
import AddressSection from "../components/dashboard/AddressSection";
import PaymentMethods from "../components/dashboard/PaymentMethods";
import { useRouter } from "next/navigation";
import { useStore } from "../store/StoreProvider";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { authStore } = useStore();
  const router = useRouter();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!authStore.user) {
      router.push("/auth/login");
    }
  }, [authStore.user, router]);

  // If user is not authenticated, don't render anything
  if (!authStore.user) {
    return null;
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Order History", icon: Package },
    { id: "address", label: "Address", icon: MapPin },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 bg-white shadow rounded-lg p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center space-x-3 w-full px-4 py-2 text-left rounded-md ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
              {/* Logout Button */}
              <button
                className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-100 rounded-md"
                onClick={authStore.logout}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white shadow rounded-lg p-6">
            {activeTab === "profile" && <ProfileSection authdata={authStore} />}
            {activeTab === "orders" && <OrderHistory />}
            {activeTab === "address" && <AddressSection />}
            {activeTab === "payment" && <PaymentMethods />}
          </main>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;