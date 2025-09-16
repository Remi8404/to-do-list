import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useToDos from "../hooks/hook";
import * as L from "leaflet";

interface ToDo {
  name: string;
  isDone: boolean;
  lat?: number;
  lng?: number;
}
var greenIcon = L.icon({
  iconUrl: "gps_done.png",
  iconSize: [38, 38], // size of the icon
  iconAnchor: [19, 38], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -38], // point from which the popup should open relative to the iconAnchor
});
var redIcon = L.icon({
  iconUrl: "gps_notdone.png",
  iconSize: [38, 38], // size of the icon
  iconAnchor: [19, 38], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -38], // point from which the popup should open relative to the iconAnchor
});

const Map = () => {
  const center: [number, number] = [48.857739, 2.294844];
  const todos: ToDo[] = useToDos();

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
              <Marker
                key={index}
                position={position}
                icon={task.isDone ? greenIcon : redIcon}
              >
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
