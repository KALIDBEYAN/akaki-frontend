import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StatusViewer.css";

export default function StatusViewer({ files = [], onEdit, userRole, deleteFile }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // --- 1. ፋይሉ ከመከታተያ ገጽ የሚጠፋበት ሎጂክ ---
  const activeFiles = files ? files.filter((f) => {
    if (f.services && f.services.length > 0) {
      return !f.services.every(s => s.status === "verified");
    }
    return f.status !== "verified";
  }) : [];

  // --- 2. የፍለጋ ሎጂክ ---
  const filteredFiles = activeFiles.filter(
    (f) =>
      f.applicantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.houseNo?.toString().includes(searchTerm) ||
      f.trackingId?.toString().includes(searchTerm) ||
      f.zone?.toString().includes(searchTerm)
  );

  // --- 3. ቀለሞች (ለቦርደር እና ለባጅ ብቻ ጥቅም ላይ ይውላሉ) ---
  const getStatusColor = (status) => {
    switch (status) {
      case "rejected": return "#ef4444";
      case "assigned": return "#3b82f6";
      case "received": return "#8b5cf6";
      case "completed": return "#630486";
      case "pending": return "#f59e0b";
      case "verified": return "#059669";
      default: return "#64748b";
    }
  };

  // --- 4. የአገልግሎት ስታተስ ጽሁፍ ---
  const getServiceStatusDisplay = (status) => {
    switch (status) {
      case "pending": return "በመጠባበቅ ላይ...";
      case "assigned": return "ወደ ባለሙያ ተልኳል";
      case "received": return "ባለሙያ ተረክቧል";
      case "completed": return "ባለሙያ መልሷል";
      case "rejected": return "አስተካክል (ስህተት)";
      case "verified": return "ተረጋግጧል";
      default: return status;
    }
  };

  // --- 5. የዋናው ፋይል ስታተስ ሎጂክ ---
  const getMainFileStatus = (file) => {
    const services = file.services || [];
    if (services.length === 0) return file.status || "pending";
    if (services.some(s => s.status === "rejected")) return "rejected";
    if (services.every(s => s.status === "verified")) return "verified";
    if (services.every(s => ["completed", "verified"].includes(s.status))) return "completed";
    if (services.every(s => ["received", "completed", "verified"].includes(s.status))) return "received";
    if (services.every(s => ["assigned", "received", "completed", "verified"].includes(s.status))) return "assigned";
    return "pending";
  };

  const getMainStatusDisplay = (status) => {
    switch (status) {
      case "pending": return "ፋይል በመጠባበቅ ላይ....";
      case "assigned": return "ወደ ባለሙያ ተመድቧል";
      case "received": return "ባለሙያ ተረክቧል";
      case "completed": return "ባለሙያ መልሷል";
      case "rejected": return "አስተካክል (ስህተት አለበት)";
      case "verified": return "ተረጋግጧል";
      default: return status;
    }
  };

  const handleEditAction = (fileData) => {
    if (onEdit) onEdit(fileData);
    navigate("/", { state: { editData: fileData } });
  };

  return (
    <div className="status-container">
      <h2 className="status-header">የፋይሎች መከታተያ ገፅ</h2>

      <div className="search-wrapper">
        <input
          type="text"
          placeholder="በስም፣ በቤት ቁጥር ወይም በቀጠና ይፈልጉ..."
          className="reg-input search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="status-grid">
        {filteredFiles.length === 0 ? (
          <p className="empty-msg">
            {searchTerm ? "በዚህ መለያ የተመዘገበ ፋይል አልተገኘም።" : "በአሁኑ ሰዓት የሚከታተሉት ፋይል የለም።"}
          </p>
        ) : (
          filteredFiles.map((f) => {
            const currentMainStatus = getMainFileStatus(f);
            
            return (
              <div
                key={f._id}
                className="status-card"
                style={{ borderLeftColor: getStatusColor(currentMainStatus) }}
              >
                <div className="card-content">
                  <div className="card-header-flex">
                    <h4 className="card-title">ተ.ቁ #{f.queue} - {f.applicantName}</h4>
                  </div>

                  <p className="card-text"><strong>የፋይል ባለቤት:</strong> {f.ownerName}</p>
                  <p className="card-text"><strong>ቤት ቁጥር:</strong> {f.houseNo}</p>
                  
                  <div className="services-section">
                    <p className="section-title"><strong>አገልግሎቶች፦</strong></p>
                    {f.services && f.services.length > 0 && (
                      <div className="services-list">
                        {f.services.map((ser, index) => (
                          <div key={index} className="service-item-wrapper">
                            <div className="service-item">
                              <span className="service-name">• {ser.serviceName}</span>
                              <span 
                                className="service-status-badge" 
                                style={{ backgroundColor: getStatusColor(ser.status) }}
                              >
                                {getServiceStatusDisplay(ser.status)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="card-text"><strong>ቀጠና:</strong> {f.zone || "---"}</p>

                  <div className="main-status-wrapper">
                    {currentMainStatus !== "rejected" ? (
                      <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(currentMainStatus) }}
                      >
                        {getMainStatusDisplay(currentMainStatus)}
                      </span>
                    ) : (
                      <div className="rejection-row">
                        <button 
                          className="edit-btn-compact" 
                          onClick={() => handleEditAction(f)}
                        >
                          ✏️ አስተካክል 
                        </button>

                        {f.services.find(s => s.status === "rejected")?.adminComment && (
                          <div className="rejection-comment-box">
                            {f.services.find(s => s.status === "rejected").adminComment}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {(userRole === "manager" || userRole === "it") && (
                    <div className="delete-wrapper">
                      <button 
                        onClick={() => { if(window.confirm("ይህ ዳታ ይጥፋ?")) deleteFile(f._id) }} 
                        className="status-card-delete-btn"
                      >
                        🗑️ ዳታውን አጥፋ
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}