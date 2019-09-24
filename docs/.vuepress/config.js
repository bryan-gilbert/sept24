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
      { text: 'Step 1', link: '/step1/' },
      { text: 'Step 2', link: '/step2/' },
      { text: 'Useful Stuff', link: '/utils/' },
      { text: 'Pre-prep by host', link: '/antes/' }
    ],
    sidebar: [
      {
        title: 'Project',
        children: [
          '/'
        ]
      },
      {
        title: 'Step 1',
        children: [
          '/step1/',
          '/step1/handsOn.md'
        ]
      },
      {
        title: 'Step 2',
        children: [
          '/step2/',
          '/step2/handsOn.md'
        ]
      },
      {
        title: 'Useful Stuff',
        children: [
          '/utils/'
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
