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
      { text: 'Pre-prep by host', link: '/antes/' },
      { text: 'Workshop', link: '/workshop/' }
    ],
    sidebar: [
      {
        title: 'Project',
        children: [
          '/'
        ]
      },
      {
        title: 'Workshop',
        children: [
          '/workshop/',
          '/workshop/handsOn.md'
        ]
      },
      {
        title: 'Workshop setup',
        children: [
          '/antes/'
        ]
      }
    ]
  }
}
