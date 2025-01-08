import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Square } from 'lucide-react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import MapLegendEventsDrawer from '../modals/map-legend-events-drawer';

// TODO - replace with actual geo location url/JSON file
const geoLocatoionUrl =
  'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

const Destination = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative">
      <h2 className="text-xl font-bold mb-4">Destinations</h2>
      <Badge
        className="rounded-[32px] bg-white text-black text-sm font-medium px-3 py-1 absolute right-4 top-[60px]"
        onClick={() => setOpen(true)}
      >
        <span>Legend</span>
        <div className="ml-2 flex">
          <Square className="bg-teal-100 text-teal-100 rounded-sm" size={12} />
          <Square className="bg-teal-700 text-teal-700 rounded-sm" size={12} />
          <Square
            className="bg-yellow-secondary text-yellow-secondary text-travelcon-map3 rounded-sm"
            size={12}
          />
        </div>
      </Badge>
      <ComposableMap projection="geoMercator">
        <Geographies geography={geoLocatoionUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#DDD"
                stroke="#FFF"
                strokeWidth={0.5}
                style={{
                  default: { outline: 'none' },
                  hover: { fill: '#F53', outline: 'none' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      {/* Drawer */}
      <MapLegendEventsDrawer open={open} onClose={() => setOpen(false)} />
    </section>
  );
};

export default Destination;
