interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: 'Probability for Data Science',
    description: `My personal lecture notes from course Probability for data science (2023/2024) at University of Verona`,
    imgSrc: '/static/learning/probability.jpeg',
    href: 'https://tieukhoimai.notion.site/Probability-c36660af652745a4bff26304a50b8a8f',
  },
  {
    title: 'Programming and Database',
    description: `My personal lecture notes from course Programming and database (2023/2024) at University of Verona`,
    imgSrc: '/static/learning/programming.jpg',
    href: 'https://tieukhoimai.notion.site/Programming-and-Database-9739069cf4ee490cb2560807a25dca90?pvs=4',
  },
  {
    title: 'Machine learning',
    description: `My personal lecture notes from course Machine learning for data science (2023/2024) at University of Verona`,
    imgSrc: '/static/learning/machine_learning.jpg',
    href: 'https://tieukhoimai.notion.site/Machine-Learning-59b0bd636e8a481b9d2f151e14aa3c13?pvs=4',
  },
  {
    title: 'Statistical learning',
    description: `My personal lecture notes from course Statistical learning (2023/2024) at University of Verona and course STK-IN4300 - Statistical Learning Methods in Data Science (2024/2025) at University of Oslo`,
    imgSrc: '/static/learning/statistical_learning.jpg',
    href: 'https://tieukhoimai.notion.site/Statistical-Learning-927bd5d75bce4999b8f78db0944e1b1d?pvs=4',
  },
  {
    title: 'Natural Language Processing',
    description: `My personal lecture notes from course IN4080 - Natural Language Processing (2024/2025) at University of Oslo`,
    imgSrc: '/static/learning/nlp.jpeg',
    href: 'https://tieukhoimai.notion.site/IN4080-Natural-Language-Processing-4bc5ec594cec4e8c869a5d7164560b23?pvs=4',
  },
  {
    title: 'Ethical Hacking',
    description: `My personal lecture notes from course IN5290 - Ethical Hacking (2024/2025) at University of Oslo`,
    imgSrc: '/static/learning/ethical_hacking.jpeg',
    href: 'https://tieukhoimai.notion.site/All-in-one-IN5290-Ethical-Hacking-131e9d26b70080d1936ecbaeda66c25d?pvs=4',
  },
  {
    title: 'Data Visualization',
    description: `My personal lecture notes from course Data Visualization (2024/2025) at University of Verona`,
    imgSrc: '/static/learning/data_viz.jpeg',
    href: 'https://tieukhoimai.notion.site/Data-Visualization-04740f5e06a34588be315bfae414cddf?pvs=4',
  },
]

export default projectsData
