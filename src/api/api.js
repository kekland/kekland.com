const isProduction = process.env.NODE_ENV == 'production'
export const endpoint = isProduction ? 'https://kekland.com/api' : 'http://localhost:1337';

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


export const loadPhotos = async (skip) => {
  const data = await makeRequest(`/photos?_limit=9&_start=${skip}`)
  return data
}
