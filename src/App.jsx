import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import AutoLogout from "./components/AutoLogout";
import Navbar from "./components/Navbar/Navbar";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import StatusViewer from "./components/StatusViewer/StatusViewer";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import ExpertPanel from "./components/ExpertPanel/ExpertPanel";
import ComplaintForm from "./components/ComplaintForm/ComplaintForm";
import ManagerPanel from "./components/ManagerPanel/ManagerPanel";
import ServicePage from "./components/ServicePage/ServicePage";
import LogIn from "./components/LogIn/LogIn";
import ITPanel from "./components/ITPanel/ITPanel";

import API from "./api/axiosConfig";

// --- የደህንነት መጠበቂያ (Protected Route) ---
function ProtectedRoute({ children, allowedRoles, user }) {
  if (!user) return <Navigate to="/login" replace />;
  // IT ሮል ያላቸው ተጠቃሚዎች ሁሉንም ማየት ይችላሉ
  if (user.role === "it") return children;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function AppContent() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [files, setFiles] = useState([]);
  const [editingFile, setEditingFile] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFetching = useRef(false);

  // --- ዳታ ማምጫ (Fetch Data) ሎጂክ ---
  const fetchData = useCallback(
    async (showLoading = false) => {
      if (document.visibilityState !== "visible" && !showLoading) return;
      if (isFetching.current) return;

      if (showLoading) setIsLoading(true);
      isFetching.current = true;

      try {
        const token = localStorage.getItem("token");
        const endpoint = user || token ? "/files" : "/files/public";

        const fileRes = await API.get(endpoint);
        const fileData = fileRes.data?.data || fileRes.data?.files || fileRes.data || [];
        setFiles(Array.isArray(fileData) ? fileData : []);

        if (user || token) {
          // የታገዱ ሰዎችን ዝርዝር ማምጣት
          try {
            const blockedRes = await API.get("/manager/blocked-users");
            setBlockedUsers(blockedRes.data?.data || blockedRes.data || []);
          } catch (err) {
            console.warn("Blocked users fetch failed");
          }

          // ለManager እና ለIT ቅሬታዎችን ማምጣት
          if (user?.role === "manager" || user?.role === "it") {
            try {
              const complaintRes = await API.get("/complaints/all");
              setComplaints(complaintRes.data?.complaints || complaintRes.data || []);
            } catch (err) {
              console.warn("Complaints fetch failed");
            }
          }
        }
      } catch (err) {
        console.error("Critical Data fetch error:", err);
        if (err.response?.status === 401) {
          const publicRes = await API.get("/files/public");
          setFiles(publicRes.data?.data || []);
        }
      } finally {
        setIsLoading(false);
        isFetching.current = false;
      }
    },
    [user]
  );

  // --- Polling Effect (በየ 10 ሴኮንዱ ዳታውን ማደስ) ---
  useEffect(() => {
    fetchData(true);

    const intervalId = setInterval(() => {
      fetchData(false);
    }, 10000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") fetchData(false);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchData, user]);

  // --- Auth Handlers ---
  const handleLoginSuccess = (u) => {
    const formattedUser = { ...u, id: u._id || u.id };
    setUser(formattedUser);
    localStorage.setItem("user", JSON.stringify(formattedUser));

    if (formattedUser.role === "manager") navigate("/manager");
    else if (formattedUser.role === "it") navigate("/it");
    else if (formattedUser.role === "expert") navigate("/expert");
    else if (formattedUser.role === "admin") navigate("/admin");
    else navigate("/status");
  };

  const handleLogout = useCallback(async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setUser(null);
  navigate("/login", { replace: true });
  try {
    await API.post("/auth/logout");
  } catch (err) {
    console.error("Logout error on server:", err);
  }
}, [navigate]);

  // --- የፋይል ተግባራት (File Actions) ---
  const handleAddFile = async (data) => {
    try {
      if (editingFile) {
        await API.put(`/files/update-file/${editingFile._id}`, data);
        alert("✅ መረጃው ታድሷል!");
        setEditingFile(null);
      } else {
        await API.post("/files", data);
        alert("✅ ፋይሉ ተመዝግቧል!");
      }
      fetchData(false);
      navigate("/status");
    } catch (err) {
      alert("❌ ስህተት አጋጥሟል: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteFile = async (id) => {
    if (!window.confirm("እርግጠኛ ነዎት? ይህ ፋይል ለዘላለም ይጥፋ?")) return;
    try {
      setIsLoading(true);
      await API.delete(`/files/${id}`);
      alert("✅ ፋይሉ ሙሉ ለሙሉ ተሰርዟል!");
      fetchData(false);
    } catch (err) {
      alert("❌ ማጥፋት አልተቻለም");
    } finally {
      setIsLoading(false);
    }
  };

  // --- በሰርቪስ ደረጃ ማረጋገጫ (Verify Service) ---
  const verifyService = async (fileId, serviceId, serviceName) => {
    const name = serviceName || "አገልግሎቱን";
    if (!window.confirm(`የ${name} አገልግሎት ተጠናቆ ፋይሉ በትክክል መመለሱን እርግጠኛ ነዎት?`)) return;

    try {
      setIsLoading(true);
      await API.patch(`/files/verify/${fileId}/${serviceId}`);
      alert(`✅ የ${name} አገልግሎት ተጠናቆ ፋይሉን መመለሱን አረጋግጠዋል!`);
      await fetchData(false);
    } catch (err) {
      alert("❌ ማረጋገጥ አልተቻለም፦ " + (err.response?.data?.message || "ስህተት"));
    } finally {
      setIsLoading(false);
    }
  };

  // --- በሰርቪስ ደረጃ መመለሻ (Reject Service) ---
  const rejectService = async (fileId, serviceId, reason) => {
    try {
      await API.patch(`/files/reject/${fileId}/${serviceId}`, { adminComment: reason });
      alert("✅ ፋይሉ ተመልሷል!");
      await fetchData(false);
      return true;
    } catch (err) {
      alert("❌ መመለስ አልተቻለም! " + (err.response?.data?.message || ""));
      throw err;
    }
  };

  const updateFileStatus = async (id, updateData) => {
    try {
      const response = await API.put(`/files/update-file/${id}`, updateData);
      if (response.status === 200) {
        await fetchData(false);
        return true;
      }
    } catch (error) {
      alert("ማዘመን አልተቻለም።");
      return false;
    }
  };

  const handleEdit = (file) => {
    setEditingFile(file);
    navigate("/", { state: { mode: "edit" } });
  };

  return (
    <div className="app-container">
      <Navbar user={user} setUser={setUser} logout={handleLogout} setEditingFile={setEditingFile} />

      {user && <AutoLogout logoutAction={handleLogout} timeoutInMinutes={15} />}

      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>መረጃ በመጫን ላይ ነው...</p>
        </div>
      )}

      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <RegisterForm
                addFile={handleAddFile}
                editingFile={editingFile}
                setEditingFile={setEditingFile}
                blockedUsers={blockedUsers}
                setPage={(p) => navigate(p === "status" ? "/status" : "/")}
              />
            }
          />

          <Route path="/service" element={<ServicePage />} />

          <Route
            path="/status"
            element={
              <StatusViewer
                files={files}
                onEdit={handleEdit}
                userRole={user?.role || "guest"}
                deleteFile={handleDeleteFile}
              />
            }
          />

          <Route path="/complaint" element={<ComplaintForm />} />

          <Route
            path="/login"
            element={!user ? <LogIn setUser={handleLoginSuccess} /> : <Navigate to="/" replace />}
          />

          <Route
            path="/expert"
            element={
              <ProtectedRoute allowedRoles={["expert", "manager", "admin", "it"]} user={user}>
                <ExpertPanel
                  files={files}
                  user={user}
                  readOnly={user?.role === "admin"}
                  updateFile={updateFileStatus}
                  blockedUsers={blockedUsers}
                  fetchData={fetchData}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager", "it", "expert"]} user={user}>
                <AdminPanel
                  files={files}
                  user={user}
                  updateFile={updateFileStatus}
                  verifyService={verifyService}
                  rejectService={rejectService}
                  blockedUsers={blockedUsers}
                  readOnly={user?.role === "expert"}
                  fetchData={fetchData}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager"
            element={
              <ProtectedRoute allowedRoles={["manager", "it"]} user={user}>
                <ManagerPanel
                  complaints={complaints}
                  files={files}
                  blockedUsers={blockedUsers}
                  deleteComplaint={async (id) => {
                    try {
                      await API.delete(`/complaints/delete/${id}`);
                      alert("✅ ቅሬታው በተሳካ ሁኔታ ተሰርዟል!");
                      fetchData(false);
                    } catch (err) {
                      alert("❌ ቅሬታውን ማጥፋት አልተቻለም!");
                    }
                  }}
                  updateComplaintStatus={async (id, s, n) => {
                    await API.put(`/complaints/status/${id}`, { status: s, managerNote: n });
                    fetchData(false);
                  }}
                  // blockUser አጠቃቀም ተስተካክሏል (ManagerPanel አስቀድሞ FormData ይልካል)
                  blockUser={async (formData) => {
                    await API.post("/manager/block-user", formData);
                    fetchData(false);
                  }}
                  unblockUser={async (id) => {
                    await API.delete(`/manager/delete-blocked/${id}`);
                    fetchData(false);
                  }}
                  clearAllData={async (type) => {
                    await API.delete(`/manager/clear-all?type=${type}`);
                    fetchData(false);
                  }}
                  deleteFile={handleDeleteFile}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/it"
            element={
              <ProtectedRoute allowedRoles={["it"]} user={user}>
                <ITPanel
                  user={user}
                  allFiles={files}
                  allComplaints={complaints}
                  deleteFile={handleDeleteFile}
                  fetchData={fetchData}
                />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}