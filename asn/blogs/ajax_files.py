from django.contrib.staticfiles.templatetags.staticfiles import static

stylesheets = [
    {"type":"text/css","rel":"stylesheet","href":static("BlogPage/css/BlogPage.css")},
    {"type":"text/css","rel":"stylesheet","href":static("prism/prism.css")},
]

top_scripts = [
    {"type":"","src":"https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"},
    {"type":"","src":"https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js"},
    {"type":"text/javascript","src":static("prism/prism.js")},
]

scripts = [
    {"type":"text/babel","src":static("BlogPage/js/reactPart.js")},
    {"type":"text/javascript","src":static("BlogPage/js/BlogPage.js")},
]
