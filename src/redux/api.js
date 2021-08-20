import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// eslint-disable-next-line no-undef
const isProduction = process.env.NODE_ENV == 'production'
export const endpoint = isProduction ? 'https://kekland.com/api' : 'http://localhost:1337';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: endpoint }),
  endpoints: (builder) => ({
    getContent: builder.query({ query: () => `/content` }),
    getApps: builder.query({ query: () => `/apps` }),
    getApp: builder.query({ query: (id) => `/apps/${id}` }),
    getRepos: builder.query({ query: () => `/repos` }),
    getLatestPhotos: builder.query({ query: (count) => `/photos?_sort=id:desc&_limit=${count}` }),
    getSinglePhoto: builder.query({ query: (id) => `/photos/${id}` }),
    getSinglePhotoByGooglePhotosId: builder.query({
      query: (id) => `/photos?gphotosId=${id}`,
      transformResponse: (response) => response[0],
    }),
    getPhotosPaginated: builder.query({ query: (skip) => `/photos?&_limit=9&_start=${skip}` }),
    getSinglePhotoAuto: builder.query({
      async queryFn(arg, api, _, fetch) {
        if (parseInt(arg)) {
          return fetch(`/photos/${arg}`)
        }
        else if (arg.startsWith('uploads_')) {
          return { data: { url: arg.replace('uploads_', `${endpoint}/uploads/`) } }
        }
        else {
          return fetch(`/photos/?gphotosId=${arg}`)
        }
      }
    }),
    getWorkExperience: builder.query({ query: () => `/experiences?_sort=startDate:desc` }),
    getEducation: builder.query({ query: () => `/educations?_sort=startDate:desc` }),
    getLastPlayed: builder.query({ query: () => `/scrobbles?_limit=1`, transformResponse: (v) => v[0] }),
    getScrobbles: builder.query({ query: () => `/scrobbles?_sort=id:desc` }),
    getTechnologies: builder.query({query: () => `/technologies?_sort=proficiency:desc`}),
  }),
})

export const {
  useGetContentQuery,
  useGetAppsQuery,
  useGetAppQuery,
  useGetReposQuery,
  useGetLatestPhotosQuery,
  useGetSinglePhotoQuery,
  useGetSinglePhotoByGooglePhotosIdQuery,
  useGetPhotosPaginatedQuery,
  useGetSinglePhotoAutoQuery,
  useGetWorkExperienceQuery,
  useGetEducationQuery,
  useGetLastPlayedQuery,
  useGetScrobblesQuery,
  useGetTechnologiesQuery,
} = api