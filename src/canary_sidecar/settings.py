from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    environment: str
    api_url: str

    class Config:
        env = os.environ.get('ENVIRONMENT', 'development')
        env_file = f'.env.{env}'


settings = Settings()
