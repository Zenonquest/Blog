import datetime
import pymongo
from bson.objectid import ObjectId


class blogPost(object):
	def __init__(self, database):
		self.db = database #db
		self.myblogs = database.myblogs #session? collection?

	#creates new blog post
	def create(self, title, text):
		time = str(datetime.datetime.now())
		new_post = {'title':title, 'time': time, 'text': text}
		self.myblogs.insert_one(new_post)
		fix_post = self.myblogs.find_one(new_post);
		fixed_post = {'_id':str(fix_post['_id']),
		'title':fix_post['title'],
		'text':fix_post['text'],
		'time':fix_post['time']}
		return fixed_post

	#return all blog posts in array
	def viewAll(self):
		all_posts = []
		for each_post in self.myblogs.find().sort('time',-1):
			all_posts.append(
				{'_id':str(each_post['_id']),
				'title':each_post['title'].encode('utf-8'),
				'text':each_post['text'].encode('utf-8'),
				'time':each_post['time'].encode('utf-8')}
				)
		return (all_posts)

	#return chosen blog post
	def viewOne(self, blogId):
		fix_post = self.myblogs.find_one({'_id':ObjectId(blogId)})
		fixed_post = {'_id':str(fix_post['_id']),
		'title':fix_post['title'],
		'text':fix_post['text'],
		'time':fix_post['time']}
		return fixed_post

	#edit chosen blog post and returns updated blog
	def edit(self, blogId, title, text):
		# setattr(edit_post, 'title', title)
		# setattr(edit_post, 'text', text)
		self.myblogs.update_one({'_id': ObjectId(blogId)}, {'$set': {'title': title}})
		return str(self.myblogs.find_one({'_id':ObjectId(blogId)}))

	#delete chosen blog post 
	def deleteOne(self, blogId):
		# self.query.filter_by(self.id = blogId).delete()
		self.myblogs.delete_one({'_id': blogId})

		##to return the deleted post
		#self.myblogs.find_one_and_delete({'_id', blogId})

	#delete all blogs
	def deleteAll(self):
		self.myblogs.delete_many({})

