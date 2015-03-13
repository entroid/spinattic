require.config({
  waitSeconds: 500,
  paths: {
    jquery: 'lib/jquery/jquery-min',
    underscore: 'lib/underscore/underscore-min',
    backbone: 'lib/backbone/backbone-min',
    templates: '../templates',
    mCustomScrollbar: 'lib/mCustomScrollbar/jquery.mCustomScrollbar.concat.min',
    'async': 'lib/requireplugins/async',
    x2js:'lib/x2js/xml2json.min',
    jqueryui:'lib/jqueryui/jquery-ui',
    filedrop:'lib/filedrop/jquery.filedrop',
  },
  shim:{
    mCustomScrollbar:['jquery'],
    jqueryui:['jquery'],
    filedrop:['jquery']
  },
  map:{
     '*': {
            'alias': 'views/footer/PanoMenuFooterView2'
        }

  }
});

require([
  'app',
  'jquery'

], function(App,$){
     App.initialize();
     }
);