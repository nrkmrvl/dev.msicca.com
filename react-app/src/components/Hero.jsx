import styled from '@emotion/styled';

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
  background: linear-gradient(
    135deg,
    rgba(170, 229, 56, 0.05) 0%,
    transparent 50%,
    rgba(255, 211, 0, 0.05) 100%
  );
  
  &:nth-of-type(2) {
    background: radial-gradient(
      circle at top right,
      rgba(255, 211, 0, 0.08) 0%,
      transparent 60%
    );
  }
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

export default function Hero() {
  return (
    <HeroSection id="hero">
      <HeroBgLayer />
      <HeroBgLayer />
      <Container>
        <HeroTitle>
          <span>Edge Minimal</span>
          <span>Developers</span>
        </HeroTitle>
        <HeroTagline>Code. Build. Deploy.</HeroTagline>
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
