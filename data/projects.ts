export interface Project {
  title: string;
  description: string;
  image: string;
  secondImage?: string;
  tags: string[];
  github: string;
  demo: string;
}

export const projects: Project[] = [
  {
    title: 'Dragenda',
    description: 'Digital healthcare revolutionizes the way we deliver and experience healthcare with a paradigm shift to more accessible, personalized and efficient approaches for all. Frontend hosted on Vercel and backend hosted on Render.',
    image: '/images/projects/dragenda.png',
    secondImage: '/images/projects/dragenda2.png',
    tags: ['React-native', 'Reactjs', 'Bootstrap', 'Node.js', 'Express', 'Sqlite'],
    github: 'https://github.com/mateusribeirocampos/dragenda',
    demo: 'https://dragenda.vercel.app',
  },
  {
    title: 'Santa Rita',
    description: 'A modern cross-platform website for the Santa Rita Church, built with cutting-edge technologies to provide a beautiful and responsive experience for the faithful.',
    image: '/images/projects/websiteSantaRita.png',
    secondImage: '/images/projects/websiteSantaRita1.png',
    tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/mateusribeirocampos/santarita',
    demo: 'https://santaritaourofino.vercel.app',
  },
  {
    title: 'DioLLM',
    description: 'A modern portfolio website showcasing my technical projects and development work, built with Next.js and Tailwind CSS for a beautiful and responsive experience.',
    image: '/images/projects/diollm.gif',
    secondImage: '/images/projects/diollm1.png',
    tags: ['Jupyter Notebook', 'Python', 'Machine Learning', 'Deep learning'],
    github: 'https://github.com/mateusribeirocampos/diollm',
    demo: 'https://colab.research.google.com/github/mateusribeirocampos/diollm/blob/main/Notebooks/Project_Draft/Sistema_de_recomenda%C3%A7%C3%A3o_por_imagens_.ipynb',
  },
]; 