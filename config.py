from pymongo import MongoClient

WTF_CSRF_ENABLED = True
SECRET_KEY = 'zkey-that-is-super-secret'
DB_NAME = 'bloglab'

DATABASE = MongoClient('mongodb://Zenonquest:Zenon2@ds061405.mongolab.com:61405/bloglab')[DB_NAME]
POSTS_COLLECTION = DATABASE.myblogs
USERS_COLLECTION = DATABASE.myusers
SETTINGS_COLLECTOIN = DATABASE.settings

DEBUG = True