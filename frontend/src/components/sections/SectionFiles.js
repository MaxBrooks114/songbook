import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deleteFile } from '../../actions/files'
import { titleCase } from '../../helpers/detailHelpers'
import DetailAccordion from '../sharedComponents/DetailAccordion'
import Player from './Player'

const useStyles = makeStyles((theme) => ({

  deleteRecordingButton: {
    height: 48,
    width: 48,
    color: theme.palette.common.orange,
    border: theme.palette.primary.main,
    [theme.breakpoints.down('md')]: {
      height: 32,
      width: 32
    }
  },

  sheetmusic: {
    height: 580,
    width: 480,
    [theme.breakpoints.down('md')]: {
      height: 280,
      width: 200
    }
  }

}))

const SectionFiles = ({ section, fileType }) => {
  const recordings = useSelector(state => (Object.values(state.files)).filter(file => (file.extension === 'wav' || file.extension === 'mp3') && file.section === section.id))
  const tabs = useSelector(state => Object.values(state.files)).filter(file => (file.extension === 'pdf' || file.extension === 'png' || file.extension === 'jpeg') && file.section === section.id)

  const files = fileType === 'recording' ? recordings : tabs
  const dispatch = useDispatch()
  const classes = useStyles()

  const renderFile = (file) => {
    const src = fileType === 'recording' ? <Player src={file.file}/> : <img className={classes.sheetmusic} alt={file.toString()} src={file.file}/>
    return (
        <>
          <Grid item xs={10} key={file.id}>
           {src}
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={() => dispatch(deleteFile(file.id))}>
              <DeleteForeverRoundedIcon className={classes.deleteRecordingButton} />
            </IconButton>
          </Grid>
        </>
    )
  }

  const renderFileList = () => {
    return files.map(file => {
      const name = file.file.split('/').slice(-2).join('')
      return (
        <DetailAccordion key={file.id} title={name} renderFunction={() => renderFile(file)} />
      )
    })
  }

  return (
    <DetailAccordion title={titleCase(fileType)} renderFunction={renderFileList} />
  )
}

export default SectionFiles
