from wtforms import Form, StringField, IntegerField
from wtforms.validators import DataRequired

class blogContentForm(Form):
	title = StringField('Title: ', validators=[DataRequired()])
	text = StringField('Text: ', validators=[DataRequired()])

class deleteBlogForm(Form):
	bid = IntegerField('Blog Id: ', valdiators=[DataRequired()])

