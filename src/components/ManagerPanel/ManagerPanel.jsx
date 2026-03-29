import React, { useState } from "react";
import "./ManagerPanel.css";

export default function ManagerPanel({
  complaints,
  updateComplaintStatus,
  blockedUsers,
  blockUser,
  unblockUser,
  clearAllData,
  deleteComplaint,
  deleteBlockedUser,
}) {
  const [activeTab, setActiveTab] = useState("new");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [resolutionNote, setResolutionNote] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [loading, setLoading] = useState(false);

  const [blockForm, setBlockForm] = useState({
    fullName: "",
    ownerName: "",
    houseNo: "",
    zone: "",
    reason: "",
    fileObject: null,
  });

  // --- ዳታ ማቀነባበሪያ (Data Formatting) ---
  const rawList = complaints || [];
  const list = rawList.map((c) => ({
    ...c,
    id: c._id,
    status:
      c.status === "pending"
        ? "አልታየም"
        : c.status === "in-progress"
          ? "በሂደት ላይ"
          : c.status === "resolved"
            ? "ተፈቷል"
            : c.status === "rejected"
              ? "ያልተፈታ"
              : c.status,
    resolutionNote: c.managerNote || "",
    date: new Date(c.createdAt).toLocaleDateString("et-ET"),
    audio: c.audio ? `https://akaki-backend-1.onrender.com/uploads/complaints/${c.audio}` : null,
    video: c.video ? `https://akaki-backend-1.onrender.com/uploads/complaints/${c.video}` : null,
    files: c.files && c.files.length > 0 ? `http://localhost:5000/uploads/complaints/${c.files[0]}` : null,
  }));

  const formattedBlockedUsers = (blockedUsers || []).map((u) => ({
    ...u,
    id: u._id,
    blockLetter: u.attachedFile ? `https://akaki-backend-1.onrender.com${u.attachedFile}` : null,
  }));

  const counts = {
    new: list.filter((c) => c.status === "አልታየም").length,
    progress: list.filter((c) => c.status === "በሂደት ላይ").length,
    unresolved: list.filter((c) => c.status === "ያልተፈታ").length,
    resolved: list.filter((c) => c.status === "ተፈቷል").length,
    blacklist: formattedBlockedUsers.length,
  };

  // --- የእርምጃዎች ሎጂክ (Handlers) ---

  const handleEditNote = (complaintId, currentNote) => {
    setResolutionNote((prev) => ({ ...prev, [complaintId]: currentNote || "" }));
    setIsEditing((prev) => ({ ...prev, [complaintId]: true }));
  };

  const handleCancelEdit = (complaintId) => {
    setIsEditing((prev) => ({ ...prev, [complaintId]: false }));
  };

  const handleStatusUpdate = async (id, amharicStatus) => {
    const statusMap = { "በሂደት ላይ": "in-progress", "ያልተፈታ": "rejected", "ተፈቷል": "resolved" };
    const noteToSave = resolutionNote[id] !== undefined ? resolutionNote[id] : list.find((c) => c.id === id)?.resolutionNote || "";

    try {
      setLoading(true);
      await updateComplaintStatus(id, statusMap[amharicStatus] || amharicStatus, noteToSave);
      setIsEditing((prev) => ({ ...prev, [id]: false }));
    } catch (error) {
      alert("ሁኔታውን ማዘመን አልተቻለም።");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNoteOnly = async (id) => {
    const rawItem = rawList.find((c) => c._id === id);
    const noteToSave = resolutionNote[id] || "";
    try {
      setLoading(true);
      await updateComplaintStatus(id, rawItem.status, noteToSave);
      setIsEditing((prev) => ({ ...prev, [id]: false }));
    } catch (error) {
      alert("ማስታወሻውን ማዘመን አልተሳካም!");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockSubmit = async (e) => {
    e.preventDefault();
    const { fullName, ownerName, houseNo, reason, fileObject } = blockForm;

    // 1. መሠረታዊ Validation
    if (!fullName.trim() || !houseNo.trim() || !ownerName.trim()) {
      return alert("እባክዎ ስም፣ የቤት ቁጥር እና የፋይል ባለቤት ስም ይሙሉ!");
    }

    // 2. የተባዛ ዳታ ቼክ (Frontend Check for instant feedback)
    const isAlreadyBlocked = formattedBlockedUsers.some(
      (u) => 
        u.fullName?.trim() === fullName.trim() && 
        u.houseNo?.trim() === houseNo.trim() && 
        u.ownerName?.trim() === ownerName.trim()
    );

    if (isAlreadyBlocked) {
      return alert("ይህ ተገልጋይ (በዚህ ስም፣ ባለቤት እና ቤት ቁጥር) አስቀድሞ በእግድ ዝርዝር ውስጥ ይገኛል!");
    }

    try {
      setLoading(true);
      // ለአማርኛ እና ፋይል ድጋፍ FormData መጠቀም
      const formData = new FormData();
      formData.append("fullName", fullName.trim());
      formData.append("ownerName", ownerName.trim());
      formData.append("houseNo", houseNo.trim());
      formData.append("zone", blockForm.zone.trim());
      formData.append("reason", reason.trim());
      if (fileObject) formData.append("fileObject", fileObject);

      await blockUser(formData);
      finalizeBlock();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "ተጠቃሚውን ማገድ አልተቻለም።";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const finalizeBlock = () => {
    setBlockForm({ fullName: "", ownerName: "", houseNo: "", zone: "", reason: "", fileObject: null });
    alert("ተጠቃሚው በእግድ መዝገብ ላይ ሰፍሯል!");
  };

  const getActiveData = () => {
    const query = searchQuery.toLowerCase().trim();
    if (activeTab === "blacklist") {
      return formattedBlockedUsers.filter((u) => (u.fullName || "").toLowerCase().includes(query));
    }
    const statusMap = { new: "አልታየም", progress: "በሂደት ላይ", unresolved: "ያልተፈታ", resolved: "ተፈቷል" };
    return list
      .filter((c) => c.status === statusMap[activeTab])
      .filter((item) => (item.fullName || "").toLowerCase().includes(query));
  };

  const handleClearAll = async () => {
    if (window.confirm("ማስጠንቀቂያ! ሁሉንም የቅሬታ እና የእግድ ዳታዎች ማጥፋት ይፈልጋሉ?")) {
      try {
        setLoading(true);
        await clearAllData();
        alert("ዳታው በሙሉ ተደምስሷል!");
      } catch (error) {
        alert("ዳታውን ማጽዳት አልተቻለም!");
      } finally {
        setLoading(false);
      }
    }
  };

  const confirmDeleteComplaint = async (id) => {
    if (window.confirm("ይህንን ቅሬታ ለዘላለም ለማጥፋት እርግጠኛ ነዎት?")) {
      try {
        await deleteComplaint(id);
      } catch (error) {
        alert("ቅሬታውን መሰረዝ አልተቻለም!");
      }
    }
  };

  const downloadFile = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("ፋይሉን ማውረድ አልተቻለም።");
    }
  };

  return (
    <div className="manager-main-wrapper">
      <div className="manager-header-section">
        <h2 className="manager-header-title">የማኔጀር \ የኃላፊ ገፅ</h2>
        <button onClick={handleClearAll} className="clear-all-danger-btn" style={{ display: "none" }}>ዳታ አጽዳ</button>
      </div>

      <div className="manager-tabs-nav">
        {[
          { id: "new", label: "🆕 አዲስ", count: counts.new, type: "blue" },
          { id: "progress", label: "⏳ በሂደት", count: counts.progress, type: "orange" },
          { id: "unresolved", label: "❌ ሳይፈታ", count: counts.unresolved, type: "red" },
          { id: "resolved", label: "✅ የተፈታ", count: counts.resolved, type: "green" },
          { id: "blacklist", label: "🚫 እግድ", count: counts.blacklist, type: "dark" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setExpandedId(null);
              setSearchQuery("");
              setIsEditing({});
            }}
            className={`tab-navigation-btn ${activeTab === tab.id ? `active-tab-${tab.type}` : ""}`}
          >
            <span className="tab-btn-text">{tab.label}</span>
            <span className="tab-count-badge">{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="search-container-box">
        <input
          type="text"
          placeholder={`${activeTab === "blacklist" ? "የታገዱ ሰዎችን" : "ቅሬታዎችን"} በስም ይፈልጉ...`}
          className="manager-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {activeTab === "blacklist" ? (
        <div className="blacklist-container">
          <div className="block-registration-form">
            <h3 className="block-form-header">🚫 አዲስ እግድ መመዝገቢያ</h3>
            <form onSubmit={handleBlockSubmit} className="block-form-grid">
              <input
                placeholder="ተገልጋይ ስም"
                className="block-input-field"
                value={blockForm.fullName}
                onChange={(e) => setBlockForm({ ...blockForm, fullName: e.target.value })}
              />
              <input
                placeholder="ባለቤት"
                className="block-input-field"
                value={blockForm.ownerName}
                onChange={(e) => setBlockForm({ ...blockForm, ownerName: e.target.value })}
              />
              <input
                placeholder="ቤት ቁጥር"
                className="block-input-field"
                value={blockForm.houseNo}
                onChange={(e) => setBlockForm({ ...blockForm, houseNo: e.target.value })}
              />
              <input
                placeholder="ቀጠና"
                className="block-input-field"
                value={blockForm.zone}
                onChange={(e) => setBlockForm({ ...blockForm, zone: e.target.value })}
              />
              <input
                placeholder="የእግድ ምክንያት"
                className="block-input-field input-span-full"
                value={blockForm.reason}
                onChange={(e) => setBlockForm({ ...blockForm, reason: e.target.value })}
              />
              <div className="block-file-upload-group">
                <label className="block-file-label">ማገጃ ደብዳቤ (ካለ)</label>
                <input
                  type="file"
                  className="block-file-input"
                  onChange={(e) => setBlockForm({ ...blockForm, fileObject: e.target.files[0] })}
                />
              </div>
              <button type="submit" className="submit-block-btn" disabled={loading}>
                {loading ? "በመመዝገብ ላይ..." : "አግድ"}
              </button>
            </form>
          </div>

          <div className="blacklist-table-container">
            <table className="blacklist-data-table">
              <thead>
                <tr className="table-header-row">
                  <th className="table-th">የተገልጋይ ስም</th>
                  <th className="table-th">የፋይል ባለቤት</th>
                  <th className="table-th">ቤት ቁጥር</th>
                  <th className="table-th">ቀጠና</th>
                  <th className="table-th">ምክንያት</th>
                  <th className="table-th">ደብዳቤ</th>
                  <th className="table-th">ድርጊት</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {getActiveData().length > 0 ? getActiveData().map((u) => (
                  <tr key={u.id} className="table-body-row">
                    <td className="table-td"><b>{u.fullName}</b></td>
                    <td className="table-td"><b>{u.ownerName}</b></td>
                    <td className="table-td">{u.houseNo}</td>
                    <td className="table-td">{u.zone}</td>
                    <td className="table-td"><span className="reason-status-tag">{u.reason}</span></td>
                    <td className="table-td">
                      {u.blockLetter ? (
                        <a href={u.blockLetter} target="_blank" rel="noreferrer" className="view-doc-link">ክፈት</a>
                      ) : "የለም"}
                    </td>
                    <td className="table-td">
                      <button onClick={() => unblockUser(u.id)} className="unblock-action-btn" disabled={loading}>አንሳ</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>ምንም መረጃ አልተገኘም</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="complaints-list-grid">
          {getActiveData().map((c) => (
            <div key={c.id} className={`complaint-data-card status-border-${c.status.replace(/\s+/g, "")}`}>
              <div className="complaint-card-header">
                <div className="card-info-group">
                  <h4 className="complaint-card-subject">ስም - {c.fullName}</h4>
                  <span className="complaint-card-date">📅 {c.date}</span>
                </div>
                <div className="card-header-buttons">
                  <button onClick={() => confirmDeleteComplaint(c.id)} className="card-delete-btn">🗑️ አጥፋ</button>
                  <button onClick={() => setExpandedId(expandedId === c.id ? null : c.id)} className="card-toggle-expand-btn">
                    {expandedId === c.id ? "ደብቅ ▲" : "እይ ▼"}
                  </button>
                </div>
              </div>

              {expandedId === c.id && (
                <div className="complaint-expanded-details">
                  <p className="detail-contact-row">
                    <b>📞 ስልክ:</b> {c.phone} | <b>📍 አድራሻ:</b> {c.subCity}, ወረዳ {c.woreda}
                  </p>
                  <div className="detail-description-text">
                    <b>የጉዳዩ ርዕስ:</b> {c.complaintType !== "ሌላ" ? `${c.complaintType}${c.subject ? ` - ${c.subject}` : ""}` : (c.subject || "ርዕስ አልተጠቀሰም")}
                  </div>
                  <div className="detail-description-text">
                    <b>የቅሬታ ዝርዝር:</b> {c.description}
                  </div>

                  <div className="detail-media-container">
                    {c.audio && (
                      <div className="media-preview-box">
                        <div className="download-wrapper">
                          <span className="media-type-label">🎙️ Audio:</span>
                          <button onClick={() => downloadFile(c.audio, `audio_${c.id}.mp3`)} className="modern-download-btn">📥 አውርድ</button>
                        </div>
                        <audio controls src={c.audio} className="audio-player-element" />
                      </div>
                    )}
                    {c.video && (
                      <div className="media-preview-box">
                        <div className="download-wrapper">
                          <span className="media-type-label">📹 Video:</span>
                          <button onClick={() => downloadFile(c.video, `video_${c.id}.mp4`)} className="modern-download-btn">📥 አውርድ</button>
                        </div>
                        <video controls src={c.video} className="video-player-element" />
                      </div>
                    )}
                    {c.files && (
                      <div className="media-preview-box">
                        <div className="download-wrapper">
                          <span className="media-type-label">🖼️ Document:</span>
                          <button onClick={() => downloadFile(c.files, `file_${c.id}.jpg`)} className="modern-download-btn">📥 አውርድ</button>
                        </div>
                        <img src={c.files} alt="Doc" className="image-preview-element" onClick={() => window.open(c.files, "_blank")} />
                      </div>
                    )}
                  </div>

                  {activeTab !== "new" && !isEditing[c.id] && (
                    <div className="resolution-note-display">
                      <div className="note-display-header">
                        <span className="note-header-title">📜 ሃላፊው የጻፉት ማስታወሻ</span>
                        <button onClick={() => handleEditNote(c.id, c.resolutionNote)} className="note-edit-trigger-btn">🖊 Edit</button>
                      </div>
                      <p className="note-content-body">{c.resolutionNote || "ማስታወሻ የለም"}</p>
                    </div>
                  )}

                  {(activeTab === "new" || isEditing[c.id]) && (
                    <div className="note-editor-wrapper">
                      <label className="note-input-label">{isEditing[c.id] ? "ማስታወሻ ያርሙ" : "ውሳኔ ያስገቡ"}</label>
                      <textarea
                        className="note-entry-textarea"
                        value={resolutionNote[c.id] !== undefined ? resolutionNote[c.id] : c.resolutionNote || ""}
                        onChange={(e) => setResolutionNote({ ...resolutionNote, [c.id]: e.target.value })}
                        placeholder="ውሳኔዎን እዚህ ይጻፉ..."
                      />
                      {isEditing[c.id] && (
                        <div className="note-edit-actions-row">
                          <button onClick={() => handleUpdateNoteOnly(c.id)} className="note-save-btn" disabled={loading}>አዘምን</button>
                          <button onClick={() => handleCancelEdit(c.id)} className="note-cancel-btn">ተመለስ</button>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="complaint-status-actions-bar">
                    {(activeTab === "new" || activeTab === "unresolved") && (
                      <button onClick={() => handleStatusUpdate(c.id, "በሂደት ላይ")} className="action-btn-progress" disabled={loading}>በሂደት ያዝ</button>
                    )}
                    {(activeTab === "new" || activeTab === "progress") && (
                      <button onClick={() => handleStatusUpdate(c.id, "ያልተፈታ")} className="action-btn-unresolved" disabled={loading}>ሳይፈታ ዝጋ</button>
                    )}
                    <button onClick={() => handleStatusUpdate(c.id, "ተፈቷል")} className="action-btn-resolved" disabled={loading}>ተፈቷል</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {getActiveData().length === 0 && <p style={{ textAlign: "center", gridColumn: "1/-1", padding: "50px" }}>ምንም ቅሬታ የለም።</p>}
        </div>
      )}
    </div>
  );
}
