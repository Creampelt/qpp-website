# Q++ Website

This website is made using [Gatsby](https://www.gatsbyjs.com/), [Contentful](https://www.contentful.com/), and [Netlify](https://www.netlify.com/). The website can be viewed at [texasqpp.com](https://texasqpp.com).

## Gatsby

To run the site locally, ensure that you have Node.js installed. Then, clone the repo and run the following command.

```shell
cd qpp-website/
npm install
npm run develop
```

Your site is now running at http://localhost:8000!

### Site structure

All the possible URLs in the site to navigate to are listed under `pages/`. Notice that these all simply redirect to different sections of the `Main` component (found under `page-sections/Main.tsx`). The other files in `page-sections/` contain the actual sections of the page, which are incorporated into `Main`. Other site components can be found under `components/`.

Note that all site data (text content and images) are queried from Contentful.

## Contentful

The site uses Contentful for its CMS (content management system). All text and images can be changed from here and the site will automatically rebuild and redeploy without needing to edit code. To get access to the Contentful space, message me on Discord ([@sturmanator#8888](https://discordapp.com/users/sturmanator#8888)).

The main section of Contentful that we are concerned with is the `Content` tab. Under this tab, we can create instances of `Content model`s that will be displayed in various sections of the website. Note that some fields (`Image`, `Section Title`, `Text`) are queried by ID, so creating new instances will have no effect on the site, while other fields (`Benefit`, `Event`, `Footer Link`, etc.) will display as many instances as are present.

## Netlify

Lastly, the site uses Netlify for hosting. Not much needs to be done from this console, as builds are auto-deployed when code is merged from PRs or when content is updated on Contentful. Netlify also has a useful Forms feature, which records submissions to forms and can send email updates when new submissions are received. [Message me](https://discordapp.com/users/sturmanator#8888) to get access to the Netlify console or receive email updates from the Get Involved form.
