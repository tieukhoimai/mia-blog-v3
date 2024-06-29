interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: 'Probability for DS',
    description: `My personal lecture notes from class Probability for data science (2023/2024) at University of Verona`,
    imgSrc: '/static/learning/probability.jpeg',
    href: 'https://tieukhoimai.notion.site/Probability-c36660af652745a4bff26304a50b8a8f',
  },
  {
    title: 'Programming and Database',
    description: `My personal lecture notes from class Programming and database (2023/2024) at University of Verona`,
    imgSrc: '/static/learning/programming.jpg',
    href: 'https://tieukhoimai.notion.site/Programming-and-Database-9739069cf4ee490cb2560807a25dca90?pvs=4',
  },
  {
    title: 'Machine learning',
    description: `My personal lecture notes from class Machine learning for data science (2023/2024) at University of Verona`,
    imgSrc: '/static/learning/machine_learning.jpg',
    href: 'https://tieukhoimai.notion.site/Machine-Learning-59b0bd636e8a481b9d2f151e14aa3c13?pvs=4',
  },
]

export default projectsData
