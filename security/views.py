from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .forms import RegisterForm, LoginForm
from django.contrib import messages
from django.contrib.auth import login as auth_login

def index(request):
    if request.method == "POST":
        reg_form = RegisterForm(request.POST)
        if reg_form.is_valid():
            print("reg_form is valid", reg_form)
            password = reg_form.cleaned_data.get('password')
            confirm_password = reg_form.cleaned_data.get('confirm_password')
            username = reg_form.cleaned_data.get('username')
            email = reg_form.cleaned_data.get('email')     
            try:
                    # Check if passwords match
                if password != confirm_password:
                    print(password,confirm_password)
                    messages.error(request, "Password and Confirm Password are different!")
                    return render(request, 'index.html')
                else:
                    print('pass true')
                # Check if username already exists
                if User.objects.filter(username=username).exists():
                    messages.error(request, "Username already exists!")
                    return render(request, 'index.html')
                else:
                    print("username true")
                # Check if email already exists
                if User.objects.filter(email=email).exists():
                    messages.error(request, "Email already registered!")
                    return render(request, 'index.html')
                else:
                    print('email true')
            except:  
                print(' ____$$$ Error At Checking REG_FORM $$$____ ')     
            
        else:
            print('### reg_form INCORRECT ###')
            return redirect('error')
    # else:
    #     print("|____ NO Post For function Register ____| ")   
    #     return 




def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            print("FORM VALID register")
            form.save()
            print(form.cleaned_data)
        password = form.cleaned_data.get('password')
        confirm_password = form.cleaned_data.get('confirm_password')
        username = form.cleaned_data.get('username')
        email = form.cleaned_data.get('email')
        if not form.is_valid():
            print("FORM INVALID register")
            print(form.errors,form)
        

        try:
            # Check if passwords match
            if password != confirm_password:
                print(password,confirm_password)
                messages.error(request, "Password and Confirm Password are different!")
                return render(request, 'index.html')
            else:
                print('pass true')
            # Check if username already exists
            if User.objects.filter(username=username).exists():
                messages.error(request, "Username already exists!")
                return render(request, 'index.html')
            else:
                print("username true")
            # Check if email already exists
            if User.objects.filter(email=email).exists():
                messages.error(request, "Email already registered!")
                return render(request, 'index.html')
            else:
                print('email true')
        except:  
            print(' ____$$$ Error At Checking REG_FORM $$$____ ')     

        print("POST METHON KELDI REGISTER ")
    else:
        print("POST METHOD KELMADI REGISTER")
    return render(request,'index.html')

def login(request):
    if request.method == "POST":
        print("POST METHON KELDI login ")
        form = LoginForm(request.POST)
        if form.is_valid():
            print("FORM VALID login")
            print(form.cleaned_data)
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            print(username,password)
            if authenticate(request,username = username , password = password):
                print(f'kirdi {username}')
                return render(request,'test.html')
            else:
                print('auth False')
            if User.objects.filter(password = password) and User.objects.filter(username = username):
                print('good')
            else:
                print('bad')

            
        else:
            print("FORM INVALID login")

    else:
        print("POST METHOD KELMADI login")
    return render(request,'index.html')


def error(request):
    return render(request,'error.html')