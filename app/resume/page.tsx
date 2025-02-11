import Link from 'next/link'

export const dynamic = 'force-static'

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-6 text-sm text-black dark:text-white p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <header className="flex flex-col gap-3 text-center">
        <h1 className="mb-2 inline-flex gap-2 text-2xl font-bold justify-center">
          <span>Mai TIEU Khoi</span>
          <span className="text-teal-500">Résumé</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          1998 |{' '}
          <Link href="mailto:tieukhoimai@gmail.com" className="text-blue-500">
            tieukhoimai@gmail.com
          </Link>{' '}
          |{' '}
          <Link href="https://tieukhoimai.me" className="text-blue-500">
            Website
          </Link>{' '}
          |{' '}
          <Link href="https://www.linkedin.com/in/tieukhoimai" className="text-blue-500">
            LinkedIn
          </Link>{' '}
          |{' '}
          <Link href="https://github.com/tieukhoimai" className="text-blue-500">
            GitHub
          </Link>
        </p>
      </header>
      <section>
        <h2 className="text-xl font-semibold">Experience</h2>
        <div>
          <h3 className="font-bold">Analytics Project Manager & Data Analyst / Fossil Group Inc</h3>
          <p className="text-gray-500 dark:text-gray-400">Apr 2022 - Sep 2023, Vietnam</p>
          <ul className="list-disc list-inside">
            <li>Led cross-functional teams for A/B testing and IoT analytics.</li>
            <li>Implemented dynamic dashboards with Tableau & Looker Studio.</li>
            <li>Developed internal tracking systems and automated quality checks.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Data Analyst / Amanotes</h3>
          <p className="text-gray-500 dark:text-gray-400">Jan 2021 - Mar 2022, Vietnam</p>
          <ul className="list-disc list-inside">
            <li>Analyzed user data to improve app engagement and retention.</li>
            <li>Created reports and visualizations to support decision-making.</li>
            <li>Collaborated with product teams to define and track KPIs.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">
            Software Engineer Intern / Bosch Global Software Technologies
          </h3>
          <p className="text-gray-500 dark:text-gray-400">Jun 2020 - Dec 2020, Vietnam</p>
          <ul className="list-disc list-inside">
            <li>Developed and maintained internal tools for data processing.</li>
            <li>Assisted in the development of software solutions for clients.</li>
            <li>Participated in code reviews and team meetings.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Education</h2>
        <div>
          <h3 className="font-bold">Master of Science in Data Science / University of Verona</h3>
          <p className="text-gray-500 dark:text-gray-400">Oct 2023 – Present, Italy</p>
        </div>
        <div>
          <h3 className="font-bold">
            Bachelor of Science in Computer Science / University of Oslo
          </h3>
          <p className="text-gray-500 dark:text-gray-400">Sep 2019 – Jun 2023, Norway</p>
        </div>
        <div>
          <h3 className="font-bold">Exchange Program / University of Verona</h3>
          <p className="text-gray-500 dark:text-gray-400">Jan 2022 – Jun 2022, Italy</p>
        </div>
        <div>
          <h3 className="font-bold">
            Bachelor of Science in Information Technology / Ho Chi Minh City University of Science
          </h3>
          <p className="text-gray-500 dark:text-gray-400">Sep 2016 – Jun 2019, Vietnam</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Skills</h2>
        <ul className="list-disc list-inside">
          <li>Data Analysis: Python, R, SQL, Excel</li>
          <li>Data Visualization: Tableau, Looker Studio, Matplotlib, Seaborn</li>
          <li>Programming: Python, JavaScript, TypeScript, Java</li>
          <li>Web Development: React, Next.js, Node.js</li>
          <li>Tools: Git, Docker, Jenkins</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Languages</h2>
        <ul className="list-disc list-inside">
          <li>English: Fluent</li>
          <li>Vietnamese: Native</li>
        </ul>
      </section>
    </div>
  )
}
