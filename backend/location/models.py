from django.db import models

class County(models.Model):
    countyCode = models.IntegerField(primary_key=True)
    countyName = models.CharField(max_length=20)

    def __str__(self):
        return self.countyName

    class Meta:
        ordering = ("countyName",)

class SubCounty(models.Model):
    county = models.ForeignKey(County,on_delete=models.CASCADE)
    subcountyCode = models.IntegerField(primary_key=True)
    subcountyName = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.subcountyName}"

    class Meta:
        ordering = ("county__countyName","subcountyName")