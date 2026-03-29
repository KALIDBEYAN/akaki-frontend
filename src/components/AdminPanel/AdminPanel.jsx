import React, { useState, useMemo, useEffect } from "react";
import XLSX from "xlsx-js-style";
import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, TextRun, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import API from "../../api/axiosConfig";
import "./admin.css";

export default function AdminPanel({ 
  files = [], 
  verifyService, 
  rejectService: onReject,
  blockedUsers = [], 
  readOnly, 
  fetchFilteredFiles, 
  isLoading, 
  user, 
  fetchData 
}) {
  // --- Standard States ---
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // --- Modal & Assignment States ---
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [activeFileId, setActiveFileId] = useState(null);
  const [activeServiceId, setActiveServiceId] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [assignData, setAssignData] = useState({
    senderName: "",
    expertName: "",
    fileCount: "",
  });

  // --- Sorting & Column Filter States ---
  const [sortConfig, setSortConfig] = useState({ key: "queue", direction: 'asc' });
  const [activeColumnFilters, setActiveColumnFilters] = useState({
    queue: [], createdAt: [], applicantName: [], ownerName: [], houseNo: [], service: []
  });
  const [openFilterMenu, setOpenFilterMenu] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/auth/users");
        const userData = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        setAllUsers(userData);
      } catch (err) { console.error("Users fetch error:", err); }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (isAssignModalOpen && user) {
      setAssignData(prev => ({ ...prev, senderName: user.fullName || "" }));
    }
  }, [isAssignModalOpen, user]);

  const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateFilter = (type, value) => {
    const end = new Date();
    let start = new Date();
    if (value === 'today') { setStartDate(formatLocalDate(end)); setEndDate(formatLocalDate(end)); }
    else if (value === 'week') { start.setDate(end.getDate() - 7); setStartDate(formatLocalDate(start)); setEndDate(formatLocalDate(end)); }
    else if (value === 'month') { start.setMonth(end.getMonth() - 1); setStartDate(formatLocalDate(start)); setEndDate(formatLocalDate(end)); }
  };

  const handleSetToday = () => {
    const today = formatLocalDate(new Date());
    setStartDate(today); setEndDate(today);
  };

  const handleApplyFilter = () => {
    if (!startDate || !endDate) { alert("እባክዎ መጀመሪያ ቀኖቹን ይምረጡ!"); return; }
    fetchFilteredFiles({ start: startDate, end: endDate, query: searchTerm, status: selectedFilter });
    setShowExportMenu(false);
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const toggleCheckboxFilter = (column, value) => {
    setActiveColumnFilters(prev => {
      const current = prev[column] || [];
      const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
      return { ...prev, [column]: updated };
    });
  };

  // --- ዳታውን በሰርቪስ ደረጃ ነጣጥሎ የማዘጋጀት ሎጂክ ---
  const { allExpandedServices, uniqueValues } = useMemo(() => {
    let expanded = [];
    const srvNames = new Set();
    
    files.forEach(f => {
      const services = f.services && f.services.length > 0 
        ? f.services 
        : [{ serviceName: f.service || "---", _id: null, status: f.status, expertName: f.expertName, senderName: f.senderName, fileCount: f.fileCount }];
      
      services.forEach(s => {
        expanded.push({
          ...f,
          displayService: s.serviceName,
          displayServiceId: s._id,
          displayStatus: s.status || f.status,
          displayExpert: s.expertName || f.expertName,
          displaySender: s.senderName || f.senderName,
          displayFileCount: s.fileCount || f.fileCount || "---"
        });
        if (s.serviceName) srvNames.add(s.serviceName);
      });
    });

    return { 
      allExpandedServices: expanded,
      uniqueValues: {
        queue: [...new Set(files.map(f => f.queue))].filter(Boolean).sort((a, b) => a - b),
        createdAt: [...new Set(files.map(f => f.createdAt?.split('T')[0]))].filter(Boolean).sort(),
        applicantName: [...new Set(files.map(f => f.applicantName))].filter(Boolean).sort(),
        ownerName: [...new Set(files.map(f => f.ownerName))].filter(Boolean).sort(),
        houseNo: [...new Set(files.map(f => f.houseNo))].filter(Boolean).sort(),
        service: [...srvNames].sort()
      }
    };
  }, [files]);

  const filteredFiles = useMemo(() => {
    let result = allExpandedServices.filter(f => {
      const matchesSearch = 
        (f.ownerName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (f.applicantName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (f.houseNo?.toString() || "").includes(searchTerm);

      let matchesStatus = true;
      if (selectedFilter === "requested") matchesStatus = f.displayStatus === "pending";
      else if (selectedFilter === "sentToExpert") matchesStatus = ["assigned", "received"].includes(f.displayStatus);
      else if (selectedFilter === "expertReturned") matchesStatus = f.displayStatus === "completed";
      else if (selectedFilter === "needsFix") matchesStatus = f.displayStatus === "rejected";

      let matchesDateRange = true;
      if (startDate && endDate) {
        const fDate = f.createdAt?.split('T')[0];
        matchesDateRange = fDate >= startDate && fDate <= endDate;
      }

      const fDateOnly = f.createdAt?.split('T')[0];
      const matchesCol = (col, val) => activeColumnFilters[col].length === 0 || activeColumnFilters[col].includes(val);

      return matchesSearch && matchesStatus && matchesDateRange && 
             matchesCol('queue', f.queue) && matchesCol('createdAt', fDateOnly) &&
             matchesCol('applicantName', f.applicantName) && matchesCol('ownerName', f.ownerName) &&
             matchesCol('houseNo', f.houseNo) && matchesCol('service', f.displayService);
    });

    const sortKey = sortConfig.key;
    const direction = sortConfig.direction;
    result.sort((a, b) => {
      let aVal = a[sortKey]; let bVal = b[sortKey];
      if (sortKey === 'queue') { aVal = parseInt(aVal) || 999999; bVal = parseInt(bVal) || 999999; }
      else { aVal = (aVal || "").toString().toLowerCase(); bVal = (bVal || "").toString().toLowerCase(); }
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    return result;
  }, [allExpandedServices, searchTerm, selectedFilter, startDate, endDate, sortConfig, activeColumnFilters]);

  const stats = [
    { label: "ጠቅላላ ፋይሎች", val: allExpandedServices.length, filter: "all" },
    { label: "የተጠየቁ", val: allExpandedServices.filter(s => s.displayStatus === "pending").length, filter: "requested" },
    { label: "የተላኩ", val: allExpandedServices.filter(s => ["assigned", "received"].includes(s.displayStatus)).length, filter: "sentToExpert" },
    { label: "የተመለሱ", val: allExpandedServices.filter(s => s.displayStatus === "completed").length, filter: "expertReturned" },
    { label: "ስህተት", val: allExpandedServices.filter(s => s.displayStatus === "rejected").length, filter: "needsFix" },
    { label: "የታገዱ", val: (blockedUsers || []).length, filter: "blacklist" }
  ];

  const prepareExportData = () => {
    const headers = ["ቀን", "የተገልጋይ ስም", "የፋይል ባለቤት ስም", "ቤ.ቁ","ቀጠና", "አገልግሎት", "ብዛት ላይ ብዛት ", "ፋይል ያስረከበው ባለሙያ", "ፋይል የተረከበው ባለሙያ", "ፋይል ተመላሽ የሆነ ", "ፋይል ተረጋግጧል"];
   
    const body = filteredFiles.map((f) => {
       const isReturnedByExpert = (f.displayStatus === "completed" || f.displayStatus === "verified") ? "✅" : "❌";
      const isVerifiedByAdmin = f.displayStatus === "verified" ? "✅" : "❌";
      return [
      f.createdAt?.split('T')[0] || "---",
      f.applicantName || "---",
      f.ownerName || "---",
      f.houseNo || "---",
      f.zone || "---",
      f.displayService || "---",
      f.displayFileCount || "---",
      f.displaySender || "---",
      f.displayExpert || "---",
      isReturnedByExpert,
        isVerifiedByAdmin
      ];
      });
    
    return { headers, body };
  };

  const exportToExcel = () => {
    if (!filteredFiles.length) return alert("ዳታ የለም!");
    const { headers, body } = prepareExportData();
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...body]);
    worksheet["!cols"] = headers.map(() => ({ wch: 20 }));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ሪፖርት");
    XLSX.writeFile(workbook, `Woreda08_Report_${new Date().toLocaleDateString()}.xlsx`);
    setShowExportMenu(false);
  };

  const exportToWord = async () => {
    if (!filteredFiles.length) return alert("ምንም ዳታ የለም!");
    const { headers, body } = prepareExportData();
    const table = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: headers.map(text => new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 20 })], alignment: AlignmentType.CENTER })],
            shading: { fill: "F2F2F2" }
          }))
        }),
        ...body.map(row => new TableRow({
          children: row.map(cell => new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: String(cell), size: 18 })], alignment: AlignmentType.CENTER })]
          }))
        }))
      ]
    });
    const doc = new Document({
      sections: [{
        properties: { page: { size: { orientation: "landscape" } } },
        children: [
          new Paragraph({ children: [new TextRun({ text: "የወረዳ 08 ፋይሎች ሪፖርት", bold: true, size: 28 })], alignment: AlignmentType.CENTER, spacing: { after: 300 } }),
          table
        ]
      }]
    });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `ሪፖርት_${new Date().toLocaleDateString()}.docx`);
    setShowExportMenu(false);
  };

  const handleAssignSubmit = async () => {
    const { senderName, expertName, fileCount } = assignData;
    if (!activeServiceId) return alert("የአገልግሎት መለያ አልተገኘም!");
    try {
      await API.patch(`/files/assign/${activeFileId}/${activeServiceId}`, { expertName, senderName, fileCount: Number(fileCount) });
      alert("✅ በስኬት ተመድቧል!");
      setIsAssignModalOpen(false); fetchData(); 
    } catch (err) { 
      alert("❌ መመደብ አልተቻለም!");
      console.error("❌ መመደብ አልተቻለም!", err);
     }
  };

  const handleRejectService = async (fileId, serviceId) => {
  const reason = window.prompt("አገልግሎቱ የተመለሰበትን ምክንያት ይግለጹ፦");
  if (!reason) return;

  try {
    
    await onReject(fileId, serviceId, reason);
    if (fetchData) fetchData(); 
  } catch (err) {
    console.error("Reject Error:", err);
  }
};

  const getStatusDisplay = (status, expert) => {
    if (status === "assigned") return `ወደ ${expert || "ባለሙያ"} ተልኳል`;
    if (status === "received") return `ባለሙያ ተረክቧል`;
    if (status === "completed") return `ባለሙያ መልሷል`;
    if (status === "rejected") return `አስተካክል (ተመላሽ)`;
    if (status === "verified") return `ተረጋግጧል`;
    return "በመጠባበቅ ላይ";
  };

  const getStatusClass = (status) => {
    const classes = { pending: "status-requested", assigned: "status-sent", received: "status-received", completed: "status-returned", rejected: "status-fix", verified: "status-verified" };
    return classes[status] || "";
  };

  const RenderFilterPopup = (column) => {
    if (openFilterMenu !== column) return null;
    return (
      <div className="excel-filter-popup" onClick={(e) => e.stopPropagation()}>
        <div className="filter-header">
          <button onClick={() => { requestSort(column); setOpenFilterMenu(null); }}>ደርድር (Sort)</button>
        </div>
        <div className="filter-options-list">
          <label><input type="checkbox" checked={activeColumnFilters[column].length === 0} onChange={() => setActiveColumnFilters(prev => ({ ...prev, [column]: [] }))} /> ሁሉንም</label>
          {uniqueValues[column].map(val => (
            <label key={val}><input type="checkbox" checked={activeColumnFilters[column].includes(val)} onChange={() => toggleCheckboxFilter(column, val)} /> {val}</label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`admin-container ${readOnly ? "read-only-mode" : ""}`} onClick={() => setOpenFilterMenu(null)}>
      {readOnly && <div className="readonly-banner">👀 ለማየት ብቻ (Read Only) ሁኔታ ላይ ነዎት።</div>}

      <div className="admin-stats no-print">
        {stats.map((s, i) => (
          <div key={i} className={`stat-card ${selectedFilter === s.filter ? 'active-filter' : ''}`} onClick={() => setSelectedFilter(s.filter)}>
            <small>{s.label}</small>
            <h2>{s.val}</h2>
          </div>
        ))}
      </div>

      <div className="file-table-container">
        <div className="search-container no-print">
          <div className="title-section">
            <h3>{stats.find(s => s.filter === selectedFilter)?.label || "ፋይሎች"}</h3>
            <span className="count-badge">({selectedFilter === "blacklist" ? (blockedUsers || []).length : filteredFiles.length})</span>
          </div>
          <div className="export-wrapper">
            <button className="export-toggle-btn" onClick={(e) => { e.stopPropagation(); setShowExportMenu(!showExportMenu); }}>📥 Export & Filter ▼</button>
            {showExportMenu && (
              <div className="export-dropdown modern-filter" onClick={(e) => e.stopPropagation()}>
                <div className="preset-row">
                  <button onClick={handleSetToday}>ዛሬ</button>
                  <button onClick={() => handleDateFilter('preset', 'week')}>ሳምንት</button>
                  <button onClick={() => handleDateFilter('preset', 'month')}>ወር</button>
                </div>
                <div className="filter-group">
                  <div className="date-inputs">
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  </div>
                  <button className="apply-btn" onClick={handleApplyFilter}>ዳታውን አምጣ</button>
                </div>
                <div className="export-actions">
                  <button onClick={exportToExcel}>Excel</button>
                  <button onClick={exportToWord}>Word</button>
                </div>
              </div>
            )}
          </div>
          <input type="text" placeholder="በስም ወይም በቤት ቁጥር ይፈልጉ..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        {isLoading ? (<div className="loading-state">መረጃው እየተጣራ ነው...</div>) : selectedFilter !== "blacklist" ? (
          <div id="admin-table-to-export">
            <table>
              <thead>
                <tr>
                  <th onClick={(e) => { e.stopPropagation(); setOpenFilterMenu('queue'); }}>ወረፋ ↕️ {RenderFilterPopup('queue')}</th>
                  <th onClick={(e) => { e.stopPropagation(); setOpenFilterMenu('createdAt'); }}>ቀን ↕️ {RenderFilterPopup('createdAt')}</th>
                  <th onClick={(e) => { e.stopPropagation(); setOpenFilterMenu('applicantName'); }}>አመልካች ↕️ {RenderFilterPopup('applicantName')}</th>
                  <th onClick={(e) => { e.stopPropagation(); setOpenFilterMenu('ownerName'); }}>ባለቤት ↕️ {RenderFilterPopup('ownerName')}</th>
                  <th onClick={(e) => { e.stopPropagation(); setOpenFilterMenu('houseNo'); }}>ቤ.ቁ ↕️ {RenderFilterPopup('houseNo')}</th>
                  <th onClick={(e) => { e.stopPropagation(); setOpenFilterMenu('service'); }}>አገልግሎት ↕️ {RenderFilterPopup('service')}</th>
                  <th>ብዛት</th>
                  {["all", "sentToExpert", "expertReturned"].includes(selectedFilter) && (<><th>አስረካቢ</th><th>ተረካቢ</th></>)}
                  <th>ሁኔታ</th><th className="no-print">ተግባር</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.length > 0 ? filteredFiles.map((f, idx) => (
                  <tr key={`${f._id}-${idx}`} onClick={() => setSelectedFile(selectedFile === f._id ? null : f._id)} className={selectedFile === f._id ? "selected-row" : ""}>
                    <td><b>#{f.queue || "---"}</b></td>
                    <td>{f.createdAt?.split('T')[0]}</td>
                    <td>{f.applicantName}</td><td>{f.ownerName}</td><td>{f.houseNo}</td>
                    <td style={{ color: '#007bff', fontWeight: 'bold' }}>{f.displayService}</td>
                    <td><span className="count-badge-table">{f.displayFileCount}</span></td>
                    {["all", "sentToExpert", "expertReturned"].includes(selectedFilter) && (<><td>{f.displaySender || "---"}</td><td>{f.displayExpert || "---"}</td></>)}
                    <td><span className={`status-badge ${getStatusClass(f.displayStatus)}`}>{getStatusDisplay(f.displayStatus, f.displayExpert)}</span></td>
                    <td className="no-print">
                      <div className="action-buttons">
                        {f.displayStatus === "pending" && selectedFilter === "requested" && (
                          <>
                            <button className="back-buttons" disabled={readOnly} onClick={(e) => {
                              e.stopPropagation(); setActiveFileId(f._id); setActiveServiceId(f.displayServiceId);
                              setAssignData(prev => ({ ...prev, fileCount: f.displayFileCount !== "---" ? f.displayFileCount : "" })); setIsAssignModalOpen(true);
                            }}>መድብ</button>
                            
                            {/* "መልስ" በተን የሚታየው በፋይሉ ስር ያሉ ሁሉም አገልግሎቶች ገና pending ከሆኑ ብቻ ነው */}
                            {f.services && f.services.every(s => s.status === "pending") && (
                              <button className="assign-buttons" disabled={readOnly} onClick={(e) => { 
                                e.stopPropagation(); 
                                handleRejectService(f._id, f.displayServiceId); 
                              }}>መልስ</button>
                            )}
                          </>
                        )}
                        {f.displayStatus === "completed" && selectedFilter === "expertReturned" &&(
                         <button className="check-buttons" 
                            disabled={readOnly}  onClick={(e) => { 
                               e.stopPropagation(); 
                               verifyService(f._id, f.displayServiceId, f.displayService); }}>
                                  አረጋግጥ
                              </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )) : <tr><td colSpan="12" style={{ textAlign: 'center', padding: '30px' }}>ምንም ፋይል የለም</td></tr>}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="blacklist-admin-section">
            <h4>🚫 የታገዱ ሰዎች</h4>
            <table>
              <thead>
                <tr><th>ስም</th><th>ባለቤት</th><th>ቤ.ቁ</th><th>ቀጠና</th><th>ምክንያት</th><th>ደብዳቤ</th></tr>
              </thead>
              <tbody>
                {blockedUsers.map((u) => (
                  <tr key={u._id}>
                    <td><b>{u.fullName}</b></td><td>{u.ownerName}</td><td>{u.houseNo}</td><td>{u.zone}</td>
                    <td><span className="status-badge status-fix">⚠️ {u.reason}</span></td>
                    <td>{(u.blockLetter || u.attachedFile) ? <a href={`http://localhost:5000${u.blockLetter || u.attachedFile}`} target="_blank" rel="noreferrer" className="view-doc-link">ክፈት</a> : "የለም"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isAssignModalOpen && (
        <div className="it-overlay" onClick={() => setIsAssignModalOpen(false)}>
          <div className="it-modal-body" style={{ maxWidth: '350px' }} onClick={(e) => e.stopPropagation()}>
            <h3 className="it-modal-title">👨‍🔧 ፋይል መድብ</h3>
            <div className="it-input-group">
              <label>አስረካቢ</label>
              <select className="it-search-field" value={assignData.senderName} onChange={(e) => setAssignData({ ...assignData, senderName: e.target.value })}>
                <option value="">-- ምረጥ --</option>
                {allUsers.filter(u => u.role?.toLowerCase() === "admin").map(u => <option key={u._id} value={u.fullName}>{u.fullName}</option>)}
              </select>
            </div>
            <div className="it-input-group" style={{ marginTop: '10px' }}>
              <label>ባለሙያ</label>
              <select className="it-search-field" value={assignData.expertName} onChange={(e) => setAssignData({ ...assignData, expertName: e.target.value })}>
                <option value="">-- ምረጥ --</option>
                {allUsers.filter(u => ["expert", "manager", "it"].includes(u.role?.toLowerCase())).map(u => (<option key={u._id} value={u.fullName}>{u.fullName}</option>))}
              </select>
            </div>
            <div className="it-input-group" style={{ marginTop: '10px' }}>
              <label>የፋይል ብዛት</label>
              <input type="number" className="it-search-field" value={assignData.fileCount} onChange={(e) => setAssignData({ ...assignData, fileCount: e.target.value })} />
            </div>
            <div className="it-modal-actions" style={{ marginTop: '20px' }}>
              <button className="it-btn-save" onClick={handleAssignSubmit}>አረጋግጥ</button>
              <button className="it-btn-cancel" onClick={() => setIsAssignModalOpen(false)}>ዝጋ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}