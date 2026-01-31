import { ThemeProvider } from '@emotion/react';
import { Global, css } from '@emotion/react';
import msiccaTheme from './theme/msiccaTheme';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Global styles without using Gamut's GlobalStyles
const globalStyles = css`
  * {
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <ThemeProvider theme={msiccaTheme}>
      <Global styles={globalStyles} />
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
