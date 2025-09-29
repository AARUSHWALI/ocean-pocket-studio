import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Activity, AlertCircle, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import oceanMapDemo from "@/assets/ocean-map-demo.jpg";

interface OceanFloat {
  id: string;
  float_id: string;
  latitude: number;
  longitude: number;
  depth: number;
  temperature: number;
  salinity: number;
  status: string;
  last_updated: string;
}

const OceanMap = () => {
  const [floats, setFloats] = useState<OceanFloat[]>([]);
  const [selectedFloat, setSelectedFloat] = useState<OceanFloat | null>(null);
  const [loading, setLoading] = useState(true);

  const loadFloats = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ocean_floats')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFloats(data || []);
    } catch (error) {
      console.error('Error loading floats:', error);
      toast.error('Failed to load ocean float data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFloats();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'inactive': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Activity className="w-3 h-3" />;
      case 'maintenance': return <AlertCircle className="w-3 h-3" />;
      default: return <MapPin className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Map Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Global Ocean Monitoring</h3>
          <p className="text-sm text-muted-foreground">
            Real-time ARGO float positions and data
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={loadFloats}
          disabled={loading}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Map Area - Static Demo Map */}
        <Card className="lg:col-span-2 h-[500px] relative overflow-hidden">
          <img 
            src={oceanMapDemo} 
            alt="Global Ocean Float Map" 
            className="w-full h-full object-cover"
          />
          
          {/* Float markers overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {floats.slice(0, 8).map((float, index) => (
              <div
                key={float.id}
                className={`absolute w-4 h-4 rounded-full ${getStatusColor(float.status)} animate-pulse shadow-lg`}
                style={{
                  left: `${15 + index * 11}%`,
                  top: `${25 + (index % 3) * 20}%`,
                }}
              />
            ))}
          </div>

          {/* Map Overlay Info */}
          <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg border border-border shadow-lg">
            <p className="text-sm font-medium">Global ARGO Float Network</p>
            <p className="text-xs text-muted-foreground">{floats.length} active floats</p>
          </div>
        </Card>

        {/* Float List */}
        <Card className="p-4">
          <h4 className="font-medium mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Active Floats ({floats.length})
          </h4>
          
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-20 bg-muted/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : floats.length === 0 ? (
              <p className="text-muted-foreground text-sm">No float data available</p>
            ) : (
              floats.map((float) => (
                <div
                  key={float.id}
                  className={`p-3 rounded-lg border transition-colors cursor-pointer hover:bg-accent/50 ${
                    selectedFloat?.id === float.id ? 'bg-accent/20 border-accent' : 'border-border'
                  }`}
                  onClick={() => setSelectedFloat(float)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-medium">{float.float_id}</span>
                      <Badge 
                        variant="secondary" 
                        className={`${getStatusColor(float.status)} text-white text-xs`}
                      >
                        {getStatusIcon(float.status)}
                        {float.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>
                      <span className="font-medium">Lat:</span> {float.latitude.toFixed(4)}°
                    </div>
                    <div>
                      <span className="font-medium">Lon:</span> {float.longitude.toFixed(4)}°
                    </div>
                    <div>
                      <span className="font-medium">Temp:</span> {float.temperature}°C
                    </div>
                    <div>
                      <span className="font-medium">Depth:</span> {float.depth}m
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Selected Float Details */}
      {selectedFloat && (
        <Card className="p-4">
          <h4 className="font-medium mb-4">Float Details: {selectedFloat.float_id}</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Position</p>
              <p className="font-mono">{selectedFloat.latitude.toFixed(6)}°, {selectedFloat.longitude.toFixed(6)}°</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Temperature</p>
              <p className="text-lg">{selectedFloat.temperature}°C</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Salinity</p>
              <p className="text-lg">{selectedFloat.salinity} psu</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Depth</p>
              <p className="text-lg">{selectedFloat.depth}m</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date(selectedFloat.last_updated).toLocaleString()}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default OceanMap;