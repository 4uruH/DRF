import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Project, ToDo
from users.models import RandUser


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class RandUserType(DjangoObjectType):
    class Meta:
        model = RandUser
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class UserMutation(graphene.Mutation):
    class Arguments:
        birthday_year = graphene.Int(required=True)
        id = graphene.ID()

    user = graphene.Field(RandUserType)

    @classmethod
    def mutate(cls, root, info, birthday_year, id):
        user = RandUser.objects.get(pk=id)
        user.birthday_year = birthday_year
        user.save()
        return UserMutation(user=user)


class Mutation(graphene.ObjectType):
    update_author = UserMutation.Field()


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(RandUserType)
    all_todos = graphene.List(ToDoType)
    projects_by_user_id = graphene.List(ProjectType, id=graphene.Int(required=False))

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return RandUser.objects.all()

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    def resolve_projects_by_user_id(self, info, id=None):
        projects = Project.objects.all()
        if id:
            projects = projects.filter(users__id=id)
        return projects


schema = graphene.Schema(query=Query)
