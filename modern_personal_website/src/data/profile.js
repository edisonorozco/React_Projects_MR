// Links shown across the site. An empty string hides that link until it is filled in.
export const profile = {
    email: 'edison.orozco@outlook.com',
    github: 'https://github.com/edisonorozco',
    linkedin: '', // TODO: public LinkedIn profile URL (the old one pointed to the settings page)
    cv: '',       // TODO: URL or /path of the CV PDF (the old John-Cv.pdf was a blank template file)
};

export const projectLinks = {
    deployPlatform: 'https://github.com/edisonorozco/aws_portfolio_web',
    profecan: '',    // TODO: public URL of the Profecan site
    rionegro: '',    // TODO: public URL of the apartment rental page
    movieSearch: '', // TODO: demo URL once it is live
};

// Injected at build time by CI (see .github/workflows/_s3-site.yml). Empty on local builds.
export const build = {
    commit: (process.env.REACT_APP_GIT_SHA || '').slice(0, 7),
    date: (process.env.REACT_APP_BUILD_DATE || '').slice(0, 10),
};
