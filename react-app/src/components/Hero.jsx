import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const blink = keyframes`
  from, to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.navy};
  overflow: hidden;
  padding: 2rem;
  padding-top: 80px; /* Account for fixed header */
`;

const HeroBgLayer = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: ${props => props.active ? 1 : 0};
  transition: opacity 2s ease;
  z-index: 0;
  background-image: ${props => props.bgImage ? `url(${props.bgImage})` : 'none'};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-family: ${props => props.theme.fontFamily?.mono || 'monospace'};
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  color: ${props => props.theme.colors.white};
  margin: 0 0 1rem 0;
  line-height: 1.2;
  
  span {
    display: block;
  }
`;

const HeroTagline = styled.p`
  font-family: ${props => props.theme.fontFamily?.mono || 'monospace'};
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: ${props => props.theme.colors.yellow};
  margin: 0 0 3rem 0;
  letter-spacing: 0.1em;
  white-space: pre-wrap;
  min-height: 3.6em;
  line-height: 1.2;
  
  &::after {
    content: '█';
    display: inline-block;
    margin-left: 2px;
    animation: ${blink} 1s step-end infinite;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.a`
  display: inline-block;
  background: ${props => props.theme.colors.yellow};
  color: ${props => props.theme.colors.navy};
  padding: 1rem 2.5rem;
  border-radius: 0.25rem;
  font-family: ${props => props.theme.fontFamily?.mono || 'monospace'};
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: ${props => props.theme.transitions?.default || '0.3s ease'};
  cursor: pointer;
  border: 2px solid ${props => props.theme.colors.yellow};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 211, 0, 0.3);
  }
`;

const SecondaryButton = styled.a`
  display: inline-block;
  background: transparent;
  color: ${props => props.theme.colors.white};
  padding: 1rem 2.5rem;
  border-radius: 0.25rem;
  font-family: ${props => props.theme.fontFamily?.mono || 'monospace'};
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: ${props => props.theme.transitions?.default || '0.3s ease'};
  cursor: pointer;
  border: 2px solid ${props => props.theme.colors.white};
  
  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.navy};
    transform: translateY(-2px);
  }
`;

const heroImages = [
  '/assets/images/webp/mohammad-rahmani-nBXwqxjDa5c-unsplash.webp',
  '/assets/images/webp/mohammad-rahmani-Y5yxdx2a4PI-unsplash.webp',
  '/assets/images/webp/vishnu-kalanad-evzHeMgbKOg-unsplash.webp',
  '/assets/images/webp/mohammad-rahmani-oXlXu2qukGE-unsplash.webp',
];

const codeSnippets = [
  "$ cd /projects/msicca/core\n$ chmod +x msicca_run\n$ ./msicca_run --tagline",
  "> const { engine } = require('./msicca-api')\n> const status = engine.init()\n> engine.getTagline()",
  ">>> import msicca_core as msc\n>>> msc.connect(env='production')\n>>> msc.get_current_tagline()",
  "> var config = App.getConfig()\n> console.clear()\n> config.branding.tagline",
  "$ cd projects/msicca-api\n$ source .env/bin/activate\n$ ./manage.py get_tagline",
  "> const api = require('./dist/core')\n> await api.connect()\n> api.manifest.tagline",
  ">>> from msicca import Engine\n>>> app = Engine.initialize()\n>>> app.metadata.tagline",
  "> var settings = window.getComputedStyle(document.body)\n> console.clear()\n> window.appConfig.branding.tagline",
  "$ export MSICCA_ENV=production\n$ ./msicca_cli --get-motto",
  "> require('./package.json').tagline",
  ">>> import msicca_core\n>>> engine = msicca_core.Engine()\n>>> engine.get_tagline()",
  "> console.clear()\n> document.querySelector('meta[name=\"tagline\"]').content",
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function Hero() {
  const [text, setText] = useState('');
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [visibleLayer, setVisibleLayer] = useState(0);

  // Background image rotation
  useEffect(() => {
    const rotateBackground = () => {
      const delay = 20000 + Math.random() * 10000; // 20-30 seconds
      const timer = setTimeout(() => {
        setCurrentBgIndex(prev => (prev + 1) % heroImages.length);
        setVisibleLayer(prev => prev === 0 ? 1 : 0);
      }, delay);
      return timer;
    };

    const timer = rotateBackground();
    return () => clearTimeout(timer);
  }, [currentBgIndex]);

  // Typewriter animation
  useEffect(() => {
    const wrongPool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]()<>$#@!%&+=-_;:,.";
    const randomWrongChar = (correct) => {
      let ch = wrongPool[Math.floor(Math.random() * wrongPool.length)];
      return ch === correct ? '?' : ch;
    };

    const typeWithMistakes = async (text, mistakeProbability = 0.18) => {
      let out = '';
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        // Simulate occasional mistakes (avoid newlines)
        if (ch !== '\n' && Math.random() < mistakeProbability) {
          const wrong = randomWrongChar(ch);
          setText(out + wrong);
          await sleep(rand(25, 65));
          // Backspace the wrong char
          setText(out);
          await sleep(220);
        }
        out += ch;
        setText(out);
        await sleep(rand(25, 65));
      }
    };

    const runTypewriter = async () => {
      while (true) {
        // Pick random code snippet
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        
        // Type command/snippet with occasional corrections
        await typeWithMistakes(snippet, 0.18);
        
        // Pause after command
        await sleep(1000);
        
        // Clear (simulate Enter)
        setText('');
        
        // Type final message without mistakes
        await typeWithMistakes('Code. Build. Deploy.', 0);
        
        // Hold the output
        await sleep(7500);
        
        // Clear and pause before next
        setText('');
        await sleep(1000);
      }
    };

    const timer = setTimeout(() => {
      runTypewriter();
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HeroSection id="hero">
      <HeroBgLayer 
        bgImage={heroImages[currentBgIndex]} 
        active={visibleLayer === 0} 
      />
      <HeroBgLayer 
        bgImage={heroImages[(currentBgIndex + heroImages.length - 1) % heroImages.length]} 
        active={visibleLayer === 1} 
      />
      <Container>
        <HeroTitle>
          <span>Edge Minimal</span>
          <span>Developers</span>
        </HeroTitle>
        <HeroTagline>{text}</HeroTagline>
        <HeroActions>
          <PrimaryButton href="#features" aria-label="View features">
            Features
          </PrimaryButton>
          <SecondaryButton href="#projects" aria-label="View projects">
            Projects
          </SecondaryButton>
        </HeroActions>
      </Container>
    </HeroSection>
  );
}
