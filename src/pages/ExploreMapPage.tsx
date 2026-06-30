import { Camera, LocateFixed } from "lucide-react";

const places = ["博物馆", "图书馆", "公园", "老街区", "科学馆"];

export function ExploreMapPage() {
  return (
    <section className="map-screen">
      <header className="page-topbar floating"><span /><h1>探索地图</h1><Camera size={20} /></header>
      <div className="painted-map">
        {places.map((place, index) => (
          <button key={place} className={`map-marker marker-${index}`}>{place}</button>
        ))}
        <div className="kid-pin">探</div>
        <button className="locate-button"><LocateFixed size={22} /></button>
      </div>
    </section>
  );
}
