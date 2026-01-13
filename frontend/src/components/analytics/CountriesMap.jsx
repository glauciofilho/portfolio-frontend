import {
  ComposableMap,
  Geographies,
  Geography,
} from "@vnedyalk0v/react19-simple-maps";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function CountriesMap({ countries }) {
  /**
   * countries:
   * [
   *   { country: "Brazil", total: 8 },
   *   { country: "United States", total: 5 }
   * ]
   */

  const normalizeCountryName = (name) => {
    const map = {
      "United States": "United States of America",
      "Brasil": "Brazil",
    };

    return map[name] || name;
  };

  const countryMap = Object.fromEntries(
    countries
      .filter(c => c.country)
      .map(c => [normalizeCountryName(c.country), c.total])
  );

  return (
    <div className="bg-[#1e1e1e] rounded-xl p-6">
      <h3 className="text-white mb-4 text-lg font-semibold">
        Countries
      </h3>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 145 }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map(geo => {
              const name = geo.properties.name;
              const value = countryMap[name] || 0;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={value > 0 ? "#22d3ee" : "#2a2a2a"}
                  stroke="#0f172a"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: "#38bdf8",
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}