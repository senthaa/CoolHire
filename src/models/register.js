import { stringify } from 'querystring';
import router from 'umi/router';
import {  Register } from '@/services/register';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import {getAuthority} from "../utils/authority";
const Model = {
  namespace: 'register',
  state: {
    status: undefined,
  },
  effects: {
    *register({ payload }, { call, put }) {
      const response = yield call(Register, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      if (response.status === 'ok') {

        const urlParams = new URL(window.location.href);

        const params = getPageQuery();

        let { redirect } = params;

        if (redirect) {

          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        router.replace(redirect || '/driver/home/welcome');
      }
      else if (response.status === 'USER ALREADY EXIST') {

      }
    },



    logout() {
      const { redirect } = getPageQuery();
      if (window.location.pathname !== '/login' && !redirect) {
        router.replace({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {


      setAuthority(payload.token);
      return { ...state, status:payload.status, token:payload.token};
    },
  },
};
export default Model;
