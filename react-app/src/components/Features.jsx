import styled from '@emotion/styled';

const FeaturesSection = styled.section`
  background: ${props => props.theme.colors.white};
  padding: 6rem 2rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FeaturesHeader = styled.div`
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

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  padding: 2rem;
  background: ${props => props.theme.colors.cream};
  border-radius: 0.5rem;
  transition: ${props => props.theme.transitions?.default || '0.3s ease'};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureTitle = styled.h3`
  font-family: ${props => props.theme.fontFamily?.mono || 'monospace'};
  color: ${props => props.theme.colors.navy};
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

const FeatureText = styled.p`
  font-family: ${props => props.theme.fontFamily?.base || 'sans-serif'};
  color: ${props => props.theme.colors.blueGray};
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
`;

export default function Features() {
  const features = [
    {
      title: 'Modern Stack',
      description: 'Built with cutting-edge technologies like React, TypeScript, and Node.js for optimal performance.',
    },
    {
      title: 'Scalable Architecture',
      description: 'Designed for growth with cloud-native solutions and microservices architecture.',
    },
    {
      title: 'CI/CD Pipeline',
      description: 'Automated deployment workflows ensuring rapid, reliable, and consistent releases.',
    },
    {
      title: 'API-First Design',
      description: 'RESTful and GraphQL APIs built for seamless integration and extensibility.',
    },
    {
      title: 'Performance Optimized',
      description: 'Lightning-fast load times and optimal user experience through careful optimization.',
    },
    {
      title: 'Secure by Default',
      description: 'Industry-standard security practices baked into every layer of the application.',
    },
  ];

  return (
    <FeaturesSection id="features">
      <Container>
        <FeaturesHeader>
          <SectionLabel>Features</SectionLabel>
          <Title>Built for Performance and Scale</Title>
          <Description>
            Our approach combines modern development practices with proven engineering principles.
          </Description>
        </FeaturesHeader>
        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureText>{feature.description}</FeatureText>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </Container>
    </FeaturesSection>
  );
}
