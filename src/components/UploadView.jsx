window.UploadView = function UploadView({
  reportText, setReportText, 
  fileName, 
  selectedLang, setSelectedLang,
  error,
  LANGUAGES,
  handleDrop, handleDragOver, handleDragLeave,
  fileInputRef, handleFileChange,
  isDragActive,
  runAnalysis,
  pageTransition
}) {
  const { motion } = window.Motion;

  return (
    <motion.div 
      key="upload"
      className="card"
      variants={pageTransition}
      initial="initial" animate="animate" exit="exit"
    >
      <div className="header-text">
        <h2>Understand Your Health</h2>
        <p>Upload your lab report or prescription to get a simple, jargon-free explanation.</p>
      </div>

      {error && (
        <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="error-box">
          <i className="ph ph-warning-circle" style={{fontSize: '1.25rem'}}></i>
          {error}
        </motion.div>
      )}

      <motion.div 
        className={`dropzone ${isDragActive ? 'drag-active' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        whileHover={{ scale: 1.01, backgroundColor: "var(--primary-light)", borderColor: "var(--primary)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <motion.i 
          className="ph ph-upload-simple dropzone-icon"
          animate={isDragActive ? { y: -10 } : { y: 0 }}
        ></motion.i>
        <div className="dropzone-text">
          {fileName ? `Selected file: ${fileName}` : "Click or drag & drop to upload"}
        </div>
        <div className="dropzone-subtext">Supports PDF, Image (JPG/PNG), or Text</div>
        <input 
          type="file" ref={fileInputRef} style={{display: 'none'}} 
          onChange={handleFileChange} accept=".pdf,image/*,.txt,.csv"
        />
      </motion.div>

      <div className="textarea-container">
        <label className="textarea-label">Or paste your report text directly:</label>
        <textarea 
          placeholder="WBC Count: 7500...&#10;Hemoglobin: 11.2..."
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
        ></textarea>
      </div>

      <label className="lang-label">Explanation Language:</label>
      <div className="lang-grid">
        {LANGUAGES.map(lang => (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={lang}
            className={`lang-btn ${selectedLang === lang ? 'active' : ''}`}
            onClick={() => setSelectedLang(lang)}
          >
            {lang}
          </motion.button>
        ))}
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }} 
        whileTap={{ scale: 0.98 }}
        className="btn-primary" 
        onClick={runAnalysis}
      >
        <i className="ph-bold ph-magic-wand"></i> Analyse Report
      </motion.button>
    </motion.div>
  );
};
