import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import OceanMap from "@/components/map/OceanMap";
import Dashboard from "@/components/Dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, BarChart3 } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero onViewDashboard={() => setActiveTab("dashboard")} />
      
      {/* Main Interface with Tabs */}
      <section className="py-20 bg-depth-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-wave-gradient bg-clip-text text-transparent">
                  Ocean Intelligence Platform
                </span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Real-time ocean data visualization and comprehensive monitoring dashboards
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2 mx-auto">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="map" className="flex items-center gap-2">
                  <Map className="w-4 h-4" />
                  Ocean Map
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard">
                <Dashboard />
              </TabsContent>

              <TabsContent value="map">
                <OceanMap />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
