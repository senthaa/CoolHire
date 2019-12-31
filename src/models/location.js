import { stringify } from 'querystring';
import router from 'umi/router';
import {saveLocation } from '@/services/location';

const Model = {
  namespace: 'location',

  state: {
    status: undefined,
  },

  effects: {
    *saveLocation({ payload }, { call, put }) {

      const response = yield call(saveLocation, payload);
      yield put({
        type: 'changesaveLocation',
        payload: response,
      }); 

    },


  },
  reducers: {

    changesaveLocation(state, { payload }) {
      return { ...state};
    },
  },
};
export default Model;
