import styled from '@emotion/styled';

const AboutSection = styled.section`
  background: ${props => props.theme.colors.cream};
  padding: 6rem 2rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const AboutHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionLabel = styled.span`
  font-family: ${props => props.theme.fontFamily?.mono || 'monospace'};
  color: ${props => props.theme.colors.yellow};
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  display: block;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-family: ${props => props.theme.fontFamily?.mono || 'monospace'};
  color: ${props => props.theme.colors.navy};
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  line-height: 1.3;
`;

const Description = styled.p`
  font-family: ${props => props.theme.fontFamily?.base || 'sans-serif'};
  color: ${props => props.theme.colors.blueGray};
  font-size: 1.1rem;
  line-height: 1.7;
  max-width: 800px;
  margin: 0 auto;
`;

const TechStack = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TechItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: ${props => props.theme.colors.white};
  border-radius: 0.5rem;
  transition: ${props => props.theme.transitions?.default || '0.3s ease'};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const TechLogo = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

const TechName = styled.span`
  font-family: ${props => props.theme.fontFamily?.base || 'sans-serif'};
  color: ${props => props.theme.colors.blueGray};
  font-size: 0.9rem;
  font-weight: 500;
`;

export default function About() {
  const techStack = [
    { logo: '/assets/images/svg/HTML5_logo.svg', name: 'HTML' },
    { logo: '/assets/images/svg/CSS3_logo.svg', name: 'CSS' },
    { logo: '/assets/images/svg/JAVASCRIPT_logo.svg', name: 'JavaScript' },
    { logo: '/assets/images/svg/TYPESCRIPT_logo.svg', name: 'TypeScript' },
    { logo: '/assets/images/svg/REACT_logo.svg', name: 'React' },
    { logo: '/assets/images/svg/NODE.JS_logo.svg', name: 'Node.js' },
    { logo: '/assets/images/svg/GIT_logo.svg', name: 'Git' },
    { logo: '/assets/images/svg/PHP_logo.svg', name: 'PHP' },
    { logo: '/assets/images/svg/Postgresql_elephant_logo.svg', name: 'PostgreSQL' },
    { logo: '/assets/images/svg/WordPress_logo.svg', name: 'WordPress' },
  ];

  return (
    <AboutSection id="about">
      <Container>
        <AboutHeader>
          <SectionLabel>About</SectionLabel>
          <Title>We are a studio built on the principles of clarity and precision.</Title>
          <Description>
            Obsessed with the edge. Our team lives at the intersection of the modern web 
            and the stability of high-performance engineering and minimalist design. We bridge 
            the gap between complex infrastructure and seamless user experiences. We don't just 
            write code; we architect the digital backbone for those who refuse to compromise 
            on performance.
          </Description>
        </AboutHeader>
        <TechStack>
          {techStack.map((tech, index) => (
            <TechItem key={index}>
              <TechLogo src={tech.logo} alt={`${tech.name} logo`} />
              <TechName>{tech.name}</TechName>
            </TechItem>
          ))}
        </TechStack>
      </Container>
    </AboutSection>
  );
}
