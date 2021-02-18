import { CHECK_IF_PLAYING, PAUSE, SECTIONPLAY, SONGPLAY } from '../../actions/types'

const initialState = {
  playing: false,
  sectionPlay: false,
  songPlay: false,
  song: '',
  sectionId: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_IF_PLAYING:
      return { ...state, playing: action.playing, song: action.song }
    case SONGPLAY:
      return { ...state, songPlay: action.songPlay, sectionPlay: action.sectionPlay, playing: action.playing }
    case SECTIONPLAY:
      return { ...state, songPlay: false, sectionPlay: action.sectionPlay, playing: action.playing, sectionId: action.sectionId }
    case PAUSE:
      return { ...state, songPlay: false, sectionPlay: false }
    default:
      return state
  }
}
