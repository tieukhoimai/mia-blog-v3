
# mai blog

![banner](/public/static/images/blog-screenshot.png)

## Quick start

#### 1 Clone the repository:

```bash
git clone https://github.com/tieukhoimai/mia-blog-v3
```

#### 2 Set up environment variables and configuring (if needed)

Copy the `.env.local.example` file in this directory to `.env.local`:

```bash
cp .env.local.example .env.local
```

or clone from Vercel deploy

```bash
vercel env pull .env.local
```

#### 3. Personalize `siteMetadata.js` (site related information)

#### 4. Modify the content security policy in `next.config.js` if you want to use other analytics provider or a commenting solution other than giscus.

#### 5. Personalize `authors/default.md` (main author)
#### 6. Modify `projectsData.js`
#### 7. Modify `headerNavLinks.js` to customize navigation links
#### 9. Deploy on Vercel

## Installation

```bash
yarn
```

## Development

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy

The easiest way to deploy the template is to deploy on [Vercel](https://vercel.com). Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Previous Version

This is the second version of my website. Previous version:

- https://mia-blog.vercel.app

## Credits

This repo is forked from [Tailwind nextjs starter blog template](https://github.com/timlrx/tailwind-nextjs-starter-blog).
