import React from "react";

import "./footer.css";

const Footer=()=> {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="footer">
      Copyright © {currentYear} Keshab Mahanta All rights reserved.
    </footer>
  );
}
export default Footer;
