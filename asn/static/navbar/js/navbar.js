var navToggle = {
  init : function(){
    $(".sideNav .wrapper .navToggle").click(function(){
      var pannel = $(".sideNav");
      classList = pannel.attr('class').split(' ');
      var change = false;
      for (var i = 0; i < classList.length; i++) {
        if (classList[i] === "expand")
        {
          change = true;
          pannel.removeClass("expand");
          pannel.addClass("collapsed");
          var x = pannel.css("width");
          $(".page").css({"margin-left":"58px"});
          break;
        }
        else if (classList[i] === "collapsed")
        {
          change = true;
          pannel.removeClass("collapsed");
          pannel.addClass("expand");
          var x = pannel.css("width");
          $(".page").css({"margin-left":"220px"});
          break;
        }
      }
      if (change === false)
      {
        console.log("Nav Toggle Error : Either HTML/JS class names doesnt match or Wrong target element selected");
      }
    });
  }
}

var highlightNav = {

  init : function(tab){
    var location = highlightNav.identify(tab);
    highlightNav.highlight(location);
  },

  identify : function(tab){
    if(tab === undefined)
    {
      var location = window.location.pathname
      location = location.split('/')[1];
      if(location === "")
      {
        return "home";
      }
      else
      {
        return location;
      }
    }
    else
    {
        return tab;
    }
  },

  highlight : function(location){
    var pannel = $(".sideNav .wrapper .tabs_a");
    var tabs = pannel.children().children();
    var brk = false;
    for(i=0; i < tabs.length; i++)
    {
      var classList = $(tabs[i]).attr('class').split(' ');
      for(j=0; j < classList.length; j++)
      {
        if(classList[j]===location)
        {
          var tab = $(tabs[i]);
          tab.css({"border-left":"3px solid red"});
          brk = true;
          break;
        }
        else
        {
          var tab = $(tabs[i]);
          tab.css({"border-left":"3px solid transparent"});
        }
      }
    }
  },
}

var ajaxifyLinks = {
  identifyWindow : function(){
    var location = window.location.pathname;
    location = location.split('/')[1];
    if(location === "")
    {
      return "home";
    }
    else
    {
      return location;
    }
  },

  identifyClickLink : function(jobj){
    var link = jobj.context.pathname.split('/')[1];
    if(link !== "")
    {
      return link;
    }
    else
    {
      return "home";
    }
  },

  addInitHistory : function(){
    historyObject = $(".page .mainContent .wrapper").html();
    var window_location = ajaxifyLinks.identifyWindow();

    function toTitleCase(str)
    {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    var title = "ASN | "+toTitleCase(window_location);
    var newUrl;
    if(window_location !== "home")
    {
      newUrl = "/"+window_location;
    }
    else
    {
      newUrl = "/";
    }
    window.history.replaceState(historyObject,title,newUrl);
    document.title = title;
  },

  ajaxify : function(target){
    var baseUrl = window.location.origin;
    var targetUrl;
    if(target==="home")
    {
      targetUrl=baseUrl;
    }
    else
    {
      targetUrl = baseUrl+'/'+target+'/';
    }

    $.ajax({
      url : targetUrl,
      type : 'GET',
      contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
      dataType : 'html',
      success : function(response,status,xhr){
        ajaxifyLinks.ajaxifyOnResponse(response,status,xhr,target);
      }
    });
    highlightNav.init(target);
  },

  ajaxifyOnResponse : function(response,status,xhr,target){
    var historyObject;
    if (status === "success")
    {
      historyObject = $(".page .mainContent .wrapper").html()
      $(".page .mainContent .wrapper").html(response);
      if(response===null)
      {
        response = historyObject;
      }
      ajaxifyLinks.ajaxifyChangeHistoryState(target,response);
    }

    else
    {
        console.log("Error --- In AJAX!!");
    }
  },

  ajaxifyChangeHistoryState : function(target,historyObject){
    function toTitleCase(str)
    {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    var title = "ASN | "+toTitleCase(target);
    var newUrl;
    if(target !== "home")
    {
      newUrl = "/"+target;
    }
    else
    {
      newUrl = "/";
    }
    window.history.pushState(historyObject,title,newUrl);
    document.title = title;
  },

  ajaxifyBack : function(){
    window.onpopstate = function(event){
      $(".page .mainContent .wrapper").html(window.history.state);
      highlightNav.init();
    };
  },

  init : function(){
    ajaxifyLinks.addInitHistory();
    var links = $(".sideNav .wrapper .tabs_a a");
    for (i=0; i < links.length; i++)
    {
      $(links[i]).click(function(e){
        e.preventDefault();
        window_location = ajaxifyLinks.identifyWindow();
        link_ref = ajaxifyLinks.identifyClickLink($(this));

        if(link_ref === window_location)
        {
          console.log("Warning : Quiting ajaxifyLinks as on same tab");
          return;
        }
        else {
          ajaxifyLinks.ajaxify(link_ref);
        }
        ajaxifyLinks.ajaxifyBack();
      });
    }
  },
}

$(document).ready(function(){
    navToggle.init();
    highlightNav.init();
    ajaxifyLinks.init();
})
