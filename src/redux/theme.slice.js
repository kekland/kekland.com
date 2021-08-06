import { createSlice } from '@reduxjs/toolkit'

const getSystemTheme = () => {
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

  if (darkThemeMq.matches) {
    return 'dark'
  } else {
    return 'light'
  }
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState: { value: getSystemTheme() },
  reducers: {
    toggle: (state) => {
      if (state.value === 'light') {
        state.value = 'dark'
      } else {
        state.value = 'light'
      }
    }
  },
})

export const { toggle } = themeSlice.actions
export default themeSlice.reducer
