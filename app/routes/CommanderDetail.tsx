import { useParams, Navigate, useNavigate } from "react-router";
import "./CommanderDetail.css";
import { useGetAllCommandersQuery } from "~/services.ts/api";
import type { Commander } from "~/types/types";
import { reverseDate } from "utils";
import {
  GiCalendar,
  GiDeathSkull,
  GiPositionMarker,
  GiStorkDelivery,
  GiWireframeGlobe,
} from "react-icons/gi";

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
        <div className="commander-detail__container outer-wrapper">
          <div className=" commander-detail__inner-wrapper inner-wrapper">
            <div className="commander-detail__name-biography">
              <div className="commander-detail__title">
                <h1>{commander.full_name}</h1>
                <p>{commander.title}</p>
              </div>
              <div className="commander-detail__image-stats">
                <div className="commander-detail__image-container">
                  <img
                    loading="lazy"
                    className="commander-portrait"
                    src={commander.image_url}
                    alt=""
                  />
                </div>
                <div className="commander-detail__statistics">
                  <div className="commander-detail__stat-unit">
                    <p className="commander-detail__stat-title">
                      <GiStorkDelivery />
                    </p>
                    <p className="commander-detail__stat-data">
                      {reverseDate(commander.birth_date)}
                    </p>
                  </div>
                  <div className="commander-detail__stat-unit">
                    <p className="commander-detail__stat-title">
                      <GiPositionMarker />
                    </p>
                    <p className="commander-detail__stat-data">
                      {commander.birth_location}
                    </p>
                  </div>
                  <div className="commander-detail__stat-unit">
                    <p className="commander-detail__stat-title">
                      <GiWireframeGlobe />
                    </p>
                    <p className="commander-detail__stat-data">
                      {commander.loyalty}
                    </p>
                  </div>
                  <div className="commander-detail__stat-unit">
                    <p className="commander-detail__stat-title">
                      <GiDeathSkull />
                    </p>
                    <p className="commander-detail__stat-data">
                      {reverseDate(commander.death_date)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="commander-detail__biography">
                <h2>BIOGRAPHY</h2>
                <p>{commander.bio}</p>
              </div>
            </div>
          </div>
          {/* <SpringFade>
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
          </SpringFade> */}
        </div>
      )}
    </>
  );
}

export default CommanderDetail;
