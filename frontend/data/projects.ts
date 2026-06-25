export type ProjectLocale = 'en' | 'pt-BR';

export interface Project {
  title: string;
  description: Record<ProjectLocale, string>;
  image: string;
  secondImage?: string;
  tags: string[];
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    title: 'DSCommerce',
    description: {
      en: 'E-commerce REST API with products, categories, users, orders, OAuth2/JWT authentication, role-based authorization, JPA/Hibernate persistence, and OpenAPI documentation.',
      'pt-BR': 'API REST de e-commerce com produtos, categorias, usuários, pedidos, autenticação OAuth2/JWT, autorização por perfis, persistência JPA/Hibernate e documentação OpenAPI.',
    },
    image: '/images/projects/dscommerce.png',
    tags: ['Java 21', 'Spring Boot 3', 'Spring Security', 'OAuth2', 'JWT', 'PostgreSQL', 'Spring Data JPA', 'Maven', 'Docker'],
    github: 'https://github.com/mateusribeirocampos/project-spring-boot-dscommerce',
    demo: 'https://project-spring-boot-dscommerce.onrender.com',
  },
  {
    title: 'CVnoAlvo',
    description: {
      en: 'Web application for adapting resumes to specific job openings, with compatibility analysis, ATS-focused artifact generation, Java/Spring backend, PostgreSQL, and JWT authentication.',
      'pt-BR': 'Aplicação web para adaptar currículos a vagas específicas, com análise de compatibilidade, geração de artefatos otimizados para ATS, backend Java/Spring, PostgreSQL e autenticação JWT.',
    },
    image: '/images/projects/cvnoalvo.jpg',
    tags: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'Docker', 'Next.js'],
    demo: 'https://www.cvnoalvo.com.br',
  },
  {
    title: 'SYSMP',
    description: {
      en: 'Full-stack deadline management system with JWT authentication, an admin dashboard, PostgreSQL, and real-time communication for operational follow-up.',
      'pt-BR': 'Sistema full-stack para gestão de prazos com autenticação JWT, painel administrativo, PostgreSQL e comunicação em tempo real para acompanhamento operacional.',
    },
    image: '/images/projects/sysmp.jpg',
    tags: ['Node.js', 'Express', 'React', 'TypeScript', 'WebSocket', 'PostgreSQL', 'JWT'],
    github: 'https://github.com/mateusribeirocampos',
  },
  {
    title: 'Dragenda',
    description: {
      en: 'Healthcare scheduling application with a React frontend, Node.js/Express backend, SQLite persistence, and separate frontend/backend deployments on Vercel and Render.',
      'pt-BR': 'Aplicação de agendamento em saúde com frontend React, backend Node.js/Express, persistência SQLite e deploy separado entre Vercel e Render.',
    },
    image: '/images/projects/dragenda.png',
    secondImage: '/images/projects/dragenda2.png',
    tags: ['React', 'React Native', 'Bootstrap', 'Node.js', 'Express', 'SQLite'],
    github: 'https://github.com/mateusribeirocampos/dragenda',
    demo: 'https://dragenda.vercel.app',
  },
  {
    title: 'Website - Santa Rita church',
    description: {
      en: 'Responsive institutional website for Santa Rita Church, built with React, TypeScript, Vite, and Tailwind CSS for clear content organization and mobile access.',
      'pt-BR': 'Site institucional responsivo para a Igreja Santa Rita, construído com React, TypeScript, Vite e Tailwind CSS para organizar informações e facilitar o acesso mobile.',
    },
    image: '/images/projects/websiteSantaRita.png',
    secondImage: '/images/projects/websiteSantaRita1.png',
    tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/mateusribeirocampos/santarita',
    demo: 'https://igrejasantaritaourofino.vercel.app/',
  },
  {
    title: 'DIO - Machine Learning',
    description: {
      en: 'Study repository from the DIO Machine Learning Practitioner Bootcamp, with Python notebooks for facial recognition, image recommendation, and virtual assistant experiments.',
      'pt-BR': 'Repositório de estudos do bootcamp DIO Machine Learning Practitioner, com notebooks em Python para reconhecimento facial, recomendação por imagens e experimentos com assistentes virtuais.',
    },
    image: '/images/projects/diollm.gif',
    secondImage: '/images/projects/diollm1.png',
    tags: ['Jupyter Notebook', 'Python', 'Keras', 'R', 'Machine Learning', 'Deep Learning'],
    github: 'https://github.com/mateusribeirocampos/diollm',
    demo: 'https://colab.research.google.com/github/mateusribeirocampos/diollm/blob/main/Notebooks/Project_Draft/Sistema_de_recomenda%C3%A7%C3%A3o_por_imagens_.ipynb',
  },
];
