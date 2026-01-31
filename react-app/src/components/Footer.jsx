import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.navy};
  color: ${props => props.theme.colors.white};
  padding: 3rem 2rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Logo = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  
  img {
    width: 32px;
    height: 32px;
  }
`;

const FooterNav = styled.nav`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FooterLink = styled.a`
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  font-family: ${props => props.theme.fontFamily?.mono || 'monospace'};
  font-size: 0.9rem;
  transition: ${props => props.theme.transitions?.default || '0.3s ease'};
  
  &:hover {
    color: ${props => props.theme.colors.yellow};
  }
`;

const FooterRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const GitHubLink = styled.a`
  color: ${props => props.theme.colors.white};
  transition: ${props => props.theme.transitions?.default || '0.3s ease'};
  
  &:hover {
    color: ${props => props.theme.colors.yellow};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const Copyright = styled.p`
  font-family: ${props => props.theme.fontFamily?.base || 'sans-serif'};
  font-size: 0.85rem;
  color: ${props => props.theme.colors.white};
  opacity: 0.8;
  margin: 0;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLeft>
          <Logo href="#hero" aria-label="Home">
            <img
              src="/assets/images/png/nrkmrvl.coder_logo.png"
              alt="nrkmrvl logo"
            />
          </Logo>
          <FooterNav>
            <FooterLink href="#hero">.home</FooterLink>
            <FooterLink href="#about">.about</FooterLink>
            <FooterLink href="#features">.features</FooterLink>
            <FooterLink href="#projects">.projects</FooterLink>
            <FooterLink href="#contact">.contact</FooterLink>
          </FooterNav>
        </FooterLeft>
        <FooterRight>
          <GitHubLink
            href="https://github.com/msicca"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </GitHubLink>
          <Copyright>© 2026 msicca</Copyright>
        </FooterRight>
      </FooterContent>
    </FooterContainer>
  );
}
