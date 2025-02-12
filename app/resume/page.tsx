import Link from 'next/link'

export const dynamic = 'force-static'

export default function Page() {
  return (
    <main
      className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-11 md:p-16 dark:bg-gray-900 dark:text-white"
      id="main-content"
    >
      <section
        className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-4 dark:bg-gray-900"
        aria-label="Resume Content"
      >
        <header className="flex flex-col gap-3">
          <h1 className="mb-2 inline-flex gap-2 text-4xl font-bold">
            <span className="text-teal-500"> Mai TIEU Khoi</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            <Link href="mailto:tieukhoimai@gmail.com" className="text-teal-500 dark:text-teal-400">
              tieukhoimai@gmail.com
            </Link>{' '}
            |{' '}
            <Link href="https://tieukhoimai.me" className="text-teal-500 dark:text-teal-400">
              Website
            </Link>{' '}
            |{' '}
            <Link
              href="https://www.linkedin.com/in/tieukhoimai"
              className="text-teal-500 dark:text-teal-400"
            >
              LinkedIn
            </Link>{' '}
            |{' '}
            <Link
              href="https://github.com/tieukhoimai"
              className="text-teal-500 dark:text-teal-400"
            >
              GitHub
            </Link>
          </p>
        </header>

        <section>
          <h2 className="text-xl font-semibold">Experience</h2>
          <div>
            <h3>Analytics Project Manager & Data Analyst / Fossil Group Inc</h3>
            <p className="text-gray-500 dark:text-gray-400">Apr 2022 - Sep 2023, Vietnam</p>
            <ul className="list-disc list-inside ml-2 mt-2 pl-5 text-sm text-justify">
              <li>
                Promoted and held a dual role as Analytics Project Manager and Data Analyst in the
                2nd year.
              </li>
              <li>
                Led and coordinated cross-functional teams to establish an A/B testing workflow,
                framework, wireframes, and testing mechanisms on IoT device and application
                platforms.
              </li>
              <li>
                Planned sprint resources (2 Data Analysts), timelines, and schedules for the
                analytics section in each internal program release.
              </li>
              <li>
                Implemented metrics frameworks and dynamic dashboards to track KPIs and gain
                valuable insights into user behavior, device performance monitoring, user
                segmentation, and wellness data from wearable devices using Tableau and Looker
                Studio.
              </li>
              <li>
                Managed data pipelines, ETL processes, and ensured data accuracy on Redshift and
                BigQuery.
              </li>
              <li>
                Designed and developed an internal Tracking Event Management system, including Data
                Quality Monitoring and Self-service Analytics, which automates the generation of
                daily SQL queries on BigQuery and implements result alerts for quality assurance
                using Google Apps Script and BigQuery.
              </li>
              <li>
                Managed and published quarterly newsletters on internal Fossil Insights - a
                self-hosted website using NextJS and Ghost by Data Team and co-organized Fossil-re
                Invent sharing session series to raise data-driven awareness throughout the
                organization.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Data Analyst / Amanotes</h3>
            <p className="text-gray-500 dark:text-gray-400">Aug 2021 – Feb 2022, Vietnam</p>
            <ul className="list-disc list-inside ml-2 mt-2 pl-5 text-sm text-justify">
              <li>
                Integrated ETL data pipeline (including working with APIs, setting up data pipeline
                on BigQuery) and ensured data integrity by implementing automated data tests using
                dbt and Airflow.
              </li>
              <li>Developed dashboards in Looker Studio and Metabase.</li>
              <li>
                Analyzed user behaviors, app events, aha-moment identification, and song
                performances in the music game with the application of user segmentation,
                correlation, and cohort analysis techniques.
              </li>
              <li>
                Designed & analyzed hypothesis tests (A/B) using statistical methods for product
                experiments and carried out ad-hoc requests from business.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Software Engineer / Bosch Global Software Technologies</h3>
            <p className="text-gray-500 dark:text-gray-400">Mar 2020 – Aug 2021, Vietnam</p>
            <ul className="list-disc list-inside ml-2 mt-2 pl-5 text-sm text-justify">
              <li>
                Worked closely with Bosch Automotive Products Suzhou in automated driving domains.
              </li>
              <li>Analyzed data in the software development process and automotive radar data.</li>
              <li>Configured and maintained a data analytics tool pipeline on Jenkins.</li>
              <li>Implemented an automated database, data pipeline, and dashboard on PowerBI.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Education</h2>
          <div>
            <h3 className="font-bold">Erasmus+ / University of Oslo</h3>
            <p className="text-gray-500 dark:text-gray-400">Aug 2024 – Dec 2024, Norway</p>
          </div>
          <div>
            <h3 className="font-bold">Master of Science in Data Science / University of Verona</h3>
            <p className="text-gray-500 dark:text-gray-400">Oct 2023 – Present, Italy</p>
          </div>
          <div>
            <h3 className="font-bold">
              Bachelor of Science in Mathematics and Computer Science / Vietnam National University
              - University of Science
            </h3>
            <p className="text-gray-500 dark:text-gray-400">2017 – 2021, Vietnam</p>
          </div>
          <div>
            <h3 className="font-bold">
              Bachelor in Business Administration / Ho Chi Minh City Open University
            </h3>
            <p className="text-gray-500 dark:text-gray-400">2016 – 2020, Vietnam</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Skills</h2>
          <ul className="list-disc list-inside">
            <li>Programming: Python, Google Apps Script, VBA, NextJS </li>
            <li>Data Visualization: Tableau, Microsoft Power BI, Redash, Metabase</li>
            <li>
              Cloud and Databases: AWS (S3, Redshift, Athena), GCP (Firebase, BigQuery, Data Studio, GA4)
            </li>
          </ul>
        </section>
      </section>
    </main>
  )
}
