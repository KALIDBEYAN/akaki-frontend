import React, { useState, useMemo } from "react";
import "./ExpertPanel.css";
import axios from "../../api/axiosConfig";

export default function ExpertPanel({ 
  files = [], 
  updateFile, 
  blockedUsers = [], 
  readOnly, 
  user,
  fetchData
}) {

  const [activeView, setActiveView] = useState("files");
  const [fileSearch, setFileSearch] = useState("");
  const [blockSearch, setBlockSearch] = useState("");

  const currentUserId = user?._id;

  /* ===============================
      🔍 ፋይል ማጣሪያ (Expanded Service Logic)
  =============================== */
  const activeExpertFiles = useMemo(() => {
    let expanded = [];

    files.forEach(f => {
      const servicesList = f.services && f.services.length > 0 
        ? f.services 
        : [{ serviceName: f.service || "ያልተጠቀሰ አገልግሎት", _id: null, status: f.status, expertName: f.expertName, fileCount: f.fileCount }];

      servicesList.forEach(s => {
        const currentStatus = s.status || f.status;
        
        if (currentStatus !== "verified" && currentStatus !== "pending" && currentStatus !== "rejected") {
          expanded.push({
            ...f,
            displayService: s.serviceName,
            displayServiceId: s._id,
            displayStatus: currentStatus,
            displayExpert: s.expertName || f.expertName,
            displayFileCount: s.fileCount || f.fileCount || "---",
            displaySender: s.senderName || f.senderName,
            assignedToId: s.assignedTo || f.assignedTo 
          });
        }
      });
    });

    const searchValue = fileSearch.toLowerCase();
    return expanded.filter(f =>
      (f.applicantName || "").toLowerCase().includes(searchValue) ||
      (f.ownerName || "").toLowerCase().includes(searchValue) ||
      (f.houseNo || "").toString().includes(searchValue) ||
      (f.displayService || "").toLowerCase().includes(searchValue)
    );
  }, [files, fileSearch]);

  /* ===============================
      🚫 የታገዱ ሰዎች ማጣሪያ
  =============================== */
  const filteredBlocked = useMemo(() => {
    const rawBlocked = Array.isArray(blockedUsers) ? blockedUsers : (blockedUsers?.data || []);
    const searchValue = blockSearch.toLowerCase();

    return rawBlocked.filter(u =>
      (u.fullName || u.applicantName || "").toLowerCase().includes(searchValue) ||
      (u.houseNo || "").toString().includes(searchValue)
    );
  }, [blockedUsers, blockSearch]);

  /* ===============================
      🔄 ሁኔታ መቀየር (Optimized & Fast)
  =============================== */
  const markStatus = async (fileId, serviceId, newStatus) => {
    if (readOnly) return;

    const expertName = user?.fullName || "ባለሙያ";
    const isReceiving = newStatus === "received";
    const endpoint = isReceiving ? "receive" : "return";

    const successMsg = isReceiving 
      ? `✅ ባለሙያ ${expertName}፣ ፋይሉን በስኬት ተረክበዋል!` 
      : `✅ ባለሙያ ${expertName}፣ ፋይሉን ወደ መዝገብ ቤት መልሰዋል!`;

    try {
      // 1. API ጥሪው ሳይመለስ ለአለርት የሚሆን መልእክት ማዘጋጀት
      const response = await axios.patch(
        `http://localhost:5000/api/files/${endpoint}/${fileId}/${serviceId}`, 
        {}, 
        { withCredentials: true } 
      );

      if (response.data.success) {
        // 2. fetchData ሲጠራ UI ወዲያውኑ እንዲቀየር (ያለ ስፒነር)
        if (typeof fetchData === "function") {
          await fetchData(); 
        }
        // 3. ወዲያውኑ መልእክቱን ማሳየት
        alert(successMsg);
      }
    } catch (err) {
      console.error("Status Update Error:", err);
      alert(err.response?.data?.message || "ስህተት አጋጥሟል! እባክዎ ደግመው ይሞክሩ።");
    }
  };

  return (
    <div className={`expert-container ${readOnly ? "readonly-mode" : ""}`}>
      
      <div className="expert-header-section">
        <h2 className="expert-title">የባለሙያ መከታተያ ገጽ</h2>
        <div className="expert-info">
          <span className="user-badge">👤 {user?.fullName}</span>
          <span className="role-tag">{user?.role}</span>
        </div>
      </div>

      <div className="tab-container">
        <button onClick={() => setActiveView("files")} className={`tab-btn ${activeView === "files" ? "active blue" : ""}`}>
          📁 የፋይል ዝርዝር ({activeExpertFiles.length})
        </button>
        <button onClick={() => setActiveView("blacklist")} className={`tab-btn ${activeView === "blacklist" ? "active red" : ""}`}>
          🚫 የታገዱ ሰዎች ({filteredBlocked.length})
        </button>
      </div>

      {activeView === "files" && (
        <div className="expert-content">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="በስም፣ በቤት ቁጥር ወይም በአገልግሎት ይፈልጉ..."
              className="search-bar"
              value={fileSearch}
              onChange={e => setFileSearch(e.target.value)}
            />
          </div>

          <div className="file-grid">
            {activeExpertFiles.map((f, index) => {
              const uniqueKey = `${f._id}-${f.displayServiceId || index}`;
              const isMine = f.displayStatus === "received" && (f.assignedToId === currentUserId || f.displayExpert === user?.fullName);
              const isOther = f.displayStatus === "received" && !isMine && f.displayExpert;

              return (
                <div key={uniqueKey} className={`file-card border-${f.displayStatus}`}>
                  <div className="file-header">
                    <span className="queue-tag"># {f.queue || "N/A"}</span>
                    <span className="applicant-name"><b>አመልካች:</b> {f.applicantName}</span>
                  </div>

                  <div className="info-body">
                    <p><b>ባለቤት:</b> {f.ownerName} | <b>ቤ.ቁ:</b> {f.houseNo}</p>
                    <p className="service-highlight">
                      <b>አገልግሎት:</b> <span style={{color: '#1e40af', fontWeight: 'bold'}}>{f.displayService}</span>
                      <span style={{marginLeft: '10px'}} className="count-badge-table">ብዛት:{f.displayFileCount} </span>
                    </p>
                    <p><b>አስረካቢ:</b> <span className="sender">{f.displaySender || "---"}</span></p>
                    <p className="expert-assignee">
                       <b>ተረካቢ ባለሙያ:</b> {f.displayExpert ? <span style={{color: '#2563eb'}}>👤 {f.displayExpert}</span> : <span style={{color: '#999'}}>ያልተያዘ</span>}
                    </p>
                  </div>

                  <div className="action-footer">
                    {/* ተረከብ ሲነካ ወዲያውኑ ወደ "Received" ይቀየራል */}
                    {f.displayStatus === "assigned" && (
                      <button 
                        onClick={() => markStatus(f._id, f.displayServiceId, "received")} 
                        className="btn-action receive-btn"
                        disabled={readOnly}
                      >
                        📥 ፋይል መቀበል
                      </button>
                    )}

                    {/* የተቀበልከው ከሆነ መልስ የሚል በተን ይታያል */}
                    {isMine && (
                      <button 
                        onClick={() => markStatus(f._id, f.displayServiceId, "completed")} 
                        className="btn-action complete-btn"
                        disabled={readOnly}
                      >
                        📤 ፋይሉን መልስ
                      </button>
                    )}

                    {isOther && (
                      <div className="locked-label" style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '8px', borderRadius: '6px', fontWeight: 'bold', border: '1px solid #fca5a5' }}>
                        🔒 ፋይሉ በባለሙያ {f.displayExpert} ተይዟል
                      </div>
                    )}

                    {/* ሲጠናቀቅ "ለማረጋገጥ ተልኳል" የሚል ስሜት ይሰጣል */}
                    {f.displayStatus === "completed" && (
                      <div className="completed-label" style={{ animation: 'fadeIn 0.4s' }}>✅ ፋይሉ ወደ መዝገብ ቤት ተልኳል</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Blacklist view remains as is... */}
      {activeView === "blacklist" && (
        <div className="expert-content">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="በስም ወይም በቤት ቁጥር ይፈልጉ..."
              className="search-bar"
              value={blockSearch}
              onChange={e => setBlockSearch(e.target.value)}
            />
          </div>
          <div className="table-wrapper">
            <table className="expert-table">
              <thead>
                <tr>
                  <th>ሙሉ ስም</th>
                  <th>ቤት ቁጥር</th>
                  <th>ቀጠና</th>
                  <th>ምክንያት</th>
                  <th>ማስረጃ</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlocked.map((u, i) => (
                  <tr key={i}>
                    <td><b>{u.fullName || u.applicantName}</b></td>
                    <td>{u.houseNo}</td>
                    <td>{u.zone || "---"}</td>
                    <td><span className="reason-tag">⚠️ {u.reason}</span></td>
                    <td>
                      {(u.attachedFile || u.blockLetter) ? (
                        <a href={`http://localhost:5000${u.attachedFile || u.blockLetter}`} target="_blank" rel="noreferrer" className="view-link">ክፈት</a>
                      ) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}