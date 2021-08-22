/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { signUp } from './sign_up';
import { login, logout } from './login';
import { sendPassWordResetEmail } from './forgotPassword';
import { resetPassword } from './resetPassword';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

const mapBox = document.getElementById('map');
const signUpForm = document.querySelector('.form--signUp');
const loginForm = document.querySelector('.form--login');
const forgotPassWord = document.querySelector('.form--forgotPassword');
const resetPasswordForm = document.querySelector('.form--resetPassword');
const logOutBtn = document.querySelector('.nav__el--logout');
const userForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.location);

  displayMap(locations);
}

if (signUpForm)
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    signUp(name, email, password, passwordConfirm);
  });

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
if (forgotPassWord)
  forgotPassWord.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    sendPassWordResetEmail(email);
  });
if (resetPasswordForm)
  resetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userForm)
  userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log('INDEX JS: ', document.getElementById('photo').files);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
