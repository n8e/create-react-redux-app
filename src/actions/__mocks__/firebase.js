const user = {
  email: 'test@email.com',
  ze: 'token'
};

const firebase = {
  initializeApp: (config) => {},
  auth: () => ({
    signInWithEmailAndPassword: (email, password) => new Promise((resolve, reject) => {
      process.nextTick(
        () =>
        email && password
        ? resolve(user)
        : reject({
          error: `Error signing in user ${email}.`,
        }),
      );
    }),
    signOut: () => new Promise((resolve, reject) => {
      process.nextTick(() => resolve())
    })
  })
};

export default firebase;