module.exports = {
  title: 'svgmoji',
  tagline: 'Welcome to your templated docs',
  url: 'https://svgmoji.github.io',
  baseUrl: '/svgmoji/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'svgmoji',
  projectName: 'svgmoji',
  themeConfig: {
    navbar: {
      title: 'svgmoji',
      logo: {
        alt: 'Docs',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/contributing',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/svgmoji/svgmoji',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/svgmoji',
            },
            {
              label: 'Discord',
              href: 'https://remirror.io/chat',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/remirrorio',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/svgmoji/svgmoji',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Remirror. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../../docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/svgmoji/svgmoji/edit/HEAD/docs/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/svgmoji/svgmoji/edit/HEAD/support/website/blog/',
        },
      },
    ],
  ],
};
