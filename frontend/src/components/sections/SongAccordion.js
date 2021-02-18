import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import SectionCard from './SectionCard'

const useStyles = makeStyles((theme) => ({

  accordion: {
    width: '95%',
    background: theme.palette.secondary.light,
    color: theme.palette.info.main,
    borderRadius: 4,
    margin: '1rem 0',
    '&:hover': {
      transform: 'translate(10px, 10px)',
      transition: 'transform 0.2s ease 0s',
      cursor: 'pointer',
      zIndex: 2
    },
    '& .MuiAccordionSummary-content': {
      flexGrow: 0
    },

    '& .MuiAccordionSummary-root': {
      justifyContent: 'space-between',
      padding: '0, 16'
    },

    '& .MuiAccordionDetails-root': {
      display: 'block',
      padding: 0,
      marginBottom: theme.spacing(2)
    },

    '& .MuiGrid-grid-xs-10': {
      margin: 0,
      justifyContent: 'center'
    }
  },

  listItem: {
    display: 'block',
    '&:hover': {
      transform: 'translate(10px, 10px)',
      transition: 'transform 0.2s ease 0s',
      cursor: 'pointer',
      zIndex: 2
    }

  },

  media: {
    width: 85,
    height: 85,
    marginRight: 12,
    objectFit: 'fill',
    borderRadius: 4,
    [theme.breakpoints.down('md')]: {
      width: 0

    },
    [theme.breakpoints.down('sm')]: {
      width: 85,
      objectFit: 'contain'
    },
    [theme.breakpoints.down('sm')]: {
      width: 0

    }
  },

  title: {
    width: '95%',
    fontWeight: 600,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      width: '100%'
    }
  },

  songLink: {
    color: theme.palette.info.main,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.common.darkGreen
    }
  },

  songTitle: {
    margin: 'auto',
    fontWeight: '600',
    color: theme.palette.info.main
  }

}))
const SongAccordion = ({ song, sections, transitionDuration }) => {
  const history = useHistory()
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const renderedList = () => {
    return sections.length > 0
      ? sections.map((section) => {
        return (
              <ListItem className={classes.listItem} key={section.id} disableGutters dense onClick={() => {
                history.push(`/sections/${section.id}`)
              }}>
                <SectionCard section={section} transitionDuration={transitionDuration} />
              </ListItem>
        )
      })
      : null
  }

  const renderSongTitle = () => {
    return expanded
      ? <Typography className={classes.songTitle} component="p"><Link className={classes.songLink} to={`/songs/${song.id}`}>{song.title} ({sections.length})</Link></Typography>
      : <Typography className={classes.songTitle} component="p">{song.title} ({sections.length})</Typography>
  }

  return sections.length ? (
     <Accordion className={classes.accordion} style={expanded ? {zIndex: 1300}: null }onChange={(event, expanded) => {
       setExpanded(expanded)
     }}> 
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <img
            alt={song.album}
            className={classes.media}
            src={song.image ? song.image : song.uploaded_image}
          />
            {renderSongTitle()}
        </AccordionSummary>
        <AccordionDetails  >
          <List style={{maxHeight: 400, overflow: 'scroll'}}>
            {renderedList(sections)}
          </List>
        </AccordionDetails>
      </Accordion>
  ) : null
}

export default SongAccordion
