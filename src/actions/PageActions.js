export const PHOTOS_LOADING = 'PHOTOS_LOADING'
export const PHOTOS_SUCCESS = 'PHOTOS_SUCCESS'
export const PHOTOS_FAIL = 'PHOTOS_FAIL'

let photosArr = []
let cached = false

function makeYearPhotos(photos, selectedYear) {
  let createdYear,
    yearPhotos = []

  photos.forEach(item => {
    createdYear = new Date(item.date * 1000).getFullYear()
    if (createdYear === selectedYear) {
      yearPhotos.push(item)
    }
  })

  yearPhotos.sort((a, b) => b.likes.count - a.likes.count)

  return yearPhotos
}

function getMorePhotos(offset, count, year, dispatch) {
  //eslint-disable-next-line no-undef
  VK.Api.call(
    'photos.getAll',
    { extended: 1, count: count, offset: offset, v: '5.80' },
    r => {
      try {
        photosArr = photosArr.concat(r.response.items)
        if (offset <= r.response.count) {
          offset += 200 // максимальное количество фото которое можно получить за 1 запрос
          getMorePhotos(offset, count, year, dispatch)
        } else {
          let photos = makeYearPhotos(photosArr, year)
          cached = true
          dispatch({
            type: PHOTOS_SUCCESS,
            payload: photos,
          })
        }
      } catch (e) {
        dispatch({
          type: PHOTOS_FAIL,
          error: true,
          payload: new Error(e),
        })
      }
    }
  )
}

export function getPhotos(year){
    return dispatch => {
        dispatch({
            type: PHOTOS_LOADING,
            payload: year
        })

        if (cached) {
            let photos = makeYearPhotos(photosArr, year)
            dispatch({
              type: PHOTOS_SUCCESS,
              payload: photos,
            })
          } else {
            getMorePhotos(0, 200, year, dispatch)
          }
    }
}