import React from "react";
import headerLogo from "../images/around.svg";

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        alt="Main logo of website"
        src={headerLogo}
      />
    </header>
  );
}

export default Header;
