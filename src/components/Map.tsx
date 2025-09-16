import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useToDos from "../hooks/hook";

interface ToDo {
  name: string;
  lat?: number;
  lng?: number;
}

const Map = () => {
  // La position doit être un tableau avec deux valeurs : latitude et longitude
  const center: [number, number] = [48.857739, 2.294844];
  const todos: ToDo[] = useToDos(); // Typage des tâches avec `ToDo[]`

  return (
    <div style={{ height: "calc(100vh - 168px)" }}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {todos.map((task, index) => {
          const position: [number, number] = [task.lat ?? 0, task.lng ?? 0];
          if (position[0] !== 0 || position[1] !== 0) {
            return (
              <Marker key={index} position={position}>
                <Popup>{task.name}</Popup>
              </Marker>
            );
          }

          return null;
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
