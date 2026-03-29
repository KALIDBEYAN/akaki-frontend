import React, { useState, useRef, useEffect } from "react";

import API from "../../api/axiosConfig";
import "./ComplaintForm.css";

export default function ComplaintForm() {
 
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    subject: "",
    description: "",
    complaintType: "",
    files: null,
    audio: null,
    audioUrl: null,
    video: null,
  });

  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const timerRef = useRef(null);

  // --- 🔄 አዲስ የተጨመረ፡ በራሱ ፎርሙን የማጽዳት ሎጂክ (Auto-Reset) ---
  useEffect(() => {
    let autoResetTimer;
    if (submitted) {
      // ተጠቃሚው "እሺ" ባይነካ እንኳ ከ10 ሰከንድ በኋላ ፎርሙን ያጸዳዋል
      autoResetTimer = setTimeout(() => {
        handleReset();
      },5000); // 10 ሰከንድ (እንደ ፍላጎትህ መቀየር ትችላለህ)
    }
    return () => clearTimeout(autoResetTimer); 
  }, [submitted]);

  // --- ፎርሙን ዳግም ማስጀመሪያ (Reset) ---
  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      subject: "",
      description: "",
      complaintType: "",
      files: null,
      audio: null,
      audioUrl: null,
      video: null,
    });
    setSubmitted(false);
  };

  // --- ድምፅ መቅጃ ሎጂክ ---
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      chunks.current = [];

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setFormData((prev) => ({ 
          ...prev, 
          audio: blob, 
          audioUrl: url 
        }));
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      timerRef.current = setInterval(() => setRecordingDuration((prev) => prev + 1), 1000);
    } catch (error) {
      alert("ማይክሮፎኑን መጠቀም አልተቻለም።");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      setRecordingDuration(0);
    }
  };

  const handleCheckbox = (type) => {
    // ተጠቃሚው የነካውን ብቻ በ state ውስጥ ያስቀምጣል (አንዱን ብቻ)
    setFormData({ ...formData, complaintType: type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameParts = formData.fullName.trim().split(/\s+/);
    if (nameParts.length < 2) {
      alert("እባክዎ ሙሉ ስምዎን (ስም እስከ የአባት ስም) ያስገቡ።");
      return;
    }

    setLoading(true);
    
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("phone", formData.phone);
    data.append("subject", formData.subject);
    data.append("description", formData.description);
    data.append("complaintType", JSON.stringify(formData.complaintType));

    if (formData.files) {
      data.append("attachments", formData.files);
    }
    
    if (formData.video) {
      data.append("attachments", formData.video);
    }
    
    if (formData.audio) {
     data.append("attachments", formData.audio, `voice_record_${Date.now()}.webm`);
    }

    try {
      const res = await API.post("/complaints/submit", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data.success) {
        setSubmitted(true);
        localStorage.setItem("lastTrackingId", res.data.trackingId);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "ስህተት ተፈጥሯል፣ እባክዎ በድጋሚ ይሞክሩ።";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="success-icon">✓</div>
          <h3>ቅሬታዎ ተልኳል!</h3>
          <p>መረጃዎን በጥንቃቄ ተመልክተን ምላሽ እንሰጣለን። <br />
            በገለጹት ስልክ ቁጥር (**{formData.phone}**) ደውለን ውሳኔውን እናሳውቆታለን።</p>
          <div className="loading-bar"></div>
          <button 
              onClick={handleReset} 
              className="modal-close-btn"
              style={{ background: "#013335" }}
            >እሺ</button>
        </div>
      </div>
    );
  }

  return (
    <div className="complaint-container">
      <div className="form-register">
        <div className="form-header-wrapper">
          <div className="header-glow"></div>
          <h2>የቅሬታ ማቅረቢያ ፎርም</h2>
          <p>ቅሬታዎን በዝርዝር እዚህ ያቅርቡ</p>
          <div className="wave-shape"></div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* የአመልካች መረጃ */}
          <fieldset className="reg-fieldset">
            <legend>👤 የአመልካች መረጃ</legend>
            <div className="reg-2col">
              <div className="reg-group">
                <label>ሙሉ ስም </label>
                <input
                  type="text"
                  className="reg-input"
                  placeholder="ሙሉ ስም እዚህ ጋር ይፃፉ..."
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
              <div className="reg-group">
                <label>ስልክ ቁጥር</label>
                <input
                  type="tel"
                  className="reg-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  placeholder="09... ወይም 07..."
                />
              </div>
            </div>
          </fieldset>

          {/* የቅሬታው ጉዳይ */}
          <fieldset className="reg-fieldset">
            <legend>📝 የቅሬታው ጉዳይ</legend>
            <label>የጉዳዩ ርዕስ {!formData.audioUrl && <span style={{color: "red"}}>*</span>}</label>
            <div className="checkbox-grid">
              {["መልካም አስተዳደር", "የአገልግሎት መዘግየት", "ፍትሃዊነት የጎደለው አሰራር", "ያልተገባ እንግልት","የመረጃ እጥረት","ሌላ"].map((type) => (
                <label key={type} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.complaintType === type}
                    onChange={() => handleCheckbox(type)}
                  />{" "}
                  {type}
                </label>
              ))}
            </div>
            {formData.complaintType === "ሌላ" && (
            <div className="reg-group" style={{ marginTop: "20px" }}>
              <label>የጉዳዩ ርዕስ {!formData.audioUrl && <span style={{color: "red"}}>*</span>}</label>
              <input
                type="text"
                className="reg-input"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required={!formData.audioUrl} 
              />
            </div>
            )}
            <div className="reg-group">
              <label>ዝርዝር መግለጫ {!formData.audioUrl && <span style={{color: "red"}}>*</span>}</label>
              <textarea
                className="reg-good"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required={!formData.audioUrl} 
              ></textarea>
            </div>

            {/* ድምፅ መቅጃ ክፍል */}
            <div className="voice-container">
              <p style={{ fontWeight: "700", color: "#013335" }}>
                🎤 እንደ አማራጭ በድምፅ ቀድተው መላክ ይችላሉ 
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
                {!isRecording ? (
                  <button type="button" onClick={startRecording} className="record-btn">መቅዳት ጀምር</button>
                ) : (
                  <button type="button" onClick={stopRecording} className="stop-btn">አቁም ({recordingDuration}ሰ)</button>
                )}
                
                {formData.audioUrl && (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#f0fdf4", padding: "5px 10px", borderRadius: "8px", border: "1px solid #bceabb" }}>
                    <audio src={formData.audioUrl} controls style={{ height: "30px" }} />
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, audio: null, audioUrl: null})}
                      style={{ background: "#ef4444", color: "white", border: "none", padding: "4px 8px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
                    >
                      ሰርዝ
                    </button>
                  </div>
                )}
              </div>
            </div>
          </fieldset>

          {/* ማስረጃዎች */}
          <fieldset className="reg-fieldset">
            <legend>📎 ማስረጃ (ፋይል እና ቪዲዮ)</legend>
            <div className="reg-2col">
              <div className="reg-group">
                <label>ሰነድ/ፎቶ መረጃ ካለ</label>
                <input
                  type="file"
                  className="reg-input"
                  onChange={(e) => setFormData({ ...formData, files: e.target.files[0] })}
                />
              </div>
              <div className="reg-group">
                <label>ቪዲዮ ማስረጃ ካለ</label>
                <input
                  type="file"
                  className="reg-input"
                  accept="video/*"
                  onChange={(e) => setFormData({ ...formData, video: e.target.files[0] })}
                />
              </div>
            </div>
          </fieldset>

          <button type="submit" className="reg-submit-btn" disabled={loading}>
            {loading ? (
              <><span className="spinner"></span> በመላክ ላይ...</>
            ) : (
              "ቅሬታውን ላክ"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
