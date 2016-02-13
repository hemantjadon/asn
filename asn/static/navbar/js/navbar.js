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
    if (location !== undefined){
      highlightNav.highlight(location);
    }
    else {
      highlightNav.highlightOnHover();
    }
  },

  identify : function(tab){
    if(tab === undefined){
      var meta_elem = $('head meta[data-location]')[0];
      if (meta_elem === undefined) {
        return undefined;
      }
      else {
        return $(meta_elem).attr('data-location');
      }
    }
    else{
        return tab;
    }
  },

  highlight : function(location){
    var pannel = $(".sideNav .wrapper .tabs_a a[data-ref]");
    var tabs = pannel.children('div');
    for (var i = 0; i < tabs.length; i++) {
      var ref = $(tabs[i]).parent().attr('data-ref');
      if (ref === location) {
        $(tabs[i]).css({"border-left-color":"red"});
      }
    }
  },

  highlightOnHover: function(){
    var pannel = $(".sideNav .wrapper .tabs_a");
    var tabs = pannel.children().children();
    for (var i = 0; i < tabs.length; i++) {
      $(tabs[i]).mouseenter(function(event){
        $(this).css({"border-left-color":"red"});
      });
      $(tabs[i]).mouseleave(function(event){
        $(this).css({"border-left-color":"transparent"});
      });
    }
  },
}

