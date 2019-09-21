const path = require("path");

module.exports = {
  title: 'Basic Docker and Docker Compose',
  description: 'As a developer you want to setup your solution for both development and production',
  port: 8081,
  base: '/sept24/',
  themeConfig: {
    displayAllHeaders: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Stage1', link: '/stage1/' },
      { text: 'Certbot', link: '/certbot/' },
    ],
    sidebar: [
      {
        title: 'Project',
        children: [
          '/'
        ]
      },
      {
        title: 'Stage1',
        children: [
          '/stage1/',
          '/stage1/server.md'
        ]
      },
      {
        title: 'Certbot',
        children: [
          '/certbot/',
          '/certbot/install',
        ]
      }
    ]
  }
}
