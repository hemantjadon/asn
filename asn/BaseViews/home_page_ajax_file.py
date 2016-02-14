from django.contrib.staticfiles.templatetags.staticfiles import static

stylesheets = [
    {"type":"text/css","rel":"stylesheet","href":static("HomePage/css/HomePage.css")},
]

top_scripts=[]

bottom_scripts={
    "dependencies" : [],
    "scripts" : [
        {"type":"text/javascript","src":static("HomePage/js/HomePage.js")},
    ]
}
