import React from "react";
import logo from "../imgs/logo-no-background.png";

function Footer() {
  return (
    <footer>
      <div className="main-content">
        <div className="rigths">
          <img src={logo} alt="" className="logo" />
          <span>© 2022 Wezo Blog. All Rights Reserved.</span>
        </div>
        <div className="social">
          <p>Social media:</p>
          <ul>
            <li>
              <a
                href="https://www.linkedin.com/in/abdolrahman-saleh-elhagrasy-9b394a221/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/abdolrahman_elhagrasy/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/abdolrahman.salehelhagrasy"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>

        <div className="contact">
          <p>Contact us:</p>
          <ul>
            <li>
              <address>M Harpertszoon Trompstr, Amsterdam</address>
            </li>
            <li>
              <a href="mailto:abdelrahmanelhagrasy661@gmail.com">Email</a>
            </li>
            <li>
              <a href="tel:+31685738303">Call Us</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
