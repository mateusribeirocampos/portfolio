export type ProjectLocale = 'en' | 'pt-BR';
export type LocalizedProjectText = Record<ProjectLocale, string>;

export interface ProjectEvidence {
  label: LocalizedProjectText;
  value: LocalizedProjectText;
}

export interface Project {
  slug: string;
  title: string;
  kind: LocalizedProjectText;
  status: LocalizedProjectText;
  description: LocalizedProjectText;
  image: string;
  secondImage?: string;
  tags: string[];
  architecture?: string[];
  evidence?: ProjectEvidence[];
  featured?: boolean;
  featuredOrder?: number;
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    slug: 'dscommerce',
    title: 'DSCommerce',
    kind: {
      en: 'Backend API',
      'pt-BR': 'API backend',
    },
    status: {
      en: 'Public deployment',
      'pt-BR': 'Deploy público',
    },
    description: {
      en: 'E-commerce REST API with products, categories, users, orders, OAuth2/JWT authentication, role-based authorization, JPA/Hibernate persistence, and OpenAPI documentation.',
      'pt-BR': 'API REST de e-commerce com produtos, categorias, usuários, pedidos, autenticação OAuth2/JWT, autorização por perfis, persistência JPA/Hibernate e documentação OpenAPI.',
    },
    image: '/images/projects/dscommerce.png',
    tags: ['Java 21', 'Spring Boot 3', 'Spring Security', 'OAuth2', 'JWT', 'PostgreSQL', 'JPA', 'Docker'],
    architecture: ['REST API', 'Spring Security', 'Service layer', 'JPA / Hibernate', 'PostgreSQL'],
    evidence: [
      {
        label: { en: 'Security', 'pt-BR': 'Segurança' },
        value: {
          en: 'OAuth2/JWT authentication with role-based authorization.',
          'pt-BR': 'Autenticação OAuth2/JWT com autorização baseada em perfis.',
        },
      },
      {
        label: { en: 'Domain', 'pt-BR': 'Domínio' },
        value: {
          en: 'Products, categories, users and orders modeled as API resources.',
          'pt-BR': 'Produtos, categorias, usuários e pedidos modelados como recursos da API.',
        },
      },
      {
        label: { en: 'Delivery', 'pt-BR': 'Entrega' },
        value: {
          en: 'OpenAPI documentation, Maven build and containerized deployment.',
          'pt-BR': 'Documentação OpenAPI, build Maven e deploy em contêiner.',
        },
      },
    ],
    featured: true,
    featuredOrder: 2,
    github: 'https://github.com/mateusribeirocampos/project-spring-boot-dscommerce',
    demo: 'https://project-spring-boot-dscommerce.onrender.com',
  },
  {
    slug: 'cvnoalvo',
    title: 'CVnoAlvo',
    kind: {
      en: 'Production product',
      'pt-BR': 'Produto em produção',
    },
    status: {
      en: 'Live',
      'pt-BR': 'Online',
    },
    description: {
      en: 'Web application for adapting resumes to specific job openings, with compatibility analysis, ATS-focused artifact generation, Java/Spring backend, PostgreSQL, and JWT authentication.',
      'pt-BR': 'Aplicação web para adaptar currículos a vagas específicas, com análise de compatibilidade, geração de artefatos otimizados para ATS, backend Java/Spring, PostgreSQL e autenticação JWT.',
    },
    image: '/images/projects/cvnoalvo.jpg',
    tags: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'Docker', 'Next.js'],
    architecture: ['Next.js', 'Java 21 API', 'Spring Security', 'PostgreSQL', 'External services'],
    evidence: [
      {
        label: { en: 'Product', 'pt-BR': 'Produto' },
        value: {
          en: 'A guided workflow that turns a job opening into ATS-focused resume artifacts.',
          'pt-BR': 'Fluxo guiado que transforma uma vaga em artefatos de currículo voltados a ATS.',
        },
      },
      {
        label: { en: 'Backend', 'pt-BR': 'Backend' },
        value: {
          en: 'Java/Spring services with JWT security and PostgreSQL persistence.',
          'pt-BR': 'Serviços Java/Spring com segurança JWT e persistência PostgreSQL.',
        },
      },
      {
        label: { en: 'Delivery', 'pt-BR': 'Entrega' },
        value: {
          en: 'Full-stack product running in production with external integrations.',
          'pt-BR': 'Produto full stack em produção com integrações externas.',
        },
      },
    ],
    featured: true,
    featuredOrder: 1,
    demo: 'https://www.cvnoalvo.com.br',
  },
  {
    slug: 'sysmp',
    title: 'SYSMP',
    kind: {
      en: 'Full-stack system',
      'pt-BR': 'Sistema full stack',
    },
    status: {
      en: 'Private product',
      'pt-BR': 'Produto privado',
    },
    description: {
      en: 'Full-stack deadline management system with JWT authentication, an admin dashboard, PostgreSQL, and real-time communication for operational follow-up.',
      'pt-BR': 'Sistema full-stack para gestão de prazos com autenticação JWT, painel administrativo, PostgreSQL e comunicação em tempo real para acompanhamento operacional.',
    },
    image: '/images/projects/sysmp.jpg',
    tags: ['Node.js', 'Express', 'React', 'TypeScript', 'WebSocket', 'PostgreSQL', 'JWT'],
    architecture: ['React', 'Express API', 'JWT', 'WebSocket', 'PostgreSQL'],
    evidence: [
      {
        label: { en: 'Operations', 'pt-BR': 'Operação' },
        value: {
          en: 'Administrative workflows for users, documents and deadlines.',
          'pt-BR': 'Fluxos administrativos para usuários, documentos e prazos.',
        },
      },
      {
        label: { en: 'Real time', 'pt-BR': 'Tempo real' },
        value: {
          en: 'WebSocket communication for operational status updates.',
          'pt-BR': 'Comunicação WebSocket para atualização de status operacionais.',
        },
      },
      {
        label: { en: 'Security', 'pt-BR': 'Segurança' },
        value: {
          en: 'JWT authentication protecting administrative access.',
          'pt-BR': 'Autenticação JWT protegendo o acesso administrativo.',
        },
      },
    ],
    featured: true,
    featuredOrder: 3,
    github: 'https://github.com/mateusribeirocampos',
  },
  {
    slug: 'dragenda',
    title: 'Dragenda',
    kind: {
      en: 'Scheduling application',
      'pt-BR': 'Aplicação de agendamento',
    },
    status: {
      en: 'Public demo',
      'pt-BR': 'Demo pública',
    },
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
    slug: 'santa-rita',
    title: 'Website - Santa Rita church',
    kind: {
      en: 'Institutional website',
      'pt-BR': 'Site institucional',
    },
    status: {
      en: 'Live',
      'pt-BR': 'Online',
    },
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
    slug: 'dio-machine-learning',
    title: 'DIO - Machine Learning',
    kind: {
      en: 'Applied studies',
      'pt-BR': 'Estudos aplicados',
    },
    status: {
      en: 'Study repository',
      'pt-BR': 'Repositório de estudos',
    },
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
