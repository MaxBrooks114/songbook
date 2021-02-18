
import Metronome from '@kevinorriss/react-metronome'
import Grid from '@material-ui/core/Grid'
import React from 'react'

import DetailAccordion from '../sharedComponents/DetailAccordion'

const SectionMetronome = ({ section }) => {
  const renderMetronome = () => {
    return (
      <>
      <Grid item xs={2} lg={3}/>
      <Grid item xs={8} lg={6} >
        <Metronome
          playPauseStyle={{ background: '#f0f0f0', color: 'black', marginLeft: '1rem' }}
          bpmStyle= {{ fontSize: '1rem', fontFamily: 'Spartan' }}
          bpmTagStyle={{ fontFamily: 'Spartan' }}
          plusStyle	=	{{
            background: '#f0f0f0',
            color: 'black'
          }}
          minusStyle	=	{{
            background: '#f0f0f0',
            color: 'black'
          }}
          handleStyle={{ border: 'black' }}
          trackStyle={{ backgroundColor: 'black' }}
          railStyle={{ border: 'black' }}
          sliderStyle={{ border: 'black' }}
          key={section.id}
          startBpm={section.tempo}/>
      </Grid>
      <Grid item xs={2} lg={3}/>
    </>
    )
  }

  return (
    <DetailAccordion title="Metronome" renderFunction={renderMetronome}/>
  )
}

export default SectionMetronome
