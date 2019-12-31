import request from '@/utils/request';
import {getAuthority} from "../utils/authority";
export async function saveLocation(params) {

  console.log(params);


  const auth= "Bearer "+ getAuthority().toString();


  return request('/api/saveLocation', {
    method: 'POST',
    data: params,
    headers: {
      Authorization: auth,
    }
  });
}





