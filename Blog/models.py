import datetime
import pymongo
from werkzeug.security import check_password_hash, generate_password_hash
from flask.ext.login import login_user, logout_user, login_required
from bson.objectid import ObjectId
from Blog import lm
from flask import flash
from hashlib import md5

class blogPost(object):
	def __init__(self, database):
		self.db = database #db
		self.myblogs = database.myblogs #collection
		# self.myusers = database.myusers #users collection

	#creates new blog post
	def create(self, title, text):
		time = str(datetime.datetime.now())
		new_post = {'title':title, 'time': time, 'text': text}
		return self.myblogs.insert_one(new_post)

	#UPDATED CREATE w/ author
	def create2(self, title, text, author):
		time = str(datetime.datetime.now())
		new_post = {'title':title, 'time': time, 'text': text, 'author':author}
		return self.myblogs.insert_one(new_post)

	#return all blog posts in array
	def viewAll(self):
		all_posts = []
		for each_post in self.myblogs.find().sort('time',-1):
			all_posts.append(
				{'_id':str(each_post['_id']),
				'title':each_post['title'].encode('utf-8'),
				'text':each_post['text'].encode('utf-8'),
				'time':each_post['time'].encode('utf-8'),
				'author':each_post['author'].encode('utf-8')}
				)
		return (all_posts)

	def viewAllbyAuthor(self, username):
		all_posts = []
		for each_post in self.myblogs.find({'author':username}).sort('time', -1):
			all_posts.append(
				{'_id':str(each_post['_id']),
				'title':each_post['title'].encode('utf-8'),
				'text':each_post['text'].encode('utf-8'),
				'time':each_post['time'].encode('utf-8'),
				'author':each_post['author'].encode('utf-8')}
				)
		return (all_posts)

	#return chosen blog post
	def viewOne(self, blogId):
		fix_post = self.myblogs.find_one({'_id':ObjectId(blogId)})
		if fix_post:
			fixed_post = {'_id':str(fix_post['_id']),
			'title':fix_post['title'],
			'text':fix_post['text'],
			'time':fix_post['time'],
			'author': fix_post['author']}
		return fixed_post


	#edit chosen blog post and returns updated blog
	def edit(self, blogId, title, text):
		self.myblogs.update_one({'_id': ObjectId(blogId)}, {'$set': {'title': title, 'text': text}})
		return self.myblogs.find_one({'_id':ObjectId(blogId)})

	#delete chosen blog post 
	def deleteOne(self, blogId):
		##to return the deleted post
		return self.myblogs.find_one_and_delete({'_id': ObjectId(blogId)})

	#delete all blogs
	def deleteAll(self):
		self.myblogs.delete_many({})

	#get posts belonging to specified user
	def viewUserPosts(self, author):
		all_posts = []
		for each_post in self.myblogs.find({'author': author}).sort('time',-1):
			all_posts.append(
				{'_id':str(each_post['_id']),
				'title':each_post['title'].encode('utf-8'),
				'text':each_post['text'].encode('utf-8'),
				'time':each_post['time'].encode('utf-8')}
			)
		return all_posts

class blogUsers():
	def __init__(self, database):
		self.db = database #db
		self.myusers = database.myusers #users collection

	def viewOne(self, username):
		user = self.myusers.find_one({'username':username})
		fixed_user = {'_id':str(user['_id']),
		'username':user['username'],
		'pw_hash':user['pw_hash'], 
		'last_seen':user['last_seen'],
		'about_me':user['about_me']}
		return fixed_user

	def createUser(self, username, password):
		pw_hash = self.set_password(password) 
		last_seen = str(datetime.datetime.now())
		about_me = ""
		new_user = {'username':username, 'pw_hash':pw_hash, 'last_seen': last_seen, 'about_me': about_me}
		return self.myusers.insert_one(new_user)

	def set_password(self, password):
		pw_hash = generate_password_hash(password)
		return pw_hash

	def update_time(self, username, last_seen):
		self.myusers.update_one({'username':username}, {'$set': {'last_seen':str(last_seen)}})

	#for testing purposes
	def editUser(self, username, pw_hash, about_me):
		self.myusers.update_one({'username':username}, {'$set': {'about_me':about_me}})

class User():
	def __init__(self, username):
		self.username = username

	#dead
	def set_password(self, password):
		pw_hash = generate_password_hash(password)
		return pw_hash

	#dead
	def check_password(self, password):
		return check_password_hash(self.pw_hash, password)

	def is_authenticated(self):
		return True

	def is_active(self):
		return True

	def is_anonymous(self):
		return False

	def get_id(self):
		return self.username

	def avatar(self, size):
		self.email = self.username + '@gmail.com' #tmp email

		return 'http://www.gravatar.com/avatar/%s?d=mm&s=%d' % (md5(self.email.encode('utf-8')).hexdigest(), size)

	@staticmethod
	def validate_login(password_hash, password):
		return check_password_hash(password_hash, password)
