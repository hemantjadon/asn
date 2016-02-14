var marginAdjust ={
  adjust : function(page,expanded,collapsed){
    $(".sideNav .wrapper .navToggle").click(function(){
      var pannel = $(".sideNav");
      classList = pannel.attr('class').split(' ');
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
    })
  },

  init : function(){
    page = $(".page"); // Select The Div Which You Want To adjust according to expanding and collaplsing nav
    marginAdjust.adjust(page,"220px","58px");
  },
}


var continueReading = {
  expand : function(){
    var blogText = $(this).parent(".blogText")
    blogText.removeClass("collapsed");
    blogText.addClass("expand");
    $(this).css({"display":"none"});
  },

  init : function(){
   $(".continueReading").click(function(){
     continueReading.expand.apply(this);
   });

  },
}

$(window).load(function(){
  marginAdjust.init();
});
