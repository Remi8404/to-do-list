import React, { useState } from "react";
import { type WidgetProps } from "@rjsf/utils";

interface Address {
  label: string;
  lon: number;
  lat: number;
}

const AddressSearchWidget = ({ value, onChange, formContext }: WidgetProps) => {
  const [query, setQuery] = useState<string>(value || "");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const { setLat, setLong, setSelectedAddress } = formContext || {};

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const regex = /\b(rue|avenue|boulevard|impasse|chemin|place|quai)\b/i;
    if (value.length < 3 || !regex.test(value)) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
          value
        )}&autocomplete=1&limit=5`
      );
      const data = await res.json();
      setSuggestions(data.features);
    } catch (error) {
      console.error("Erreur lors de la recherche d’adresse :", error);
    }
  };

  const handleSelect = (feature: any) => {
    const selectedAddress: Address = {
      label: feature.properties.label, // This is the string address
      lon: feature.geometry.coordinates[0],
      lat: feature.geometry.coordinates[1],
    };

    setQuery(selectedAddress.label);
    onChange(selectedAddress.label); // Pass only the address string to the form
    if (setLat) setLat(selectedAddress.lat); // Update lat in parent form
    if (setLong) setLong(selectedAddress.lon); // Update long in parent form
    if (setSelectedAddress) setSelectedAddress(selectedAddress.label); // Update selected address in parent form
    setSuggestions([]); // Hide suggestions
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <input
        type="text"
        placeholder="Ex: 10 rue de la Paix, Paris"
        value={query}
        onChange={handleSearch}
        style={{ width: "100%", padding: "8px", fontSize: "16px" }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            border: "1px solid #ccc",
            marginTop: 0,
            backgroundColor: "white",
            zIndex: 999,
            position: "relative",
          }}
        >
          {suggestions.map((feature, index) => (
            <li
              key={index}
              onClick={() => handleSelect(feature)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {feature.properties.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressSearchWidget;
