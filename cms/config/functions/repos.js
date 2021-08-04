const axios = require('axios');
const GitHubColors = require('github-colors')

module.exports = async () => {
  try {
    let repoData = []

    let page = 1

    // Get all GitHub repositories
    while (true) {
      const { data } = await axios.get(`https://api.github.com/users/kekland/repos?page=${page}`);
      console.log(data.length)

      if (data.length === 0) break

      page += 1
      repoData = [...repoData, ...data]
    }

    // Map the repositories to the format defined in `repos.settings.json`
    const repos = repoData.map((v) => ({
      name: v.name,
      description: v.description,
      language: v.language,
      url: `https://github.com/kekland/${v.name}`,
      color: GitHubColors.get(v.language, true).color,
      stars: v.stargazers_count,
    }))

    // Sort them by stars
    repos.sort((a, b) => a.stars - b.stars)

    // Remove every repository saved in the database
    await strapi.query('repos').delete()

    // Re-add the new repositories
    for (const repo of repos) {
      await strapi.query('repos').create(repo)
    }
  }
  catch (e) {
    console.error(e)
  }
};
