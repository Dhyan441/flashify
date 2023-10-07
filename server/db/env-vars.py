import os
from dotenv import find_dotenv, load_dotenv

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

CLOUD_SQL_USERNAME = os.getenv("CLOUD_SQL_USERNAME", default=None)
print(CLOUD_SQL_USERNAME)