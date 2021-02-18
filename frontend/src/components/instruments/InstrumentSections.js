import Grid from '@material-ui/core/Grid'
import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'

import DetailAccordion from '../sharedComponents/DetailAccordion'
import SongSections from '../sharedComponents/SongSections'

const InstrumentSections = ({ instrument }) => {
  const sections = useSelector(state => Object.values(state.sections).filter(section => section.instruments.includes(instrument.id)))
  const songs = _.uniqBy(sections.map(section => section.song), 'id')
  const renderSongs = () => {
    return songs
      ? songs.map((song) => {
        return (
          <Grid item key={song.id} xs={12}>
            <SongSections song={song} instrument={instrument} />
          </Grid>
        )
      })
      : null
  }

  return (
    <DetailAccordion title="Sections" renderFunction={renderSongs} />
  )
}

export default InstrumentSections
