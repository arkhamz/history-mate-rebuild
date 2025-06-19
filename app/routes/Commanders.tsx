import "./Commanders.css";
import { Carousel } from "~/components/carousel/Carousel";

import CommanderCard from "../components/commander-card/commanderCard";
import { useGetAllCommandersQuery } from "~/services.ts/api";
import type { Commander } from "~/types/types";

function Commanders() {
  const { data: commanders, isLoading, error } = useGetAllCommandersQuery();
  return (
    <div className="commanders-container outer-wrapper">
      <div className="inner-wrapper">
        <h1 className="commanders-header">Key Commanders & Leaders</h1>
        {commanders && commanders.length ? (
          // <div className="commander-carousel">
          //   <Carousel slides={commanders} content="commander" />
          // </div>

          <div className="commanders-grid">
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
