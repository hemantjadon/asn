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
  addEventListener: function(){
    var links = $(".sideNav .wrapper .tabs_a a");
    for(i=0;i<links.length;i++){
      $(links[i]).on("click",function(event){
        event.preventDefault();
        ajaxifyLinks.init.apply(this);
      });
    }
  },

  getMetaPageLocation: function(){
    var meta_elem = $("head meta[data-location]");
    var location = meta_elem.attr("data-location");
    return location;
  },

  init: function(){
    var pageLocation = ajaxifyLinks.getMetaPageLocation();
    var refLocation = $(this).attr("data-ref");
    if (pageLocation === refLocation){
      return;
    }

    else{
      relUrl = $(this).attr("href");
      ajaxifyLinks.ajaxify(relUrl);
    }
  },

  ajaxify: function(relUrl){
    var baseUrl = window.location.origin;
    var callUrl = baseUrl+relUrl;
    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
        options.async = true;
    });
    $.ajax({
      url: callUrl,
      dataType: "json",
      cache: false,
      async: true,
      success: function(response){
        ajaxifyLinks.processResponse.init(response);
      },
      error: function(xhr,status,err){
        console.log(err);
      },
    });
  },

  processResponse: {
    insertStylesheets: function(stylesheets){
      for(i=0;i<stylesheets.length;i++){
        var obj = stylesheets[i];
        var existingSheets = $("link");
        var exists = false;
        for (var j = 0; j < existingSheets.length; j++) {
          var ref = $(existingSheets[j]).attr('href').toString();
          if(ref === obj.href){
            exists = true;
            break;
          }
        }
        if(!exists){
          var sheet = document.createElement('link');
          sheet.href = obj.href;
          sheet.rel = obj.rel;
          sheet.type = obj.type;
          $('head').append(sheet);
        }
      }
    },

    insertTopScripts: function(top_scripts){
      for(i=0;i<top_scripts.length;i++){
        var obj = top_scripts[i];
        var existingScripts = $("script");
        var exists = false;
        for (var j = 0; j < existingScripts.length; j++) {
          var ref = $(existingScripts[j]).attr('src').toString();
          if(ref === obj.href){
            exists = true;
            break;
          }
        }
        if(!exists){
          var script = document.createElement('script');
          script.src = obj.src;
          script.type = obj.type;
          script.async = true;
          $('head').append(script);
        }
      }
    },

    insertScripts: function(scripts){
      for(i=0;i<scripts.length;i++){
        var obj = scripts[i];
        var existingScripts = $("script");
        var exists = false;
        for (var j = 0; j < existingScripts.length; j++) {
          var ref = $(existingScripts[j]).attr('src').toString();
          if(ref === obj.src){
            exists = true;
            break;
          }
        }
        if(!exists){
          var script = document.createElement('script');
          script.src = obj.src;
          script.type = obj.type;
          script.async = true;
          document.body.appendChild(script);
        }
      }
    },

    init: function(response){
      this.insertStylesheets(response.stylesheets);
      //this.insertTopScripts(response.top_scripts);
      //this.insertScripts(response.scripts);
    },
  },
}

$(document).ready(function(){
    navToggle.init();
    highlightNav.init();
    ajaxifyLinks.addEventListener();
})
