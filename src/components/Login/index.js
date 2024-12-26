import {Component} from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    showErrorMsg: false,
    errorMsg: '',
    username: '',
    password: '',
    inputType: 'password',
    isLoginSuccess: false
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  displayPassword = event => {
    let textValue
    if (event.target.checked === true) {
      textValue = 'text'
    } else if (event.target.checked === false) {
      textValue = 'password'
    }

    this.setState({inputType: textValue})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('login_token', jwtToken, {expires: 30, path: '/'});
    this.setState({ isLoginSuccess: true });
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password
    }
    console.log(JSON.stringify(userDetails))
    const url = 'https://tsak-todo-assignment.onrender.com/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails)
    }
    const response = await fetch(url, options)
    const loginData = await response.json()
    console.log(loginData)
    if (response.ok === true) {
      this.onSubmitSuccess(loginData.jwtToken)
    } else {
      this.onSubmitFailure(loginData.error_msg)
    }
  }

  render() {
    const {showErrorMsg, username, password, inputType, errorMsg, isLoginSuccess} = this.state
    const jwtToken = Cookies.get('login_token')
    if (jwtToken !== undefined) {
      return <Navigate to="/" replace />;
    }
    
    if (isLoginSuccess) {
        return <Navigate to="/" replace />;
    }

    return (
      <div className="form-container">
        <form className="form-element" onSubmit={this.onSubmitForm}>
          <h1>Robotspace</h1>
          <div className="label-input-container">
            <label htmlFor="name" className='label-element'>Username</label>
            <input
              type="text"
              id="name"
              value={username}
              placeholder="Username"
              onChange={this.changeUsername}
              className='login-input'
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="password" className='label-element'>Password</label>
            <input
              type={inputType}
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.changePassword}
              className='login-input'
            />
          </div>
          <div className="checkbox-label-container">
            <input
              type="checkbox"
              id="myCheckbox"
              onChange={this.displayPassword}
              value={inputType}
            />
            <label htmlFor="myCheckbox">Show Password</label>
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
          {showErrorMsg && <p className="error-text">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login