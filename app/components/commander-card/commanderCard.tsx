import { Link } from "react-router";
import "./commanderCard.css";
import type { Commander } from "~/types/types";

// commander card in carousel on commanders page
export default function CommanderCard({ commander }: { commander: Commander }) {
  return (
    <Link to={`/commanders/${commander.id}`}>
      <article className="commander-card">
        <div className="commander-card__content-container">
          <div className="commander-card__image-container">
            <img
              loading="lazy"
              src={commander.image_url}
              alt={commander.full_name}
              className="commander-card__image"
            />
            <span className="read-more">Read more</span>
          </div>

          <div className="commander-card__text-container">
            <h4 className="commander-card__name">{commander.full_name}</h4>
            <span className="commander-card__loyalty">{commander.loyalty}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
