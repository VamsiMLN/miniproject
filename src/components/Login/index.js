import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMessage: false, errorMsg: ''}

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.push('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({showErrorMessage: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const api = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          Username*
        </label>
        <input
          placeholder="username"
          id="username"
          value={username}
          className="username-input-filed"
          type="text"
          onChange={this.onChangeUserName}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          Password*
        </label>
        <input
          placeholder="password"
          id="password"
          value={password}
          className="username-input-filed"
          type="password"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {showErrorMessage, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <img
          alt="login website logo"
          className="login-mobile-img"
          src="https://res.cloudinary.com/djdh5bkl5/image/upload/v1644683415/miniproject/mobile_view_vhsok1.jpg"
        />
        <img
          alt="website login"
          className="login-image"
          src="https://res.cloudinary.com/djdh5bkl5/image/upload/v1644742059/miniproject/Rectangle_1467_fizzqv.jpg"
        />
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            alt="website-logo"
            src="https://res.cloudinary.com/djdh5bkl5/image/upload/v1644756086/miniproject/Group_7732_1_w8t4xh.jpg"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button className="login-button" type="submit">
            LogIn
          </button>
          {showErrorMessage && <p className="error-message">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
