// src/store/networkSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NetworkState {
  cable: string;
  multicast: boolean;
  qos: boolean;
  networkType: string;
  syncProtocol: string;
  redundance: boolean;
}

const initialState: NetworkState = {
  cable: 'Cat6',
  multicast: false,
  qos: false,
  networkType: 'managed',
  syncProtocol: 'ptp',
  redundance: false,
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetworkSettings: (state, action: PayloadAction<Partial<NetworkState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setNetworkSettings } = networkSlice.actions;
export default networkSlice.reducer;
