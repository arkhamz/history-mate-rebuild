import useEmblaCarousel from "embla-carousel-react";
import "./carousel.css";
import CommanderCard from "../commander-card/commanderCard";

export function Carousel({
  slides,
  content,
}: {
  slides: any[];
  content: string;
}) {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {slides.length
          ? slides.map((item, i) => {
              return (
                <div key={i} className="embla__slide">
                  {content === "commander" ? (
                    <CommanderCard commander={item} />
                  ) : null}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
