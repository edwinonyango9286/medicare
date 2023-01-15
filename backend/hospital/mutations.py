import graphene
from hospital.forms import AddHospitalForm, AddWardForm
from hospital import serializers as HospitalSerializers
from user.models import InPatient
from hospital.models import Ward
from django.db.models import F

class AddHospitalMutation(graphene.Mutation):
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    class Arguments:
        name = graphene.String()
        location = graphene.String()

    def mutate(root, info, **data):
        form = AddHospitalForm(data=data)

        if form.is_valid:
            form.save()
            return AddHospitalMutation(success=True, errors=[])
        
        else:
            nerrors = []
            allerrors = form.errors.get_json_data()
            for error in allerrors:
                for x_error in allerrors[error]:
                    nerrors.append(x_error["message"])

            return AddHospitalMutation(success=False, errors=nerrors)
            

class AddWardMutation(graphene.Mutation):
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    class Arguments:
        name = graphene.String()
        hospital = graphene.String()
        capacity = graphene.Int()

    def mutate(root, info, **data):
        form = AddWardForm(data=data)

        if form.is_valid:
            form.save()
            return AddWardMutation(success=True, errors=[])
        
        else:
            nerrors = []
            allerrors = form.errors.get_json_data()
            for error in allerrors:
                for x_error in allerrors[error]:
                    nerrors.append(x_error["message"])

            return AddWardMutation(success=False, errors=nerrors)

class AdmitInPatientMutation(graphene.Mutation):
    success = graphene.Boolean()
    error = graphene.String()

    class Arguments:
        patient = graphene.String()
        ward = graphene.String()

    def mutate(root, info, **data):
        serializer = HospitalSerializers.AdmitInPatientSerializer(data=data)

        if serializer.is_valid():
            proceed = True
            selectedWard = Ward.objects.get(id=data["ward"])
            if selectedWard.occupancy == selectedWard.capacity:
                return AdmitInPatientMutation(success=False,error="ward has reached maximum capacity")

            else:
                try:
                    OldInPatient = InPatient.objects.get(id=data["patient"],isActive=True)
                    return AdmitInPatientMutation(success=False,error=f"This patient has an active booking {OldInPatient.id}")

                except InPatient.DoesNotExist:
                    if selectedWard.occupancy == (selectedWard.capacity-1):
                        Ward.objects.filter(id=data["ward"]).update(occupancy=F("occupancy")+1,isFull=True)
                    else:
                        Ward.objects.filter(id=data["ward"]).update(occupancy=F("occupancy")+1)

                    serializer.save()
                    return AdmitInPatientMutation(success=True,error="")

        else:
            print(serializer.error_messages)

class HospitalMutations(graphene.ObjectType):
    addHospital = AddHospitalMutation.Field()
    addWard = AddWardMutation.Field()
    admitInPatient = AdmitInPatientMutation.Field()