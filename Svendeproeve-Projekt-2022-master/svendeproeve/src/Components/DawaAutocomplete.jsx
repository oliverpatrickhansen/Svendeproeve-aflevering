import React from 'react'
import url from './url'

export default class extends React.Component {
  static defaultProps = {
    options: {},
    minCharacters: 2
  }

  state = {
    value: '',
    suggestions: []
  }

  handleChange = ({ target: { value }}) => {
    this.setState({ value })
    if (this.props.minCharacters <= value.length) this._fetch(value)
  }

  _fetch = value => {
    fetch(
      url('https://dawa.aws.dk/postnumre/autocomplete', {
        q: value,
        ['per_side']: 100,
        ...this.props.options
      }),
      {
        method: 'GET',
        headers: {
          'Accept-Encoding': 'gzip, deflate'
        }
      }
    )
    .then(response => response.json())
    .then(json => this.setState({ suggestions: json }))
    .catch(err => console.error('parsing failed', err))
  }

  render = () => this.props.children({ ...this.state, handleChange: this.handleChange })
}
