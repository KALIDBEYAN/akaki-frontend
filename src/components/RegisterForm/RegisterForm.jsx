import React, { useState, useEffect } from "react";
import API from "../../api/axiosConfig";
import "./RegisterForm.css";

export default function RegisterForm({ setPage, editingFile, setEditingFile, addFile, blockedUsers, isLoading }) {

  const emptyForm = { 
    applicantName: "", 
    ownerName: "", 
    houseNo: "", 
    queue: "", 
    zone: "", 
    otherZone: "", 
    selectedServices: [], 
    otherService: "" 
  };

  const [form, setForm] = useState(emptyForm);
  const [showModal, setShowModal] = useState(false);
  const [showOtherZone, setShowOtherZone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState({ text: "", type: "" });

  const serviceOptions = [
    "መታወቂያ", "ያላገባ", "መሸኛ", "ልደት", "ጋብቻ", "ፍቺ", "ሞት", "ማረጋገጫ", "ሌላ"
  ];

  useEffect(() => {
    if (editingFile) {
      const services = editingFile.services?.map(s => s.serviceName) || [];
      const hasOther = services.some(s => !serviceOptions.includes(s) && s !== "ሌላ");

      setForm({
        applicantName: editingFile.applicantName || "",
        ownerName: editingFile.ownerName || "",
        houseNo: editingFile.houseNo || "",
        queue: editingFile.queue || "",
        zone: editingFile.zone || "",
        selectedServices: services.map(s => serviceOptions.includes(s) ? s : "ሌላ"),
        otherService: hasOther ? services.find(s => !serviceOptions.includes(s)) : "",
        otherZone: ""
      });

      const mainZones = ["9/1", "9/2", "8/1"];
      if (editingFile.zone && !mainZones.includes(editingFile.zone)) {
        setShowOtherZone(true);
        setForm(prev => ({ ...prev, zone: "ሌላ", otherZone: editingFile.zone }));
      }
    } else {
      setForm(emptyForm);
      setShowOtherZone(false);
    }
  }, [editingFile]);

  const normalizeToFather = (name) => {
    if (!name) return "";
    return name.trim().split(/\s+/).slice(0, 2).join(" ").toLowerCase();
  };

  const handleServiceChange = (service) => {
    setForm(prev => {
      const current = prev.selectedServices;
      if (current.includes(service)) {
        return { ...prev, selectedServices: current.filter(s => s !== service) };
      } else {
        return { ...prev, selectedServices: [...current, service] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.selectedServices.length === 0) {
      alert("እባክዎ ቢያንስ አንድ አገልግሎት ይምረጡ!");
      return;
    }

    let finalServices = [...form.selectedServices];
    if (finalServices.includes("ሌላ")) {
      finalServices = finalServices.filter(s => s !== "ሌላ");
      if (form.otherService.trim()) {
        finalServices.push(form.otherService.trim());
      } else {
        alert("እባክዎ የሌላ አገልግሎት ስም ይጥቀሱ!");
        return;
      }
    }
      
    const userData = JSON.parse(localStorage.getItem("user"));
    const finalZone = showOtherZone ? form.otherZone : form.zone;

    const fileData = {
      applicantName: form.applicantName.trim(),
      ownerName: form.ownerName.trim(),
      houseNo: form.houseNo.trim(),
      queue: form.queue,
      zone: finalZone,
      services: finalServices,
      createdBy: userData?._id || null, 
      status: "pending",
      adminComment: ""
    };

    const nameRegex = /^[^\s]+\s+[^\s]+.*/;
    if (!nameRegex.test(fileData.applicantName) || !nameRegex.test(fileData.ownerName)) {
      alert("እባክዎ የተሟላ ስም (ቢያንስ የአባት ስም ጨምረው) ያስገቡ!");
      return;
    }

    const isBlocked = blockedUsers?.some(b => {
      const normApp = normalizeToFather(form.applicantName);
      const normOwner = normalizeToFather(form.ownerName);
      const normBlockedFull = normalizeToFather(b.fullName);
      const normBlockedOwner = normalizeToFather(b.ownerName);
      const normHouse = form.houseNo.toLowerCase().replace(/\s/g, '');
      const normBlockedHouse = b.houseNo?.toLowerCase().replace(/\s/g, '');

      return (normApp === normBlockedFull || normOwner === normBlockedOwner) && 
             normHouse === normBlockedHouse;
    });

    if (isBlocked) {
      alert("⛔ ማስጠንቀቂያ፡ እዚህ የቤት ቁጥር ላይ የታገዱ በመሆኖት አገልግሎት ማግኘት አይችሉም! እባኮዎን የጽ/ቤት ሃላፊዉን ያነጋግሩ");
      return;
    }

    setServerMessage({ text: "", type: "" });
    setIsSubmitting(true);
    
    try {
      if (editingFile) {
        const response = await API.put(`/files/update-file/${editingFile._id}`, fileData);
        if (response.data.success) {
          setServerMessage({ text: "መረጃው በትክክል ተስተካክሏል! ፋይሎ እስኪወጣሎት እባኮትን በትዕግስት ይጠባበቁ", type: "success" });
          setShowModal(true);
          setTimeout(() => {
            setShowModal(false);
            setEditingFile(null); 
            setForm(emptyForm);
            setPage("status"); 
          }, 5000);
        }
      } else {
        await API.post(`/files`, fileData);
        setServerMessage({ text: "በተሳካ ሁኔታ ተመዝግበዋል! ፋይሎ እስኪወጣሎት እባኮትን በትዕግስት ይጠባበቁ", type: "success" });
        setShowModal(true);
        setForm(emptyForm);
        setTimeout(() => {
            setShowModal(false);
            setPage("status");
          }, 5000);
      }
    } catch (error) {
      console.error(error);
      alert("የሰርቨር ግንኙነት ተቋርጧል!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setForm(emptyForm);
    if (editingFile) {
      setEditingFile(null);
      setPage("status");
    } else {
      setPage("status");
    }
  };

  return (
    <div className="form-register">
      <div className="reg-header" >
        <h2>{editingFile ? "መረጃ ማስተካከያ" : "ፋይል መጠየቂያ ፎርም"}</h2>
        <p>{isSubmitting ? "መረጃው ለሰርቨር እየተላከ ነው..." : "እባክዎ መረጃውን በጥንቃቄ ይሙሉ"}</p>
        <div className="wave-shape"></div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="success-icon">✓</div>
            <h3>{editingFile ? "በተሳካ ሁኔታ ተስተካክሏል!" : "በተሳካ ሁኔታ ተመዝግበዋል!"}</h3>
            <p>{serverMessage.text}</p>
            <div className="loading-bar"></div>
            <button onClick={closeModal} className="modal-close-btn">እሺ</button>
          </div>
        </div>
      )}

      <form 
        onSubmit={handleSubmit} 
        className={isSubmitting ? "form-submitting" : "form-active"}
      >
        <fieldset className="reg-fieldset">
          <legend>👤 የግል መረጃ</legend>
          <div className="reg-2col">
            <div className="reg-group">
              <label>የተገልጋይ ሙሉ ስም</label>
              <input className="reg-input" type="text"
                placeholder="ሙሉ ስም እዚህ ጋር ይፃፉ..."
                value={form.applicantName}
                onChange={e => setForm({...form, applicantName: e.target.value})}
                required 
                autoComplete="off" />
            </div>

            <div className="reg-group">
              <label>የፋይል ባለቤት ሙሉ ስም</label>
              <input className="reg-input" type="text"
                placeholder="የፋይል ባለቤት ስም እዚህ ጋር ይፃፉ..."
                value={form.ownerName}
                onChange={e => setForm({...form, ownerName: e.target.value})}
                required 
                autoComplete="off" />
            </div>
          </div>
        </fieldset>

        <fieldset className="reg-fieldset">
          <legend>🏠 የቤት እና የአገልግሎት መረጃ</legend>
          <div className="reg-2col">
            <div className="reg-group">
              <label>ቤት-ቁጥር</label>
              <input className="reg-input" type="text"
                placeholder="የቤት ቁጥር"
                value={form.houseNo}
                onChange={e => setForm({...form, houseNo: e.target.value})}
                required />
            </div>

            <div className="reg-group">
              <label>ወረፋ ቁጥር</label>
              <input className="reg-good" type="number"
                placeholder="00"
                value={form.queue}
                onChange={e => setForm({...form, queue: e.target.value})}
                required />
            </div>
          </div>

          <div className="reg-group">
            <label>ፋይሉ የሚገኝበት ሰፈር (ቀጠና)</label>
            <select className="reg-good"
              value={form.zone}
              onChange={e => {
                const val = e.target.value;
                setForm({...form, zone: val});
                setShowOtherZone(val === "ሌላ");
              }}
              required>
              <option value="">ይምረጡ</option>
              <option value="ስርጢ/1">ስርጢ/1</option>
              <option value="ስርጢ/2">ስርጢ/2</option>
              <option value="ደራርቱ">ደራርቱ</option>
              <option value="መከላከያ(መኮድ)">መከላከያ(መኮድ)</option>
              <option value="9/1">9/1</option>
              <option value="9/2">9/2</option>
              <option value="8/1">8/1</option>
              <option value="ሌላ">ሌላ...</option>
            </select>
          </div>

          <div className="reg-group">
            <label>የሚፈልጓቸው አገልግሎቶች (ከአንድ በላይ መምረጥ ይቻላል)</label>
            <div className="services-container">
              {serviceOptions.map(option => (
                <label key={option} className="service-option-label">
                  <input 
                    type="checkbox" 
                    className="service-checkbox"
                    checked={form.selectedServices.includes(option)}
                    onChange={() => handleServiceChange(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {form.selectedServices.includes("ሌላ") && (
            <div className="reg-group animate-fade">
              <label>የአገልግሎቱን ስም ይጥቀሱ</label>
              <input className="reg-input" type="text"
                placeholder="የአገልግሎቱን ስም እዚህ ጋር ይፃፉ..."
                value={form.otherService}
                onChange={e => setForm({...form, otherService: e.target.value})}
                required />
            </div>
          )}

          {showOtherZone && (
            <div className="reg-group animate-fade">
              <label>የሰፈሩን ስም ይጥቀሱ</label>
              <input className="reg-input" type="text"
                placeholder="የሰፈሩን ስም እዚህ ጋር ይፃፉ"
                value={form.otherZone}
                onChange={e => setForm({...form, otherZone: e.target.value})}
                required />
            </div>
          )}
        </fieldset>

        <button type="submit" className="reg-submit-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="btn-content">
              <div className="spinner"></div> በመመዝገብ ላይ...
            </span>
          ) : (editingFile ? "አዘምን" : "አሁን መዝግብ")}
        </button>
      </form>
    </div>
  );
}