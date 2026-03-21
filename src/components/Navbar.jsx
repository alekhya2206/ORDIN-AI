window.Navbar = function Navbar() {
  const { motion } = window.Motion;
  return (
    <nav className="navbar">
      <motion.div 
        className="logo-container"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <i className="ph-fill ph-heartbeat logo-icon"></i>
        <h1 className="logo-text serif">MedSimplify</h1>
      </motion.div>
      <motion.div 
        className="tagline-badge"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        AI-Powered Report Simplifier
      </motion.div>
    </nav>
  );
};
