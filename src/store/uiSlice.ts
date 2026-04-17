// src/store/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarCollapsed: boolean;
  widgetConfigOpen: boolean;
  activeModal: string | null;
}

const initialState: UiState = {
  sidebarCollapsed: false,
  widgetConfigOpen: false,
  activeModal: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    openWidgetConfig: (state) => {
      state.widgetConfigOpen = true;
    },
    closeWidgetConfig: (state) => {
      state.widgetConfigOpen = false;
    },
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarCollapsed, openWidgetConfig, closeWidgetConfig, setActiveModal } = uiSlice.actions;
export default uiSlice.reducer;
