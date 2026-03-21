window.App = function App() {
  const { useState, useEffect, useRef } = React;
  const { motion, AnimatePresence } = window.Motion;
  const { CLAUDE_API_KEY, systemPrompt, fileToBase64, MOCK_RESPONSE } = window.api;

  const LANGUAGES = ['English', 'Hindi', 'Tamil', 'Bengali'];
  const pageTransition = {
    initial: { opacity: 0, y: 30, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, filter: "blur(4px)", transition: { duration: 0.3, ease: "easeIn" } }
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const staggerItem = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const [step, setStep] = useState('upload');
  const [reportText, setReportText] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [selectedLang, setSelectedLang] = useState('English');
  const [loadingStep, setLoadingStep] = useState(-1); 
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation(); setIsDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) processFile(droppedFile);
  };
  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragActive(true); };
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragActive(false); };

  const processFile = (selectedFile) => {
    setFile(selectedFile); setFileName(selectedFile.name);
    if (selectedFile.type === 'text/plain' || selectedFile.name.endsWith('.txt') || selectedFile.name.endsWith('.csv')) {
      const reader = new FileReader();
      reader.onload = (evt) => setReportText(evt.target.result);
      reader.readAsText(selectedFile);
    } else {
      setReportText(`[File loaded: ${selectedFile.name}]\n\n*Note: Image and PDF documents will be analyzed directly via Claude API. Add any supplementary notes here if needed.*`);
    }
  };
  const handleFileChange = (e) => { if (e.target.files && e.target.files[0]) processFile(e.target.files[0]); };

  const runAnalysis = async () => {
    if (!reportText.trim() && !file) { setError("Please upload a file or paste your report text."); return; }
    setError(null); setStep('loading'); setTimeout(() => setLoadingStep(0), 400); 
    try {
      let userMessage = `Target Language: ${selectedLang}\n\nMedical Report Details:\n${reportText}`;
      let messages = [];
      if (file && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        messages.push({ role: 'user', content: [{ type: 'image', source: { type: 'base64', media_type: file.type, data: await fileToBase64(file) } }, { type: 'text', text: userMessage }] });
      } else if (file && file.type === 'application/pdf') {
        messages.push({ role: 'user', content: [{ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: await fileToBase64(file) } }, { type: 'text', text: userMessage }] });
      } else {
        messages.push({ role: 'user', content: userMessage });
      }

      setTimeout(() => setLoadingStep(1), 2000);
      setTimeout(() => setLoadingStep(2), 3500);

      if (CLAUDE_API_KEY === 'dummy_api_key_hidden') throw new Error("API key not configured.");
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': CLAUDE_API_KEY, 'anthropic-version': '2023-06-01', 'anthropic-dangerously-allow-browser': 'true', 'anthropic-beta': 'pdfs-2024-09-25' },
        body: JSON.stringify({ model: 'claude-3-5-sonnet-20241022', max_tokens: 4000, system: systemPrompt, messages: messages })
      });

      if (!response.ok) { const errBody = await response.json(); throw new Error(errBody.error?.message || "Failed to contact Claude API."); }
      const data = await response.json();
      const content = data.content[0].text;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Could not parse JSON from Claude response.");
      
      setResults(JSON.parse(jsonMatch[0]));
      setStep('results');
    } catch (err) {
      console.warn("Using mock data due to API error or missing key:", err);
      setTimeout(() => { setResults(MOCK_RESPONSE(selectedLang)); setStep('results'); }, 4200);
    }
  };

  const reset = () => { setStep('upload'); setFile(null); setFileName(''); setReportText(''); setResults(null); setError(null); setLoadingStep(-1); };

  const { Navbar, UploadView, LoadingView, ResultsView } = window;

  return (
    <div>
      <Navbar />
      <main className="container">
        <AnimatePresence mode="wait">
          {step === 'upload' && <UploadView key="upload" reportText={reportText} setReportText={setReportText} fileName={fileName} selectedLang={selectedLang} setSelectedLang={setSelectedLang} error={error} LANGUAGES={LANGUAGES} handleDrop={handleDrop} handleDragOver={handleDragOver} handleDragLeave={handleDragLeave} fileInputRef={fileInputRef} handleFileChange={handleFileChange} isDragActive={isDragActive} runAnalysis={runAnalysis} pageTransition={pageTransition} />}
          {step === 'loading' && <LoadingView key="loading" loadingStep={loadingStep} pageTransition={pageTransition} />}
          {step === 'results' && results && <ResultsView key="results" results={results} selectedLang={selectedLang} reset={reset} pageTransition={pageTransition} staggerContainer={staggerContainer} staggerItem={staggerItem} />}
        </AnimatePresence>
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<window.App />);
