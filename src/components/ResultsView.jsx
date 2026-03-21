window.ResultsView = function ResultsView({ results, selectedLang, reset, pageTransition, staggerContainer, staggerItem }) {
  const { motion } = window.Motion;

  return (
    <motion.div 
      key="results"
      className="card"
      variants={pageTransition}
      initial="initial" animate="animate" exit="exit"
    >
      <div className="results-header">
        <div>
          <h2 className="serif" style={{color: 'var(--primary)', fontSize: '2.2rem'}}>Your Health Simplified</h2>
          <p style={{color: 'var(--text-light)'}}>Based on the provided report</p>
        </div>
        <motion.button whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} className="btn-secondary" onClick={reset}>
          <i className="ph ph-arrow-left"></i> Analyse Another
        </motion.button>
      </div>

      <h3 className="section-title serif">
        <i className="ph-fill ph-thermometer" style={{color: 'var(--primary)'}}></i> Key Metrics
      </h3>
      <motion.div className="terms-flex" variants={staggerContainer} initial="hidden" animate="show">
        {results.terms.map((term, i) => (
          <motion.div key={i} variants={staggerItem} className={`term-chip status-${term.status || 'Neutral'}`}>
            <span className="term-status-dot"></span>
            {term.name} • {term.value} {term.unit}
          </motion.div>
        ))}
      </motion.div>

      <h3 className="section-title serif">
        <i className="ph-fill ph-book-open-text" style={{color: 'var(--primary)'}}></i> Plain {selectedLang} Explanation
      </h3>
      
      {selectedLang !== 'English' && results.translated_explanation && (
        <div className="content-box translated-box">
          <motion.ul className="content-list" variants={staggerContainer} initial="hidden" animate="show">
            {results.translated_explanation.map((line, i) => (
              <motion.li key={i} variants={staggerItem}>{line}</motion.li>
            ))}
          </motion.ul>
        </div>
      )}

      <div className="content-box" style={{display: selectedLang !== 'English' && results.translated_explanation ? 'none' : 'block'}}>
        <motion.ul className="content-list" variants={staggerContainer} initial="hidden" animate="show">
          {results.explanation.map((line, i) => (
            <motion.li key={i} variants={staggerItem}>{line}</motion.li>
          ))}
        </motion.ul>
      </div>

      <h3 className="section-title serif" style={{marginTop: '2.5rem'}}>
        <i className="ph-fill ph-lightbulb" style={{color: '#f59e0b'}}></i> What should I do?
      </h3>

      {selectedLang !== 'English' && results.translated_advice && (
        <div className="content-box translated-box">
          <motion.ul className="content-list" variants={staggerContainer} initial="hidden" animate="show">
            {results.translated_advice.map((line, i) => (
              <motion.li key={i} variants={staggerItem}>{line}</motion.li>
            ))}
          </motion.ul>
        </div>
      )}

      <div className="content-box" style={{display: selectedLang !== 'English' && results.translated_advice ? 'none' : 'block'}}>
        <motion.ul className="content-list" variants={staggerContainer} initial="hidden" animate="show">
          {results.advice.map((line, i) => (
            <motion.li key={i} variants={staggerItem}>{line}</motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
};
