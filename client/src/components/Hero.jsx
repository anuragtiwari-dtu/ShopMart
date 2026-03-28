import { useRef } from "react";
import laptop from "../assets/laptop.png";
import headphone from "../assets/headphone.png";
import "./Hero.css";

const Hero = () => {
  const heroRef = useRef();

  const handleMouseMove = (e) => {
    const { width, height, left, top } =
      heroRef.current.getBoundingClientRect();

    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;

    // PARALLAX
    heroRef.current.style.setProperty("--x", `${x}px`);
    heroRef.current.style.setProperty("--y", `${y}px`);

    // SPOTLIGHT
    heroRef.current.style.setProperty("--mouseX", `${e.clientX - left}px`);
    heroRef.current.style.setProperty("--mouseY", `${e.clientY - top}px`);
  };

  return (
    <div className="hero" ref={heroRef} onMouseMove={handleMouseMove}>
      {/* LEFT */}
      <div className="hero-left">
        <h1>MEGA SHOPPING</h1>
        <h2>SALE</h2>

        <p>
          Up to <span>50% OFF</span> on Electronics, Fashion & More!
        </p>

        <button>Shop Now →</button>
      </div>

      {/* RIGHT */}
      <div className="hero-right">
        <div className="circle">
          <div className="laptop-wrap">
            <img src={laptop} className="laptop" alt="laptop" />
          </div>

          <div className="headphone-wrap">
            <img src={headphone} className="headphone" alt="headphone" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
