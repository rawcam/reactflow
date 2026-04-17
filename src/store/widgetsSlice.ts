// src/store/widgetsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WidgetId = 
  | 'companyFinance'
  | 'projectsFinance'
  | 'service'
  | 'workload'
  | 'risks'
  | 'carousel';

export type DisplayMode = 'normal' | 'compact';

interface WidgetsState {
  visibleWidgets: WidgetId[];
  displayMode: DisplayMode;
}

const defaultVisible: WidgetId[] = ['companyFinance', 'projectsFinance', 'service', 'workload', 'risks', 'carousel'];

const rolePresets: Record<string, WidgetId[]> = {
  director: ['companyFinance', 'projectsFinance', 'risks', 'carousel'],
  pm: ['projectsFinance', 'service', 'workload', 'risks', 'carousel'],
  engineer: ['service', 'workload', 'carousel'],
  designer: ['carousel'],
  logist: ['carousel'],
};

const initialState: WidgetsState = {
  visibleWidgets: defaultVisible,
  displayMode: 'normal',
};

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    toggleWidget: (state, action: PayloadAction<WidgetId>) => {
      const id = action.payload;
      if (state.visibleWidgets.includes(id)) {
        state.visibleWidgets = state.visibleWidgets.filter(w => w !== id);
      } else {
        state.visibleWidgets.push(id);
      }
    },
    setDisplayMode: (state, action: PayloadAction<DisplayMode>) => {
      state.displayMode = action.payload;
    },
    resetToRolePreset: (state, action: PayloadAction<string>) => {
      state.visibleWidgets = rolePresets[action.payload] || defaultVisible;
    },
    setVisibleWidgets: (state, action: PayloadAction<WidgetId[]>) => {
      state.visibleWidgets = action.payload;
    },
  },
});

export const { toggleWidget, setDisplayMode, resetToRolePreset, setVisibleWidgets } = widgetsSlice.actions;
export default widgetsSlice.reducer;
