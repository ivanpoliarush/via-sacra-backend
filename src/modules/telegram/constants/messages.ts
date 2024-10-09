export const START_MESSAGE =
  'Welcome to the Via Sacra Admin Bot! \n' +
  'Here are the available commands: \n' +
  '/login - Log in \n' +
  '/logout - Log out \n\n' +
  'To get started, type /login and after one space type your password';

export const USER_NOT_FOUND_MESSAGE =
  'User with this Telegram ID not found \n' +
  'Try to type /start and try again \n' +
  'If the prblem persists, contact the developer';

export const SYSTEM_ERROR_MESSAGE =
  'System error occured \n' + 'Please contact the developer';

export const PASSWORD_NOT_VALID_MESSAGE = 'Password is not valid';

export const AUTHORIZED_MESSAGE =
  'You are successfully authorized ✅ \n' + 'Welcome! 🎉';

export const LOGOUT_MESSAGE = 'You are successfully logged out 🚪';

export const ALREADY_AUTHORIZED_MESSAGE =
  'You are already authorized 🤔 \n' + 'To log out type /logout';

export const NEW_USER_LOGGED_IN_MESSAGE = (name: string, username: string) =>
  'New user logged in! 🔓 \n' +
  `Name: ${name} \n` +
  `Username: ${username} \n` +
  'If you did not log in, please contact the developer';
