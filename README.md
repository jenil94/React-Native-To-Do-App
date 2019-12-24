# Initial page

First start the new app 

```python
python manage.py startapp app_name
```

Add rest\_framework and app\_name in `settings.py`

```python
INSTALLED_APPS = [
    ...,
    rest_framework,
    rest_framework.authtoken,
    app_name
]
```

Create the `model` for the user

Add Auth-user in `setting.py`

