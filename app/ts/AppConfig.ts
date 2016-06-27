/// <reference path="Main.ts" />
/// <reference path="../../typings/tsd.d.ts" />

require.config({
  baseUrl: "/app/js",
  shim : {
    "jquery" : { exports: "$" },
    "jqueryui" : { "deps": ["jquery"] },
    "bootstrap" : { "deps": ["jquery"] }
  },
  paths: {
    "jquery" : "/bower/jquery/dist/jquery.min",
    "jqueryui" : "/bower/jqueryui/jquery-ui.min",
    "bootstrap" :  "/bower/bootstrap/dist/js/bootstrap.min"
  }
});

require(['Main', 'jquery', 'jqueryui'], (app, $) => {
  $(() => {
    let main = new app.Main();
    main.run();
  });
})