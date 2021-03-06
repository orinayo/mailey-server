// SurveyForm shows form for user to add input
import React, { Component } from 'react'
// reduxForm helper allows redux-form communicate with Redux store
// Field component renders any type of HTML form elements
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import { validateRecipients, validateSendersEmail } from '../../utilities/validateEmails'
import formFields from './formFields'

class SurveyForm extends Component {
  renderFields () {
    return formFields.map(({ label, name }) => {
      return (
        <Field key={name} label={label} type='text' name={name} component={SurveyField} />
      )
    })
  }

  render () {
    return (
      <div>
        <form className='form' onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)} >
          {
            this.renderFields()
          }
          <Link to='/surveys'className='left btn-flat btn-cancel'>
            Cancel
            <i className='material-icons right'>clear</i>
          </Link>
          <button type='submit' className='btn-flat btn-success right'>
            Next
            <i className='material-icons right'>done</i>
          </button>
        </form>
      </div>
    )
  }
}

function validate (values) {
  const errors = {}
  errors.recipients = validateRecipients(values.recipients || '')
  errors.fromEmail = validateSendersEmail(values.fromEmail || '')
  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a value!`
    }
  })

  return errors
}

// Pass form and validation function to reduxForm reducer
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm)
