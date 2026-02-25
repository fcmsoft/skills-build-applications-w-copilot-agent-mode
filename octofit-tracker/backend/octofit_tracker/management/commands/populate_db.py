from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        app_label = 'octofit_tracker'

class Activity(models.Model):
    user = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    duration = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Leaderboard(models.Model):
    team = models.CharField(max_length=100)
    points = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Workout(models.Model):
    name = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=50)
    class Meta:
        app_label = 'octofit_tracker'

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        # Delete all data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Users
        ironman = User.objects.create_user(username='ironman', email='ironman@marvel.com', password='1234')
        superman = User.objects.create_user(username='superman', email='superman@dc.com', password='1234')
        wonderwoman = User.objects.create_user(username='wonderwoman', email='wonderwoman@dc.com', password='1234')
        captain = User.objects.create_user(username='captain', email='captain@marvel.com', password='1234')

        # Activities
        Activity.objects.create(user='ironman', type='run', duration=30)
        Activity.objects.create(user='superman', type='fly', duration=60)
        Activity.objects.create(user='wonderwoman', type='swim', duration=45)
        Activity.objects.create(user='captain', type='cycle', duration=50)

        # Leaderboard
        Leaderboard.objects.create(team='Marvel', points=80)
        Leaderboard.objects.create(team='DC', points=70)

        # Workouts
        Workout.objects.create(name='Pushups', difficulty='Easy')
        Workout.objects.create(name='Squats', difficulty='Medium')
        Workout.objects.create(name='Deadlift', difficulty='Hard')

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
