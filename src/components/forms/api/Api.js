import axios from 'axios';

const baseURL = `${process.env.GATSBY_STRAPI_SRC}`;
const token = `a61ad819b7a9f34c01e9bb785a2c8905f755449cc9a27482ce9ecc999c58505ee00c1131a68ee5a2a3fee6559b735912be01935a850833c6e14129475fde0dcde689027d21019b46eeb877e90e934d83c94a23935cd8e1c4e4eee9c079f40f2d05b3b5fa038a4840d5eb32710331b3f79894d8b255874a027f9b23530944e071`;

const authInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
    // "Content-Type": "multipart/form-data"
  },
});


export const postFileData = async (data) => {

  const res = await authInstance.post('upload', data)
  .then((res) => {
    // Success
    if (res.statusText === 'OK') {
      return {
        success: true,
        ...res.data,
      }
    }
    return { success: false }
  })
  .catch((error) => {
    // Failed
    if (error.response) {
      return {
        success: false,
        message: error.response.data,
      }
    } else {
      // Service error
    }
  })

  return res;

}

export const postFormData = async (data) => {

  const res = await authInstance.post('/api/stb-forms/forms', data)
  .then((res) => {
    // Success
    if (res.statusText === 'OK') {
      return {
        success: true,
        ...res.data,
      }
    }
    return { success: false }
  })
  .catch((error) => {
    // Failed
    if (error.response) {
      return {
        success: false,
        message: error.response.data,
      }
    } else {
      // Service error
    }
  })

  return res;

}