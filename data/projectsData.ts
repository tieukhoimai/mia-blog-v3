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
    description: `My personal lecture notes from course Statistical learning (2023/2024) at University of Verona`,
    imgSrc: '/static/learning/statistical_learning.jpg',
    href: 'https://tieukhoimai.notion.site/Statistical-Learning-927bd5d75bce4999b8f78db0944e1b1d?pvs=4',
  },
]

export default projectsData
