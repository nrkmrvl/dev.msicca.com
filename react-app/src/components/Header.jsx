import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.theme.colors.navy};
  transition: ${props => props.theme.transitions?.default || '0.3s ease'};
  
  &.scrolled {
    box-shadow: 0 2px 8px ${props => props.theme.colors.overlay};
  }
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  
  img {
    width: 40px;
    height: 40px;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.navy};
    padding: 2rem;
    gap: 1rem;
  }
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  font-family: ${props => props.theme.fontFamily?.mono || 'monospace'};
  font-size: 0.9rem;
  transition: ${props => props.theme.transitions?.default || '0.3s ease'};
  
  &:hover {
    color: ${props => props.theme.colors.yellow};
  }
`;

const NavButton = styled(NavLink)`
  background: ${props => props.theme.colors.yellow};
  color: ${props => props.theme.colors.navy};
  padding: 0.5rem 1.5rem;
  border-radius: 0.25rem;
  font-weight: 500;
  
  &:hover {
    background: ${props => props.theme.colors.yellow};
    filter: brightness(1.1);
    color: ${props => props.theme.colors.navy};
  }
`;

const MobileMenuBtn = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  span {
    width: 24px;
    height: 2px;
    background: ${props => props.theme.colors.white};
    transition: ${props => props.theme.transitions?.default || '0.3s ease'};
  }
`;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer className={scrolled ? 'scrolled' : ''}>
      <Nav>
        <Logo href="#hero" aria-label="Home">
          <img
            src="/assets/images/png/nrkmrvl.coder_logo_128px.png"
            alt="nrkmrvl logo"
          />
        </Logo>
        <NavLinks isOpen={mobileMenuOpen}>
          <li><NavLink href="#hero">.home</NavLink></li>
          <li><NavLink href="#about">.about</NavLink></li>
          <li><NavLink href="#features">.features</NavLink></li>
          <li><NavLink href="#projects">.projects</NavLink></li>
          <li><NavLink href="#contact">.contact</NavLink></li>
          <li><NavButton href="/wordpress.html">WordPress</NavButton></li>
        </NavLinks>
        <MobileMenuBtn
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span />
          <span />
          <span />
        </MobileMenuBtn>
      </Nav>
    </HeaderContainer>
  );
}
