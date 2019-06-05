import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  const { name, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(name, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <main className="login-container">
      <div className="jss1">
        <div className="jss2">
          <span className="icon-lock" />
        </div>
        <form className="form full-width" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              className='border-radius no-box-shadow'
              type="text"
              placeholder="用户名"
              name="name"
              value={name}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              className='border-radius'
              type="password"
              placeholder="密码"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary full-width border-radius" value="登陆" />
        </form>
      </div>
    </main>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
