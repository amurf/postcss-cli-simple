var plugins = [
   {
       name    : 'autoprefixer',
       options : { browsers: "> 5%" },
   },
   {
       name    : 'postcss-cachify',
       options : { baseUrl: "/res" },
   },
   {
       name    : 'cssnano',
   }
];

module.exports = plugins;
