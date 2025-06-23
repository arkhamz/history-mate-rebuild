import { useEffect, useRef, type PropsWithChildren } from "react";
import "./SpringFade.css"; // custom CSS file

interface SpringFadeProps extends PropsWithChildren {
  className?: string;
}

function SpringFade({ children, className = "" }: SpringFadeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.classList.add("fade-in");
    }
  }, []);

  return (
    <div ref={ref} className={`fade-container ${className}`}>
      {children}
    </div>
  );
}

export default SpringFade;
