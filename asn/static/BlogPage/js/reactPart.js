'use strict';

var FeedBox = React.createClass({
  displayName: 'FeedBox',

  getInitialState: function getInitialState() {
    return { data: [] };
  },

  loadFeed: function loadFeed() {
    var ajaxUrl = window.location.origin + this.props.url;
    $.ajax({
      url: ajaxUrl,
      dataType: 'json',
      cache: false,
      success: (function (data) {
        this.setState({ data: data });
        check_continue_reading(); //--- Removes continue reading if not required
        continueReading.init(); //--- Enables continueReading so that it expands or collapses the blocks
        Prism.highlightAll(); //--- Enables Prism Highlighting For All
        $('ul.tabs').tabs(); //--- Initialize Materialize tabs
        $('img').addClass("responsive-img"); //--- Making images of blogs responsive-img
        //ajaxifyLinks.handleHistory.replaceCurrentState(window.location.origin+"/blogs/"); //--- Adding the recieved content to history
      }).bind(this),
      error: (function (xhr, status, err) {
        console.log(xhr);
      }).bind(this)
    });
  },

  componentDidMount: function componentDidMount() {
    this.loadFeed();
    setInterval(this.loadFeed, 120000);
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'feedBox' },
      React.createElement(FeedBlog, { data: this.state.data })
    );
  }
});

var FeedBlog = React.createClass({
  displayName: 'FeedBlog',

  render: function render() {
    var blogTabs = function blogTabs(blog) {
      var text = "#blogText" + blog.id;
      var code = "#blogCode" + blog.id;
      var image = "#blogImages" + blog.id;

      var rawMarkup = function rawMarkup() {
        //------ Raw HTML marking function .... Uses marked.js
        var rawMarkup = marked(blog.content);
        return { __html: rawMarkup };
      };

      return React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col s12' },
          React.createElement(
            'ul',
            { className: 'tabs' },
            React.createElement(
              'li',
              { className: 'tab col s4' },
              React.createElement(
                'a',
                { href: text },
                'Content'
              )
            ),
            React.createElement(
              'li',
              { className: 'tab col s4' },
              React.createElement(
                'a',
                { href: code },
                'Code'
              )
            ),
            React.createElement(
              'li',
              { className: 'tab col s4' },
              React.createElement(
                'a',
                { href: image },
                'Images'
              )
            )
          )
        ),
        React.createElement(
          'div',
          { id: text.slice(1), className: 'col s12 blogText collapsed' },
          React.createElement('div', { dangerouslySetInnerHTML: rawMarkup(), className: 'markedBox' }),
          React.createElement(
            'div',
            { className: 'continueReading' },
            React.createElement(
              'h4',
              null,
              React.createElement(
                'span',
                null,
                'Continue Reading'
              )
            )
          )
        )
      );
    };

    var blogNodes = this.props.data.map(function (blog) {
      return React.createElement(
        'div',
        { className: 'blog', key: blog.id },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col s12' },
            React.createElement(
              'div',
              { className: 'card grey-lighten-5' },
              React.createElement(
                'div',
                { className: 'card-content black-text' },
                React.createElement(
                  'span',
                  { className: 'card-title' },
                  blog.title
                ),
                blogTabs(blog)
              )
            )
          )
        )
      );
    });
    return React.createElement(
      'div',
      { className: 'feedBlog' },
      blogNodes
    );
  }
});
ReactDOM.render(React.createElement(FeedBox, { url: '/blogs/get-all/' }), $("#content")[0]);

var check_continue_reading = function check_continue_reading() {
  //------------------ A helper function to check If Continue Reading required in a blog or not
  var blogText = $(".page .feedBlog .blog .blogText");
  for (var i = 0; i < blogText.length; i++) {
    if (blogText[i].offsetHeight < blogText[i].scrollHeight) {} else {
      $(blogText[i]).children(".continueReading").css({ "display": "none" });
    }
  }
};

marked.setOptions({
  langPrefix: "language-",
  gfm: true,
  breaks: true,
  sanitize: true
});
