from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class RegisterForm(UserCreationForm):
    class Meta():
        model = User
        fields = ['username','email','password1',"password2"]
class LoginForm(ModelForm):
    class Meta():
        model = User
        fields = ['username','password']
        