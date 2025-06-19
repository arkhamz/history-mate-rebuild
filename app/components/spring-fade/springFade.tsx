import { useEffect, useRef } from "react";
import "./springFade.css"; // custom CSS file

function SpringFade({ children, className = "" }) {
  const ref = useRef(null);

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
