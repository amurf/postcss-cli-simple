var argv = require('yargs')
            .usage('postcss -c <config_file> -i <input_file> -o <output_file>')
            .boolean('m')
            .demand(['i', 'o', 'c'])
            .argv;

var input_file  = argv.i;
var output_file = argv.o;
var config_file = argv.c;
var map_file    = argv.m

var config  = require(config_file);
var plugins = config.map(function(plugin) {
    return require(plugin.name)(plugin.options);
});

var Q  = require('q');
var fs = require('fs');

var processor = require('postcss')(plugins);
var readfile  = Q.denodeify(fs.readFile);

readfile(input_file, 'utf-8').then(function(content) {
    var processed = processor.process(content, {from: input_file, to: output_file, map: map_file});
    processed.then(function(result) {
        fs.writeFile(output_file, result.css);
        if (result.map !== undefined && map_file) {
            fs.writeFile(output_file + '.map', result.map);
        }
    }).catch(function(err){ console.log(err) });
});