var ajaxifyLinks = {
  addEventListener: function(){
    var links = $(".sideNav .wrapper .tabs_a a");
    for(var i=0;i<links.length;i++){
      $(links[i]).on("click",function(event){
        event.preventDefault();
        ajaxifyLinks.init.apply(this);
      });
    }
  },

  getMetaPageLocation: function(){
    var meta_elem = $("head meta[data-location]")[0];
    if (meta_elem === undefined){
      return undefined;
    }
    else {
      var location=$(meta_elem).attr('data-location');
      return location;
    }
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
      cache: true,
      async: true,
      success: function(response){
        ajaxifyLinks.processResponse.init(response);
        //ajaxifyLinks.handleHistory.placeCurrentState(response.new_page_url);
        ajaxifyLinks.changeMetaPageLocation(response.new_page_location);
        ajaxifyLinks.changeTitle(response.new_page_title);
        ajaxifyLinks.updateUrl(response.new_page_url);
      },
      error: function(xhr,status,err){
        console.log(err);
      },
    });
  },

  processResponse: {
    insertStylesheets: function(stylesheets){
      for(var i=0;i<stylesheets.length;i++){
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
      for(var i=0;i<top_scripts.length;i++){
        var obj = top_scripts[i];
        var existingScripts = $("script");
        var exists = false;
        for (var j = 0; j < existingScripts.length; j++) {
          var ref = $(existingScripts[j]).attr('src');
          if (ref === undefined) {
            ref = $(existingScripts[j]).attr('data-src');
          }

          if (ref === obj.src) {
            exists = true;
          }
        }
        if(!exists){
          $.ajax({
            url: obj.src,
            dataType: 'script',
            cache: true, // otherwise will get fresh copy every page load
            success: function(response) {
              var script = document.createElement('script');
              script.setAttribute("data-src",this.url);
              $('body').append(script);
            },
            error: function(xhr,status,err){
              console.log(err.toString());
            }
          });
        }
      }
    },

    insertContent: function(string){
      $(".page .mainContent .wrapper").html(string);
    },

    checkLoadedDependencies: function(dependencies){
      var existingScripts = $('script[data-src]');
      var existingScriptsUrls = []
      for (var i = 0; i < existingScripts.length; i++) {
        if($(existingScripts[i]).attr('data-src') !== undefined){
          existingScriptsUrls.push($(existingScripts[i]).attr('data-src'));
        }
      }

      var loaded = false;
      for(var i=0;i<dependencies.length;i++){
        for(var j=0;j<existingScriptsUrls.length;j++){
          if (dependencies[i]===existingScriptsUrls[j]) {
            loaded = true;
            break;
          }
        }
        if(j === existingScriptsUrls.length){
          loaded===false;
          break;
        }
      }
      return loaded;
    },

    insertBottomScripts: function(scripts){
      for(var i=0;i<scripts.length;i++){
        var obj = scripts[i];
        var existingScripts = $("script");
        var exists = false;
        for (var j = 0; j < existingScripts.length; j++) {
          var ref = $(existingScripts[j]).attr('src');
          if (ref === undefined) {
            ref = $(existingScripts[j]).attr('data-src');
          }

          if (ref === obj.src) {
            exists = true;
          }
        }
        if(!exists){
          $.ajax({
            url: obj.src,
            dataType: 'script',
            cache: true, // otherwise will get fresh copy every page load
            success: function(response) {
              var script = document.createElement('script');
              script.setAttribute("data-src",this.url);
              $('body').append(script);
            },
            error: function(xhr,status,err){
              console.log(err.toString());
            }
          });
        }
      }
    },

    init: function(response){
      this.insertStylesheets(response.stylesheets);
      this.insertTopScripts(response.top_scripts);
      this.insertContent(response.rendered_string);
      var interval=setInterval(function () {
        var loaded = this.checkLoadedDependencies(response.bottom_scripts.dependencies);

        if(loaded === true){
          clearInterval(interval);
          this.insertBottomScripts(response.bottom_scripts.scripts);
        };
      }.bind(this), 100);
    },
  },

  changeMetaPageLocation: function(new_page_location){
    if(new_page_location === undefined){
      console.error("Wrong Ajax Response new_page_location not specified");
    }
    var currentLocation = $('head meta[data-location]').attr('data-location');
    if (currentLocation !== undefined) {
      $('head meta[data-location]').attr('data-location',new_page_location);
    }
    else {
      var meta_elem = document.createElement('meta');
      $(meta_elem).attr('data-location',new_page_location);
      $('head').prepend(meta_elem);
    }
  },

  changeTitle: function(new_page_title){
    $('head title').html(new_page_title);
  },

  updateUrl: function(new_page_url){
    if (new_page_url !== undefined) {
      console.log(window.location);
    }
  },

  handleHistory: {
    addInitialState: function(){
      //var html_content = $('.page .mainContent .wrapper')[0];
      var html_content = $('body')[0];
      var content="";
      if (html_content === undefined){
        content = undefined;
      }
      else {
        content = $(html_content).html();
      }

      var location = ajaxifyLinks.getMetaPageLocation();
      var title = $('head title').html();
      if (location === undefined) {
        console.error("Page location meta element not defined. It is required for Adding To History as Navbar Links are ajax");
      }
      else {
        if(content !== undefined){
          history.replaceState({"content":content,"title":title,"location":location},location,window.location);
        }
        else{
          console.error("No HTML tag on page. Nothing to add to history");
        }
      }
    },

    placeCurrentState: function(new_page_url){
      //var html_content = $('.page .mainContent .wrapper')[0];
      var html_content = $('body')[0];
      var content="";
      if (html_content === undefined){
        content = undefined;
      }
      else {
        content = $(html_content).html();
      }

      var location = ajaxifyLinks.getMetaPageLocation();
      var title = $('head title').html();
      if (location === undefined) {
        console.error("Page location meta element not defined. It is required for Adding To History as Navbar Links are ajax");
      }
      else {
        if(content !== undefined){
          history.pushState({"content":content,"title":title,"location":location},location,window.location);
        }
        else{
          console.error("No HTML tag on page. Nothing to add to history");
        }
      }
    },

    replaceCurrentState: function(){
      //var html_content = $('.page .mainContent .wrapper')[0];
      var html_content = $('body')[0];
      var content="";
      if (html_content === undefined){
        content = undefined;
      }
      else {
        content = $(html_content).html();
      }
      var title = $('head title').html();

      var location = ajaxifyLinks.getMetaPageLocation();
      if (location === undefined) {
        console.error("Page location meta element not defined. It is required for Adding To History as Navbar Links are ajax");
      }
      else {
        if(content !== undefined){
          history.replaceState({"content":content,"title":title,"location":location},location,window.location);
        }
        else{
          console.error("No HTML tag on page. Nothing to add to history");
        }
      }
    },

    onPopState: function(event){
      //$('.page .mainContent .wrapper').html(event.state.content);
      $('body').html(event.state.content);
      $('head title').html(event.state.title);
      if(event.state.location !== undefined){
        var meta_elem = $('head meta[data-location]')[0];
        if (meta_elem !== undefined) {
          $(meta_elem).attr("data-location",event.state.location);
        }
        else {
          var meta_elem = document.createElement('meta');
          $(meta_elem).attr("data-location",event.state.location);
          $('head').prepend(meta_elem);
        }
      }
    },
  },
}

$(window).load(function(){
    navToggle.init();
    highlightNav.init();
    //ajaxifyLinks.handleHistory.addInitialState();
    //window.onpopstate = ajaxifyLinks.handleHistory.onPopState;
    ajaxifyLinks.addEventListener();
})
