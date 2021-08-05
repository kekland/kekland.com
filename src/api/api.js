const isProduction = process.env.NODE_ENV == 'production'
const endpoint = isProduction ? 'https://kekland.com/api' : 'http://localhost:1337';

export const getImageUrl = (img) => {
  return `${endpoint}${img.url}`
}

export const getImageMediumUrl = (img) => {
  if (img.formats.medium) {
    return `${endpoint}${img.formats.medium.url}`
  }

  return getImageUrl(img)
}

export const getImageSmallUrl = (img) => {
  if (img.formats.small) {
    return `${endpoint}${img.formats.small.url}`
  }

  return getImageUrl(img)
}

let cache = {
  apps: {},
  robotics: {},
  repos: {},
}

export const loadMyApps = async () => {
  const response = await fetch(`${endpoint}/apps`)
  const data = await response.json()

  cache.apps = data

  return data
}

export const loadSingleApp = async (id) => {
  if (cache.apps[id]) return cache.apps[id]

  const response = await fetch(`${endpoint}/apps/${id}`)
  const data = await response.json()

  return data
}

export const loadRobotics = async () => {
  const response = await fetch(`${endpoint}/robotics`)
  const data = await response.json()

  cache.robotics = data

  return data
}

export const loadSingleRobotics = async (id) => {
  if (cache.robotics[id]) return cache.robotics[id]

  const response = await fetch(`${endpoint}/robotics/${id}`)
  const data = await response.json()

  return data
}

export const loadRepos = async () => {
  const response = await fetch(`${endpoint}/repos`)
  const data = await response.json()

  cache.repos = data

  return data
}

export const loadLatestPhotos = async () => {
  const response = await fetch(`${endpoint}/photos?_sort=takenAt:desc&_limit=5`)
  const data = await response.json()

  return data
}

export const loadSinglePhoto = async (id) => {
  const response = await fetch(`${endpoint}/photos/${id}`)
  const data = await response.json()

  return data
}

export const loadPhotos = async (skip) => {
  const response = await fetch(`${endpoint}/photos?_sort=takenAt:desc&_limit=4&_start=${skip}`)
  const data = await response.json()

  return data
}
