var marginAdjust ={
  adjustOnClick : function(page,expanded,collapsed){
    $(".sideNav .wrapper .navToggle").click(function(){
      var pannel = $(".sideNav");
      var classList = pannel.attr('class').split(' ');
      var change = false;
      for (var i = 0; i < classList.length; i++) {
        if (classList[i] === "expand")
        {
          change = true;
          page.css({"margin-left":expanded});
          break;
        }
        else if (classList[i] === "collapsed")
        {
          change = true;
          page.css({"margin-left":collapsed});
          break;
        }
      }
      if (change === false)
      {
        console.log("Nav Toggle Error : Either HTML/JS class names doesnt match or Wrong target element selected");
      }
    });
  },

  adjust: function(page,expanded,collapsed){
    var pannel = $(".sideNav");
    var classList = pannel.attr('class')
    if (classList !== undefined){
      classList = classList.split(' ');
    }
    else {
      classList=[]
    }
    var change = false;
    for (var i = 0; i < classList.length; i++) {
      if (classList[i] === "expand")
      {
        change = true;
        page.css({"margin-left":expanded});
        break;
      }
      else if (classList[i] === "collapsed")
      {
        change = true;
        page.css({"margin-left":collapsed});
        break;
      }
    }
    if (change === false)
    {
      console.log("Nav Toggle Error : Either HTML/JS class names doesnt match or Wrong target element selected");
    }
  },

  init : function(){
    var page = $(".page"); // Select The Div Which You Want To adjust according to expanding and collaplsing nav
    marginAdjust.adjustOnClick(page,"220px","58px");
    marginAdjust.adjust(page,"220px","58px");
  },
}

var collapseSideNav = function(){
  $('.sideNav').removeClass('expand');
  $('.sideNav').addClass('collapsed');
  marginAdjust.init();
}

$(window).load(function(){
  marginAdjust.init();
});
