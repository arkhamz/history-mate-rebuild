import "./Commanders.css";
import { Carousel } from "~/components/carousel/Carousel";

import CommanderCard from "../components/commander-card/commanderCard";
import { useGetAllCommandersQuery } from "~/services.ts/api";
import type { Commander } from "~/types/types";

function Commanders() {
  const { data: commanders, isLoading, error } = useGetAllCommandersQuery();
  return (
    <div className="commanders__container outer-wrapper">
      <div className="inner-wrapper">
        <h1 className="commanders__header">Key Commanders & Leaders</h1>
        {commanders && commanders.length ? (
          <div className="commanders__grid">
            {commanders.map((i, index) => {
              return <CommanderCard key={index} commander={i} />;
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Commanders;
