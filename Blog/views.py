#new models.py

import pymongo
from Blog import app
from pymongo import MongoClient
from models import blogPost
import datetime
from .forms import blogContentForm
from flask import request, jsonify

#connect to database
# client = MongoClient('localhost', 27017)
client = MongoClient('mongodb://Zenonquest:Zenon2@ds061405.mongolab.com:61405/bloglab')
db = client.bloglab
blogposts = blogPost(db)

#return all blogs as strings
@app.route('/api/blog', methods = ['GET'])
def view_blogposts():
	# blog_list = blogposts.viewAll()
	blog_list = jsonify(array=blogposts.viewAll())
	blog_list.headers['Access-Control-Allow-Origin']='*'
	return blog_list 

#get array of blogs(string)
#edit old blog post
#delete all blog posts
@app.route('/api/blog/<blogId>', methods = ['GET'])
def one_blogpost(blogId):
	blog = jsonify(blogposts.viewOne(blogId))
	blog.headers['Access-Control-Allow-Origin']='*'
	return blog

#returns a newly created blogpost
# needs text and title input
@app.route('/api/blog', methods = ['POST'])
def create_blogpost():
	text = request.form['text']
	title = request.form['title']
	new_post = blogposts.create(title = title, text = text)
	return jsonify(new_post)

#updates existing blogpost and returns updated post
#needs text and title input
@app.route('/api/blog/<blogId>', methods = ['POST'])
def edit_blogpost(blogId):
	text = request.form['text']
	title = request.form['title']
	editted_post = blogposts.edit(blogId = blogId, title = title, text = text)
	return edited_post

#deletes all posts in blog
@app.route('/api/blog', methods = ['DELETE'])
def deleteAll_blogposts():
	blogposts.deleteAll()

#deletes single post in blog
@app.route('/api/blog/<blogId>', methods = ['DELETE'])
def delete_blogpost(blogId):
	blogposts.deleteOne(blogId)
