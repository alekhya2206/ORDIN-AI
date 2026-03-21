window.LoadingView = function LoadingView({ loadingStep, pageTransition }) {
  const { motion } = window.Motion;

  return (
    <motion.div 
      key="loading"
      className="card loading-container"
      variants={pageTransition}
      initial="initial" animate="animate" exit="exit"
    >
      <div className="spinner"></div>
      <h2 className="serif" style={{marginBottom: '2rem', color: 'var(--primary)', fontSize: '2rem'}}>Analyzing Report...</h2>
      
      <div className="loading-steps">
        <motion.div animate={{ opacity: loadingStep >= 0 ? 1 : 0.4 }} className={`loading-step ${loadingStep >= 0 ? (loadingStep > 0 ? 'completed' : 'active') : ''}`}>
          <i className={`ph-bold ${loadingStep > 0 ? 'ph-check-circle' : 'ph-circle-dashed'}`}></i>
          <span>Extracting medical terms</span>
        </motion.div>
        <motion.div animate={{ opacity: loadingStep >= 1 ? 1 : 0.4 }} className={`loading-step ${loadingStep >= 1 ? (loadingStep > 1 ? 'completed' : 'active') : ''}`}>
          <i className={`ph-bold ${loadingStep > 1 ? 'ph-check-circle' : 'ph-circle-dashed'}`}></i>
          <span>Translating jargon to plain English</span>
        </motion.div>
        <motion.div animate={{ opacity: loadingStep >= 2 ? 1 : 0.4 }} className={`loading-step ${loadingStep >= 2 ? (loadingStep > 2 ? 'completed' : 'active') : ''}`}>
          <i className={`ph-bold ${loadingStep > 2 ? 'ph-check-circle' : 'ph-circle-dashed'}`}></i>
          <span>Preparing actionable advice</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
