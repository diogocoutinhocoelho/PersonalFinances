import requests
from django.conf import settings


class ExchangeRatesAPI:
    def __init__(self):
        self.api_key = settings.EXCHANGE_API_KEY
        self.api_url = settings.EXCHANGE_API_URL

    def get_api_key(self):
        if self.api_key is None:
            raise AttributeError("Exchange API key not set")

        return f"?access_key={self.api_key}"

    def convert(self, amount: float, from_currency: str, to_currency: str) -> float:
        convert_url = f"{self.api_url}/convert/{self.get_api_key()}"

        params = {
            "from": from_currency,
            "to": to_currency,
            "amount": amount,
            "date": "2025-07-28"
        }

        response = requests.get(convert_url, params=params)

        if response.status_code == 200:
            return response.json().get("result")
        else:
            raise Exception(f"Erro na API de câmbio: {response.text}")
