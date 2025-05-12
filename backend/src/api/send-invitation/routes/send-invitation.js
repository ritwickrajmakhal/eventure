module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/send-invitation/:id',
      handler: 'send-invitation.sendInvitation',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};
