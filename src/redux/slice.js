import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    collapsed: false,
  },
  reducers: {
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
  },
});

// Export the reducer directly so we can use the current state values of the variables
export const { setCollapsed } = sidebarSlice.actions;