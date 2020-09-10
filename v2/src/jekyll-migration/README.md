Put pages in this directory that are a work-in-progress and should not deploy to production.
In production, these pages will automatically produce a redirect of the form: `/<page-name>/` -> `/<page-name>.html`
This is to facilitate the migration from Jekyll (v1) to Gatsby (v2), so that any Gatsby pages
linking to the work-in-progress pages will appropriately redirect to their Jekyll counterparts
during the transition.
