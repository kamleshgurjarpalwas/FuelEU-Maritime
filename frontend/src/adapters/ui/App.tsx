import React, { useState } from "react";
import Header from "./components/Header";
import { Tabs } from "./components/Tabs";
import RoutesTab from "./pages/RoutesTab";
import CompareTab from "./pages/CompareTab";
import BankingTab from "./pages/BankingTab";
import PoolingTab from "./pages/PoolingTab";

export default function App() {
  const [tab, setTab] = useState<"routes" | "compare" | "banking" | "pooling">("routes");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="p-6 max-w-6xl mx-auto w-full">
        <Tabs active={tab} onChange={(t) => setTab(t)} />
        <section className="mt-6">
          {tab === "routes" && <RoutesTab />}
          {tab === "compare" && <CompareTab />}
          {tab === "banking" && <BankingTab />}
          {tab === "pooling" && <PoolingTab />}
        </section>
      </main>
    </div>
  );
}