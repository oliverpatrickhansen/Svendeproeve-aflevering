import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toggleModal: false,
  //If false then render Login
  renderRegister: true,
}

export const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    toggleOnRegister: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.renderRegister = true
      state.toggleModal = true
    },
    toggleOnLogin: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.renderRegister = false
      state.toggleModal = true
    },
    toggleOff: (state) => {
      state.toggleModal = false
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { toggleOnRegister,toggleOnLogin, toggleOff,  } = sliderSlice.actions

export default sliderSlice.reducer