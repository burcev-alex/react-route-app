const API_ROOT = 'http://5ba69defe04d5100148d2a5f.mockapi.io'

export const httpGet = async endPoint => {
  try {
    const response = await fetch(`${API_ROOT}/${endPoint}`)
    const json = await response.json()
    return json
  }
  catch(err){
    console.warn('httpGet error ', err);
  }
}

// либо такой же код, без async/await
export const httpGetWithoutAsync = (endPoint) => {
  return fetch(`${API_ROOT}/${endPoint}`)
    .then(response => response.json())
    .then(json => json)   
}