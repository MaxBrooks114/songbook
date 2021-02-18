import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import TextField from '@material-ui/core/TextField'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { Autocomplete } from '@material-ui/lab'
import React, { useRef } from 'react'

import { titleCase } from '../../helpers/detailHelpers'
import RangedSlider from './RangedSlider'

const adaptFileEventToValue = delegate => e => {
  delegate(e.target.files[0])
}

export const FileInput = ({
  label,
  classes,
  input: { value: omitValue, onChange, onBlur, ...InputProps },
  meta: omitMeta,
  ...props
}) => {
  const inputFileRef = useRef(null)
  return (
    <Button
      startIcon={<CloudUploadIcon />}
      onClick={() => inputFileRef.current.click()}
      className={classes.uploadButton}
      >
       { label }
      <input
        onChange={adaptFileEventToValue(onChange)}
        onBlur={adaptFileEventToValue(onBlur)}
        hidden
        ref={inputFileRef}
        type="file"
        {...props.input}
        {...props}
      />

  </Button>

  )
}

export const renderTextField = ({
  helperText,
  meta: { touched, error, invalid },
  rows,
  multiline,
  inputAdornment,
  classes,
  input,
  label,
  type,
  options,
  select,
  fullWidth,
  required,
  ...custom
}) => {
  return (
    <TextField

      label={label}
      size="small"
      error={touched && invalid}
      color="secondary"
      variant="outlined"
      margin="dense"
      select={select}
      required={required}
      multiline={multiline}
      type={type}
      rows={rows}
      options={options}
      fullWidth={fullWidth}
      autoComplete="off"
      InputProps={{
        endAdornment: <InputAdornment position="end">{inputAdornment || ''}</InputAdornment>,
        className: classes.input

      }}
      InputLabelProps={{ className: classes.label }}
      SelectProps={{
        MenuProps: {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center'
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          getContentAnchorEl: null,
          className: classes.listbox
        }
      }}
      {...input}
      {...custom}
    >{select ? options.map(option => <MenuItem key={option} className = {classes.option} value={option}>{titleCase(option)}</MenuItem>) : null}</TextField>
  )
}

export const renderSlider = ({
  helperText,
  meta: { touched, error, invalid },
  inputAdornment,
  classes,
  input,
  label,
  min,
  max,
  marks,
  valueLabelDisplay,
  valueLabelFormat,
  onChange,
  ...custom
}) => {
  onChange = input.onChange
  return (
    <RangedSlider

    label={label}
    min={min}
    max={max}
    valueLabelDisplay={valueLabelDisplay}
    valueLabelFormat={valueLabelFormat}
    marks={marks}

    {...input}
    {...custom}
    />
  )
}
export const renderAutoCompleteField = ({ options, classes, input, label, fullWidth, value, defaultValue, ...custom }) => {
  return (
      <Autocomplete
      options={options}
      getOptionLabel={(option) => option[Object.keys(option)]}
      classes={{ listbox: classes.listbox, input: classes.input, option: classes.option }}
      defaultValue={defaultValue}
      value={options.find((option) => option === input.value) || defaultValue}
      renderInput={(params) => (
        <TextField
        {...params}
        label={label}
        color="secondary"
        variant="outlined"
        margin="dense"
        fullWidth={fullWidth}
        InputProps={{
          ...params.InputProps,
          className: classes.listbox,
          input: classes.input
        }}
        InputLabelProps={{ className: classes.label }}
        {...input}
        {...custom}
        />
      )}
        />
  )
}

export const renderAutoCompleteDataField = ({ options, nonfilter, renderOption, getOptionSelected, getOptionLabel, classes, input, onChange, label, fullWidth, value, defaultValue, ...custom }) => {
  return (
          <Autocomplete
          options={options}
          getOptionLabel={getOptionLabel}
          renderOption= {renderOption}
          getOptionSelected={getOptionSelected}
          onSelect={onChange}
          defaultValue={defaultValue}
          // controls the component with redux form
          value={!defaultValue ? (options.find((option) => option === input.value) || '') : options.find((option) => option === input.value) || defaultValue}
          classes={{ listbox: classes.listbox, input: classes.input, option: classes.option }}
          renderInput={(params) => (
            <TextField
            {...params}
            label={label}
            size="small"
            color="secdondary"
            variant="outlined"
            fullWidth={fullWidth}
            InputProps={{
              ...params.InputProps,
              className: classes.listbox,
              input: classes.input

            }}
            InputLabelProps={{ className: classes.label }}

            {...input}
            {...custom}
            />

          )}

            />

  )
}

export const renderRadioGroup = ({ input, classes, title, label1, label2 }) => (
            <FormControl component="fieldset">
              <FormLabel className={classes.label} component="legend">{title}</FormLabel>
              <RadioGroup row {...input} aria-label={label1}>
                  <FormControlLabel className={classes.label} value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel className={classes.label} value='false' control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
)

export const renderCheckbox = ({ classes, input, label, name, ...custom }) => (
            <FormControlLabel
            className={classes.label}
            label={label}
            labelPlacement="start"
            control={<Checkbox className={classes.checkBox} checked={!!input.value} onChange={input.onChange} name={name} />}
            />
)

export const renderCheckboxGroup = ({ name, options, input, meta, ...custom }) => {
  const $options = Object.values(options).map((option, i) => (
    <div key={i}>
      <Checkbox
        name={`${name}[${i}]`}
        checked={input.value.indexOf(option.id) !== -1}
        label={option.label}
        onChange = {(e, checked) => {
          const newValue = [...input.value]
          if (checked) {
            newValue.push(option.id)
          } else {
            newValue.splice(newValue.indexOf(option.id), 1)
          }
          return input.onChange(newValue)
        }}
        {...custom}
      />
      {option.name}
    </div>
  ))
  return (
    <div>
      {$options}
    </div>
  )
}
