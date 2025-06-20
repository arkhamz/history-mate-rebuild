import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useEffect, useRef, type PropsWithChildren } from "react";
import { motion } from "framer-motion";
import "./MapMarker.css";
import gunIcon from "../../assets/gun2.svg";
import type { Battle } from "~/types/types";
import { DivIcon } from "leaflet";
import { useNavigate } from "react-router";

function createPulseDivIcon() {
  return new DivIcon({
    className: "custom-pulse-icon",
    html: `
      <div class="map-marker-wrapper" style="position: relative; width: 60px; height: 60px;">
        <div class="pulse-ring pulse-ring-1"></div>
        <div class="pulse-ring pulse-ring-2"></div>
        <div class="pulse-ring pulse-ring-3"></div>
       
      </div>
    `,
    iconSize: [60, 60],
    iconAnchor: [30, 30],
  });
}

interface PulsingMarkerProps extends PropsWithChildren {
  battle: Battle;
  battleIndex: number;
  battleArr: Battle[];
}

export default function MapMarker({
  battle,
  battleIndex,
  battleArr,
  children,
}: PulsingMarkerProps) {
  const pulsingIcon = createPulseDivIcon();
  const navigate = useNavigate();

  const baseIcon = new Icon({
    iconUrl: gunIcon,
    iconSize: [60, 60],
    iconAnchor: [12, 41],
    className: battleIndex === battleArr.length - 1 ? "recents" : "",
  });

  const showPulse = battleIndex === battleArr.length - 1;

  const customIcon = showPulse ? pulsingIcon : baseIcon;

  return (
    <Marker
      position={[battle.latitude, battle.longitude]}
      icon={customIcon}
      eventHandlers={{
        // mouseover: (event) => event.target.openPopup(),
        click: (event) => navigate(`/battles/${battle.id}`),
      }}
    >
      <div
        className="map-marker-wrapper"
        style={{
          position: "relative",
          width: 60,
          height: 60,
          pointerEvents: "none",
        }}
      >
        {showPulse && (
          <>
            {[0, 1, 2].map((delayIndex) => (
              <motion.div
                key={delayIndex}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  backgroundColor: "white",
                  opacity: 0.4,
                  transformOrigin: "center center",
                  pointerEvents: "none",
                  translateX: "-50%",
                  translateY: "-50%",
                  zIndex: 1,
                }}
                animate={{
                  scale: [1, 3],
                  opacity: [0.4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: delayIndex * 0.8,
                }}
              />
            ))}
            <img
              src={gunIcon}
              alt="marker"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 30,
                height: 30,
                transform: "translate(-50%, -50%)",
                zIndex: 2,
                pointerEvents: "auto",
              }}
            />
          </>
        )}
        {/* <Popup offset={[20, -20]}>
          <span
            className="popup-text"
            onClick={(e) => navigate(`/battles/${battle.id}`)}
          >
            {battle.name} - {battle.date}
          </span>
        </Popup> */}
      </div>
    </Marker>
  );
}
