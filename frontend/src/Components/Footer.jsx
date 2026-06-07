import "./Footer.css";
import { FaGithub, FaLinkedin, FaGlobe, FaXTwitter, FaEnvelope } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3>© 2026 Vemula Satish Teja  |  All Rights Reserved.</h3>
        </div>

        <div className="footer-right">
            <a
            href="mailto:satishteja4554@gmail.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/SATISHTEJA"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/vemulasatishteja/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/satishteja_7"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
          >
            <FaXTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;