export default {
  admin: ['user:*'],
  user: ['user:view:*', 'user:update:self', 'stripe:*']
};
