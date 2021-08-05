const endpoint = 'https://kekland.com/api';

export const getImageUrl = (img) => {
  return `${endpoint}${img.url}`
}

export const loadMyApps = async () => {
  const response = await fetch(`${endpoint}/apps`)
  const data = await response.json()
  
  console.log(data)
  return data
}

export const loadRobotics = async () => {
  const response = await fetch(`${endpoint}/robotics`)
  const data = await response.json()
  
  return data
}

export const loadRepos = async () => {
  const response = await fetch(`${endpoint}/repos`)
  const data = await response.json()
  
  return data
}