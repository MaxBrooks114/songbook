import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

import keys from '../../dataToImport/keys'
import modes from '../../dataToImport/modes'
import { renderBool, renderText, titleCase } from '../../helpers/detailHelpers'
import DetailAccordion from './DetailAccordion'

const useStyles = makeStyles((theme) => ({

  info: {
    fontSize: '.9rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '.8rem'

    }
  }

}))
const Features = ({ song, section, instrument, objectType }) => {
  const classes = useStyles()

  const item = song || section || instrument

  const features = {
    song: ['genre', 'key', 'tempo', 'time_signature', 'explicit', 'original'],
    section: ['key', 'tempo', 'time_signature', 'learned'],
    instrument: ['name', 'year', 'make', 'model', 'family', 'tonal_range']
  }

  const renderInfo = (item, feature) => {
    switch (true) {
      case feature === 'key':
        return `${renderText(keys, item.key)} ${renderText(modes, item.mode)}`
      case feature === 'tempo':
        return <>{item[feature]} BPM</>
      case typeof item[feature] === 'boolean':
        return renderBool(item[feature])
      case feature === 'time_signature':
        return `${item[feature]}/4`
      default:
        return item[feature]
    }
  }

  const renderFeatures = () => {
    return features[objectType].map((feature, index) => {
      return index % 2 === 0
        ? (<React.Fragment key={index}>
        <Grid item xs={0} lg={2} />
          <Grid item xs={7} lg={5}>
            <Typography>{titleCase(feature)}: <span className={classes.info}>{renderInfo(item, feature)}</span></Typography>
          </Grid> </React.Fragment>)
        : <Grid item xs={7} lg={5} key={index}>
            <Typography>{titleCase(feature)}: <span className={classes.info}>{renderInfo(item, feature)}</span></Typography>
          </Grid>
    })
  }

  return (
    <DetailAccordion title="Features" justify="center" renderFunction={renderFeatures} />
  )
}

export default Features
