from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from location.models import SubCounty, County
from location.serializers import LocationSerializer

class AllLocations(APIView):
    serializer_class = LocationSerializer

    def get(self, request):
        response = {}
        response["locations"] = self.serializer_class(SubCounty.objects.all(),many=True).data

        return Response(data=response)