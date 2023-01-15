from django.db import models

class County(models.Model):
    county_code = models.IntegerField(primary_key=True)
    county_name = models.CharField(max_length=20)

    def __str__(self):
        return self.county_name

class SubCounty(models.Model):
    county = models.ForeignKey(County,on_delete=models.CASCADE)
    subcounty_code = models.IntegerField(primary_key=True)
    subcounty_name = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.county} -> {self.subcounty_name}"