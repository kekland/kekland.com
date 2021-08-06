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

const makeRequest = async (req) => {
  try {
    const response = await fetch(`${endpoint}${req}`)
    const data = await response.json()

    if (response.status !== 200) throw data

    return data
  }
  catch (e) {
    console.error(e)
    return null
  }
}

export const loadMyApps = async () => {
  const data = await makeRequest('/apps')
  return data
}

export const loadSingleApp = async (id) => {
  const data = await makeRequest(`/apps/${id}`)
  return data
}

export const loadRobotics = async () => {
  const data = await makeRequest('/robotics')
  return data
}

export const loadSingleRobotics = async (id) => {
  const data = await makeRequest(`/robotics/${id}`)
  return data
}

export const loadRepos = async () => {
  const data = await makeRequest(`/repos`)
  return data
}

export const loadLatestPhotos = async () => {
  const data = await makeRequest(`/photos?_sort=takenAt:desc&_limit=5`)
  return data
}

export const loadSinglePhoto = async (id) => {
  const data = await makeRequest(`/photos/${id}`)
  return data
}

export const loadSinglePhotoByGooglePhotoId = async (id) => {
  const data = await makeRequest(`/photos?gphotosId=${id}`)
  return data[0]
}

export const loadPhotos = async (skip) => {
  const data = await makeRequest(`/photos?_sort=takenAt:desc&_limit=4&_start=${skip}`)
  return data
}
