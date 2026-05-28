import { useState, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CursorEffect from './components/CursorEffect';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import AIResumeAnalyzer from './components/AIResumeAnalyzer';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';

export default function App() {
  const [loading, setLoading] = useState(true);
  const handleLoadComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      <CursorEffect />
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      {!loading && (
        <>
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Certifications />
            <AIResumeAnalyzer />
            <Contact />
          </main>
          <Footer />
          <AIAssistant />
        </>
      )}
    </>
  );
}
