export const renderBool = (bool) => {
  return bool ? 'Yes' : 'No'
}

export const renderText = (list, v) => {
  return v || v === 0 ? list.find((k) => k[v])[v] : null
}

export const millisToMinutesAndSeconds = (millis) => {
  const minutes = Math.floor(millis / 60000)
  const seconds = ((millis % 60000) / 1000).toFixed(0)
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

export const sec2time = (timeInSeconds) => {
  const pad = function (num, size) {
    return ('000' + num).slice(size * -1)
  }
  const time = parseFloat(timeInSeconds).toFixed(3)
  const minutes = Math.floor(time / 60) % 60
  const seconds = Math.floor(time - minutes * 60)

  return pad(minutes, 2) + ':' + pad(seconds, 2)
}

export const normalize = (list, v) => {
  return v ? Object.keys(list.find((value) => Object.values(value)[0] === v))[0] : null
}

export const audioFeaturesToText = (feature) => {
  switch (true) {
    case feature === null:
      return 'N/A'

    case feature <= 0.35:
      return 'low'

    case feature > 0.35 && feature <= 0.7:
      return 'medium'

    case feature > 0.7:
      return 'high'

    default:
      return 'N/A'
  }
}
export const audioFeaturesToNumbers = (feature) => {
  switch (true) {
    case feature === null:
      return 'N/A'

    case feature <= 0.35:
      return 1

    case feature > 0.35 && feature <= 0.7:
      return 2

    case feature > 0.7:
      return 3

    default:
      return 'N/A'
  }
}

export const titleCase = (s) => {
  return typeof s === 'string'
    ? s
      .replace(/([^A-Z])([A-Z])/g, '$1 $2') // split cameCase
      .replace(/[_\-]+/g, ' ') // split snake_case and lisp-case
      .toLowerCase()
      .replace(/(^\w|\b\w)/g, function (m) { return m.toUpperCase() }) // title case words
      .replace(/\s+/g, ' ') // collapse repeated whitespace
      .replace(/^\s+|\s+$/, '') // remove leading/trailing whitespace
    : s
}
