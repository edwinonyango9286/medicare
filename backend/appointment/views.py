from rest_framework.views import APIView
from rest_framework.response import Response

from appointment.models import Appointment
from user.models import User,HospitalStaff
from appointment.serializers import AppointmentSerializer

class MakeAppointment(APIView):
    def post(self, request):
        appointment = Appointment.objects.create(
            doctor = HospitalStaff.objects.get(id=request.data.get("doctor")),
            patient = User.objects.get(id=request.user.id),
            appointmentDate = request.data.get("appointmentDate")
        )

        return Response(data={"appointmentId":appointment.id})

class ViewAppointments(APIView):
    serializer_class = AppointmentSerializer

    def get(self, request):
        response = {}
        response["appointments"] = self.serializer_class(Appointment.objects.filter(patient__id=request.user.id), many=True).data

        return Response(data=response)

class ViewAppointment(APIView):
    serializer_class = AppointmentSerializer

    def get(self, request, pk):
        response = {}
        response["appointment"] = self.serializer_class(Appointment.objects.get(id=pk)).data

        return Response(data=response)

class CancelAppointment(APIView):

    def post(self, request, pk):
        response = {"success":True,"error":""}

        try:
            appointment = Appointment.objects.get(id=pk,isActive=True)
            appointment.isActive = False
            appointment.save()

        except Appointment.DoesNotExist:
            response["success"] = False
            response["error"] = "The specified appointment does not exist"

        return Response(data=response)