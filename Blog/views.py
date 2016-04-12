#new models.py

import pymongo
from Blog import app, lm
from pymongo import MongoClient
from models import blogPost, User, blogUsers
import datetime
from .forms import LoginForm, SignUpForm, EditUserForm, CreatePostForm
from flask import request, jsonify, redirect, render_template, url_for, flash, g
from flask.ext.login import login_user, logout_user, login_required, current_user

#connect to database
# client = MongoClient('localhost', 27017)
client = MongoClient('mongodb://Zenonquest:Zenon2@ds061405.mongolab.com:61405/bloglab')
db = client.bloglab
blogposts = blogPost(db)
users = blogUsers(db)


###BACKEND ROUTES
#return all blogs as strings
@app.route('/api/blog', methods = ['GET'])
def view_blogposts():
	# blog_list = blogposts.viewAll()
	blog_list = jsonify(array=blogposts.viewAll())
	# blog_list.headers['Access-Control-Allow-Origin']='*'
	return blog_list 

#get array of blogs(string)
#edit old blog post
#delete all blog posts
@app.route('/api/blog/<blogId>', methods = ['GET'])
def one_blogpost(blogId):
	blog = jsonify(blogposts.viewOne(blogId))
	# blog.headers['Access-Control-Allow-Origin']='*'
	return blog

#returns a newly created blogpost
# needs text and title input
@app.route('/api/blog', methods = ['POST'])
def create_blogpost():
	author = current_user.username
	text = request.get_json()['text']
	title = request.get_json()['title']
	new_post = blogposts.create(title = title, text = text, author = author)
	# new_post.headers['Access-Control-Allow-Origin']='*'
	return jsonify({'success': 'true'})

#updates existing blogpost and returns updated post
#needs text and title input
@app.route('/api/blog/<blogId>', methods = ['POST'])
def edit_blogpost(blogId):
	# text = request.form['text']
	# title = request.form['title']
	text = request.get_json()['text']
	title = request.get_json()['title']
	editted_post = blogposts.edit(blogId = blogId, title = title, text = text)
	# editted_post.headers['Access-Control-Allow-Origin']='*'
	return jsonify({'success': 'true'})

#deletes all posts in blog
@app.route('/api/blog', methods = ['DELETE'])
def deleteAll_blogposts():
	blogposts.deleteAll()

#deletes single post in blog
@app.route('/api/blog/<blogId>', methods = ['DELETE'])
def delete_blogpost(blogId):
	deleted_post = blogposts.deleteOne(blogId)
	return jsonify({'success': 'true'})

# user login
@app.route('/api/login', methods=['GET', 'POST'])
def login():
	username = request.get_json()['username']
	password = request.get_json()['password']
	user = users.viewOne(username)
	hash_pass = user['pw_hash']
	if User.validate_login(hash_pass, password):
		user_obj = User(user['username'])
		login_user(user_obj)
		return redirect(request.args.get("next") or url_for("index"))
	return render_template('login.html', form=form)

#user logout
@app.route('/api/logout')
def logout():
	logout_user()
	return redirect(url_for('login'))

@app.route('/api/signup', methods=['POST'])
def signup():
	username = request.get_json()['username']
	password = request.get_json()['password']
	new_user = users.createUser(username = username, password = password)
	return jsonify({'success': 'true'})

#for testing purposes
@app.route('/api/edit', methods=['POST'])
def edit_user():
	form = EditUserForm()
	username = form.username.data
	user = users.viewOne(username)
	if form.about_me.data:
		about_me = form.about_me.data
	else:
		about_me = user['about_me']
	if form.password.data:
		password = form.password.data
		pw_hash = generate_password_hash(password)
	else:
		pw_hash = user['pw_hash']
	users.editUser(username, pw_hash, about_me)
	return redirect(url_for('index'))

###FRONTEND ROUTES
#from microblog
@app.route('/')
@login_required
def home():
    return render_template('home.html')

@app.route('/index')
@login_required
def index():
	posts = [  # fake array of posts
        { 
            'author': {'nickname': 'John'}, 
            'body': 'Beautiful day in Portland!' 
        },
        { 
            'author': {'nickname': 'Susan'}, 
            'body': 'The Avengers movie was so cool!' 
        }
    ]
	return render_template('index.html', title='Home',  posts=posts)

@app.route('/login', methods=['GET', 'POST'])
def login2():
	form = LoginForm()
	if request.method == 'POST':
		user = users.viewOne(form.username.data)
		hash_pass = user['pw_hash']
		if User.validate_login(hash_pass, form.password.data):
			user_obj = User(user['username'])
			login_user(user_obj)
			flash("Logged in successfully!", category='success')
			return redirect(request.args.get("next") or url_for("index"))
		flash("Wrong username or password!", category='error')
	return render_template('login.html', form=form)

#profile page
@app.route('/user/<username>')
@login_required
def user(username):
    user = users.viewOne(username)
    user_obj = User(user['username'])
    if user == None:
        flash('User %s not found.' % username)
        return redirect(url_for('index'))
    posts = [
        {'author': user, 'body': 'Test post #1'},
        {'author': user, 'body': 'Test post #2'}
    ]
    return render_template('user.html',
                           user=user,
                           posts=posts,
                           user_obj=user_obj)



#user logout
@app.route('/logout')
def logout2():
	logout_user()
	return redirect(url_for('login2'))

#signup user page
@app.route('/signup', methods=['GET', 'POST'])
def signup2():
	form = SignUpForm()
	if request.method == 'POST':
		username = form.username.data
		password = form.password.data
		users.createUser(username, password)
		user = users.viewOne(username)
		user_obj = User(user['username'])
		login_user(user_obj)
		flash("Signed up successfully!", category='success')
		return redirect(request.args.get("next") or url_for("index"))
	return render_template('signup.html', form=form)

@app.route('/create_post', methods=['GET', 'POST'])
# @login_required
def create_post():
	form = CreatePostForm()
	if request.method == 'POST':
		author = current_user.username
		title = form.title.data
		text = form.text.data
		users.create2(title, text, author)
		return redirect(url_for('user'), username=current_user.username)
	return render_template('create.html', form=form)


@lm.user_loader
def load_user(username):
	u = users.viewOne(username)
	if not u:
		return None
	return User(u['username'])

@app.before_request
def before_request():
	g.user = current_user
	# if g.user.is_authenticated:
	# 	last_seen = datetime.datetime.now()
	# 	users.update_time(g.user.username, last_seen)


#handles CORS
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  return response