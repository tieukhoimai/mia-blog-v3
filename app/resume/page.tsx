import Link from 'next/link'
import Image from 'next/image'

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
        <header className="flex flex-col gap-4">
          <h1 className="inline-flex gap-2 text-4xl font-bold">
            <span className="text-gray-900 dark:text-gray-100"> Mai TIEU Khoi</span>
          </h1>
        </header>
        {/* -- */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold flex flex-col text-teal-500">Experience</h2>
          {/* --- */}
          <div className="flex flex-col gap-1">
            <h3 className="inline-flex items-center gap-2 text-base font-bold text-gray-900 dark:text-gray-200">
              <span>{'Analytics Project Manager & Data Analyst'}</span>
              <span> / </span>
              <Link
                href="https://www.fossilgroup.com"
                className="group m-0 p-0 inline-flex items-center gap-1  hover:underline hover:decoration-slate-300 hover:decoration-wavy hover:decoration-1 hover:underline-offset-4"
              >
                <div className="relative">
                  <Image
                    src="/static/cv/fossil-group.jpg"
                    alt="Fossil Group Inc"
                    width={600}
                    height={600}
                    className="h-6 w-auto grayscale group-hover:grayscale-0"
                  />
                </div>
                <span>{'Fossil Group Inc'}</span>
              </Link>
            </h3>
            <div className="group inline-flex gap-2 text-xs uppercase text-gray-500 dark:text-gray-400">
              Apr 2022 - Sep 2023, Vietnam
            </div>
            <ul className="ml-2 mt-2 list-disc pl-5 text-sm">
              <li className="mt-1">
                Promoted and held a dual role as Analytics Project Manager and Data Analyst in the
                2nd year.
              </li>
              <li className="mt-1">
                Led and coordinated cross-functional teams to establish an A/B testing workflow,
                framework, wireframes, and testing mechanisms on IoT device and application
                platforms.
              </li>
              <li className="mt-1">
                Planned sprint resources (2 Data Analysts), timelines, and schedules for the
                analytics section in each internal program release.
              </li>
              <li className="mt-1">
                Implemented metrics frameworks and dynamic dashboards to track KPIs and gain
                valuable insights into user behavior, device performance monitoring, user
                segmentation, and wellness data from wearable devices using Tableau and Looker
                Studio.
              </li>
              <li className="mt-1">
                Managed data pipelines, ETL processes, and ensured data accuracy on Redshift and
                BigQuery.
              </li>
              <li className="mt-1">
                Designed and developed an internal Tracking Event Management system, including Data
                Quality Monitoring and Self-service Analytics, which automates the generation of
                daily SQL queries on BigQuery and implements result alerts for quality assurance
                using Google Apps Script and BigQuery.
              </li>
              <li className="mt-1">
                Managed and published quarterly newsletters on internal Fossil Insights - a
                self-hosted website using NextJS and Ghost by Data Team and co-organized Fossil-re
                Invent sharing session series to raise data-driven awareness throughout the
                organization.
              </li>
            </ul>
          </div>
          {/* ---- */}
          <div className="flex flex-col gap-1">
            <h3 className="inline-flex items-center gap-2 text-base font-bold text-gray-900 dark:text-gray-200">
              <span>{'Data Analyst'}</span>
              <span> / </span>
              <Link
                href="https://www.amanotes.com"
                className="group m-0 p-0 inline-flex items-center gap-1  hover:underline hover:decoration-slate-300 hover:decoration-wavy hover:decoration-1 hover:underline-offset-4"
              >
                <div className="relative">
                  <Image
                    src="/static/cv/amanotes.webp"
                    alt="Amanotes"
                    width={600}
                    height={600}
                    className="h-6 w-auto grayscale group-hover:grayscale-0 "
                  />
                </div>
                <span>{'Amanotes'}</span>
              </Link>
            </h3>
            <div className="group inline-flex gap-2 text-xs uppercase text-gray-500 dark:text-gray-400">
              Aug 2021 – Feb 2022, Vietnam
            </div>
            <ul className="ml-2 mt-2 list-disc pl-5 text-sm">
              <li className="mt-1">
                Integrated ETL data pipeline (including working with APIs, setting up data pipeline
                on BigQuery) and ensured data integrity by implementing automated data tests using
                dbt and Airflow.
              </li>
              <li className="mt-1">
                Analyzed user behaviors, app events, aha-moment identification, and song
                performances in the music game with the application of user segmentation,
                correlation, and cohort analysis techniques.
              </li>
              <li className="mt-1">
                Designed & analyzed hypothesis tests (A/B) using statistical methods for product
                experiments and carried out ad-hoc requests from business.
              </li>
            </ul>
          </div>

          {/* ---- */}
          <div className="flex flex-col gap-1">
            <h3 className="inline-flex items-center gap-2 text-base font-bold text-gray-900 dark:text-gray-200">
              <span>{'Software Engineer'}</span>
              <span> / </span>
              <Link
                href="https://www.bosch-softwaretechnologies.com/en/"
                className="group m-0 p-0 inline-flex items-center gap-1  hover:underline hover:decoration-slate-300 hover:decoration-wavy hover:decoration-1 hover:underline-offset-4"
              >
                <div className="relative">
                  <Image
                    src="/static/cv/bosch.svg"
                    alt="Bosch"
                    width={600}
                    height={600}
                    className="h-3 w-auto grayscale group-hover:grayscale-0"
                  />
                </div>
                <span>{'Bosch Global Software Technologie'}</span>
              </Link>
            </h3>
            <div className="group inline-flex gap-2 text-xs uppercase text-gray-500 dark:text-gray-400">
              Aug 2021 – Feb 2022, Vietnam
            </div>
            <ul className="ml-2 mt-2 list-disc pl-5 text-sm">
              <li className="mt-1">
                Worked closely with Bosch Automotive Products Suzhou in automated driving domains.
              </li>
              <li className="mt-1">
                Analyzed data in the software development process and automotive radar data.
              </li>
              <li className="mt-1">
                Configured and maintained a data analytics tool pipeline on Jenkins.
              </li>
              <li className="mt-1">
                Implemented an automated database, data pipeline, and dashboard on PowerBI.
              </li>
            </ul>
          </div>
        </section>
        {/* EDUCATION SECTION */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold flex flex-col text-teal-500">Education</h2>
          {/* --- */}
          <div className="flex flex-col gap-1">
            <h3 className="inline-flex items-center gap-2 text-base font-bold text-gray-900 dark:text-gray-200">
              <span>{'Erasmus+ Programme'}</span>
              <span> / </span>
              <Link
                href="https://www.uio.no/english/"
                className="group m-0 p-0 inline-flex items-center gap-1  hover:underline hover:decoration-slate-300 hover:decoration-wavy hover:decoration-1 hover:underline-offset-4"
              >
                <div className="relative">
                  <Image
                    src="/static/cv/UiO.png"
                    alt="UiO"
                    width={600}
                    height={600}
                    className="h-6 w-auto grayscale group-hover:grayscale-0"
                  />
                </div>
                <span>{'University of Oslo'}</span>
              </Link>
            </h3>
            <div className="group inline-flex gap-2 text-xs uppercase text-gray-500 dark:text-gray-400">
              Aug 2024 - Dec 2024, Norway
            </div>
          </div>
          {/* ---- */}
          <div className="flex flex-col gap-1">
            <h3 className="inline-flex items-center gap-2 text-base font-bold text-gray-900 dark:text-gray-200">
              <span>{'Master of Science in Data Science'}</span>
              <span> / </span>
              <Link
                href="https://www.univr.it/en/"
                className="group m-0 p-0 inline-flex items-center gap-1  hover:underline hover:decoration-slate-300 hover:decoration-wavy hover:decoration-1 hover:underline-offset-4"
              >
                <div className="relative">
                  <Image
                    src="/static/cv/univr.png"
                    alt="Univr"
                    width={1000}
                    height={400}
                    className="h-6 w-auto grayscale group-hover:grayscale-0 "
                  />
                </div>
                <span>{'University of Verona'}</span>
              </Link>
            </h3>
            <div className="group inline-flex gap-2 text-xs uppercase text-gray-500 dark:text-gray-400">
              Oct 2023 – Present, Italy
            </div>
          </div>
          {/* ---- */}
          <div className="flex flex-col gap-1">
            <h3 className="inline-flex items-center gap-2 text-base font-bold text-gray-900 dark:text-gray-200">
              <span>{'Bachelor of Mathematics and Computer Science'}</span>
              <span> / </span>
              <Link
                href="https://en.hcmus.edu.vn/"
                className="group m-0 p-0 inline-flex items-center gap-1  hover:underline hover:decoration-slate-300 hover:decoration-wavy hover:decoration-1 hover:underline-offset-4"
              >
                <div className="relative">
                  <Image
                    src="/static/cv/hcmus.png"
                    alt="HCMUS"
                    width={600}
                    height={600}
                    className="h-8 w-auto grayscale group-hover:grayscale-0 "
                  />
                </div>
                <span>{'VNUHCM - University of Science'}</span>
              </Link>
            </h3>
            <div className="group inline-flex gap-2 text-xs uppercase text-gray-500 dark:text-gray-400">
              Aug 2017 – Dec 2021, Vietnam
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="inline-flex items-center gap-2 text-base font-bold text-gray-900 dark:text-gray-200">
              <span>{'Bachelor in Business Administration'}</span>
              <span> / </span>
              <Link
                href="http://en.ou.edu.vn/"
                className="group m-0 p-0 inline-flex items-center gap-1  hover:underline hover:decoration-slate-300 hover:decoration-wavy hover:decoration-1 hover:underline-offset-4"
              >
                <div className="relative">
                  <Image
                    src="/static/cv/hcmou.png"
                    alt="HCMOU"
                    width={300}
                    height={300}
                    className="h-5 w-auto grayscale group-hover:grayscale-0 "
                  />
                </div>
                <span>{'Ho Chi Minh City Open University'}</span>
              </Link>
            </h3>
            <div className="group inline-flex gap-2 text-xs uppercase text-gray-500 dark:text-gray-400">
              Oct 2016 – Dec 2020, Vietnam
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold flex flex-col text-teal-500">Skills</h2>
          <ul className="list-disc pl-5 text-sm">
            <li className="mt-1">Programming: Python, Google Apps Script, VBA, NextJS</li>
            <li className="mt-1">
              Data Visualization: Tableau, Microsoft Power BI, Redash, Metabase
            </li>
            <li className="mt-1">
              Cloud and Databases: AWS (S3, Redshift, Athena), GCP (Firebase, BigQuery, Looker, GA4)
            </li>
          </ul>
        </section>
      </section>
    </main>
  )
}
