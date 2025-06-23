import "./Commanders.css";

import CommanderCard from "../components/commander-card/commanderCard";
import { useGetAllCommandersQuery } from "~/services.ts/api";

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
