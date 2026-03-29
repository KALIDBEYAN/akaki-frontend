import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../image/civil.png";
import "./Navbar.css";


export default function Navbar({ user, setUser, logout, setEditingFile }) {
  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("register");
  const navigate = useNavigate();


  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  
  const getMenuItems = () => {
    const commonMenu = [
      { key: "register", label: "+ request file/ፋይል መጠየቂያ", path: "/", disabled: false },
      { key: "status", label: "☰ Status/መከታተያ", path: "/status", disabled: false },
      { key: "service", label: "📋 service/አገልግሎት", path: "/service", disabled: false },
      { key: "complaint", label: "📩 Complaint/ቅሬታ", path: "/complaint", disabled: false },
    ];

    if (!user) return commonMenu;

    
    if (user.role === "it") {
      return [
        ...commonMenu,
        { key: "admin", label: "👤 Archives/መዝገብ ቤት", path: "/admin", disabled: false },
        { key: "expert", label: "👨‍💼 Expert/ባለሙያ", path: "/expert", disabled: false },
        { key: "manager", label: "🚩 Manager/ኃላፊ", path: "/manager", disabled: false },
        { key: "it", label: "🛠 IT Management/አይቲ", path: "/it", disabled: false },
      ];
    }

    if (user.role === "manager") {
      return [
        ...commonMenu,
        { key: "admin", label: "👤 Archives/መዝገብ ቤት", path: "/admin", disabled: false },
        { key: "expert", label: "👨‍💼 Expert/ባለሙያ", path: "/expert", disabled: false },
        { key: "manager", label: "🚩 Manager/ኃላፊ", path: "/manager", disabled: false },
      ];
    }

    if (user.role === "expert") {
      return [
        ...commonMenu,
        { key: "admin", label: "👤 መዝገብ ቤት (ማንበብ ብቻ)", path: "/admin", disabled: false },
        { key: "expert", label: "👨‍💼 Expert/ባለሙያ", path: "/expert", disabled: false },
      ];
    }

    if (user.role === "admin") {
      return [
        ...commonMenu,
        { key: "admin", label: "👤 Archives/መዝገብ ቤት", path: "/admin", disabled: false },
        { key: "expert", label: "👨‍💼 Expert (ማንበብ ብቻ)", path: "/expert", disabled: false },
      ];
    }

    return commonMenu;
  };

  const handleClick = (item) => {
    setActiveMenu(item.key);
    if (item.path === "/" && setEditingFile) {
      setEditingFile(null);
    }
    navigate(item.path);
    if (window.innerWidth <= 768) setMenuOpen(false);
  };

  // 🌟 የተስተካከለው የሎግ-አውት ተግባር
  const onLogoutClick = () => {
    if (logout) {
      logout();
    } else {
      setUser(null);
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <header className="navbar-container">
      <nav className="top-nav">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="nav-logo" />
        </div>
        
        <div className="nav-title-section">
          <h1 className="main-title">አቃቂ ቃሊቲ ወረዳ 08 የሲቪል ምዝገባ እና የነዋሪዎች አገልግሎት ፅ/ቤት</h1>
          <h2 className="sub-title">ስማርት የፋይል / የግል ማህደር መከታተያ እና ቅሬታ ማቅረቢያ ሲስተም</h2>
        </div>

        <div className="nav-right">
          <div className="top-clock">🕒 {time.toLocaleTimeString()}</div>
          
          {!user ? (
            <button className="login-btn-nav" onClick={() => navigate("/login")}>Login/ግባ</button>
          ) : (
            <div className="user-info-nav">
              <span className="user-role-tag">👤 {user.fullName || user.username || "User"} | ({user.role === "admin" ? "Archive" : user.role})</span>
              <button className="logout-btn-nav" onClick={onLogoutClick}>Logout/ውጣ</button>
            </div>
          )}

          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✖" : "☰"}
          </div>
        </div>
      </nav>

      <div className={`main-menu ${menuOpen ? "open" : ""}`}>
        {getMenuItems().map((item) => {
          const isReadOnly = 
            (user?.role === "admin" && item.key === "expert") || 
            (user?.role === "expert" && item.key === "admin");

          return (
            <button
              key={item.key}
              className={`nav-link ${activeMenu === item.key ? "active" : ""} ${isReadOnly ? "read-only" : ""}`}
              onClick={() => handleClick(item)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}