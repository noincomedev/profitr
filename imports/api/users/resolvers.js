export default {
  Query: {
    user(obj, args, { user }) {
      return user;
    }
  },
  User: {
    admin: user => (user.profile ? user.profile.admin : false)
  }
};
