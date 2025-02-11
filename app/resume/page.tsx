import Link from 'next/link'

export const dynamic = 'force-static'

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="m-auto flex flex-col gap-8 text-sm text-black p-8">
        <header className="flex flex-col gap-3">
          <h1
            className="mb-2 inline-flex gap-2 text-2xl font-bold"
            style={{ fontFamily: 'var(--font-lora)' }}
          >
            <span>Mai TIEU Khoi</span>
          </h1>
          <p className="text-gray-600">
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
            <h3 className="font-bold">
              Analytics Project Manager & Data Analyst / Fossil Group Inc
            </h3>
            <p className="text-gray-500">Apr 2022 - Sep 2023, Vietnam</p>
            <ul className="list-disc list-inside">
              <li>Led cross-functional teams for A/B testing and IoT analytics.</li>
              <li>Implemented dynamic dashboards with Tableau & Looker Studio.</li>
              <li>Developed internal tracking systems and automated quality checks.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Data Analyst / Amanotes</h3>
            <p className="text-gray-500">Aug 2021 – Feb 2022, Vietnam</p>
            <ul className="list-disc list-inside">
              <li>Integrated ETL data pipelines and ensured data integrity.</li>
              <li>Developed dashboards using Looker Studio and Metabase.</li>
              <li>Conducted user behavior analysis and A/B testing for product experiments.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">
              Software Engineer, Data / Bosch Global Software Technologies
            </h3>
            <p className="text-gray-500">Mar 2020 – Aug 2021, Vietnam</p>
            <ul className="list-disc list-inside">
              <li>Worked in automated driving domains and radar data analytics.</li>
              <li>Configured and maintained data pipelines on Jenkins and Power BI.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Education</h2>
          <div>
            <h3 className="font-bold">Erasmus+ program / University of Oslo</h3>
            <p className="text-gray-500">Aug 2024 – Dec 2024, Norway</p>
          </div>
          <div>
            <h3 className="font-bold">Master of Science in Data Science / University of Verona</h3>
            <p className="text-gray-500">Oct 2023 – Present, Italy</p>
          </div>
          <div>
            <h3 className="font-bold">
              Bachelor of Science in Mathematics / University of Science - Vietnam National
              University
            </h3>
            <p className="text-gray-500">Oct 2017 – Mar 2022, Vietnam</p>
            <p>
              GPA: 8.02/10.0 | Thesis: Stock-Price Forecasting using STL method based on LSTM
              (Grade: 9.5/10)
            </p>
          </div>
          <div>
            <h3 className="font-bold">
              Bachelor in Business Administration / Ho Chi Minh City Open University
            </h3>
            <p className="text-gray-500">Oct 2016 – Dec 2020, Vietnam</p>
            <p>GPA: 3.40/4.0 | Ranked 4th in overall scores</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Skills</h2>
          <ul className="list-disc list-inside">
            <li>Programming: Python, Google Apps Script, VBA, NextJS</li>
            <li>Data Visualization: Tableau, Microsoft Power BI, Redash, Metabase</li>
            <li>
              Cloud and Databases: AWS (S3, Redshift, Athena), GCP (Firebase, BigQuery, Data Studio,
              GA4)
            </li>
            <li>Languages: English (B2), Vietnamese (Native)</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
