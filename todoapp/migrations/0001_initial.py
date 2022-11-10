# Generated by Django 4.1.3 on 2022-11-10 14:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0005_randuser_first_name_randuser_last_name_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project_name', models.CharField(max_length=250)),
                ('github_link', models.TextField(blank=True)),
                ('users', models.ManyToManyField(to='users.randuser')),
            ],
        ),
        migrations.CreateModel(
            name='ToDo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('todo_text', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=True)),
                ('creat_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.randuser')),
                ('from_project', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='todoapp.project')),
            ],
        ),
    ]
