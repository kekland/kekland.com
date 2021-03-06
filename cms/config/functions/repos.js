const axios = require('axios');
const GitHubColors = require('github-colors')

module.exports = async () => {
  strapi.log.debug(`GitHub: Starting`)
  try {
    const username = strapi.config.get('server.github.username')

    let repoData = []
    let page = 1

    // Get all GitHub repositories
    while (true) {
      const { data } = await axios.get(`https://api.github.com/users/${username}/repos?page=${page}`);

      if (data.length === 0) break

      page += 1
      repoData = [...repoData, ...data]
    }

    // Map the repositories to the format defined in `repos.settings.json`
    const repos = repoData.map((v) => ({
      name: v.name,
      description: v.description,
      language: v.language,
      url: `https://github.com/${username}/${v.name}`,
      color: GitHubColors.get(v.language, true).color,
      stars: v.stargazers_count,
    }))

    // Sort them by stars
    repos.sort((a, b) => a.stars - b.stars)

    // Remove every repository saved in the database
    await strapi.query('repos').delete()
    await strapi.connections.default.raw(`UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='repos';`)

    // Re-add the new repositories
    for (const repo of repos) {
      await strapi.query('repos').create(repo)
    }

    strapi.log.debug(`GitHub: Finished, added ${repos.length} repos`)
    return true
  }
  catch (e) {
    strapi.log.error(`GitHub: Failed`, e)
    return false
  }
};
