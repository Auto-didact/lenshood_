export default {
  service: process.env.EMAIL_SERVICE,
  auth: {
    type: process.env.EMAIL_TYPE,
    user: process.env.EMAIL_USER,
    serviceClient: process.env.EMAIL_SERVICECLIENT,
    privateKey: process.env.EMAIL_PRIVATEKEY
  }
};
