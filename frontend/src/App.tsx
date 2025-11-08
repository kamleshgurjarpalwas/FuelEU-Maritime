import { useState } from "react";
import Header from "./adapters/ui/components/Header";
import { Tabs } from "./adapters/ui/components/Tabs";
import RoutesTab from "./adapters/ui/pages/RoutesTab";
import CompareTab from "./adapters/ui/pages/CompareTab";
import BankingTab from "./adapters/ui/pages/BankingTab";
import PoolingTab from "./adapters/ui/pages/PoolingTab";

export default function App() {
  const [tab, setTab] = useState<"routes" | "compare" | "banking" | "pooling">(
    "routes"
  );

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

/*export default function App() {
  return <div className="font-bold italic uppercase">App Component</div>;
}*/