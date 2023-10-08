import boto3
from botocore.exceptions import NoCredentialsError

# AWS S3 bucket and object information
bucket_name = "flashify"
image_key = "python2.jpg"

# AWS S3 region
s3_region = "us-east-1"

# Create a session with your AWS credentials
session = boto3.Session(
    aws_access_key_id="AKIASXENGQHXR3FUUYHK",
    aws_secret_access_key="c0fGmuPaqYzvvYhLmoOlHHOPRldK/gaVBTUywzqU",
    region_name=s3_region
)

# Create an S3 client
s3 = session.client('s3')

try:
    # Generate a presigned URL for the image
    presigned_url = s3.generate_presigned_url(
        'get_object',
        Params={'Bucket': bucket_name, 'Key': image_key},
        ExpiresIn=3600  # URL expiration time in seconds (1 hour in this example)
    )
    
    print("Presigned URL for the image:", presigned_url)

except NoCredentialsError:
    print("No AWS credentials found")

