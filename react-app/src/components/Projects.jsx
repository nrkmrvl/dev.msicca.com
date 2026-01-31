import styled from '@emotion/styled';

const ProjectsSection = styled.section`
  background: ${props => props.theme.colors.white};
  padding: 6rem 2rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectsHeader = styled.div`
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

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled.div`
  padding: 2rem;
  background: ${props => props.theme.colors.cream};
  border-radius: 0.5rem;
  transition: ${props => props.theme.transitions?.default || '0.3s ease'};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ProjectTitle = styled.h3`
  font-family: ${props => props.theme.fontFamily?.mono || 'monospace'};
  color: ${props => props.theme.colors.navy};
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

const ProjectDesc = styled.p`
  font-family: ${props => props.theme.fontFamily?.base || 'sans-serif'};
  color: ${props => props.theme.colors.blueGray};
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  font-family: ${props => props.theme.fontFamily?.mono || 'monospace'};
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.blueGray};
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.85rem;
`;

export default function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory management and payment integration.',
      tech: ['React', 'Node.js', 'PostgreSQL'],
    },
    {
      title: 'Analytics Dashboard',
      description: 'Real-time analytics platform for tracking business metrics and user behavior.',
      tech: ['TypeScript', 'React', 'D3.js'],
    },
    {
      title: 'CMS Solution',
      description: 'Custom content management system with headless architecture and RESTful API.',
      tech: ['WordPress', 'PHP', 'MySQL'],
    },
  ];

  return (
    <ProjectsSection id="projects">
      <Container>
        <ProjectsHeader>
          <SectionLabel>Projects</SectionLabel>
          <Title>Recent Work</Title>
          <Description>
            A selection of projects showcasing our expertise in building modern web applications.
          </Description>
        </ProjectsHeader>
        <ProjectGrid>
          {projects.map((project, index) => (
            <ProjectCard key={index}>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDesc>{project.description}</ProjectDesc>
              <ProjectTech>
                {project.tech.map((tech, techIndex) => (
                  <TechTag key={techIndex}>{tech}</TechTag>
                ))}
              </ProjectTech>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </Container>
    </ProjectsSection>
  );
}
