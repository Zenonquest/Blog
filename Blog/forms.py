from flask.ext.wtf import Form
from wtforms import StringField, IntegerField, PasswordField, BooleanField, TextAreaField
from wtforms.validators import DataRequired

class LoginForm(Form):
	username = StringField('Username', validators=[DataRequired()])
	password = PasswordField('Password', validators=[DataRequired()])
	remember_me = BooleanField('remember_me', default=False)

class SignUpForm(Form):
	username = StringField('Username', validators=[DataRequired()])
	password = PasswordField('Password', validators=[DataRequired()])
	confirm = PasswordField('Password', validators=[DataRequired()])

class EditUserForm(Form):
	username = StringField('Username', validators=[DataRequired()])
	password = PasswordField('Password')
	about_me= StringField('about_me', validators=[DataRequired()])

class CreatePostForm(Form):
	title = TextAreaField('Title', validators=[DataRequired()])
	text = TextAreaField('Text', validators=[DataRequired()])

class AboutMeForm(Form):
	about_me = TextAreaField('Text', validators=[DataRequired()])