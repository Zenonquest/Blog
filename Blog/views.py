#new models.py

import pymongo
from Blog import app
from pymongo import MongoClient
from models import blogPost
import datetime
from .forms import blogContentForm
from flask import request

#connect to database
# client = MongoClient('localhost', 27017)
client = MongoClient('mongodb://Zenonquest:Zenon2@ds061405.mongolab.com:61405/bloglab')
db = client.bloglab
blogposts = blogPost(db)

#return all blogs blogs
@app.route('/blog', methods = ['GET'])
def view_blogposts():
	blog_list = blogposts.viewAll()
	return blog_list

#return array of blogs
@app.route('/blog/<blogId>', methods = ['GET','POST'])
def one_blogpost(blogId):
	if request.method == 'GET':
		blog = blogposts.viewOne(blogId)
		return blog
	if request.method == 'POST':
		text = request.form['text']
		title = request.form['title']
		editted_post = blogposts.edit(blogId = blogId, title = title, text = text)
		return editted_post

#returns a newly created blogpost
# needs text and title input
@app.route('/blog', methods = ['POST'])
def create_blogpost():
	# form = blogContentForm()
	# text = form.text.data
	# title = form.title.data
	text = request.form['text']
	title = request.form['title']
	new_post = blogposts.create(title = title, text = text)
	return new_post

#updates existing blogpost and returns updated post
#needs text and title input
@app.route('/blog/<blogId>', methods = ['POST'])
def edit_blogpost(blogId):
	# form = blogContentForm()
	# text = form.text.data
	# title = form.title.data
	# old_post = blogposts.viewOne(blogId)
	text = request.form['text']
	title = request.form['title']
	editted_post = blogposts.edit(blogId = blogId, title = title, text = text)
	return edited_post

#deletes all posts in blog
@app.route('/blog/delete', methods = ['DELETE'])
def deleteAll_blogposts():
	blogposts.deleteAll()

#deletes single post in blog
@app.route('/blog/<blogId>', methods = ['DELETE'])
def delete_blogpost(blogId):
	blogposts.deleteOne(blogId)
