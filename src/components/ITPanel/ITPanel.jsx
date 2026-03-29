import React, { useEffect, useState } from "react";
import API from "../../api/axiosConfig";
import "./ITPanel.css";

export default function ITPanel({
  allFiles = [],
  fetchData,
  deleteFile // ይህ አሁን deleteService የሚለውን ተግባር ይወክላል
}) {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const [editingUser, setEditingUser] = useState(null);
  const [resetPassUser, setResetPassUser] = useState(null);
  const [creatingUser, setCreatingUser] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    role: "expert"
  });

  const [newPassword, setNewPassword] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/auth/users");
      const userData = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setUsers(userData);
    } catch (err) {
      console.error("User fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  const expandedFiles = React.useMemo(() => {
  let list = [];
  allFiles.forEach(f => {
    
    if (f.services && f.services.length > 0) {
      f.services.forEach(s => {
        list.push({
          ...f,
          serviceId: s._id, // ይህ ID ለ deleteService በጣም ወሳኝ ነው
          serviceName: s.serviceName,
          serviceStatus: s.status,
          assignedExpert: s.expertName || "ያልተመደበ"
        });
      });
    }
  });
  return list;
}, [allFiles]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post("/auth/register", formData);
      setFormData({ fullName: "", username: "", password: "", role: "expert" });
      setCreatingUser(false);
      fetchUsers();
      alert("✅ አዲስ ተጠቃሚ ተመዝግቧል!");
    } catch (err) {
      alert("❌ ስህተት: " + (err.response?.data?.message || "መመዝገብ አልተቻለም"));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/auth/admin/update-user/${editingUser._id}`, formData);
      setEditingUser(null);
      setFormData({ fullName: "", username: "", password: "", role: "expert" });
      fetchUsers();
      alert("✅ መረጃው ተስተካክሏል!");
    } catch (err) {
      alert("❌ ማስተካከል አልተቻለም");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("⚠️ እርግጠኛ ነዎት? ተጠቃሚው ለዘላለም ይጠፋል!")) return;
    try {
      await API.delete(`/auth/users/${id}`);
      fetchUsers();
      alert("✅ ተጠቃሚው ተሰርዟል!");
    } catch (err) {
      alert("❌ መሰረዝ አልተቻለም");
    }
  };

  
const handleConfirmDeleteService = async (fileId, serviceId) => {
  // የጥንቃቄ ፍተሻ
  if (!serviceId) {
    alert("❌ ስህተት፡ የአገልግሎት መለያ (Service ID) አልተገኘም!");
    return;
  }

  if (!window.confirm("⚠️ እርግጠኛ ነዎት? ከዚህ ፋይል ላይ ይህ አገልግሎት ብቻ ነው የሚሰረዘው!")) return;

  try {
    
    await API.delete(`/files/delete-service/${fileId}/${serviceId}`); 
    
    if(fetchData) fetchData(true); // ዳታውን ለማደስ
    alert("✅ አገልግሎቱ ተሰርዟል!");
  } catch (err) {
    console.error("Delete error:", err);
    alert("❌ መሰረዝ አልተቻለም: " + (err.response?.data?.message || "የኔትወርክ ስህተት"));
  }
};

  const getActiveData = () => {
    const query = searchQuery.toLowerCase();
    if (activeTab === "users") {
      return users.filter(u => 
        (u.fullName || "").toLowerCase().includes(query) || 
        (u.username || "").toLowerCase().includes(query)
      );
    }
    if (activeTab === "files") {
      return expandedFiles.filter(f => 
        (f.applicantName || "").toLowerCase().includes(query) ||
        (f.serviceName || "").toLowerCase().includes(query)
      );
    }
    return [];
  };

  return (
    <div className="it-core-container">
      <div className="it-top-navigation">
        <h2 className="it-panel-brand">🛠 የአይቲ (IT) ቁጥጥር ፓናል</h2>
        <button 
          className="it-sync-button" 
          onClick={() => { fetchUsers(); fetchData && fetchData(true); }}
        >
          {loading ? "በመጫን ላይ..." : "🔄 ዳታ አድስ"}
        </button>
      </div>

      <div className="it-tab-switcher">
        <button 
          onClick={() => { setActiveTab("users"); setExpandedId(null); setSearchQuery(""); }}
          className={`it-tab-item ${activeTab === "users" ? "it-tab-active-dark" : ""}`}
        >
          <span className="it-tab-label">👥 ተጠቃሚዎች</span>
          <span className="it-tab-numeric">{users.length}</span>
        </button>
        <button 
          onClick={() => { setActiveTab("files"); setExpandedId(null); setSearchQuery(""); }}
          className={`it-tab-item ${activeTab === "files" ? "it-tab-active-blue" : ""}`}
        >
          <span className="it-tab-label">📂 አገልግሎቶች</span>
          <span className="it-tab-numeric">{expandedFiles.length}</span>
        </button>
      </div>

      <div className="it-action-toolbar">
        <input
          type="text"
          placeholder={activeTab === "users" ? "በስም ይፈልጉ..." : "በአመልካች ወይም በአገልግሎት ይፈልጉ..."}
          className="it-search-field"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {activeTab === "users" && (
          <button className="it-primary-btn" onClick={() => {
            setFormData({ fullName: "", username: "", password: "", role: "expert" });
            setCreatingUser(true);
          }}>+ አዲስ ተጠቃሚ</button>
        )}
      </div>

      <div className="it-table-surface">
        <table className="it-data-grid">
          <thead>
            <tr className="it-grid-header">
              {activeTab === "users" ? (
                <>
                  <th className="it-grid-th">ሙሉ ስም</th>
                  <th className="it-grid-th">መለያ (Username)</th>
                  <th className="it-grid-th">ድርሻ (Role)</th>
                  <th className="it-grid-th">ድርጊት</th>
                </>
              ) : (
                <>
                  <th className="it-grid-th">አመልካች/ባለቤት</th>
                  <th className="it-grid-th">ቤ.ቁ</th>
                  <th className="it-grid-th">አገልግሎት</th>
                  <th className="it-grid-th">ባለሙያ</th>
                  <th className="it-grid-th">ድርጊት</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="it-grid-body">
            {getActiveData().map((item, idx) => (
              <tr className="it-grid-row" key={item.serviceId || idx}>
                {activeTab === "users" ? (
                  <>
                    <td className="it-grid-td"><b>{item.fullName}</b></td>
                    <td className="it-grid-td">{item.username}</td>
                    <td className="it-grid-td">
                      <span className={`it-status-pill ${item.role}`}>{item.role}</span>
                    </td>
                    <td className="it-grid-td">
                      <div className="it-row-actions">
                        <button className="it-btn-outline" onClick={() => {
                             setEditingUser(item);
                             setFormData({ fullName: item.fullName, username: item.username, role: item.role });
                        }}>Edit</button>
                        <button className="it-btn-outline" onClick={() => setResetPassUser(item)}>Pass</button>
                        <button className="it-btn-danger" onClick={() => handleDeleteUser(item._id)}>X</button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="it-grid-td">
                        <div style={{fontSize: '0.9rem'}}><b>{item.applicantName}</b></div>
                        <div style={{fontSize: '0.8rem', color: '#666'}}>{item.ownerName}</div>
                    </td>
                    <td className="it-grid-td">{item.houseNo || "---"}</td>
                    <td className="it-grid-td">
                        <span className="service-tag-blue">{item.serviceName}</span>
                    </td>
                    <td className="it-grid-td">👤 {item.assignedExpert}</td>
                    <td className="it-grid-td">
                      <button 
                        className="it-btn-danger" 
                        style={{padding: '5px 10px', fontSize: '0.8rem'}}
                        onClick={() => handleConfirmDeleteService(item._id, item.serviceId)}
                      >
                        🗑️ አገልግሎቱን ሰርዝ
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals remain the same... */}
      {(creatingUser || editingUser) && (
        <div className="it-overlay">
          <div className="it-modal-body it-compact-form">
            <h3 className="it-modal-title">{creatingUser ? "🆕 አዲስ ተጠቃሚ መመዝገቢያ" : "✏️ መረጃ ማስተካከያ"}</h3>
            <form onSubmit={creatingUser ? handleCreateUser : handleUpdateUser}>
              <div className="it-form-row">
                <div className="it-input-group">
                  <label>ሙሉ ስም</label>
                  <input required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                </div>
                <div className="it-input-group">
                  <label>መለያ ስም (Username)</label>
                  <input required value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
                </div>
              </div>
              <div className="it-form-row">
                {creatingUser && (
                  <div className="it-input-group">
                    <label>የይለፍ ቃል</label>
                    <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                  </div>
                )}
                <div className="it-input-group">
                  <label>የስራ ድርሻ</label>
                  <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                    <option value="expert">Expert (ባለሙያ)</option>
                    <option value="manager">Manager (ኃላፊ)</option>
                    <option value="admin">Admin (አስተዳዳሪ)</option>
                    <option value="it">IT (ቴክኒሻን)</option>
                  </select>
                </div>
              </div>
              <div className="it-modal-actions">
                <button type="submit" className="it-btn-save">አስቀምጥ</button>
                <button type="button" className="it-btn-cancel" onClick={() => {
                  setCreatingUser(false); 
                  setEditingUser(null);
                  setFormData({ fullName: "", username: "", password: "", role: "expert" });
                }}>ተመለስ</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {resetPassUser && (
        <div className="it-overlay">
          <div className="it-modal-body">
            <h3 className="it-modal-title">🔑 የይለፍ ቃል ቀይር - {resetPassUser.fullName}</h3>
            <div className="it-input-group">
                <input 
                type="password" 
                placeholder="አዲስ የይለፍ ቃል ያስገቡ" 
                style={{width:'100%', padding:'12px', borderRadius:'12px', border:'1px solid #ccc'}}
                onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div className="it-modal-actions">
              <button className="it-btn-save" onClick={async () => {
                await API.put(`/auth/admin/update-user/${resetPassUser._id}`, { password: newPassword });
                setResetPassUser(null);
                setNewPassword("");
                alert("✅ ተቀይሯል!");
              }}>ቀይር</button>
              <button className="it-btn-cancel" onClick={() => setResetPassUser(null)}>ተመለስ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}