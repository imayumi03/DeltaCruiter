# import os
# from django.core.management.base import BaseCommand
# from resume_parser.models import Resume
# from faker import Faker
# from django.core.files.base import ContentFile

# fake = Faker()

# class Command(BaseCommand):
#     help = 'Generate fake resume data and store them in the database'

#     def handle(self, *args, **kwargs):
#         # Number of fake resumes to generate
#         num_resumes = 10

#         for _ in range(num_resumes):
#             # Generate fake data using Faker
#             name = fake.name()
#             email = fake.email()
#             skills = ', '.join(fake.words(nb=5))
#             experience = fake.text(max_nb_chars=200)
            
#             # Create a fake resume file (just content simulation)
#             fake_resume_content = f"Name: {name}\nEmail: {email}\nSkills: {skills}\nExperience: {experience}"
#             fake_resume_file = fake.file_name(extension="pdf")  # Simulate a PDF file

#             # Save the fake data in the database
#             resume = Resume.objects.create(
#                 name=name,
#                 email=email,
#                 skills=skills,
#                 experience=experience,
#                 file=ContentFile(fake_resume_content.encode('utf-8'), fake_resume_file)
#             )

#             self.stdout.write(f"Fake Resume Created: {name}")
