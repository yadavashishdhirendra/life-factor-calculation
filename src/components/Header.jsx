import React from "react";
import { Moon, Sun } from "lucide-react";

function Header({ theme, onToggleTheme }) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Life Factors Assessment</p>
        <h1>Parental Legacy & Life Factors Calculator</h1>
      </div>
      <button
        className="icon-button"
        type="button"
        onClick={onToggleTheme}
        aria-label="Toggle dark and light mode"
        title="Toggle dark and light mode"
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </header>
  );
}

export default Header;
