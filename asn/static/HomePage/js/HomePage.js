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
    });
  },

  init : function(){
    page = $(".page"); // Select The Div Which You Want To adjust according to expanding and collaplsing nav
    marginAdjust.adjust(page,"220px","58px");
  },
}

var loginClick = {
  loginAJAX : function(){

  },
  init : function(){
    $(".mainContent .wrapper button.login").click(function(e){
      e.preventDefault();
      loginClick.loginAJAX();
    });
  },
}

var logout = {
  init : function(){
    $(".mainContent .wrapper button.logout").click(function(e){
      e.preventDefault();
      FB.logout(function(response){
        console.log(response);
        var userInfo = new Object();
        userInfo.accessToken = response.authResponse.accessToken;
        userInfo.userID = response.authResponse.userID;
        baseurl = window.location.origin;
        $.ajax({
          url : baseurl+"/accounts/logout/",
          type : "GET",
          contentType : 'application/json',
          data : userInfo,
          dataType : 'JSON',
          headers : {'X-CSRFToken':getCookie('csrftoken')},
          success : handleResponse(response),
        });
        function handleResponse(response)
        {
          console.log("h");
          location.reload();
        }
      });

    });
  },
}

$(document).ready(function(){
  marginAdjust.init();
  loginClick.init();
});

$(window).load(function(){
   logout.init();
});
