import { useParams, Navigate, useNavigate } from "react-router";
import "./CommanderDetail.css";
import SpringFade from "../components/spring-fade/springFade";
import { useGetAllCommandersQuery } from "~/services.ts/api";
import type { Commander } from "~/types/types";

function CommanderDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    return navigate("/atlas");
  }

  const { data: commanders, isLoading, error } = useGetAllCommandersQuery();
  const commander = commanders?.find((c: Commander) => c.id == +id);

  return (
    <>
      {commander && (
        <div className="commander-detail-container outer-wrapper">
          <SpringFade>
            <div className="commander-details">
              <h2>Title: {commander.title}</h2>
              <h2> Birth Date: {commander.birth_date}</h2>
              <h2>Birth Place: {commander.birth_location}</h2>
              <h2>Allegiance: {commander.loyalty}</h2>
              <h2>Died on: {commander.death_date}</h2>
            </div>
          </SpringFade>

          <div className="commander-pic-title">
            <h1 className="commander-header">{commander.full_name}</h1>
            <img
              loading="lazy"
              className="commander-portrait"
              src={commander.image_url}
              alt=""
            />
            <img
              className="flag-small"
              src={commander.loyalty_image_url}
              alt=""
            />
          </div>

          <SpringFade className="commander-bio">
            <p>{commander.bio}</p>
          </SpringFade>
        </div>
      )}
    </>
  );
}

export default CommanderDetail;
