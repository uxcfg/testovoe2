import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Auth.css';

/* Components */
import Input from '../input/Input';
import FetchAvatar from '../avatar/FetchAvatar';

export default class Auth extends Component {
  state = {
    searchName: '',
    result: null,
    errorLogin: null,
    placeholdAvatar: 'https://api.adorable.io/avatars/80/abott@adorable.png',
    invalidLogin: '',

    password: '',
    erorrPass: '',
    invalidPass: '',
  };

  searchAvatar = new FetchAvatar();

  loginHandler = () => {
    console.log('priv');
  };

  registerHandler = () => {};

  submitHandler = (e) => {
    e.preventDefault();
    const { onLogin } = this.props;
    const { searchName, password, invalidLogin, invalidPass } = this.state;
    this.searchAvatar
      .getAvatar(searchName)
      .then(({ items }) => items[0])
      .then((item) =>
        this.setState({ result: item.avatar_url, invalidLogin: false })
      )
      .catch((e) => {
        this.setState(
          {
            result: this.state.placeholdAvatar,
            invalidLogin: true,
            errorLogin: 'Пользователь не найден',
          },
          () => {
            if (!searchName.length) {
              this.setState({ errorLogin: 'Введите логин' });
            }
          }
        );
      });

    let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    if (regex.test(password)) {
      this.setState({ invalidPass: false });
    } else {
      this.setState({ erorrPass: 'Неверный пароль', invalidPass: true }, () => {
        if (!password.length) {
          this.setState({ erorrPass: 'Введите пароль' });
        }
      });
    }
    // onLogin(invalidLogin, invalidPass);
  };

  onChangeLogin = (e) => {
    this.setState({ searchName: e.target.value }, () => {
      if (this.state.searchName.length === 0) {
        this.setState({ invalidLogin: '' });
      }
    });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value }, () => {
      if (!this.state.password.length) {
        this.setState({ invalidPass: '' });
      }
    });
  };
  render() {
    const {
      result,
      placeholdAvatar,
      password,
      errorLogin,
      searchName,
      erorrPass,
    } = this.state;

    let cNameLogin = '';
    if (this.state.invalidLogin) {
      cNameLogin += 'auth__input invalid';
    } else if (this.state.invalidLogin === '') {
      cNameLogin += 'auth__input';
    } else {
      cNameLogin += 'auth__input success';
    }

    let cNamePass = '';
    if (this.state.invalidPass) {
      cNamePass += 'auth__input invalid';
    } else if (this.state.invalidPass === '') {
      cNamePass += 'auth__input';
    } else {
      cNamePass += 'auth__input success';
    }
    return (
      <>
        <div className="auth">
          <div className="auth__wrap">
            <h1>Войти в аккаунт</h1>
            <div className="auth__img__wrap">
              <img
                className="auth__avatar"
                src={result ? result : placeholdAvatar}
                alt=""
              />
            </div>
            <form className="auth__form" onSubmit={this.submitHandler}>
              <Input
                onChange={this.onChangeLogin}
                cName={cNameLogin}
                name="login"
                holder={'Логин'}
                errorMsg={errorLogin}
                value={searchName}
              />
              <Input
                onChange={this.onChangePassword}
                value={password}
                name="password"
                cName={cNamePass}
                holder={'Пароль'}
                errorMsg={erorrPass}
                type="password"
              />

              {/* <Link to="/" className="auth__btn"> */}
                <Button variant="contained" color="primary" type="success">
                  Войти
                </Button>
              {/* </Link> */}
            </form>
          </div>
        </div>
      </>
    );
  }
}
