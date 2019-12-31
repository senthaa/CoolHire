import request from '@/utils/request';
export async function Register(params) {

  console.log(params);

  return request('/api/signup', {
    method: 'POST',
    data: params,
  });
}

