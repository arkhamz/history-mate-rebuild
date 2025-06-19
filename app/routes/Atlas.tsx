import { useEffect } from "react";
import { useNavigate } from "react-router";
// import { useDispatch, useSelector } from "react-redux";

import { Icon } from "leaflet";
// import { selectProgress } from "../store/user/userSelectors";
import "./Atlas.css";
//leaflet imports and leaflet-related
import gunIcon from "../assets/gun2.svg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGetAllUserBattlesQuery } from "~/services.ts/api";
import Spinner from "~/components/spinner/Spinner";
import { useSelector } from "react-redux";
import { selectUser, selectUserLoading } from "~/store/user/userSelectors";

// import type { Route } from "./+types/Atlas";

function Atlas() {
  const userLoading = useSelector(selectUserLoading);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const {
    data: battles,
    isLoading,
    error,
  } = useGetAllUserBattlesQuery(user?.userId ?? "", {
    skip: !user?.userId,
  });

  useEffect(() => {
    if (!user && !userLoading) {
      navigate("/login");
    }
  }, [user, userLoading, navigate]);

  const initialLocation: [number, number] = [52.0875, 13.421389];

  if (userLoading || !user) {
    return <Spinner />;
  }
  return (
    <div className="atlas outer-wrapper">
      <MapContainer
        className="leaflet-container"
        center={initialLocation}
        zoom={6}
        scrollWheelZoom={true}
        minZoom={6}
        maxZoom={8}
        zoomControl={false}
      >
        <TileLayer
          // attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=Mzk1PbCEZQl810DaXxA8HQZWQfi9bYRD7bEkFSoX36DMkyNdF73JeTKCznEesUUb"
        />
        {battles?.length
          ? battles.map(function (item, index, arr) {
              const myIcon = new Icon({
                iconUrl: gunIcon,
                iconSize: [60, 60],
                iconAnchor: [12, 41],
                // if battle index batches last index, give animate class
                className: index === arr.length - 1 ? "recent" : "",
              });

              return (
                <Marker
                  key={item.id}
                  position={[item.latitude, item.longitude]}
                  icon={myIcon}
                  eventHandlers={{
                    mouseover: (event) => event.target.openPopup(),
                  }}
                >
                  <Popup offset={[20, -20]}>
                    <span
                      className="popup-text"
                      onClick={(e) => navigate(`/battles/${item.id}`)}
                    >
                      {item.name} - {item.date}
                    </span>
                  </Popup>
                </Marker>
              );
            })
          : null}
      </MapContainer>
    </div>
  );
}

export default Atlas;
