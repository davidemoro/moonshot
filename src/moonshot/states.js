(function () {

  function MoonshotInit($stateProvider) {

    $stateProvider
      // Provides the o-wrap and logic/state shared on everything in
      // this site
      .state("siteroot", {
               abstract: true,
               url: "",
               views: {
                 "header": {
                   templateUrl: "moonshot/header.partial.html",
                   controller: "HeaderCtrl as HeaderCtrl"
                 },
                 "content": {
                   templateUrl: "moonshot/content.partial.html"
                 }
               }
             })

      // "Busted" state to demonstrate error handling when the
      // state-logic throws an exception.
      .state("busted", {
               url: "/busted",
               parent: "siteroot",
               templateUrl: "moonshot/home.partial.html",
               resolve: {
                 busted: function () {
                   return x + y + x;
                 }
               }
             });

  }

  angular.module("moonshot")
    .config(MoonshotInit);

})();

