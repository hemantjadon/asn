var FeedBox = React.createClass({
  getInitialState: function(){
    return {data:[]}
  },

  loadFeed: function(){
    var ajaxUrl = window.location.origin+this.props.url
    $.ajax({
      url: ajaxUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
        check_continue_reading(); //--- Removes continue reading if not required
        continueReading.init();  //--- Enables continueReading so that it expands or collapses the blocks
        Prism.highlightAll(); //--- Enables Prism Highlighting For All
        $('ul.tabs').tabs();  //--- Initialize Materialize tabs
        $('img').addClass("responsive-img"); //--- Making images of blogs responsive-img
        //ajaxifyLinks.handleHistory.replaceCurrentState(window.location.origin+"/blogs/"); //--- Adding the recieved content to history
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(xhr);
      }.bind(this),
    });
  },

  componentDidMount: function() {
    this.loadFeed();
    setInterval(this.loadFeed,120000);
  },

  render: function(){
    return (
      <div className="feedBox">
        <FeedBlog data = {this.state.data}/>
      </div>
    );
  },
});

var FeedBlog = React.createClass({
  render: function(){
    var blogTabs = function(blog){
      var text = "#blogText"+blog.id
      var code = "#blogCode"+blog.id
      var image = "#blogImages"+blog.id

      var rawMarkup = function() {  //------ Raw HTML marking function .... Uses marked.js
        var rawMarkup = marked(blog.content)
        return { __html: rawMarkup };
      }

      return(
        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s4">
                <a href={text}>Content</a>
              </li>
              <li className="tab col s4">
                <a href={code}>Code</a>
              </li>
              <li className="tab col s4">
                <a href={image}>Images</a>
              </li>
            </ul>
          </div>
          <div id={text.slice(1)} className="col s12 blogText collapsed">
            <div dangerouslySetInnerHTML={rawMarkup()} className="markedBox">
            </div>
            <div className="continueReading">
              <h4><span>Continue Reading</span></h4>
            </div>
          </div>
        </div>
      );
    }

    var blogNodes = this.props.data.map(function(blog){
      return (
        <div className="blog" key={blog.id}>
          <div className="row">
            <div className="col s12">
              <div className="card grey-lighten-5">
                <div className="card-content black-text">
                  <span className="card-title">{blog.title}</span>
                  {blogTabs(blog)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="feedBlog">
        {blogNodes}
      </div>
    );
  },
});
ReactDOM.render(<FeedBox url="/blogs/get-all/"/>,$("#content")[0]);

var check_continue_reading = function(){  //------------------ A helper function to check If Continue Reading required in a blog or not
  var blogText = $(".page .feedBlog .blog .blogText");
  for(var i=0;i<blogText.length;i++){
    if (blogText[i].offsetHeight < blogText[i].scrollHeight){
    }
    else {
      $(blogText[i]).children(".continueReading").css({"display":"none",});
    }
  }
}

marked.setOptions({
  langPrefix: "language-",
  gfm: true,
  breaks: true,
  sanitize: true,
});
