import React, { useState } from "react";
import API from "../../api/axiosConfig"; 
import "./LogIn.css";

export default function Login({ setUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. ወደ ባክኢንድ ጥያቄ መላክ
      const response = await API.post("/auth/login", formData);
      
      // ባክኢንድህ በቀጥታ የተጠቃሚውን ዳታ ነው የሚመልሰው (ለምሳሌ፦ {_id: "...", username: "manager", role: "manager"})
    const userData = response.data.user;

      if (userData && userData.role) {
        alert(`እንኳን ደህና መጡ! ✅`);
        
        // 2. ለ App.js ተጠቃሚው መግባቱን ማሳወቅ
        // App.js ውስጥ ያለው handleLoginSuccess ወይም setUser ተጠቃሚውን ሴቭ ያደርጋል
        setUser(userData); 
      }
    } catch (error) {
      // የባክኢንድ ስህተት መልዕክት ማሳያ
      const errorMsg = error.response?.data?.message || "የተሳሳተ መለያ ስም ወይም የይለፍ ቃል! ❌";
      alert(errorMsg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header-wrapper">
          <div className="header-glow"></div>
          <h2>እንኳን ደህና መጡ 👋</h2>
          <p className="subtitle">እባክዎ መለያዎን ያስገቡ</p>
          <div className="wave-shape"></div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>መለያ ስም (Username)</label>
            <input
              type="text"
              name="username"
              placeholder="መለያ ስምዎን ያስገቡ"
              value={formData.username}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div className="input-pass">
            <label>የይለፍ ቃል (Password)</label>
            <input
              type="password"
              name="password"
              placeholder="የይለፍ ቃል ያስገቡ"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="login-btn">
            ግባ (Login)
          </button>
        </form>
      </div>
    </div>
  );
}
