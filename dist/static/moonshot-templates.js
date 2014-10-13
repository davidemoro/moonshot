angular.module("moonshot").run(["$templateCache", function($templateCache) {$templateCache.put("/app/header.partial.html","<div id=\"header\" class=\"container\">\n  <div class=\"navbar navbar-inverse navbar-fixed-top\"\n       role=\"navigation\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" ui-sref=\"home\">Moonshot</a>\n    </div>\n    <ul class=\"nav navbar-nav\">\n      <li ng-repeat=\"section in HeaderCtrl.sections\"\n          ui-sref-active=\"active\">\n        <a ui-sref=\"{{ section.state}}\">{{ section.title }}</a>\n      </li>\n    </ul>\n\n    <ul ng-if=\"!HeaderCtrl.$auth.isAuthenticated()\"\n        class=\"nav navbar-nav pull-right\">\n      <li><a ui-sref=\"siteroot.login\">Login</a></li>\n      <li><a href=\"/#/signup\">Sign up</a></li>\n    </ul>\n    <ul ng-if=\"HeaderCtrl.$auth.isAuthenticated()\"\n        class=\"nav navbar-nav pull-right\">\n      <li ui-sref-active=\"active\">\n        <a ui-sref=\"siteroot.profile\">Profile</a>\n      </li>\n      <li><a ng-click=\"HeaderCtrl.logout()\" href=\"#\">Logout</a></li>\n    </ul>\n\n  </div>\n  <div id=\"subsections\" class=\"navbar\" role=\"navigation\">\n    <ul class=\"nav navbar-nav\">\n      <li ng-repeat=\"subsection in HeaderCtrl.subsections\"\n          ui-sref-active=\"active\">\n        <a ui-sref=\"{{ subsection.state }}\">{{ subsection.label }}</a>\n      </li>\n    </ul>\n  </div>\n</div>");
$templateCache.put("/auth/login.partial.html","<div class=\"row\">\n      <h2>Log in</h2>\n</div>\n<div class=\"row\">\n  <div class=\"col-md-3\">\n    <button class=\"btn btn-block btn-twitter\"\n            ng-click=\"LoginCtrl.authenticate(\'twitter\')\">\n      <i class=\"fa fa-twitter fa-2x\"></i> Sign in with Twitter\n    </button>\n    <p class=\"text-center text-muted\">\n      <small>Don\'t have an account yet? <a href=\"/#/signup\">Sign\n        up</a></small>\n    </p>\n\n  </div>\n</div>\n");
$templateCache.put("/auth/profile.partial.html","<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-3\">\n      <h2 class=\"text-center\">Profile</h2>\n\n      <p ng-if=\"ProfileCtrl.user\">\n\n        <div>id: {{ ProfileCtrl.user.id }}</div>\n        <div>twitter: {{ ProfileCtrl.user.twitter }}</div>\n        <div>First Name: {{ ProfileCtrl.user.first_name }}</div>\n        <div>Last Name: {{ ProfileCtrl.user.last_name }}</div>\n        <div>Email: {{ ProfileCtrl.user.email }}</div>\n      </p>\n\n    </div>\n  </div>\n</div>\n");
$templateCache.put("/folder/folder-home.partial.html","<div class=\"row\">\n\n  <h3 id=\"heading\">Folder Home</h3>\n\n</div>");
$templateCache.put("/site/form.partial.html","<div class=\"row\">\n\n  <h3 id=\"heading\">Form Demo</h3>\n\n  <form name=\"userForm\">\n    <div class=\"field\">\n      <label for=\"emailAddress\">Enter your email address:</label>\n      <input type=\"email\" id=\"emailAddress\"\n             name=\"emailAddress\"\n             ng-model=\"data.email\"\n             ng-minlength=\"5\"\n             ng-maxlength=\"30\"\n             required/>\n\n      <div>\n        <ng-messages for=\"userForm.emailAddress.$error\" multiple>\n          <ng-message when=\"required\">\n            You forgot to enter your email address.\n          </ng-message>\n          <ng-message when=\"minlength\">\n            Your email address is too short...\n          </ng-message>\n          <ng-message when=\"maxlength\">\n            Your email address is too long...\n          </ng-message>\n          <ng-message when=\"email\">\n            You did not enter your email address correctly...\n          </ng-message>\n        </ng-messages>\n      </div>\n    </div>\n\n    <input type=\"submit\"/>\n  </form>\n\n\n</div>");
$templateCache.put("/site/home.partial.html","<div class=\"row\">\n\n  <h1>What is ui-router?</h1>\n\n  <p>URL routing is a popular way to match the contents of a URL\n    to specific functionality within a website. URL routes\n    programmatically present specific content to\n    users based on the URL that they are\n    visiting. It is a popular way that has proven to be very\n    effective.</p>\n\n  <p>AngularJS supplies URL routing by default. It is adequate, but also\n    has some limitations.</p>\n\n  <p>\n    <a ui-sref=\"bogus\">Bogus link that should trigger NotFound</a>\n    and\n    <a ui-sref=\"busted\">Busted state with an error in resolve</a>.\n  </p>\n\n</div>");
$templateCache.put("/user/users-home.partial.html","<div class=\"row\">\n\n  <h3 id=\"heading\">All Users</h3>\n\n  <table class=\"table table-bordered table-striped\">\n    <thead>\n    <tr>\n      <th>ID</th>\n      <th>Userid</th>\n      <th>First Name</th>\n      <th>Last Name</th>\n      <th>Email</th>\n      <th>Twitter Name</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr ng-repeat=\"user in UsersHomeCtrl.users\">\n      <td>{{ user.id }}</td>\n      <td>{{ user.userId }}</td>\n      <td>{{ user.firstName }}</td>\n      <td>{{ user.lastName }}</td>\n      <td>{{ user.emailAddress }}</td>\n      <td>{{ user.twitter }}</td>\n    </tr>\n    </tbody>\n  </table>\n\n</div>");}]);