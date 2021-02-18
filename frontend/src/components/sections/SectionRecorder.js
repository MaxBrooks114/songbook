import Grid from '@material-ui/core/Grid'
import React from 'react'

import DetailAccordion from '../sharedComponents/DetailAccordion'
import RecordView from './RecordView'

const SectionRecorder = ({ section }) => {
  const renderRecorder = () => {
    return (
      <Grid item xs={10} sm={12}>
        <RecordView className="recorder" key={section.id} />
      </Grid>
    )
  }
  return (
      <DetailAccordion title="Record Yourself" renderFunction={renderRecorder} />
  )
}

export default SectionRecorder
