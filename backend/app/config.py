from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    mongo_uri: str = "mongodb://localhost:27017"
    mongo_db: str = "mleko"
    cors_origins: str = "http://localhost:5173"

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",")]


settings = Settings()


def get_current_user_id() -> str:
    """Single place to resolve "current user". No auth yet — always "default".
    When auth is added, this becomes the only function that changes.
    """
    return "default"
