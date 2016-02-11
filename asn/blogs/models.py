from django.db import models
from datetime import datetime
from user.models import UserProfile
# Create your models here.

class Blog(models.Model):
    author = models.ForeignKey(UserProfile,related_name='blog_author')
    timestamp = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=30,blank=False,null=True)
    content = models.TextField(blank=False,null=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return "%s by %s on %s"%(self.title,self.author.name,self.timestamp)

class BlogCode(models.Model):
    blog = models.ForeignKey(Blog,related_name='blog_code')
    code = models.TextField(blank=False)

class BlogImages(models.Model):
    blog = models.ForeignKey(Blog,related_name='blog_image',blank=False)
    image = models.ImageField(upload_to='blogs')

class BlogComments(models.Model):
    blog = models.ForeignKey(Blog,related_name='blog_comments',blank=False)
    author = models.ForeignKey(UserProfile,related_name='blog_comment_author')
    timestamp = models.DateTimeField(auto_now_add=True)
    comment = models.TextField(blank=True,null=True)
