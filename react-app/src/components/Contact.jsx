import styled from '@emotion/styled';

const ContactSection = styled.section`
  background: ${props => props.theme.colors.cream};
  padding: 6rem 2rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
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
  max-width: 600px;
  margin: 0 auto 3rem;
`;

const ContactButton = styled.a`
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

export default function Contact() {
  return (
    <ContactSection id="contact">
      <Container>
        <SectionLabel>Contact</SectionLabel>
        <Title>Let's Build Something Together</Title>
        <Description>
          Ready to start your next project? Get in touch with us and let's discuss 
          how we can help bring your vision to life.
        </Description>
        <ContactButton href="mailto:hello@msicca.com">
          Get in Touch
        </ContactButton>
      </Container>
    </ContactSection>
  );
}
